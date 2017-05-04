import React, { Component } from 'react';
import FloatAffixed from 'react-float-affixed';
import './normalize.css';
import './style.css';

class IndvWord extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: [],
	    	isOpen: false,
	    	holdOpen: false
	    };
	    this.onClick = this.onClick.bind(this);
	    this.onTouch = this.onTouch.bind(this);
	    this.onMouseOver = this.onMouseOver.bind(this);
	    this.onResize = this.onResize.bind(this);
	    this.colorPicker = this.colorPicker.bind(this);
	    this.setWrapperRef1 = this.setWrapperRef1.bind(this); 
	    this.setWrapperRef2 = this.setWrapperRef2.bind(this);
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
		if ((this.wrapperRef1 && this.wrapperRef1.contains(event.target)) && !this.wrapperRef2) {
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

	colorPicker() {
		var color;
		switch (this.props.category) {
		    case "Germanic":
		        color = "red";
		        break;
		    case "French":
		    	color = "blue";
		    	break;
		    case "Latin":
		    	color = "orange";
		    	break;
		    case "Greek":
		    	color = "yellow";
		    	break;
		    default:
		        color = "gray";
		}
		return color;
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
    	}
    	window.removeEventListener("resize", this.onResize);
    }

	render() {
	    return (
			<div 
			ref={this.setWrapperRef1}
			className='IndvWord'
			style={ (this.props.isWord) ? { backgroundColor: this.colorPicker() } : { backgroundColor: 'black', color: 'white', height: 'auto' } } >
				{(this.props.word) ? this.props.word : null}
				{this.state.isOpen && this.props.isWord &&
		          <FloatAffixed>
		          	<div 
		          	ref={this.setWrapperRef2}
		          	id="floatAffixed"
		          	style={{
		          		width: (this.props.windowWidth < 500) ? ((this.props.windowWidth)*.95 + "px") : "400px",
		          		height: 'auto',
		          		maxHeight: (window.innerHeight*.7),
		          		marginLeft: this.props.windowWidth*.025,
		          		marginRight: this.props.windowWidth*.025,
		          		backgroundColor: 'white',
		          		border: '1px solid black',
		          		borderRadius: '5px'}}>
		          		<div
		          		style={{maxHeight: (window.innerHeight*.1), padding: '2px' }}>
		          			<h2 className="capitalize">{this.props.strippedWord}</h2>
		          		</div>
		          		<div
		          		style={{maxHeight: (window.innerHeight*.1), padding: '2px'}}>
		          			<h3>{this.props.category}</h3>
		          		</div>
		          		<div
		          		style={{
		          			height: 'auto', 
		          			maxHeight: (window.innerHeight*.5), 
		          			padding: '2px', 
		          			overflow: 'scroll'}}>
		          			<p>{this.props.etymology}</p>
		          		</div>
		          	</div>
		          </FloatAffixed>
		        }
			</div>
	      	
	    )
	}
}
export default IndvWord;