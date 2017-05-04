import React, { Component } from 'react';
import AutosizeInput from 'react-input-autosize';
import './normalize.css';
import './style.css';

class InputWrap extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	text:''
	    };
	    this.submitWords = this.submitWords.bind(this);
	    this.changeText = this.changeText.bind(this);
	}

	changeText(e) {
		this.setState({ 
	       	text: e.target.value 
	    });
	}

	submitWords(e) {
	    e.preventDefault();
	    this.props.submitWords(this.state.text.trim());
	  }

	render() {
	    return (
	      	<div className='InputWrap'>
	      		<form
	      			className='InputForm'
	      			onSubmit={ this.submitWords }>
	      			<AutosizeInput
			              type='text'
			              onChange={ this.changeText }
			              value={ this.state.text }
			              placeholder="Enter a word or sentence!"
			              placeholderIsMinWidth={ true }
			              inputClassName='autosizeinput'
			              inputStyle={{ maxWidth: '100%' }}
			              style={{ maxWidth: '80%', paddingRight: '2%' }}
			              />
		      		<input
						type='submit'
						className='wordInput'
						value='Post'
						style={{ maxWidth: '20%'}}
					/>
				</form>
	      	</div>
	    );
	}
}
export default InputWrap;
