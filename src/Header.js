import React, { Component } from 'react';
class Header extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    };
	    this.goBack = this.goBack.bind(this);
	}

	goBack() {
		location.reload();
	}

	render() {
	    return (
	      	<div 
				className='Header'
				style={{
					height: 'auto',
					maxHeight: '30%',
					marginTop: '2px',
					marginBottom: '2px',
					width: '100%',
					textAlign: 'center'
				}}
		 	>
	      	{(this.props.isOpen) ? 
	      		<h2
	      		style={{
	      			display: 'inline',
	      			width: 'auto',
					cursor: 'pointer'
	      		}}
	      		onClick={this.goBack}
	      		>Easy Etymology</h2>
	      	: null}
	      </div>
	    );
	}
}
export default Header;
