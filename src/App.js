import React, {Component} from 'react';
import './App.css';

class App extends Component {

  state;

  constructor(props) {
    super(props);
    this.state = {
      conversation: '',
      inputValue: '',
      sender: 'user',
      color: '#61dafb'
    }
    this.textArea = React.createRef();
  }

  sendMessage(app) {
    if ((app.keyCode === 13) || (app.target.id === "send")) {
      var input = this.state.conversation + "👤 You: " + this.state.inputValue + "\n\n";
      var current_input = this.state.inputValue;
      this.setState({conversation: input});
      this.setState({inputValue: ""});
      this.scrollDown();
      console.log(`User typed: ${ input }`);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      fetch('http://localhost:5000/api', {
        method: "post",
        headers: headers,
        body: JSON.stringify({
          userId: "12345",
          userQuery: current_input
        })
      }).then(function(res) {
        return res.json();
      }).then((data) => {
        input = this.state.conversation + "🤖 Bot: " + data.response + "\n\n";
        this.setState({conversation: input});
        this.scrollDown();
      })
    } 
  }

  scrollDown(app) {
    console.log("I would like to scroll down!");
    this.refs.textArea.scrollTop = this.refs.textArea.scrollHeight;
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
    // console.log(this.state.inputValue);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-chat">
            <h1>Chat Bot</h1>
            <textarea ref="textArea" value={this.state.conversation} className="App-textfield"></textarea><br></br>
            <input value={this.state.inputValue} onKeyDown={app => this.sendMessage(app)} onChange={evt => this.updateInputValue(evt)} className="App-input"></input><br></br>
            <button id="send" className="App-send" onClick={app => this.sendMessage(app)}>Send</button>
          </div>
        </header>
      </div>
    );
  }
  
}

export default App;
