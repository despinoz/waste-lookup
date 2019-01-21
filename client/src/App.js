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
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.search = this.search.bind(this);
  }

  toggleFavorite(result) {
    axios
      .put(`https://waste-lookup-database.herokuapp.com/data/${result.id}`, {
        id: result.id,
        body: result.body,
        category: result.category,
        favorite: !result.favorite,
        keywords: result.keywords,
        title: result.title
      })
      .then(() => {
        this.search();
      })
      .catch(error => {
        console.log(error);
      });
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
    const { searchResults, query } = this.state;
    this.setState({
      query: event.target.value
    });
    if (searchResults.length > 0 && query.length === 1) {
      this.setState({
        searchResults: []
      });
    }
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
              <Result result={data} toggleFavorite={this.toggleFavorite} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
