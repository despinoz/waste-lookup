import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
  htmlDecode(input) {
    const e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }

  render() {
    const { result, toggleFavorite } = this.props;
    return (
      <ResultList>
        <a onClick={() => toggleFavorite(result)}>
          {JSON.stringify(result.favorite)}
        </a>
        <h6>{result.title}</h6>
        <span
          dangerouslySetInnerHTML={{ __html: this.htmlDecode(result.body) }}
        />
      </ResultList>
    );
  }
}

export default Result;
