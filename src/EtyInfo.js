import React, { Component } from 'react';

class EtyInfo extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
            
	    };
	}

	render() {
	    return (
			<div
				style={{
					height: 'auto'
				}}>
				{this.props.isContraction ?
					<div
		          		style={{
		          			//maxHeight: this.props.isContraction ? 'initial' : (window.innerHeight*.1), 
		          			padding: '2px',
		          			margin: '5px' 
		          		}}>
	          			<h2 className="capitalize">{this.props.contractionStem}</h2>
	          		</div>
	          	: null}
          		{this.props.category ?
          			<div
		          		style={{
		          			//maxHeight: this.props.isContraction ? 'initial' : (window.innerHeight*.1), 
		          			padding: '2px',
		          			margin: '5px'
		          		}}>
	          			<h3>Origin: <span style={{fontWeight: '400'}}>{this.props.category}</span></h3>
	          		</div>
	          	: null}
	          	{this.props.etyword ?
          			<div
		          		style={{
		          			//maxHeight: this.props.isContraction ? 'initial' : (window.innerHeight*.1), 
		          			padding: '2px',
		          			margin: '5px'
		          		}}>
	          			<h3>Stem: <span style={{textTransform: 'capitalize', fontWeight: '400'}}>{this.props.etyword}</span></h3>
	          		</div>
	          	: null}
	          	{this.props.etymology ?
	          		<div
		          		style={{
		          			height: 'auto', 
		          			//maxHeight: this.props.isContraction ? 'initial' : (window.innerHeight*.5), 
		          			padding: '2px',
		          			wordWrap: 'break-word',
		          			margin: '5px'
		          		}}>
		          		<h5
		          		style={{
		          			fontWeight: '500'
		          		}}>1.</h5>
	          			<p
	          			style={{
	          				marginTop: 0,
	          				marginBottom: 0
	          			}}>{this.props.etymology}</p>
	          		</div>
	          	: null}
	          	{this.props.wnetymology ?
	          		<div
		          		style={{
		          			height: 'auto', 
		          			//maxHeight: this.props.isContraction ? 'initial' : (window.innerHeight*.5), 
		          			padding: '2px',
		          			wordWrap: 'break-word',
		          			margin: '5px'
		          		}}>
		          		<h5
		          		style={{
		          			fontWeight: '500'
		          		}}>2.</h5>
	          			<p
	          			style={{
	          				marginTop: 0,
	          				marginBottom: 0
	          			}}>{this.props.wnetymology}</p>
	          		</div>
	          	: null}
			</div>
	      	
	    )
	}
}
export default EtyInfo;