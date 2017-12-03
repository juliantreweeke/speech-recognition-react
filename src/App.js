import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

let user = 'reeri';
let email = 'juliantreweeke@gmail.com'
let recognition;
let welcome = `Welcome ${user} to your shopping list app. Say, menu, to hear list of voice commands.`;
let commands = 'Start! Start recording shopping list. \
                Stop! Stop the recording. \
                Reed! Reed out shopping list. \
                Send! Send the shopping list by email.'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      words: [],
      final: [''],
      recording: false,
      shoppinglist: [''],
      counter: 0
    };

    this.menu = this.menu.bind(this);
    this.speak = this.speak.bind(this);
    this.erase = this.erase.bind(this);
    this.send = this.send.bind(this);

  }


  componentDidMount() {
    // start webkitSpeechRecognition API and check for browser support
    this.speak(welcome,5000);
    // this.speak(welcome);
    // this.menu();


    }

 menu() {
     console.log('menu started');


     try {

       let menu_recognition = new SpeechRecognition();
       menu_recognition.continuous = true;
       menu_recognition.interimResults = true;
       menu_recognition.lang = "en-GB";
       menu_recognition.start();


       menu_recognition.onresult = (event) => {
         let final_transcript = '';
         let interim_transcript = '';

         for (let i = event.resultIndex; i < event.results.length; ++i) {

           let transcript = event.results[i][0].transcript;


           if (event.results[i].isFinal) {

           } else {


             interim_transcript += transcript;

             interim_transcript.indexOf("test") >= 0 ? console.log('working'): null;

             interim_transcript.indexOf("start") >= 0 ? (console.log('started'),this.setState({recording: true}) , menu_recognition.stop(), this.dictate() ): null;

             interim_transcript.indexOf("read") >= 0 ? (console.log('reading'), menu_recognition.stop(), this.speak(this.state.words,3000) ): null;

             interim_transcript.indexOf("menu") >= 0 ? (console.log('reading menu'), menu_recognition.stop(), this.speak(commands,12000) ): null;

             interim_transcript.indexOf("send") >= 0 ? (console.log('reading menu'), menu_recognition.stop(), this.send(email) ): null;


           }
         }

       };

     } catch (e) {
       console.error(e);
       alert('This app only works in chrome!! Its googles fault not mine haha')
     }

   }

   dictate() {
     console.log('dictate started');

     let dictate_recognition = new SpeechRecognition();
     dictate_recognition.continuous = true;
     dictate_recognition.interimResults = true;
     dictate_recognition.lang = "en-GB";
     dictate_recognition.start();


     dictate_recognition.onresult = (event) => {
       let final_transcript = '';
       let interim_transcript = '';

       for (let i = event.resultIndex; i < event.results.length; ++i) {

         let transcript = event.results[i][0].transcript;


         if (event.results[i].isFinal) {

         } else {


           interim_transcript += transcript;

           interim_transcript.indexOf("stop") >= 0 ? (console.log('stopped'),this.setState({recording: false}) , dictate_recognition.stop(), this.menu() ): null;
           interim_transcript = interim_transcript.replace(/ *\b\S*?stop\S*\b/g, '');
           this.setState({words: interim_transcript});

         }
       }

     };


   }


   // read() {
   //
   // }



  speak(message,time) {
    var speech = new SpeechSynthesisUtterance();

    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 0.8;
    speech.pitch = -2;
    window.speechSynthesis.speak(speech);

    setTimeout( () => { this.menu() }, time);

  }

  send(email) {
    if (this.state.words.length < 1){

      this.speak("Cannot send. Shopping list is empty. Say start to make one.",5000);
      return;
    }
    this.speak(`Sending your shopping list as an email. Thank you ${user}`,4000);

  }




  //   speak(message, callback) {
  //     return new Promise(function (resolve, reject){
  //
  //       var speech = new SpeechSynthesisUtterance();
  //
  //       // Set the text and voice attributes.
  //       speech.text = message;
  //       speech.volume = 1;
  //       speech.rate = 0.8;
  //       speech.pitch = -2;
  //       window.speechSynthesis.speak(speech);
  //
  //         resolve( () =>{ callback() } ); //if the action succeeded
  //         reject( console.log('didnot work')); //if the action did not succeed
  //     });
  // }











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
