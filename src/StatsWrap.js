import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
//import RadialChart from 'react-vis';
import './normalize.css';
import './style.css';
//import "./node_modules/react-vis/dist/styles/legends";

class StatsWrap extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	isPaneOpen: false 
	    };
	}

	render() {
	    return (
	      <div className='StatsWrap'>
	      	<div 
	      	onClick={() => this.setState({ isPaneOpen: true })}
	      	style={{ 
	      		borderRadius: '100%',
	      		height: '60px',
	      		width: '60px',
	      		margin: '2px',
	      		backgroundColor: 'white',
	      		boxShadow: '1px 1px 2px grey',
	      		position: 'fixed',
	      		bottom: '0',
	      		textAlign: 'center',
				verticalAlign: 'middle',
				lineHeight: '60px',
				color: 'black' 
	      }}
	      	>Charts</div>
            <SlidingPane
                className='some-custom-class'
                isOpen={ this.state.isPaneOpen }
                title='Charts'
                subtitle=''
                onRequestClose={() => {
                    this.setState({ isPaneOpen: false });
                }}>
                <div>
                	Put D3 stuff here
                	{/*<RadialChart
				        colorType={'literal'}
				        colorDomain={[0, 100]}
				        colorRange={[0, 10]}
				        margin={{top: 100}}
				        data={[
				          {angle: 1, color: '#89DAC1', label: 'green', opacity: 0.2},
				          {angle: 2, color: '#F6D18A', label: 'yellow'},
				          {angle: 5, color: '#1E96BE', label: 'cyan'},
				          {angle: 3, color: '#DA70BF', label: 'magenta'},
				          {angle: 5, color: '#F6D18A', label: 'yellow again'}
				        ]}
				        showLabels
				        width={400}
						height={300} />*/}
                </div>
            </SlidingPane>
	      </div>
	    );
	}
}
export default StatsWrap;
