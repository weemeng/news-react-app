//This NewsCard returns a small floating react Component

import React from "react";
import "./NewsCards.css";

function SetDetails(props) {
  let time = new Date(props.time);
  return (
    <div onClick={() => window.open(props.url)}>
      <p className="news__title">{props.title}</p>
        <img
          src={props.imgsrc}
          alt={props.title}
          className="news__img"          
        ></img>
      <p className="news__sourceDate">
        {props.source} | {time.toDateString()}
      </p>
      <span className="headline_top">______________</span>
      <p className="news__description">{props.description}</p>
      <span className="headline_bot">______________</span>
    </div>
  );
}

class NewsCard extends React.Component {
  renderArticle(inputArray) {
    if (!inputArray) {
      return;
    }
    return (
      <SetDetails
        title={inputArray.title}
        source={inputArray.publisher.source.name}
        time={inputArray.publisher.publishedAt}
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

export default NewsCard;
