import React, { Component } from 'react';
import './App.css';
import LDClient from 'ldclient-js';

class App extends Component {
  constructor () {
    super ()
    this.state = {
      accountType: 'standard',
      days: [
        { name: 'Monday', description: 'Cloudy', high: 65.2, low: 55.5, airQuality: 'Unhealthy' },
        { name: 'Tuesday', description: 'Cloudy', high: 65.2, low: 55.5, airQuality: 'Unhealthy'},
        { name: 'Wednesday', description: 'Cloudy', high: 65.2, low: 55.5, airQuality: 'Very Unhealthy'},
        { name: 'Thursday', description: 'Partly Cloudy', high: 65.2, low: 55.5, airQuality: 'Very Unhealthy'},
        { name: 'Friday', description: 'Cloudy', high: 65.2, low: 55.5, airQuality: 'Moderate Unhealthy'},
        { name: 'Saturday', description: 'Sunny', high: 65.2, low: 55.5, airQuality: 'Moderate Unhealthy'},
        { name: 'Sunday', description: 'Sunny', high: 65.2, low: 55.5, airQuality: 'Good'}
      ]
    }
  }

  componentDidMount () {
    const user = {
      key: '123456'
    }
    this.ldclient = LDClient.initialize('5bf3854f8b34c34b45896257', user);
    this.ldclient.on('ready', this.onReady.bind(this));
  }

  onReady() {
    this.setState({
      featureFlag: {
        showAirQuality: this.ldclient.variation('show-air-quality')
      }
    })
  }
  render() {
    let weatherData;

    if (!this.state.featureFlag) {
      return <div className="App">Please wait...</div>
    }

    if(this.state.accountType === 'premium') {
      weatherData = <div style={{display: 'flex'}}>
                      {this.state.days.map(day => <div>{`${day.name}: ${day.description}, air quality: ${day.airQuality} `}</div>)}
                    </div>
    } else if (this.state.accountType === 'standard') {
      weatherData = <div style={{display: 'flex'}}> {this.state.days.map(day => <div>{`${day.name}: ${day.description}`}</div>)} </div>
    } else {
      if (this.state.featureFlag.showAirQuality) {
        weatherData = <div style={{display: 'flex'}}> {this.state.days.map(day => <div>{`${day.name}: ${day.description}, air quality: ${day.airQuality}  `}</div>)} </div>
      } else {
        weatherData = <div style={{display: 'flex'}}> {this.state.days.map(day => <div>{`${day.name}: ${day.description} `}</div>)} </div>
      }
    }

    return (
      <div className="App">
        <button 
          style={{ backgroundColor: this.state.accountType === 'premium' ? '#4CAF50' : null}}
          onClick={() => {this.setState({ accountType: 'premium' })}}>Premium</button>
        <button 
          style={{ backgroundColor: this.state.accountType === 'standard' ? '#4CAF50' : null}}
          onClick={() => {this.setState({ accountType: 'standard' })}}>Standard</button>
        <div className="App-main"> {weatherData} </div>
      </div>
    );
  }
}

export default App;
