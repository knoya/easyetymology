import React, { Component } from 'react';
import Loader from 'react-loader';
import { Textfit } from 'react-textfit';
import Rodal from 'rodal';
import FontAwesome from 'react-fontawesome';

import Header from './Header';
import JumbotronWrap from './JumbotronWrap';
import InputWrap from './InputWrap';
import Footer from './Footer';
import AboutPane from './AboutPane';
import SettingsPane from './SettingsPane';
import CommentModal from './CommentModal';

import './normalize.css';
import './style.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './rodal.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      data: null,
      windowWidth: '',
      windowHeight: '',
      loaded: false,
      submit: false,
      germanicColor: (window.localStorage.getItem('etym_germanicColor') || '#e91e63'),
      latinColor: (window.localStorage.getItem('etym_latinColor') || '#ffc107'),
      greekColor: (window.localStorage.getItem('etym_greekColor') || '#3f51b5'),
      frenchColor: (window.localStorage.getItem('etym_frenchColor') || '#4caf50'),
      otherColor: (window.localStorage.getItem('etym_otherColor') || '#795548'),
      unknownColor: (window.localStorage.getItem('etym_unknownColor') || '#9e9e9e'),
      germanicCount: '',
      latinCount: '',
      greekCount: '',
      frenchCount: '',
      otherCount: '',
      unknownCount: '',
      displayChart: false,
      titleFontSize: '',
      rodalVisible: false,
      isSettingsOpen: false,
      isAboutOpen: false,
      commentModal: false
    };
    this.submitWords = this.submitWords.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.resetColors = this.resetColors.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.submitChecker = this.submitChecker.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.setTitleFontSize = this.setTitleFontSize.bind(this);
    this.toggleRodal = this.toggleRodal.bind(this);
    this.toggleSettingsPane = this.toggleSettingsPane.bind(this);
    this.toggleAboutPane = this.toggleAboutPane.bind(this);
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
  }

  submitWords(words) {
    if (words == '') {
      return null;
    }
    if (this.submitChecker(words)) {
      this.setState({
        submit: true,
        loaded: false
      })
      let text = {"text": words};
      return fetch('http://kristiannoya.com/etymapi', {
      //return fetch('http://localhost:4000/etymology/api', {
        method: 'POST',
        body: JSON.stringify(text),
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
          }
        })
      .then((res) => {
        return res.json()
      })
      .then((resjson) => {
        this.updateChart(resjson);
        this.setState({ 
          data: resjson,
          loaded: true,
          displayChart: true
        });
      })
      .catch(function(err) {
          console.log(err);
      });
    }
    else {
      this.setState({
        rodalVisible: true
      })
    }
    
  }

  submitChecker(words) {
    let splitWordsLen = words.split(/[\s]/g).length;
    if (splitWordsLen <= 200) {
      return true;
    }
    else {
      return false;
    }
  }

  updateDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }

  changeColor(color, label) {
    if (label === 'Germanic') {
      this.setState({
        germanicColor: color
      })
      window.localStorage.setItem('etym_germanicColor', color);
    }  
    if (label === 'Latin') {
      this.setState({
        latinColor: color
      })
      window.localStorage.setItem('etym_latinColor', color);
    } 
    if (label === 'French') {
      this.setState({
        frenchColor: color
      })
      window.localStorage.setItem('etym_frenchColor', color);
    } 
    if (label === 'Greek') {
      this.setState({
        greekColor: color
      })
      window.localStorage.setItem('etym_greekColor', color);
    } 
    if (label === 'Other') {
      this.setState({
        otherColor: color
      })
      window.localStorage.setItem('etym_otherColor', color);
    }    
    if (label === 'Unknown') {
      this.setState({
        unknownColor: color
      })
      window.localStorage.setItem('etym_unknownColor', color);
    } 
  }

  resetColors() {
    this.setState({ 
      germanicColor: '#e91e63',
      latinColor: '#ffc107',
      greekColor: '#3f51b5',
      frenchColor: '#4caf50',
      otherColor: '#795548',
      unknownColor: '#9e9e9e' 
    })
    window.localStorage.setItem('etym_germanicColor', '#e91e63');
    window.localStorage.setItem('etym_latinColor', '#ffc107');
    window.localStorage.setItem('etym_greekColor', '#3f51b5');
    window.localStorage.setItem('etym_frenchColor', '#4caf50');
    window.localStorage.setItem('etym_otherColor', '#795548');
    window.localStorage.setItem('etym_unknownColor', '#9e9e9e');
  }

  updateChart(arr) {
    let germanicCount = 0;
    let latinCount = 0;
    let greekCount = 0;
    let frenchCount = 0;
    let otherCount = 0;
    let unknownCount = 0;
    for (let i=0; i<arr.length; i++) {
      if (!arr[i].isWord) { //don't bother to count non-words
        continue;
      }
      switch (arr[i].data[0].category) {
        case "Germanic":
          germanicCount++
          break;
        case "Latin":
          latinCount++
          break;
        case "French":
          frenchCount++
          break;
        case "Greek":
          greekCount++
          break;
        case "Other":
          otherCount++
          break;
        case undefined:
        case null:
        case "":
        default:
          unknownCount++
          break;
      }
    }
    this.setState({
      germanicCount: germanicCount,
      latinCount: latinCount,
      greekCount: greekCount,
      frenchCount: frenchCount,
      otherCount: otherCount,
      unknownCount: unknownCount
    })
  }

  submitComment(obj) {
    return fetch('http://kristiannoya.com/etymapi/comments', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        }
      })
    .then((res) => {
      return res.json()
    })
  }

  toggleRodal() {
    this.setState({
      rodalVisible: !this.state.rodalVisible
    })
  }

  setTitleFontSize() {
    var getEl = document.getElementById('getTitle');
    var style = window.getComputedStyle(getEl, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style); 
    document.getElementById('setTitle').style.fontSize= fontSize+'px';
  }



  toggleSettingsPane() {
    this.setState({
      isSettingsOpen: !this.state.isSettingsOpen
    })
  }

  toggleAboutPane() {
    this.setState({
      isAboutOpen: !this.state.isAboutOpen
    })
  }

  toggleCommentModal() {
    this.setState({
      //word: word,
      commentModal: !this.state.commentModal
    })
  }


  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className='app'>
        <Header isOpen={this.state.submit}/>
        <div className="loadJumbo" style={{minHeight: '40%', maxHeight: '85%', overflow: "scroll"}}>

          {!this.state.submit && 
            <div
            style={{
              marginTop: (this.state.windowWidth <= 500) ? '20%' : '3%'
            }}>
              <div
              style={{
                backgroundColor: '#1e1e1e',
                marginLeft: (this.state.windowWidth <= 500) ? '2%' : '10%', 
                marginRight: (this.state.windowWidth <= 500) ? '2%' : '10%',
                display: 'inline-block',
                padding: '4px'
              }}>
                <span 
                className="linear-wipe" 
                id="setTitle"
                style={{
                  textAlign: 'center'
                }}>Easy</span>
              </div>
              <div
              style={{
                backgroundColor: '#1e1e1e',
                marginLeft: (this.state.windowWidth <= 500) ? '2%' : '10%', 
                marginRight: (this.state.windowWidth <= 500) ? '2%' : '10%',
                marginTop: '4px',
                padding: '4px'
              }}>
                <Textfit 
                max={300} 
                mode="single" 
                onReady={this.setTitleFontSize}
                className="linear-wipe" 
                id="getTitle"
                style={{
                  textAlign: 'center'
                }}><span>Etymology</span></Textfit>
              </div>
              <div 
              style={{
                paddingBottom: (this.state.windowWidth <= 500) ? '12%' : '0'
              }}>
              </div>
            </div>}

          {this.state.submit && 
            <Loader contentLabel="Modal" loaded={this.state.loaded} top="25%" left="50%" scale={1.50}>
              <JumbotronWrap 
                data={ this.state.data } 
                windowWidth={ this.state.windowWidth }
                windowHeight={ this.state.windowHeight }
                germanicColor={ this.state.germanicColor }
                latinColor={ this.state.latinColor }
                frenchColor={ this.state.frenchColor }
                greekColor={ this.state.greekColor }
                otherColor={ this.state.otherColor }
                unknownColor={ this.state.unknownColor }
                toggleCommentModal={ this.toggleCommentModal }
                />
            </Loader>
          }
        </div>
        <InputWrap 
            submitWords={ this.submitWords }
            windowWidth={ this.state.windowWidth }
            />
        <Footer
          toggleSettingsPane={ this.toggleSettingsPane }
          toggleAboutPane={ this.toggleAboutPane }
          windowWidth={ this.state.windowWidth }  
        />
        <SettingsPane
          isSettingsOpen={ this.state.isSettingsOpen }
          toggleSettingsPane={ this.toggleSettingsPane }
          changeColor={ this.changeColor }
          resetColors={ this.resetColors }
          germanicColor={ this.state.germanicColor }
          latinColor={ this.state.latinColor }
          frenchColor={ this.state.frenchColor }
          greekColor={ this.state.greekColor }
          otherColor={ this.state.otherColor }
          unknownColor={ this.state.unknownColor }
          windowWidth={ this.state.windowWidth }
          windowHeight={ this.state.windowHeight }
        />
        <AboutPane
          isAboutOpen={ this.state.isAboutOpen }
          toggleCommentModal={ this.toggleCommentModal }
          toggleAboutPane={ this.toggleAboutPane }
          germanicColor={ this.state.germanicColor }
          latinColor={ this.state.latinColor }
          frenchColor={ this.state.frenchColor }
          greekColor={ this.state.greekColor }
          otherColor={ this.state.otherColor }
          unknownColor={ this.state.unknownColor }
          windowWidth={ this.state.windowWidth }
          germanicCount={ this.state.germanicCount}
          latinCount={ this.state.latinCount}
          greekCount={ this.state.greekCount}
          frenchCount={ this.state.frenchCount}
          otherCount={ this.state.otherCount}
          unknownCount={ this.state.unknownCount }
          displayChart={ this.state.displayChart }
        />
        <Rodal 
        visible={this.state.rodalVisible} 
        onClose={this.toggleRodal} 
        animation='slideUp' 
        customStyles={{
          marginLeft: (this.state.windowWidth <= 500) ? '2%' : null,
          marginRight: (this.state.windowWidth <= 500) ? '2%' : null,
          width: (this.state.windowWidth <= 500) ? 'auto' : '400px'
        }}>
            <div style={{width: '100%', height: '100%', position: 'relative'}}><h1 style={{fontWeight: '400'}}>Too long!</h1><p style={{fontSize: '20px', fontWeight: '200'}}>Submissions are capped at 200 words - try breaking your text up into smaller blocks and submitting them individually.</p><h2 style={{position: 'absolute', right: '0', bottom: '0', marginRight: '10%', marginBottom: '10%', fontWeight: '300'}}>Thanks!</h2></div>
        </Rodal>
        <CommentModal
          isOpen={ this.state.commentModal }
          submitComment={ this.submitComment }
          toggleCommentModal={ this.toggleCommentModal }
          windowWidth={ this.state.windowWidth }
          windowHeight={ this.state.windowHeight }
        />
        <FontAwesome //preloaded icons
          name='rocket'
          style={{ 
              display: 'hidden',
              width: 0,
              height: 0
           }}
        />
        <FontAwesome //preloaded icons
          name='check'
          style={{ 
            display: 'hidden',
            width: 0,
            height: 0
           }}
        />
      </div>
    );
  }
}

export default App;