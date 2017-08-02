import React, { Component } from 'react';
import AutosizeInput from 'react-input-autosize';

class InputWrap extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	text:''
	    };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.changeText = this.changeText.bind(this);
	}

	changeText(e) {
		this.setState({ 
	       	text: e.target.value 
	    });
	}

	handleSubmit(e) {
	    e.preventDefault();
	    this.props.submitWords(this.state.text.trim());
	  }

	render() {
	    return (
	      	<div 
	      	style={{
			  width: '100%',
			  marginTop: '1%',
			  marginBottom: '1%',
			  position: 'relative'
	      	}}
	      	>
	      		<form
      			className='InputForm'
      			onSubmit={ this.handleSubmit }
      			style={
      				(this.props.windowWidth <=500)
      				? {
      				width: '100%',
      				height: '5vh',
      				position: 'relative',
      				}
      				: {
      				width: '100%',
      				position: 'relative',
      				height: '5vh'
					} 
				} >
	      			<AutosizeInput
						type='text'
						onChange={ this.changeText }
						value={ this.state.text }
						placeholder=" Enter a word or sentence! "
						placeholderIsMinWidth={ true }
						inputStyle={
							(this.props.windowWidth <=500) 
							? { 
							height: 'calc(100% - 2px)',
							maxWidth: '100%',
							padding: 0,
							borderRadius: '0',
							border: '1px solid #6b6b6b',
							borderRight: 'none',
							borderTopWidth: '1px',
							borderBottomWidth: '1px',
							borderLeftWidth: '1px',
							} 
							: {
							fontSize: '4vh',
							height: 'calc(100% - 2px)',
							padding: 0,
							border: '1px solid #6b6b6b',
							borderRight: 'none',
							maxWidth: '100%',
							borderTopWidth: '1px',
							borderBottomWidth: '1px',
							borderLeftWidth: '1px',
							}
						}
						style={
							(this.props.windowWidth <=500)
							? {
							height: '100%',
							position: 'relative',
							maxWidth: '78%', 
							width: 'auto',
							} 
							: {
							fontSize: '4vh',
							height: '100%',
							padding: 0,
							maxWidth: '80%',
							}
						}
			        />
		      		<input
						type='submit'
						className='wordInput'
						value='Submit'
						style={
							(this.props.windowWidth <=500)
							? { 
							position: 'relative',
							width: 'auto',
							minWidth: '20vw',
							height: '100%',
							textAlign: 'center',
							borderRadius: 0,
							border: '1px solid #6b6b6b',
							backgroundColor: '#F0F0F0',
							} 
							: {
							fontSize: '3vh',
							height: 'calc(100% - 0px)', //because safari sucks
							border: '1px solid #6b6b6b',
							backgroundColor: '#F0F0F0',
							}
						}
					/>
				</form>
	      	</div>
	    );
	}
}
export default InputWrap;
