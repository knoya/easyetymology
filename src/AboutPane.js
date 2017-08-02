import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import FontAwesome from 'react-fontawesome';
import DonutChart from './DonutChart';
import Collapse from 'rc-collapse';

let Panel = Collapse.Panel;


class AboutPane extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    };
	}

	render() {
	    return (
	      <div 
            className='AboutPane'
            style={{
                height: '100%'
            }} >
            {this.props.isAboutOpen ? <SlidingPane
                className="aboutSlide"
                isOpen={ this.props.isAboutOpen }
                contentLabel="Modal"
                title='About'
                subtitle=''
                width={ (this.props.windowWidth < 500) ? this.props.windowWidth : "500px" }
                onRequestClose={ this.props.toggleAboutPane }>
                
                <div
                    style={{
                        padding: (this.props.windowWidth <= 400) ? "10px 10px" : '24px 32px'
                    }}>
                	<Collapse accordion={false}>
                        <Panel header="What is this site?" headerClass="collapse-header">
                        <span
                        style={{
                            fontWeight: '300'
                        }}>Easy Etymology is a tool for English learners to have quick and easy access to the 
                        etymological data of the words they encounter every day. We believe that a deeper understanding of the English language
                        can be gained by knowing the origins of the words we speak, and to facilitate this we used color as a visual cue to present
                        this information in the most intuitive way possible. 
                        Starting with a variety of online grammar APIs, the Easy Etymology database was refined down 
                        to the most usable information - and with that came easyetymology.com and the Easy Etymology API, freely available for use to developers.
                        </span>
                        </Panel>
                        <Panel header="A word is missing or needs to be updated" headerClass="collapse-header">
                            <a 
                                onClick={ this.props.toggleCommentModal }
                                style={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                <br/>
                                <span
                                style={{
                                    fontWeight: '300'
                                }}>Click here to submit a comment/request!</span>
                                <br/>
                                <br/>
                            </a>
                        </Panel>
                        <Panel header="Is this available in App form?" headerClass="collapse-header">
                            <span
                        style={{
                            fontWeight: '300'
                        }}>Soon! Current efforts are towards launching the app to both the Apple and Google Play stores. </span>
                        </Panel>
                    </Collapse>
                    {!this.props.displayChart ? 
                        <div
                        style={{
                            position: 'relative',
                            height: 'auto',
                            width: '100%'
                        }}>
                            <FontAwesome
                                //name='bar-chart'
                                //name='bar-chart-o'
                                name='rocket'
                                size='5x'
                                style={{ 
                                    textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                                    color: '#E9E9E9',
                                    position: 'relative',
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: '10%'
                                 }}
                            />
                            <span
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                color: '#E2E2E2',
                                fontWeight: '300',
                                position: 'relative',
                                display: 'inline-block',
                                cursor: 'default',
                                MozUserSelect: 'none',
                                WebkitUserSelect: 'none',
                                msUserSelect: 'none',
                                userSelect: 'none',
                                marginTop: '20px'
                            }}>
                            Enter some text to see a chart here!
                            </span>
                        </div> 
                    : null}
                    {this.props.displayChart ? <DonutChart
                        germanicColor={ this.props.germanicColor }
                        latinColor={ this.props.latinColor }
                        frenchColor={ this.props.frenchColor }
                        greekColor={ this.props.greekColor }
                        otherColor={ this.props.otherColor }
                        unknownColor={ this.props.unknownColor }
                        germanicCount={ this.props.germanicCount}
                        latinCount={ this.props.latinCount}
                        greekCount={ this.props.greekCount}
                        frenchCount={ this.props.frenchCount}
                        otherCount={ this.props.otherCount}
                        unknownCount={ this.props.unknownCount }
                        windowWidth={ this.props.windowWidth}
                    /> : null}
                </div>
            </SlidingPane>
            : null}
	      </div>
	    );
	}
}
export default AboutPane;