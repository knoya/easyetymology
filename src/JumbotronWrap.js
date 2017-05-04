import React, { Component } from 'react';
import IndvWord from './IndvWord';
import './normalize.css';
import './style.css';

class JumbotronWrap extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: []
	    };
	}

	render() {
		let indvWords = this.props.data.map(word => {
			if (!word.word=="") {
				return (
					<IndvWord
						word={ word.word }
						isWord={ word.isWord }
						strippedWord={ word.strippedWord }
						etyword={ word.etyword }
						pos={ word.pos }
						crossreferences={ word.crossreferences }
						quotes={ word.quotes }
						etymology={ word.etymology }
						years={ word.years } 
						wnetymology={ word.wnetymology }
						category={ word.category }
						key={ word.id }
						windowWidth={ this.props.windowWidth } />
				)
			}
	    })
	    return (
	      <div className='JumbotronWrap'>
	      	<div style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%'}}>
	        	{ indvWords }
	        </div>
	      </div>
	    )
	}
}
export default JumbotronWrap;
