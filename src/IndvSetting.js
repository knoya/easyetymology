import React, { Component } from 'react';
import ColorPicker from './ColorPicker'

class IndvSetting extends Component {

	render() {
	    return (
	    	<div
	    	style={{
	    		width: '95%',
	    		marginLeft: '2.5%',
	    		height: 'auto',
	    		boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
	    		position: 'relative',
	    		backgroundColor: 'white'

	    	}}>
	    		<div
	    		style={{
	    			height: 'auto',
	    			width: '100%',
	    			background: this.props.color
	    		}}>
	    			<h1
	    			style={{ 
	    			paddingLeft: '1%',
	    			fontSize: this.props.windowHeight >= '900' ? '2vh' : '3vh'
		    		}}
		    		>{ this.props.label }</h1>
	    		</div>
	    		<ColorPicker
	    			color={this.props.color}
	    			label={ this.props.label }
	    			changeColor={ this.props.changeColor }
	    			colors={['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#8bc34a', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e']}
	    		/>
	    	</div>
	    );
	}
}
export default IndvSetting;
