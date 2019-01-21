import React, { Component } from 'react';

class Result extends Component {
  render() {
    const { result } = this.props;
    return (
      <div>
        <div>{JSON.stringify(result.favorite)}</div>
        <div>{result.title}</div>
        <div>{result.body}</div>
        {/* <div>{data.body.replace(/&lt;/g, '<').replace(/&gt;/g, '>\n')}</div> */}
      </div>
    );
  }
}

export default Result;
