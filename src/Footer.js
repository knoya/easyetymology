import React, { Component } from 'react';

class Footer extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    };
	}

	render() {
	    return (
	      <div 
            className='Footer'
            style={{
              height: 'auto',
              maxHeight: '5%',
              marginTop: '2px',
              marginBottom: '5px',
              width: '100%',
              position: 'absolute',
              bottom: '0',
              textAlign: 'center',
              marginBottom: (this.props.windowWidth <=500) ? '1px' : '5px',
              fontSize: '2.5vh'
            }}
            >

	      	<a
          onClick={ this.props.toggleSettingsPane }
	      	style={{
                cursor: 'pointer'
            }}
            >Settings 
            </a> |
	      	<a
	      	onClick={ this.props.toggleAboutPane }
	      	style={{
                cursor: 'pointer'
            }} 
            > About
            </a>
	      </div>
	    );
	}
}
export default Footer;
