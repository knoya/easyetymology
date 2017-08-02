/*
NOTES

things to do
finish the popup, add divs and overflow-scroll so all info can be accessed through popup or further modal
fix input so it looks right on mobile
add statswrap elements and behavior - d3 etc

add word reduction for prefixes and "bigger" double letter logic
handle contractions
create modal popup for signup/login 
create cookie for persistent login
create db server side to store user settings
pick better color picker
add user settings for non-words and background color
css everything
finish pinwheel
watch wordcount and set cutoff (200 or something) also adjust font size of the indvword divs based on word count range

letsencrypt for ssl cert
cron job to recertify ssl 
http requests will redirect automatically to https
nginx is a must, just sits in front of node and takes port 80 or whatever

https://en.wikipedia.org/wiki/Wikipedia:List_of_English_contractions

make checkVariants recursive so when it trims a suffix it also checks if there's a prefix it can trim. "unlicensed" to "license"

if it's not available, return the results or both the full and root word and ask the user which result they want, or send a requested add

custom modified thigs:
css for react-sliding-pane - got rid of internal margins
got rid of etymonline
added WebkitTransform and msTransform handling to react-float-affixed

make bottom of floataffixed modal expandable?

split other and unknown
front end commentForm verification
back end commentForm verification

commentform verification
split other and unknown
make it so non words don't count towards % in aboutpane
update colors
finish email back end

hard set height for setting pane on large screens
finish settings pane
add extra info to floataffixed modal

change indvword divs to vh instead of em or whatever they are

finalize comment modal


recheck comment on server
make text input bigger
add chart thing when no words are input

*/

'use strict'

let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let fetch = require('node-fetch');
var async = require('async');
let etymologies = require('./index.json');
let contractions = require('./contractions.json');
var sg = require('sendgrid')('API_KEY');

const port = 4000;

app.use(express.static('public'));

app.use('/etymology', router);

app.use(morgan('dev'));

//parse json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//setting headers
router.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
	//this is where index.html will be served 
	res.json([{"hello":"there"},{"howare":"you"}]);
});

router.post('/comments',function(req,res){
	var request = sg.emptyRequest();
	request.body = {
	  "personalizations": [
	    {
	      "to": [
	        {
	          "email": "easyetymology@gmail.com"
	        }
	      ],
	      "subject": "New message received on Easy Etymology"
	    }
	  ],
	  "from": {
	    "email": "etymologyrequest@kristiannoya.com",
	    "name": "Comment"
	  },
	  "content": [
	    {
	      "type": "text/plain",
	      "value": 
	      `From: ${req.body.email ? req.body.email : 'N/A'}
	      About: ${req.body.radio ? req.body.radio : 'N/A'}
	      Word: ${req.body.word ? req.body.word : 'N/A'}
	      Comments: ${req.body.comments ? req.body.comments : 'N/A'}
	      Source: ${req.body.source ? req.body.source : 'N/A'}


	      ${JSON.stringify(req.body, null, 2)}`
	    }
	  ]
	};
	request.method = 'POST'
	request.path = '/v3/mail/send'
	sg.API(request, function (error, response) {
	  if (error) {
	  	console.log(error);
	  }
	  res.status(200).json({message: "sent"});
	})
	//setTimeout(function(){ res.json([{"hello":"there"}]); }, 1000);
	//setTimeout(function(){ res.status(400).send('Something broke!') }, 1000);
});

router.route('/api')
	.post(function(req, res) {
		let text = req.body.text;
		if (text.split(/[\s]/g).length <= 200) {
			let wordObjArr = text.sentenceSplitter().isWord().punctuationStrip().isContraction().addEtymology().checkVariants();
			res.json(wordObjArr);
		}
		else {
			res.json([{"too":"long"}]);
		}
	});


String.prototype.sentenceSplitter = function() {
	let lowerCaseArr = this.toLowerCase().split(/[\s]/g);
	let splitArr = this.split(/[\s]/g);
	let wordObjArr = new Array;
	for (var i=0; i<splitArr.length; i++) {
		wordObjArr[i] = new Object;
		wordObjArr[i].word = splitArr[i];
		wordObjArr[i].lowercase = lowerCaseArr[i];
	}
	return wordObjArr;
}

