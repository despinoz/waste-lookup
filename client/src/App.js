import React, { Component } from 'react';
import Result from './components/Result';
import axios from 'axios';
import styled from 'styled-components';

const Header = styled.div`
  height: 110px;
  background-image: linear-gradient(to right, #1d5993, #23975e);
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  > h1 {
    color: white;
    font-size: 3rem;
    /* font-style: bold; */
  }
`;

const SearchBar = styled.div`
  display: flex;

  > form {
    width: 97%;
    height: 50px;
    > input {
      width: 97%;
      height: 50px;
      padding: 0 20px;
    }
  }
  > img {
    max-height: 50px;
  }
`;

const Favourites = styled.div`
  background: #f7fefa;
  > h2 {
    padding: 15px 20px;
    color: #23995c;
  }
`;

const Body = styled.div`
  max-width: 1000px;
  margin: auto;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      searchResults: [],
      favourites: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.foundFavourites();
  }

  foundFavourites() {
    axios
      .get(
        'https://waste-lookup-database.herokuapp.com/api/data/_search?favorite=true'
      )
      .then(({ data }) => {
        this.setState({
          favourites: data
        });
      })
      .catch(error => {
        console.log(error);
      });
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
        this.foundFavourites();
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
        <Header>
          <h1>Toronto Waste Lookup</h1>
        </Header>
        <Body>
          <SearchBar>
            <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleChange} />
            </form>
            {/* <button onClick={this.handleClick}>Search</button> */}
            <img src="./button.png" onClick={this.handleClick} />
          </SearchBar>
          <div>
            {this.state.searchResults.map(data => (
              <div key={data.id}>
                <Result result={data} toggleFavorite={this.toggleFavorite} />
              </div>
            ))}
          </div>
          {this.state.favourites.length > 0 && (
            <Favourites>
              <h2>Favourites</h2>
              <div>
                {this.state.favourites.map(data => (
                  <div key={data.id}>
                    <Result
                      result={data}
                      toggleFavorite={this.toggleFavorite}
                    />
                  </div>
                ))}
              </div>
            </Favourites>
          )}
        </Body>
      </div>
    );
  }
}

export default App;
