import React from 'react';
import ReactDOM from 'react-dom';
import Season from './season';
import Loader from './loader';

class App extends React.Component {
  state = { lat: null, error: '' };

  componentDidMount() {
    // best used to load data initially
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude });
      }, // if success
      (err) => {
        this.setState({ error: err.message });
      }
    );
  }

  render() {
    if (this.state.error && !this.state.lat) {
      return <div>Error: {this.state.error}</div>;
    }
    if (!this.state.error && this.state.lat) {
      return <Season lat={this.state.lat} />;
    }

    return (
      <div>
        <Loader message="Please, accept location request" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
