import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
  constructor() {
    super();
  }

  render() {
    const { result, toggleFavorite } = this.props;
    return (
      <div>
        <div onClick={() => toggleFavorite(result)}>
          {JSON.stringify(result.favorite)}
        </div>
        <div>{result.title}</div>
        <div>{result.body}</div>
        {/* <div>{data.body.replace(/&lt;/g, '<').replace(/&gt;/g, '>\n')}</div> */}
      </div>
    );
  }
}

export default Result;
