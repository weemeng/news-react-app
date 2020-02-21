import React from "react";
import axios from "axios";
import NewsComponent from "./NewsComponent";
import "./DataManagement.css";
import Sliderbar from "./Slider/Sliderbar";
import MyOwnDateParser from "./MyOwnDateParser.js";
import url from "./NewsAPIQuery.js";
import {
  colorArray,
  determineTabsToShow,
  positionClosenessArray
} from "../utils/tabLayout.js";
class DataManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData_articles: [],
      newsData_valid: false,
      newsData_totArticles: 50,
      search_external_value: "trump",
      earliestDate: new Date(),
      latestDate: new Date(),
      updatedDate: new Date(),
      contentUpdatedTime: new Date(),
      sizeArray: Array(50).fill(1),
      isLoading: false,
      sliderIndex: 0
    };
  }

  componentDidMount() {
    this.setState({});
    this.getNews();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contentUpdatedTime !== this.state.contentUpdatedTime) {
      this.pageLoadedStatement();
    }
    if (!!this.state.newsData_valid) {
      if (prevState.updatedDate !== this.state.updatedDate) {
        this.closenessIndexCalculator(this.state.newsData_articles);
      }
    }
  }
  getNews() {
    axios(url(this.state.search_external_value))
      .then(res => {
        if (res.data.status !== "ok") {
          throw new Error("Invalid data");
        }
        res.data.articles.sort((a, b) => {
          let temp_a = MyOwnDateParser(a.publishedAt);
          let temp_b = MyOwnDateParser(b.publishedAt);
          return temp_a > temp_b ? -1 : temp_a < temp_b ? 1 : 0;
        });
        this.setState({
          newsData_articles: res.data.articles,
          newsData_valid: true
        });
      })
      .then(() => {
        if (this.state.newsData_valid) {
          this.getEarliestandLatestTime(this.state.newsData_articles);
        }
      })
      .catch(error => {
        console.log("REACHED SOME ERROR");
      });
  }
  pageLoadedStatement() {
    return (
      <span>
        {"Printed at " + this.state.contentUpdatedTime.toDateString()}
      </span>
    );
  }
  updateExteralInput = event => {
    this.setState({
      search_external_value: event.target.value
    });
  };
  closenessIndexCalculator(articles) {
    const { newArray, index } = positionClosenessArray(
      articles,
      this.state.updatedDate,
      this.state.sizeArray
    );
    this.setState({
      sizeArray: newArray,
      sliderIndex: index
    });
  }

  renderNewsArticles() {
    const InArticles = this.state.newsData_articles;
    const InSizeArray = this.state.sizeArray;
    const InSliderIndex = this.state.sliderIndex;
    const IntotArticles = this.state.newsData_totArticles;
    const showNumber_n = determineTabsToShow();

    const sliderArray = [
      Math.max(0, InSliderIndex - showNumber_n),
      Math.min(IntotArticles, InSliderIndex + showNumber_n + 1)
    ];
    const slicedFilter = InArticles.slice(sliderArray[0], sliderArray[1]);
    const slicedField = InSizeArray.slice(sliderArray[0], sliderArray[1]);

    const colArray = colorArray(
      sliderArray[1] - sliderArray[0],
      InSliderIndex,
      IntotArticles
    );
    const filteredNewsArticlesComponents = slicedFilter.map(
      (articleData, index) => {
        return (
          <span
            className="articles-inline"
            style={{
              width: 300 * slicedField[index],
              height: 300 * slicedField[index]
            }}
          >
            <NewsComponent data={articleData} color={colArray[index]} />
          </span>
        );
      },
      this
    );
    return filteredNewsArticlesComponents;
  }

  sliderChildCallbackFunction = childData => {
    this.setState({ updatedDate: childData });
  };

  getEarliestandLatestTime = () => {
    const articleField = this.state.newsData_articles;
    const early = MyOwnDateParser(
      articleField[articleField.length - 1].publishedAt
    );
    const late = MyOwnDateParser(articleField[0].publishedAt);
    this.setState({
      earliestDate: early,
      latestDate: late
    });
  };

  handleExternalKeyPress = event => {
    if (event.key === "Enter") {
      this.getNews();
    }
  };

  render() {
    return (
      <div className="background">
        <div className="page__Title">News Aggregator</div>
        <div className="page__loadedStatement">
          {this.pageLoadedStatement()}
        </div>
        <div className="page__Searchbar__Container">
          <div className="page__Searchbar">
            <input
              type="text"
              placeholder="Search External"
              value={this.state.search_external_value}
              onChange={this.updateExteralInput}
              onKeyPress={this.handleExternalKeyPress}
            />
          </div>
        </div>
        <div className="page__Slider">
          <Sliderbar
            earliest={this.state.earliestDate}
            latest={this.state.latestDate}
            sliderCallback={this.sliderChildCallbackFunction}
          />
        </div>
        <div className="page__Articles">
          {this.state.newsData_valid ? this.renderNewsArticles() : true}
        </div>
      </div>
    );
  }
}

export default DataManagement;
