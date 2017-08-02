import React, { Component } from 'react';
import FloatAffixed from 'react-float-affixed';
import EtyInfo from './EtyInfo';

class IndvWord extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: [],
	    	isOpen: false,
	    	holdOpen: false,
	    	commentModal: false,
            name: '',
            word: '',
            comments: '',
            touchMoved: false
	    };
	    this.onClick = this.onClick.bind(this);
	    this.onTouch = this.onTouch.bind(this);
	    this.onTouchStart = this.onTouchStart.bind(this);
	    this.onMove = this.onMove.bind(this);
	    this.onMouseOver = this.onMouseOver.bind(this);
	    this.onResize = this.onResize.bind(this);
	    this.setWrapperRef1 = this.setWrapperRef1.bind(this); 
	    this.setWrapperRef2 = this.setWrapperRef2.bind(this);
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.lightenColor = this.lightenColor.bind(this);
        this.closeFloatAffixed = this.closeFloatAffixed.bind(this);

	}

	onClick(event) {
		if (((this.wrapperRef1 && this.wrapperRef2) && this.wrapperRef1.contains(event.target)) && this.state.holdOpen && (this.props.windowWidth > 500)) {
			this.setState({
				isOpen: false,
				holdOpen: false
			});
		}
		else if ((this.wrapperRef1 && this.wrapperRef2) && this.wrapperRef1.contains(event.target) && (this.props.windowWidth > 500)) {
			this.setState({
				isOpen: true,
				holdOpen: true
			});
		}
		else if ((this.wrapperRef1 && this.wrapperRef2) && (!this.wrapperRef1.contains(event.target) && !this.wrapperRef2.contains(event.target)) && (this.props.windowWidth > 500)) {
			this.setState({
				isOpen: false,
				holdOpen: false
			});
		}
		else if ((this.wrapperRef1 && this.wrapperRef1.contains(event.target)) && !this.wrapperRef2) {
        	this.setState({ 
        		isOpen: true 
        	});
        }
        else if ((this.wrapperRef1 && this.wrapperRef1.contains(event.target)) && this.wrapperRef2) {
        	this.setState({ 
        		isOpen: false 
        	});
        }
        else if (this.wrapperRef2 && this.wrapperRef2.contains(event.target)) {
        	this.setState({ 
        		isOpen: true 
        	});
        }
        else if (this.wrapperRef2 && !this.wrapperRef2.contains(event.target)) {
        	this.setState({ 
        		isOpen: false 
        	});  
        }
	}

	onMouseOver(event) {
		if (this.state.holdOpen) {
			this.setState({
				isOpen: true
			})
		}
		else if (this.wrapperRef1 && this.wrapperRef1.contains(event.target)) {
			this.setState({
            	isOpen: true
            });
		}
		else if ((this.wrapperRef1 && this.wrapperRef2) && (this.wrapperRef1.contains(event.target) || this.wrapperRef2.contains(event.target))) {
			this.setState({
            	isOpen: true
            });
		}
		else if ((this.wrapperRef1 && this.wrapperRef2) && (!this.wrapperRef1.contains(event.target) && !this.wrapperRef2.contains(event.target))) {
			this.setState({
            	isOpen: false
            });
		}
		else if ((this.wrapperRef1  && !this.wrapperRef2) && (!this.wrapperRef1.contains(event.target))) {
			this.setState({
            	isOpen: false
            });
		}
	}

	onTouch(event) {
		if (this.state.touchMoved) {
			this.setState({
				isOpen: false
			})
		}
		else {
			if ((this.wrapperRef1 && this.wrapperRef1.contains(event.target)) && !this.wrapperRef2) {
				event.preventDefault();
	        	this.setState({ 
	        		isOpen: true 
	        	});
	        }
	        else if ((this.wrapperRef1 && this.wrapperRef1.contains(event.target)) && this.wrapperRef2) {
	        	this.setState({ 
	        		isOpen: false 
	        	});
	        	event.preventDefault();
	        }
	        else if (this.wrapperRef2 && this.wrapperRef2.contains(event.target)) {
	        	this.setState({ 
	        		isOpen: true 
	        	});
	        }
	        else if (this.wrapperRef2 && !this.wrapperRef2.contains(event.target)) {
	        	this.setState({ 
	        		isOpen: false 
	        	});  
	        }
		}
	}

	onTouchStart() {
		this.setState({
			touchMoved: false
		})
	}

	onMove() {
		if (this.wrapperRef2 && this.wrapperRef2.contains(event.target)) {
			this.setState({
				touchMoved: false
			})
		}
		else {
			this.setState({
				touchMoved: true
			})
		}
    }

	onResize(event) {
		if (this.props.windowWidth < 500) {
			document.removeEventListener('mouseover', this.onMouseOver);
			document.removeEventListener('touchstart', this.onClick);
			document.addEventListener('touchstart', this.onClick);
		}
		else {
			document.removeEventListener('touchstart', this.onClick);
			document.removeEventListener('mouseover', this.onMouseOver);
			document.addEventListener('mouseover', this.onMouseOver);
		}
	}

	closeFloatAffixed(event) {
		this.setState({
			isOpen: false,
			holdOpen: false
		})
	}

	setWrapperRef1(node) {
        this.wrapperRef1 = node;
    }

    setWrapperRef2(node) {
        this.wrapperRef2 = node;
    }

    componentDidMount() {
    	document.addEventListener('mousedown', this.onClick);
    	if (this.props.windowWidth > 500) {
    		document.addEventListener('mouseover', this.onMouseOver);
    	}
        else {
        	document.addEventListener('touchend', this.onTouch);
        	document.addEventListener('touchstart', this.onTouchStart);
        	document.addEventListener('touchmove', this.onMove);
        }
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
    	document.removeEventListener('mousedown', this.onClick);
    	if (this.props.windowWidth > 500) {
    		document.removeEventListener('mouseover', this.onMouseOver);
    	}
    	else {
    		document.removeEventListener('touchend', this.onTouch);
    		document.removeEventListener('touchstart', this.onTouchStart);
    		document.removeEventListener('touchmove', this.onMove);
    	}
    	window.removeEventListener("resize", this.onResize);
    }

    toggleCommentModal(e) {
        this.setState({
            isOpen: false,
	    	holdOpen: false
        })
        this.props.toggleCommentModal(this.props.word);
        e.preventDefault();
    }

    lightenColor(color, percent) {
	    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
	    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
	}

	render() {
		let etyInfo = this.props.data.map((data, i) => {
			return (
				<EtyInfo
					etymology={ (data.etymology != null) ? data.etymology : null }
					pos={ (data.pos != null) ? data.pos : null }
					crossreferences={ (data.crossreferences != null) ? data.crossreferences : null }
					quotes={ (data.quotes != null) ? data.quotes : null }
					years={ (data.years != null) ? data.years : null }
					category={ (data.category != null) ? data.category : null }
					wnetymology={ (data.wnetymology != null) ? data.wnetymology : null }
					etyword={ (data.etyword != null) ? data.etyword : null}
					key={ i }
					windowWidth={ this.props.windowWidth }
					contractionStem={ (this.props.contractionStems) ? this.props.contractionStems[i] : null }
					isContraction={ this.props.isContraction }
					toggleCommentModal={ this.toggleCommentModal }
				/>
			);
		});
		
	    return (
			<div 
			ref={this.setWrapperRef1}
			className='IndvWord'
			style={ (this.props.isWord) ? { backgroundColor: this.props.color, cursor: 'pointer', fontSize: this.props.fontSize } : { backgroundColor: 'black', color: 'white', height: 'auto', cursor: 'pointer', fontSize: this.props.fontSize  } } >
				{(this.props.word) ? this.props.word : null}
				{this.state.isOpen && this.props.isWord &&
		          <FloatAffixed>
		          	<div
			          	ref={this.setWrapperRef2}
			          	id="floatAffixed"
			          	style={{
			          		//width: (this.props.windowWidth <= 500) ? ((this.props.windowWidth)*.95 + "px") : "400px",
			          		width: (this.props.windowWidth <= 500) ? ((this.props.windowWidth) + "px") : "400px",
			          		height: 'auto',
			          		boxSizing: 'border-box',
			          		//marginLeft: (this.props.windowWidth < 500) ? (this.props.windowWidth*.025 - 4) : '0',
			          		//marginRight: '0',
			          		left: 0,
			          		right: 0,
			          		backgroundColor: this.lightenColor(this.props.color, .7),
			          		border: '4px solid white',
			          		boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
			          	}} >
			          	<h1 
			          	style={{
			          		marginLeft: '5px', 
			          		paddingTop: '5px', 
			          		textTransform: 'capitalize'
			          	}}>{ this.props.word }</h1>
			          	<span 
			          	className="rodal-close" 
			          	onClick={this.closeFloatAffixed}
			          	style={{
			          		color: 'black'
			          	}}/>
		          		<div
		          		style={{
		          			height: 'auto',
		          			overflow: 'scroll',
		          			maxHeight: '50vh'
		          		}}>
		          			{ etyInfo }
		          		</div>


		          		{!this.props.data[0].category ? 
		          			<div
		          				style={{
			          			padding: '2px',
			          			margin: '5px',
			          			textDecoration: 'underline',
			          			cursor: 'pointer'
			          			}}
			          			onClick={ this.toggleCommentModal }>
		          				<p 
		          				style={{
		          					marginTop: '0',
			          				marginBottom: '0'
		          				}}>
		          				Doesn't look like we have enough data on this word, send us a message if you do!</p>
		          			</div> 
		          		: null}

		          	</div>
		          </FloatAffixed>
		        }
			</div>
	      	
	    )
	}
}
export default IndvWord;