import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Loader from 'react-loader';

import Rodal from 'rodal';
import './rodal.css';

class CommentModal extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
            email: '',
            word: this.props.word ? this.props.word : '',
            comments: '',
            source: '',
            addChecked: false,
            changeChecked: false,
            otherChecked: false,
            radio: '',
            modalHeight: '',
            commentSubmit: false,
            confirmScreen: false,
            errorMessage: false,
            commentScreen: true,
            commentModalHeight: '',

            radioAlert: false,
      		missingWordAlert: false,
      		missingCommentsAlert: false
	    };
	    this.changeEmail = this.changeEmail.bind(this);
        this.changeWord = this.changeWord.bind(this);
        this.changeComments = this.changeComments.bind(this);
        this.changeSource = this.changeSource.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.setRadio = this.setRadio.bind(this);
        this.getModalHeight = this.getModalHeight.bind(this);
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.verifyComment = this.verifyComment.bind(this);
	}

	changeEmail(e) {
        this.setState({ 
            email: e.target.value 
        });
    }

    changeWord(e) {
        this.setState({ 
            word: e.target.value 
        });
    }

    changeComments(e) {
        this.setState({ 
            comments: e.target.value 
        });
    }

    changeSource(e) {
        this.setState({ 
            source: e.target.value 
        });
    }

    setRadio(e) {
    	if (e.target.value == 'add') {
    		this.setState({
    			radio: 'add',
    			addChecked: true,
    			changeChecked: false,
    			otherChecked: false
    		})
    	}
    	if (e.target.value == 'change') {
    		this.setState({
    			radio: 'change',
    			addChecked: false,
    			changeChecked: true,
    			otherChecked: false
    		})
    	}
    	if (e.target.value == 'other') {
    		this.setState({
    			radio: 'other',
    			addChecked: false,
    			changeChecked: false,
    			otherChecked: true
    		})
    	}
    }

    submitForm(e) {
    	let obj = {
            'email': this.state.email,
            'word': this.state.word,
            'comments': this.state.comments,
            'source': this.state.source,
            'radio': this.state.radio
        }
    	e.preventDefault();
    	if (this.verifyComment(obj)) {
    		this.setState({
	    		commentSubmit: true,
	    		radioAlert: false,
      			missingWordAlert: false,
      			missingCommentsAlert: false
	    	})
	        this.props.submitComment(obj)
	        .then(() => {
	        	this.setState({
	        		commentSubmit: false,
	        		confirmScreen: true,
	        		commentScreen: false,
	        		errorMessage: false,
	        		email: '',
		            word: '',
		            comments: '',
		            source: '',
		            radio: '',
		            addChecked: false,
		            changeChecked: false,
		            otherChecked: false
	        	})
	        	this.props.isOpen ? setTimeout(this.toggleCommentModal, 500) : null;
	        })
	        .catch((err) => {
		        this.setState({
		        	commentSubmit: false,
	        		confirmScreen: false,
	        		commentScreen: true,
	        		errorMessage: true
	        	})
		    });
    	}
    	else {
    		this.setState({
    			commentSubmit: false
    		})
    	}
    	
    }

	verifyComment(obj) {
		console.log("obj: " + JSON.stringify(obj, null, 2));
	    if (obj.radio == '') {
	      	this.setState({
	        	radioAlert: true,
	        	missingWordAlert: false,
	        	missingCommentsAlert: false
			})
			return false;
	    }
	    if ((obj.radio == 'change' || obj.radio == 'add') && obj.word == '') {
			this.setState({
				radioAlert: false,
				missingWordAlert: true,
				missingCommentsAlert: false
			})
			return false;
	    }
	    if ((obj.radio == 'change' || obj.radio == 'add') && obj.comments == '') {
			this.setState({
				radioAlert: false,
				missingWordAlert: false,
				missingCommentsAlert: true
			})
			return false;
	    }
	    if (obj.radio == 'other' && obj.comments == '') {
			this.setState({
				radioAlert: false,
				missingWordAlert: false,
				missingCommentsAlert: true
			})
			return false;
	    }
	    return true;
	}

    getModalHeight() {
    	if (document.getElementById('comment_Modal') && document.getElementById('comment_Modal').clientHeight > 0) {
    		this.setState({
    			commentModalHeight: document.getElementById('comment_Modal').clientHeight
    		})
    	}
    }

    toggleCommentModal() {
    	this.props.toggleCommentModal();
    	setTimeout(() => {
    		this.setState({
    			commentScreen: true,
    			commentSubmit: false,
    			confirmScreen: false,
    			errorMessage: false,
    			radioAlert: false,
      			missingWordAlert: false,
      			missingCommentsAlert: false,
      			email: '',
	            word: '',
	            comments: '',
	            source: '',
	            addChecked: false,
	            changeChecked: false,
	            otherChecked: false,
	            radio: ''
    		})
    	}, 1000)
    }

	render() {
	    return (
	        <div className='CommentModal'>
					<Rodal 
						visible={this.props.isOpen}
	                    ref="mymodal"
	                    contentLabel="Modal"
	                    onClose={this.toggleCommentModal}
	                    animation="slideDown"
	                    closeMaskOnClick={false}
	                    duration={(!this.props.isOpen && this.state.confirmScreen) ? 500 : 300}
	                    onAnimationEnd={this.getModalHeight}
	                    customStyles={{
	                    	height: 'auto',
	                    	marginLeft: (this.props.windowWidth <= 500) ? '2%' : 'auto',
	                    	marginRight: (this.props.windowWidth <= 500) ? '2%' : 'auto',
	                    	width: (this.props.windowWidth <= 500) ? 'auto' : '400px',
	                    	padding: (this.props.windowWidth <=500) ? null : "15px 30px",
	                    	bottom: 'auto',
	                    	top: '50%',
	                    	transform: 'translateY(-50%)',
	                    	WebkitTransform: 'translateY(-50%)',
	                    	msTransform: 'translateY(-50%)'
	                    }} >

	                    {(this.state.confirmScreen) ? 
	                    	<div
	                    	style={{
	                    		height: this.state.commentModalHeight,
	                    		width: '100%'
	                    	}}>
	                    		<div
	                    		style={{
	                    			height: 'auto',
	                    			width: '100%',
	                    			textAlign: 'center',
	                    			position: 'relative',
	                    			bottom: 'auto',
			                    	top: '50%',
			                    	transform: 'translateY(-50%)',
			                    	webkitTransform: 'translateY(-50%)',
			                    	msTransform: 'translateY(-50%)'
	                    		}}>
			                    	<FontAwesome
								        name='check'
								        size='5x'
								        style={{ 
								        	textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
								        	color: '#00CDAC'
								         }}
							        />
							        <span
							        style={{
							        	color: '#666',
							        	fontSize: '3rem',
							        	display: 'block'
							        }}
							        >Thanks!</span>
							    </div>
	                    	</div>
	                    : null}

	                    {(this.state.commentScreen) ? <form
	                        onSubmit={ this.submitForm }
	                        style={{
	                        	padding: '2%'
	                        }}
	                        id="comment_Modal"
	                    >
	                        <span style={{fontWeight:'400'}}>Email: </span>
	                        <input
	                            style={{
	                                width: '100%',
	                                fontWeight: '300'
	                            }}
	                            onChange={ this.changeEmail }
	                            value={ this.state.email }
	                            placeholder="Enter Email (not required): " 
	                        >
	                        </input>
	                        <hr
	                        style={{
	                        	width: '96%',
	                        	borderWidth: '1px',
	                        	borderColor: '#fff',
	                        	marginTop: '10px',
	                        	marginBottom: '10px'
	                        }}/>
	                        <span style={{fontWeight:'400'}}>Do you want to: </span>
	                        <br/>
	                        <input 
	                        	type="radio" 
	                        	name="comment" 
	                        	value="add" 
	                        	checked={ this.state.addChecked }
	                        	onClick={ this.setRadio }
	                        	style={{
	                        		marginTop: '10px'
	                        	}}
	                        /> <span style={{fontWeight: 'lighter'}}>Add word</span>
	                        <br/>
							<input 
								type="radio" 
								name="comment" 
								value="change" 
								checked={ this.state.changeChecked }
								onClick={ this.setRadio }
	                        	style={{
	                        		marginTop: '10px'
	                        	}}
							/> <span style={{fontWeight: 'lighter'}}>Change word</span>
							<br/>
							<input 
								type="radio" 
								name="comment" 
								value="other" 
								checked={ this.state.otherChecked }
								onClick={ this.setRadio }
	                        	style={{
	                        		marginTop: '10px'
	                        	}}
							/> <span style={{fontWeight: 'lighter'}}>Other comment</span>
							<hr
	                        style={{
	                        	width: '96%',
	                        	borderWidth: '1px',
	                        	borderColor: '#fff',
	                        	marginTop: '10px',
	                        	marginBottom: '10px'
	                        }}/>
	                        <span 
	                        style={{
	                        	fontWeight:'400'
	                        }}>Word: </span>
	                        <br/>
	                        <input
	                            style={{
	                                width: '100%',
	                                marginTop: '2px',
	                                fontWeight: '300',
	                                marginBottom: '10px'
	                            }}
	                            onChange={ this.changeWord }
	                            value={ this.state.word }
	                            placeholder="What word are you writing in about?" >
	                        </input>
	                        <br
	                        style={{
	                        	marginBottom: '10px'
	                        }}/>
	                        <span style={{fontWeight:'400'}}>More/Comment: </span>
	                        <br/>
	                        <textarea
	                            style={{
	                                height: '3em',
	                                width: '100%',
	                                resize: 'none',
	                                marginTop: '2px',
	                                fontWeight: '300'
	                            }}
	                            onChange={ this.changeComments }
	                            value={ this.state.comments }
	                            placeholder="How does it need to be updated?" >
	                        </textarea>
	                        <br
	                        style={{
	                        	marginBottom: '10px'
	                        }}/>
	                        <span style={{fontWeight:'400'}}>Source URL/Citation: </span>
	                        <br/>
	                        <input
	                            style={{
	                                width: '100%',
	                                marginTop: '2px',
	                                fontWeight: '300'
	                            }}
	                            onChange={ this.changeSource }
	                            value={ this.state.source }
	                            placeholder="Please provide a source or citation if you have it" >
	                            
	                        </input>
	                        
	                        <br/>
	                        <br/>
	                        <button
	                            onClick={ this.submitForm }
	                            type='submit'
	                            style={{
	                            	padding: '5px',
	                            	borderRadius: '3px',
	                            	borderBottomWidth: '1px',
	                            	borderRightWidth: '1px',
	                            	borderTopWidth: '0',
	                            	borderLeftWidth: '0', 
	                            	backgroundColor: '#F0F0F0'
	                            }} >
	                            Submit
	                        </button>
	                        <button
	                            onClick={ this.toggleCommentModal }
	                            type='button'
	                            style={{
	                            	padding: '5px',
	                            	borderRadius: '3px',
	                            	borderBottomWidth: '1px',
	                            	borderRightWidth: '1px',
	                            	borderTopWidth: '0',
	                            	borderLeftWidth: '0', 
	                            	backgroundColor: '#F0F0F0'
	                            }} >
	                            Cancel
	                        </button>
	                        <div
	                        style={{
	                        	height: '30px',
	                        	position: 'relative',
	                        	width: '100%'
	                        }}>
		                        {(this.state.errorMessage) ? 
			                    	<span
			                    	style={{
			                    		position: 'absolute',
			                    		display: 'block',
			                    		color: 'red',
			                    		width: '100%',
			                    		textAlign: 'center',
			                    		marginTop: '5px',
			                    		marginBototm: '0'
			                    	}}
			                    	>An error occurred, please try again</span>
			                    : null}
			                    {(this.state.radioAlert) ? 
			                    	<span
			                    	style={{
			                    		position: 'absolute',
			                    		display: 'block',
			                    		color: 'red',
			                    		width: '100%',
			                    		textAlign: 'center',
			                    		marginTop: '5px',
			                    		marginBototm: '0'
			                    	}}
			                    	>Please select one of the message options above</span>
			                    : null}
			                    {(this.state.missingWordAlert) ? 
			                    	<span
			                    	style={{
			                    		position: 'absolute',
			                    		display: 'block',
			                    		color: 'red',
			                    		width: '100%',
			                    		textAlign: 'center',
			                    		marginTop: '5px',
			                    		marginBototm: '0'
			                    	}}
			                    	>You forgot the word!</span>
			                    : null}
			                    {(this.state.missingCommentsAlert) ? 
			                    	<span
			                    	style={{
			                    		position: 'absolute',
			                    		display: 'block',
			                    		color: 'red',
			                    		width: '100%',
			                    		textAlign: 'center',
			                    		marginTop: '5px',
			                    		marginBototm: '0'
			                    	}}
			                    	>You forgot to add a comment!</span>
			                    : null}
			                </div>
	                        {this.state.commentSubmit ? 
	                        	<Loader loaded={false} color="#000" scale={1.50}>
	                    		</Loader>
	                    	: null}
	                    </form>
	                    : null}
	                    
	                </Rodal>

            </div>
        );
	}
}
export default CommentModal;