Array.prototype.isWord = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if (/[a-z]/i.test(wordObj.lowercase)) {
			wordObj.isWord = true;
			return wordObj;
		}
		else {
			wordObj.isWord = false;
			return wordObj;
		}
	})
	return newObjArr;
}

Array.prototype.punctuationStrip = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if(wordObj.isWord == false) {
			wordObj.strippedWord = null;
			return wordObj;
		}
		else {
			wordObj.strippedWord = wordObj.lowercase.replace(/[‘’]/g,"'").replace(/[“”]/g,"\"").replace(/[.,\/#!?$%\^&\*;:{}=\_\"`~()]/g,"");
			return wordObj;
		}
	})
	return newObjArr;
}

Array.prototype.isContraction = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if (contractions.find(e => e.word === wordObj.strippedWord)) {
			let contractionObj = contractions.find(e => e.word === wordObj.strippedWord);
			wordObj.isContraction = true;
			wordObj.contractionStems = contractionObj.stems;
		}
		return wordObj;
	})
	return newObjArr;
}

Array.prototype.addEtymology = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if (wordObj.isContraction) {
			let newWordObj = new Object;
			newWordObj.word = wordObj.word;
			newWordObj.contractionStems = wordObj.contractionStems;
			newWordObj.lowercase = wordObj.lowercase;
			newWordObj.isWord = true;
			newWordObj.strippedWord = wordObj.strippedWord;
			newWordObj.isContraction = true;

			newWordObj.data = new Array;

			for (let i = 0; i< wordObj.contractionStems.length; i++) {
				newWordObj.data[i] = new Object;
				let etyObj = etymologies.find(e => e.word === wordObj.contractionStems[i]);
				newWordObj.data[i].contractionStem = wordObj.contractionStems[i];
				etyObj.etymology ? newWordObj.data[i].etymology = etyObj.etymology : null;
				etyObj.pos ? newWordObj.data[i].pos = etyObj.pos : null;
				etyObj.crossreferences ? newWordObj.data[i].crossreferences = etyObj.crossreferences : null;
				etyObj.quotes ? newWordObj.data[i].quotes = etyObj.quotes : null;
				etyObj.years ? newWordObj.data[i].years = etyObj.years : null;
				etyObj.category ? newWordObj.data[i].category = etyObj.category : null;
				etyObj.wnetymology ? newWordObj.data[i].wnetymology = etyObj.wnetymology : null;
			}
			return(newWordObj);
		}
		if (!wordObj.isContraction) {
			let newWordObj = new Object;
			newWordObj.word = wordObj.word;
			newWordObj.contractionStems = wordObj.contractionStems;
			newWordObj.lowercase = wordObj.lowercase;
			newWordObj.isWord = wordObj.isWord;
			newWordObj.strippedWord = wordObj.strippedWord;
			newWordObj.isContraction = false;

			let etyObj = etymologies.find(e => e.word === wordObj.strippedWord);
			newWordObj.data = new Array;
			newWordObj.data[0] = new Object;

			if (etyObj == undefined) {
				return(newWordObj);
			}

			etyObj.etymology ? newWordObj.data[0].etymology = etyObj.etymology : newWordObj.data[0].etymology = null;
			etyObj.pos ? newWordObj.data[0].pos = etyObj.pos : newWordObj.data[0].pos = null;
			etyObj.crossreferences ? newWordObj.data[0].crossreferences = etyObj.crossreferences : newWordObj.data[0].crossreferences = null;
			etyObj.quotes ? newWordObj.data[0].quotes = etyObj.quotes : newWordObj.data[0].quotes = null;
			etyObj.years ? newWordObj.data[0].years = etyObj.years : newWordObj.data[0].years = null;
			etyObj.category ? newWordObj.data[0].category = etyObj.category : newWordObj.data[0].category = null;
			etyObj.wnetymology ? newWordObj.data[0].wnetymology = etyObj.wnetymology : newWordObj.data[0].wnetymology = null;
			return(newWordObj);
		}
	});

	return newObjArr;
}

Array.prototype.checkVariants = function() {

	let newObjArr = this.map(variantChecker);
	return newObjArr;
}

