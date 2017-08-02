import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import IndvSetting from './IndvSetting';

class Footer extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    };
	}

	render() {
	    return (
	      <div className='SettingsPane'>

            {this.props.isSettingsOpen ? <SlidingPane
                isOpen={ this.props.isSettingsOpen }
                contentLabel="Modal"
                className='SettingsPane'
                title='Settings'
                subtitle=''
                width={ (this.props.windowWidth < 500) ? this.props.windowWidth : "500px" }
                from='left'
                onRequestClose={ this.props.toggleSettingsPane }>
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: 'auto',
                        height: '100%'
                    }}>
                    <div
                    style={{
                        width: '100%',
                        height: '16%',
                        marginTop: (this.props.windowWidth <= 500) ? '4px' : '2%'
                    }}>
                        <IndvSetting 
                        color={ this.props.germanicColor }
                        label='Germanic'
                        changeColor={ this.props.changeColor }
                        windowHeight={ this.props.windowHeight } />
                    </div>
                    <div
                    style={{
                        width: '100%',
                        height: '16%'
                    }}>
                        <IndvSetting 
                        color={ this.props.latinColor }
                        label='Latin'
                        changeColor={ this.props.changeColor }
                        windowHeight={ this.props.windowHeight } />
                    </div>
                    <div
                    style={{
                        width: '100%',
                        height: '16%'
                    }}>
                        <IndvSetting 
                        color={ this.props.frenchColor }
                        label='French'
                        changeColor={ this.props.changeColor }
                        windowHeight={ this.props.windowHeight } />
                    </div>
                    <div
                    style={{
                        width: '100%',
                        height: '16%'
                    }}>
                        <IndvSetting 
                        color={ this.props.greekColor }
                        label='Greek'
                        changeColor={ this.props.changeColor }
                        windowHeight={ this.props.windowHeight } />
                    </div>
                    <div
                    style={{
                        width: '100%',
                        height: '16%'
                    }}>
                        <IndvSetting 
                        color={ this.props.otherColor }
                        label='Other'
                        changeColor={ this.props.changeColor }
                        windowHeight={ this.props.windowHeight } />
                    </div>
                    <div
                    style={{
                        width: '100%',
                        height: '16%'
                    }}>
                        <IndvSetting 
                        color={ this.props.unknownColor }
                        label='Unknown'
                        changeColor={ this.props.changeColor }
                        windowHeight={ this.props.windowHeight } />
                    </div>
                    <p 
                    onClick={ this.props.resetColors } 
                    style={{
                        cursor: 'pointer', 
                        textDecoration: 'underline',
                        height: 'auto',
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        fontWeight: 'lighter',
                        marginTop: 0,
                        marginBottom: (this.props.windowWidth <=500) ? '1px' : '5px',
                        textAlign: 'center',
                        fontSize: '2.5vh'
                    }} >
                    Reset to defaults</p>
                </div>
            </SlidingPane>
            : null}
	      </div>
	    );
	}
}
export default Footer;
