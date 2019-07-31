import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conversation: '',
      inputValue: '',
      sender: 'user',
      color: '#61dafb'
    }
  }

  sendMessage(app) {
    var input = this.state.conversation + this.state.inputValue + "\n\n";
    if (app.keyCode === 13) {
      this.setState({conversation: input});
      console.log(`User typed: ${ input }`);
      // app.text
    } else if (app.target.id === "send") {
      this.setState({conversation: input});
      console.log(`User typed: ${ this.state.inputValue }`);
    }
    
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
            <textarea value={this.state.conversation} className="App-textfield"></textarea><br></br>
            <input value={this.state.inputValue} onKeyDown={app => this.sendMessage(app)} onChange={evt => this.updateInputValue(evt)} className="App-input"></input><br></br>
            <button id="send" className="App-send" onClick={app => this.sendMessage(app)}>Send</button>
          </div>
        </header>
      </div>
    );
  }
  
}

export default App;
