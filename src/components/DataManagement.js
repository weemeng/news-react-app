import React from "react";
import axios from "axios";
import NewsCards from "./NewsCards/NewsCards";
// import KeyFramesTest from "./Testing/TestKeyFrames";
import "./DataManagement.css";
import Sliderbar from "./Slider/Sliderbar";
import setURL from "./APIQuery/NewsAPIQuery.js";
import {
  colorArray,
  determineTabsToShow,
  positionClosenessArray
} from "../utils/tabLayout.js";
// const { Menu, Dropdown, Icon, message } = require("antd");

let oneWeekAgo = new Date();
oneWeekAgo = new Date(oneWeekAgo.setDate(oneWeekAgo.getDate() - 7));



class DataManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData_articles: [],
      newsData_valid: false,
      newsData_totArticles: 50,
      search: {
        query: "obama",
        country: "",
        earliestDate: undefined,
        latestDate: undefined
      },
      earliestDate: oneWeekAgo,
      latestDate: new Date(),
      updatedDate: new Date(),
      contentUpdatedTime: new Date(),
      sizeArray: Array(50).fill(1),
      isLoading: false,
      sliderIndex: 0
    };
  }

  componentDidMount() {
    this.getNews();
  }
  componentDidUpdate(prevProps, prevState) {
    // if (prevState.contentUpdatedTime !== this.state.contentUpdatedTime) {
    //   this.pageLoadedStatement();
    // }
    if (!!this.state.newsData_valid) {
      if (prevState.updatedDate !== this.state.updatedDate) {
        this.setArticlePosition(this.state.newsData_articles);
      }
    }
  }
  setArticlePosition(articles) {
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

  getNews() {
    console.log(this.state.search);
    axios(setURL(this.state.search))
      .then(res => {
        if (!res.data) {
          throw new Error("Invalid data");
        }
        const articles = res.data;
        articles.sort(
          (a, b) => a.publisher.publishedAt - b.publisher.publishedAt
        );
        console.log(articles);
        this.setState({
          newsData_articles: articles,
          newsData_valid: true,
          earliestDate: new Date(
            articles[articles.length - 1].publisher.publishedAt
          ),
          latestDate: new Date(articles[0].publisher.publishedAt)
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  renderNewsArticles() {
    const InArticles = this.state.newsData_articles;
    const InSizeArray = this.state.sizeArray;
    const InSliderIndex = this.state.sliderIndex;
    const IntotArticles = this.state.newsData_totArticles;

    const showNumber_n = determineTabsToShow();

    const sliderArrayIndex = [
      Math.max(0, InSliderIndex - showNumber_n),
      Math.min(IntotArticles, InSliderIndex + showNumber_n + 1)
    ];
    const slicedFilter = InArticles.slice(
      sliderArrayIndex[0],
      sliderArrayIndex[1]
    );
    const slicedField = InSizeArray.slice(
      sliderArrayIndex[0],
      sliderArrayIndex[1]
    );

    const colArray = colorArray(
      sliderArrayIndex[1] - sliderArrayIndex[0],
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
            <NewsCards data={articleData} color={colArray[index]} />
          </span>
        );
      }
    );
    return filteredNewsArticlesComponents;
  }

  sliderChildCallbackFunction = childData => {
    this.setState({ updatedDate: childData });
  };

  handleSearchBarEnterEvent = event => {
    console.log(event);
    if (event.key === "Enter") {
      this.getNews();
    }
  };

  updateSearchQueryBar = event => {
    console.log(this.state.search);
    this.setState({
      search: { query: event.target.value }
    });
  };

  updateSearchCountryBar = event => {
    this.setState({
      search: { country: event.target.value }
    });
  };

  // updateDate = event => {
  //   console.log(event);
  //   this.setState({
  //     search: { earliestDate: event.target.value }
  //   });
  // };
  render() {
    return (
      <div className="background">
        {/* <KeyFramesTest /> */}
        <div className="page__Title">News Aggregator</div>
        <div className="page__loadedStatement">
          <span>
            {"Printed at " + this.state.contentUpdatedTime.toDateString()}
          </span>
        </div>
        <div className="page__Searchbar__Container">
          <div className="page__Searchbar">
            <input
              type="text"
              placeholder="Search External"
              value={this.state.search.query}
              onChange={this.updateSearchQueryBar}
              onKeyPress={this.handleSearchBarEnterEvent}
            />
          </div>
        </div>
        <div className="page__Options__Container">
          {/* <Dropdown overlay={this.menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Country <Icon type="down" />
            </a>
          </Dropdown> */}
          <div className="page__Options">
            <input
              type="text"
              placeholder="Search Country"
              value={this.state.search.country}
              onChange={this.updateSearchCountryBar}
              onKeyPress={this.handleSearchBarEnterEvent}
            />
          </div>
          <div>
            
          </div>
          {/* <div>
            <input
              type="date"
              placeholder="EarliestDate"
            //   value={this.state.search.earliestDate}
            //   onChange={this.updateDate}
            //   // onKeyPress={this.handleSearchBarEnterEvent}
            // />
            // <input
            //   type="date"
            //   placeholder="LatestDate"
        //       value={this.state.search.latestDate}
        //       onChange={this.updateDate}
        //       // onKeyPress={this.handleSearchBarEnterEvent}
        //     />
        //   </div> 
        // */}
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
