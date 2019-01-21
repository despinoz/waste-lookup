import React, { Component } from 'react';
import styled from 'styled-components';

const ResultList = styled.div`
  display: flex;
  /* margin: 10px 0; */
  padding: 15px 20px;
  align-items: center;
  > a {
    width: 5%;
    > img {
      max-height: 30px;
    }
  }
  > h6 {
    width: 30%;
  }
  > span {
    width: 65%;
  }
`;

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
          {result.favorite ? (
            <img src="./green.png" alt="" />
          ) : (
            <img src="./grey.png" alt="" />
          )}
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
