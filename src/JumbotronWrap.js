import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IndvWord from './IndvWord';

class JumbotronWrap extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: [],
	    	fontSize: ''
	    };
	    this.colorPicker = this.colorPicker.bind(this);
	}

	colorPicker(category) {
		var color;
		switch (category) {
		    case "Germanic":
		        color = this.props.germanicColor;
		        break;
		    case "French":
		    	color = this.props.frenchColor;
		    	break;
		    case "Latin":
		    	color = this.props.latinColor;
		    	break;
		    case "Greek":
		    	color = this.props.greekColor;
		    	break;
		    case "Other":
		    	color = this.props.otherColor;
		    	break;
		    case "Unknown":
		    	color = this.props.unknownColor;
		    	break;	
		    default:
		        color = this.props.unknownColor;
		}
		return color;
	}

	componentWillMount() {
		if (this.props.windowWidth <= 500) {
			let length = this.props.data.length;
			if (length < 4) {
				this.setState({
					fontSize: '16vh'
				})
			}
			else if (length < 7) {
				this.setState({
					fontSize: '12vh'
				})
			}
			else if (length < 11) {
				this.setState({
					fontSize: '10vh'
				})
			}
			else if (length < 16) {
				this.setState({
					fontSize: '8vh'
				})
			}
			else if (length < 21) {
				this.setState({
					fontSize: '6vh'
				})
			}
			else {
				this.setState({
					fontSize: '4vh'
				})
			}
		}

		else if (this.props.windowWidth > 500) {
			let length = this.props.data.length;
			if (length < 6) {
				this.setState({
					fontSize: '20vh'
				})
			}
			else if (length < 11) {
				this.setState({
					fontSize: '16vh'
				})
			}
			else if (length < 16) {
				this.setState({
					fontSize: '14vh'
				})
			}
			else if (length < 21) {
				this.setState({
					fontSize: '12vh'
				})
			}
			else if (length < 31) {
				this.setState({
					fontSize: '10vh'
				})
			}
			else if (length < 61) {
				this.setState({
					fontSize: '8vh'
				})
			}
			else if (length < 81) {
				this.setState({
					fontSize: '6vh'
				})
			}
			else if (length < 201) {
				this.setState({
					fontSize: '4vh'
				})
			}
			else{
				this.setState({
					fontSize: '2vh'
				})
			}
		}
	}

	render() {
		let indvWords = this.props.data.map((word, i) => {
			//console.log("word : " + JSON.stringify(word, null, 2));
			if (!word.word=="") {
				return (
					<IndvWord
						word={ word.word }
						contractionStems={ (word.contractionStems) ? word.contractionStems : null }
						isWord={ word.isWord }
						isContraction={ word.isContraction }
						strippedWord={ word.strippedWord }
						data={ word.data }
						color={ this.colorPicker(word.data[0].category) } //just go with the color of the first contraction stem
						key={ i }
						windowWidth={ this.props.windowWidth }
						fontSize={ this.state.fontSize }
						toggleCommentModal={ this.props.toggleCommentModal } />
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
JumbotronWrap.propTypes = {
	data: PropTypes.array, 
    windowWidth: PropTypes.number,
    germanicColor: PropTypes.string,
    latinColor: PropTypes.string,
    frenchColor: PropTypes.string,
    greekColor: PropTypes.string,
    otherColor: PropTypes.string,
    unknownColor: PropTypes.string
}

export default JumbotronWrap;