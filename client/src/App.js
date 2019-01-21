import React, { Component } from 'react';
import Result from './components/Result';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      searchResults: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.search();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.search();
  }

  search() {
    const { query } = this.state;
    if (query != '') {
      axios
        .get(
          `https://waste-lookup-database.herokuapp.com/api/data/_search?keywords=${query}`
        )
        .then(({ data }) => {
          this.setState({
            searchResults: data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Toronto Waste Lookup</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
        </form>
        <button onClick={this.handleClick}>Search</button>
        <div>
          {this.state.searchResults.map(data => (
            <div key={data.id}>
              <Result result={data} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
