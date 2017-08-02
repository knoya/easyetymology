import React, { Component } from 'react';

class ColorPicker extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    };
	    this.handleChangeClick = this.handleChangeClick.bind(this);
	    this.handleChangeInput = this.handleChangeInput.bind(this);
	}

	handleChangeInput(e) {
		this.props.changeColor(e.target.value, this.props.label);
	};

	handleChangeClick(e) {
		this.props.changeColor(e.target.id, this.props.label);
	};
	
  	render() {
  		let indvColors = this.props.colors.map((color, i) => {
			return (
				<div
				style={{
					width: 'calc(100%/14 - 2px)',
					paddingTop: 'calc(100%/14 - 5px)', //trick to set height same to val of width
					background: color,
					display: 'inline-block',
					boxSizing: 'border-box',
					border: '1px solid black',
					marginLeft: '1px',
					marginRight: '1px',
					marginTop: '1px',
					cursor: 'pointer'
				}}
				onClick={ this.handleChangeClick }
				id={ color }
				key={ i }
				>
				</div>
			)
	    })

  		return (
  			<div
  			style={{
  				width: '100%',
  				height: 'auto'
  			}}>
  				{indvColors}
  				<input
                style={{
                	position: 'relative',
                	marginLeft: '1px',
                	marginBottom: '4px',
                	border: '1px solid black'
                }}
                onChange={ this.handleChangeInput }
                value={ this.props.color } >
                </input>
  			</div>

		)
  	}
}

export default ColorPicker;
