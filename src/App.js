import React, { Component } from 'react';
import Loader from 'react-loader';
import Header from './Header';
import JumbotronWrap from './JumbotronWrap';
import InputWrap from './InputWrap';
import Footer from './Footer';
import StatsWrap from './StatsWrap';
import './normalize.css';
import './style.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      data: null,
      windowWidth: '',
      windowHeight: '',
      loaded: false,
      submit: false
    };
    this.submitWords = this.submitWords.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  submitWords(words) {
    this.setState({
      submit: true,
      loaded: false
    })
    let text = {"text": words};
    return fetch('http://localhost:4000/etymology/api', {
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
      this.setState({ 
        data: resjson,
        loaded: true
      });
    });
  }

  updateDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
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
        <Header />
        <div className="loadJumbo" style={{minHeight: '40%', maxHeight: '85%', overflow: "scroll"}}>
          {this.state.submit && 
            <Loader loaded={this.state.loaded} top="30%" scale={1.50}>
              <JumbotronWrap 
                data={ this.state.data } 
                windowWidth={ this.state.windowWidth }
                />
            </Loader>}
        </div>
        <InputWrap 
          submitWords={ this.submitWords }
          windowWidth={ this.state.windowWidth }
          />
        <Footer />
        {/*<StatsWrap data={ this.state.data } />*/}
      </div>
    );
  }
}

export default App;
