import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { query } = this.state;
    axios
      .get(
        `https://waste-lookup-database.herokuapp.com/api/data/_search?keywords=${query}`
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Toronto Waste Lookup</h1>
        <form>
          <input type="text" onChange={this.handleChange} />
        </form>
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default App;
