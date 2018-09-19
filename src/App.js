import React, { Component } from 'react';
import Shell from './component/shell/shell'
import './app.styl'

class App extends Component {
    constructor(props) {
        super(props);
        this.style ={
            height: '70%',
            width: '100%'
        }
    }

    render() {
        return (
          <div className="app">
              <Shell style={this.style}></Shell>
          </div>
        );
  }
}

export default App;