function variantChecker(wordObj, i) {
	if(wordObj.isWord == false) {
		return wordObj;
	}
	if ((wordObj.data[0].category == null) && (wordObj.isWord == true)) {
		var str;
		if (wordObj.strippedWord.endsWith('s') && (isThisAWord(wordObj.strippedWord.slice(0, -1)))) {
			str = wordObj.strippedWord.slice(0, -1);
		} 
		else if (wordObj.strippedWord.endsWith('less') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		} 
		else if (wordObj.strippedWord.endsWith('ness') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		} 
		else if (wordObj.strippedWord.endsWith('es') && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		} 
		else if (wordObj.strippedWord.endsWith('ers') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith('ly') && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		}
		else if (wordObj.strippedWord.endsWith('ally') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		}
		else if (wordObj.strippedWord.endsWith('d') && (isThisAWord(wordObj.strippedWord.slice(0, -1)))) {
			str = wordObj.strippedWord.slice(0, -1);
		}
		else if (wordObj.strippedWord.endsWith('ed') && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		}
		else if (wordObj.strippedWord.endsWith("ing") && (isThisAWord(wordObj.strippedWord.slice(0, -3)+'e'))) {
			str = wordObj.strippedWord.slice(0, -3)+'e';
		}
		else if (wordObj.strippedWord.endsWith('ing') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith("ing") && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		}
		else if (wordObj.strippedWord.endsWith('er') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) { //bigger - look for 'er' and chop off the last 'g' too
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith('er') && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		}
		else if (wordObj.strippedWord.endsWith('r') && (isThisAWord(wordObj.strippedWord.slice(0, -1)))) {
			str = wordObj.strippedWord.slice(0, -1);
		}
		else if (wordObj.strippedWord.endsWith('ful') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith('est') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) { //fattest - look for 'est' and trim 1 mores
			str = wordObj.strippedWord.slice(0, -4);
		}
		else if (wordObj.strippedWord.endsWith('est') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith('ment') && (isThisAWord(wordObj.strippedWord.slice(0, -4)))) {
			str = wordObj.strippedWord.slice(0, -4);
		}
		else if (wordObj.strippedWord.endsWith('ism') && (isThisAWord(wordObj.strippedWord.slice(0, -3)))) {
			str = wordObj.strippedWord.slice(0, -3);
		}
		else if (wordObj.strippedWord.endsWith("'s") && (isThisAWord(wordObj.strippedWord.slice(0, -2)))) {
			str = wordObj.strippedWord.slice(0, -2);
		} 
		else if (wordObj.strippedWord.endsWith("ied") && (isThisAWord(wordObj.strippedWord.slice(0, -3)+'y'))) {
			str = wordObj.strippedWord.slice(0, -3)+'y';
		} 
		else if (wordObj.strippedWord.endsWith("ies") && (isThisAWord(wordObj.strippedWord.slice(0, -3)+'y'))) {
			str = wordObj.strippedWord.slice(0, -3)+'y';
		}

		if (etymologies.find(e => e.word === str)) {
			let etyObj = etymologies.find(e => e.word === str);
			(etyObj.word) ? wordObj.data[0].etyword = etyObj.word : null;
			(etyObj.pos) ? wordObj.data[0].pos = etyObj.pos : null;
			(etyObj.crossreferences) ? wordObj.data[0].crossreferences = etyObj.crossreferences : null;
			(etyObj.quotes) ? wordObj.data[0].quotes = etyObj.quotes : null;
			(etyObj.etymology) ? wordObj.data[0].etymology = etyObj.etymology : null;
			(etyObj.years) ? wordObj.data[0].years = etyObj.years : null;
			(etyObj.wnetymology) ? wordObj.data[0].wnetymology = etyObj.wnetymology : null;
			(etyObj.category) ? wordObj.data[0].category = etyObj.category : null;
		}
		return wordObj;
	}
	else {
		return wordObj;
	}
}

function isThisAWord(str) {
	if (etymologies.find(e => e.word === str)) {
		return true;
	}
	else {
		return false;
	}
}

let server = app.listen(port, () => {
  console.log('Listening on 4000');
});
