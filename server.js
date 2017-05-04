/*
NOTES

the actual etymonline word json file has some messed up words with extra characters that don't match. 
make a script to edit the file for better accuracy

things to do
provide further steps for word matching, maybe present options if the word isn't found
finish the popup, add divs and overflow-scroll so all info can be accessed through popup or further modal
fix input so it looks right on mobile
add statswrap elements and behavior - d3 etc
how to handle contractions?
fix scrolling in mobile

finish pinwheel

https://en.wikipedia.org/wiki/Wikipedia:List_of_English_contractions
*/

'use strict'

let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let fetch = require('node-fetch');
var async = require('async');
let etymologies = require('etymonline');

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

router.route('/api')
	.post(function(req, res) {
		let text = req.body.text;
		let wordObjArr = text.sentenceSplitter().isPunctuation().punctuationStrip().addEtymology();
		async.map(wordObjArr, addWn, (err, results) => {
			if (err) {
				res.send(err)
			}
			res.json(results);
		})
	});

String.prototype.sentenceSplitter = function() {
	let splitArr = this.split(/[\s]/g);
	let wordObjArr = new Array;
	for (var i=0; i<splitArr.length; i++) {
		wordObjArr[i] = new Object;
		wordObjArr[i].word = splitArr[i];
	}
	return wordObjArr;
}

Array.prototype.isPunctuation = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if (/[a-z]/i.test(wordObj.word)) {
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
			wordObj.strippedWord = wordObj.word.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
			return wordObj;
		}
	})
	return newObjArr;
}

Array.prototype.addEtymology = function() {
	let newObjArr = this.map(function(wordObj, i) {
		if (wordObj.isWord == true) {
			if (etymologies.find(e => e.word === wordObj.strippedWord)) {
				let etyObj = etymologies.find(e => e.word === wordObj.strippedWord);
				(etyObj.word) ? wordObj.etyword = etyObj.word : null;
				(etyObj.pos) ? wordObj.pos = etyObj.pos : null;
				(etyObj.crossreferences) ? wordObj.crossreferences = etyObj.crossreferences : null;
				(etyObj.quotes) ? wordObj.quotes = etyObj.quotes : null;
				(etyObj.etymology) ? wordObj.etymology = etyObj.etymology : null;
				(etyObj.years) ? wordObj.years = etyObj.years : null;
				wordObj.id = i;
				return wordObj;
			}
			else {
				wordObj.id = i;
				return wordObj;
			}
		}
		else {
			wordObj.id = i;
			return wordObj;
		}
	});
	return newObjArr;
}

String.prototype.wnCleaner = function() {
	let reduced = this
	.replace(/\<\?xml version\=\"1\.0\" encoding\=\"UTF\-8\"\?\>/g,'')
	.replace(/\<ety\>/g, '')
	.replace(/\<\/ety\>/g, '')
	.replace(/\<ets\>/g, '')
	.replace(/\<\/ets\>/g, '')
	.replace(/\<er\>/g, '')
	.replace(/\<\/er\>/g, '')
	.replace(/\<grk\>/g, '')
	.replace(/\<\/grk\>/g, '')
	.replace(/[\[\]]/g, '')
	.replace(/\n/g, '')
	return reduced;
}

function addWn(obj, callback) {
	if (obj.isWord == true) {
		let url = `http://api.wordnik.com/v4/word.json/${ obj.strippedWord }/etymologies?useCanonical=true&api_key=bf13ce98da730e024300d0a5bed0398ce05592ad54aece278`;
		fetch(url)
			.then(res => {
				return res.json();
			}).then(json => {
				if (json == "" || json == null) {
					obj.wnetymology = null;
					callback(null, obj);
				}
				else {
					let str = json[0].wnCleaner();
					obj.wnetymology = str;
					obj.category = determineCategory(obj);
					callback(null, obj);
				}
			}).catch(err => console.log(err));
	}
	else {
		obj.wnetymology = null;
		callback(null, obj);
	}	
}

function determineCategory(obj) {
	let firstWord = obj.wnetymology.replace(/[\,\.\;\:]/g, '').split(" ")[0].toUpperCase();
	var origin;
	switch (firstWord) {
	    case "OE":
	    case "AS":
	        origin = "Germanic";
	        break;
	    case "F":
	    case "OF":
	    	origin = "French";
	    	break;
	    case "L":
	    	origin = "Latin";
	    	break;
	    case "GR":
	    	origin = "Greek";
	    	break;
	    default:
	        origin = null;
	}
	return origin;
}

let server = app.listen(port, () => {
  console.log('Listening on 4000');
});