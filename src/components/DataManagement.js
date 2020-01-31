//This NewsComponent returns a small floating react Component
import React from "react";
import axios from "axios";
import NewsComponent from "./NewsComponent";
import "./DataManagement.css";
import Sliderbar from "./Sliderbar";
import MyOwnDateParser from "./MyOwnDateParser.js";
import url from "./NewsAPIQuery.js";
import ColorArray from "./ColorArray.js";
class DataManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData_articles: [],
      newsData_status: "",
      newsData_valid: false,
      newsData_totResults: 0,
      newsData_totArticles: 50,
      search_internal_value: "",
      search_external_value: "trump",
      earliestDate: new Date(),
      latestDate: new Date(),
      updatedDate: new Date(),
      contentUpdatedTime: new Date(),
      sizeArray: Array(50).fill(1),
      isLoading: false,
      startReadingFromSlider: false,
      sliderIndex: 0,
      state: 0 //should have 3 states, state 0 = invalid, 1 = noData, 2 = haveData
    };
  }
  pageLoadedStatement() {
    return (
      <span>
        {"Printed at " + this.state.contentUpdatedTime.toDateString()}
      </span>
    );
  }
  componentDidMount() {
    this.setState({
      isLoading: false,
      state: 0
    });
    this.getNews();
  }
  componentDidUpdate(prevProps, prevState) {
    // if (prevState.updatedDate !== this.state.updatedDate) {
    //   //run update function
    //   if (!!this.state.newsData_articles) {
    //   }
    // }
    if (prevState.contentUpdatedTime !== this.state.contentUpdatedTime) {
      this.pageLoadedStatement();
    }
    if (!!this.state.startReadingFromSlider) {
      if (prevState.updatedDate !== this.state.updatedDate) {
        this.closenessIndexCalculator(this.state.newsData_articles);
      }
    }
  }

  closenessIndexCalculator(articles) {
    const size_decay_multiplier = 0.8;
    //find closest date index
    const size_init = 1 / size_decay_multiplier;
    let index = 0;
    for (let i = 1; i < articles.length; i++) {
      const indexDate = MyOwnDateParser(articles[index].publishedAt);
      const articleDate = MyOwnDateParser(articles[i].publishedAt);
      if (
        Math.abs(articleDate - this.state.updatedDate) <
        Math.abs(indexDate - this.state.updatedDate)
      ) {
        index = i;
      }
    }
    //index is correct
    const indexedArray = this.state.sizeArray;
    const newArray = indexedArray.map((val, ind) => {
      const powerVal = Math.abs(index - ind) + 1;
      return Number(
        size_init * Math.pow(size_decay_multiplier, powerVal).toPrecision(3)
      );
    });
    this.setState({
      sizeArray: newArray,
      sliderIndex: index
    });
  }

  getNews() {
    console.log(url(this.state.search_external_value));
    axios(url(this.state.search_external_value))
      .then(
        res => {
          res.data.articles.sort((a, b) => {
            let temp_a = MyOwnDateParser(a.publishedAt);
            let temp_b = MyOwnDateParser(b.publishedAt);
            return temp_a > temp_b ? -1 : temp_a < temp_b ? 1 : 0;
          });
          this.setState({
            newsData_articles: res.data.articles,
            newsData_status: res.data.status,
            newsData_totResults: res.data.totalResults
          });
          // need to check if there is any data in the array
          if (this.state.newsData_status === "ok") {
            this.setState({
              newsData_valid: true,
              state: 2
            });
          }
        },
        err => {
          this.setState({
            newsData_status: "ERROR",
            state: 1
          });
        }
      )
      .then(() => {
        this.checkValidityBeforeRunning(
          this.state.newsData_valid,
          this.getExtremeTimes,
          this.state.newsData_articles
        );
      })
      .then(() => {
        this.setState({
          startReadingFromSlider: true
        });
      })
      .catch(error => {
        console.log("REACHED SOME ERROR");
      });
  }
  checkValidityBeforeRunning = (validCheck, fn, ...data) => {
    if (!validCheck) {
      return;
    }
    return fn(data);
  };
  updateInternalInput = event => {
    this.setState({
      search_internal_value: event.target.value
    });
  };
  updateExteralInput = event => {
    this.setState({
      search_external_value: event.target.value
    });
  };
  renderNewsArticles([articles, searchParam, sizeField, sliderIndex, totSize]) {
    // const articleField = articles;
    // const articleFilter = articleField.filter((indivArticle, index, array) =>
    //   indivArticle.title.toLowerCase().includes(searchParam.toLowerCase())
    // );
    let showNumber_n = 3; //showing 2n+1
    const innerW = window.innerWidth;
    switch (true) {
      case innerW > 2100:
        showNumber_n = 3;
        break;
      case innerW > 1500:
        showNumber_n = 2;
        break;
      case innerW > 900:
        showNumber_n = 1;
        break;
      default:
        showNumber_n = 3;
        break;
    }
    const sliderArray = [
      Math.max(0, sliderIndex - showNumber_n),
      Math.min(totSize, sliderIndex + showNumber_n + 1)
    ];

    const slicedFilter = articles.slice(sliderArray[0], sliderArray[1]);
    const slicedField = sizeField.slice(sliderArray[0], sliderArray[1]);

    const colArray = ColorArray(
      sliderArray[1] - sliderArray[0],
      sliderIndex,
      totSize
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

  sliderCallbackFunction = childData => {
    this.setState({ updatedDate: childData });
  };

  getExtremeTimes = ([articles]) => {
    const articleField = articles;
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
        <dir></dir>
        <dir className="page__loadedStatement">
          {this.pageLoadedStatement()}
        </dir>
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

        <dir className="page__Articles">
          {this.checkValidityBeforeRunning(
            this.state.newsData_valid,
            this.renderNewsArticles,
            this.state.newsData_articles,
            this.state.search_internal_value,
            this.state.sizeArray,
            this.state.sliderIndex,
            this.state.newsData_totArticles
          )}
          {/* {this.renderNewsArticles(
            this.state.newsData_articles,
            this.state.search_internal_value,
            this.state.sizeArray,
            this.state.sliderIndex,
            this.state.newsData_totArticles
          )} */}
        </dir>
        <dir className="page__Slider">
          <Sliderbar
            earliest={this.state.earliestDate}
            latest={this.state.latestDate}
            sliderCallback={this.sliderCallbackFunction}
          />
        </dir>
      </div>
    );
  }
}

export default DataManagement;
