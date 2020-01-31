//This NewsComponent returns a small floating react Component

import React from "react";
import "./NewsComponent.css";
import MyOwnDateParser from "./MyOwnDateParser.js";
import axios from "axios";
// let format = require('date-format');

function SetDetails(props) {
  let time = MyOwnDateParser(props.time);
  return (
    <div>
      <p className="news__title">{props.title}</p>
      <p>
        <img
          src={props.imgsrc}
          alt={props.title}
          className="news__img"
          onClick={() => window.open(props.url)}
        ></img>
      </p>
      <p className="news__sourceDate">
        {props.source} | {time.toDateString()}
      </p>
      <span className="headline_top">______________</span>
      <p className="news__description">{props.description}</p>
      <span className="headline_bot">______________</span>
    </div>
  );
}

class NewsComponent extends React.Component {
  renderArticle(inputArray) {
    if (!inputArray) {
      return;
    }
    return (
      <SetDetails
        title={inputArray.title}
        source={inputArray.source.name}
        time={inputArray.publishedAt}
        imgsrc={inputArray.urlToImage}
        url={inputArray.url}
        description={inputArray.description}
      />
    );
  }

  render() {
    var styles = {
      backgroundColor: `rgb(${this.props.color})`
    };
    return (
      <div className="news" style={styles}>
        {/* <header>This is the Header</header>
        This is the Title */}
        {this.renderArticle(this.props.data)}
      </div>
    );
  }
}

export default NewsComponent;
