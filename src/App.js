import React, { Component } from 'react';
import './App.css';
import PersonManager from "./personManager/PersonManager";

class App extends Component {
    render() {
        return (
            <div className="container">
                <PersonManager />
            </div>
        );
    }
}

export default App;