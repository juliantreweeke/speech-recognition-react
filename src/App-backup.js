import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

let user = 'reeri';
let recognition;
let welcome = `Welcome ${user} to your shopping list app`;
let welcomesplit = welcome.split(' ');
let filter = [...welcomesplit,'start','stop'];




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      words: [''],
      final: [''],
      recording: false,
      shoppinglist: [''],
      counter: 0
    };
    this.sortwords = this.sortwords.bind(this);
    this.speak = this.speak.bind(this);
    this.erase = this.erase.bind(this);

  }
  

  componentDidMount() {
    // start webkitSpeechRecognition API and check for browser support

    this.speak(welcome);

    try {

      let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-GB";
      recognition.start();


      recognition.onresult = (event) => {
        let final_transcript = '';
        let interim_transcript = '';
        let index = event.resultIndex;

        for (let i = index; i < event.results.length; ++i) {
          
          let transcript = event.results[i][0].transcript;


          this.setState({
            counter: this.state.counter + 1});


          if (event.results[i].isFinal) {
            final_transcript += transcript;
            this.setState({final: final_transcript})

          } else {
            
            
            
            interim_transcript += transcript;
            
            this.sortwords(interim_transcript);
            
            // interim_transcript = interim_transcript.replace(/ *\b\S*?start\S*\b/g, '');
        
            
            filter.map( (word) => {
            
              var reg = new RegExp(word, "g");
              interim_transcript = interim_transcript.replace(reg, "");
            
            })
            
            
            
            
            
            
            
  
            
            
            
            this.state.recording ? this.setState({words: interim_transcript}) : null;

          }
        }
        // console.log(interim_transcript,final_transcript);
      };

    } catch (e) {
      console.error(e);
      alert('This app only works in chrome!! Its googles fault not mine haha')
    }

  }

  speak(message) {
    var speech = new SpeechSynthesisUtterance();

    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 0.8;
    speech.pitch = -2;
    window.speechSynthesis.speak(speech);

  }

  sortwords(word) {

    word.indexOf("start") >= 0 ? (console.log('started'),this.setState({recording: true}) ): null;

    word.indexOf("stop") >= 0 ? this.setState({recording: false}) : null;
    
    // filter.map( (text) => {
    // 
    //   var reg = new RegExp(text, "g");
    //   word = word.replace(reg, "");
    // 
    // })
    // 
    // return word;
    
      
    
    
    // this.erase(word,"start");

  }
  
  erase(word,target){
    console.log("erase started");
    word = word.replace(/ *\b\S*?start\S*\b/g, '');
    word = word.replace(/ *\b\S*?frog\S*\b/g, 'working');
    console.log('word', word);
    return word;
  }



  render() {

    let words = this.state.words;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shopping List App</h1>
        </header>
        <p className="App-intro">
          START - Start recording. STOP - Stop Recording.
        </p>

        <h1>{this.state.words}</h1>
        {this.state.final}
        {this.state.counter}


        {this.state.recording
          ? <div>recording</div>
          : <div>not recording</div>}

        <button onClick={() => {
          this.speak(this.state.words)
        }}>READ ALL</button>
      </div>
    );
  }
}

export default App;

// {this.state.words.map((word,i) => {
//       return <div key={i}>
//           <h2>{word}</h2>
//           </div>
//     })}
