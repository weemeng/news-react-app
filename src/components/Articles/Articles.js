import React from "react";
import NewsComponent from "./NewsComponent";
import {
  colorArray,
  determineTabsToShow,
  positionClosenessArray
} from "../utils/tabLayout.js";

class ArticlesViewer extends React.Component {
  renderStuff(InArticles, InSizeArray, InSliderIndex, IntotArticles) {
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
      }
    );
    return filteredNewsArticlesComponents;
  }
  render() {
    const {
      InArticles,
      InSizeArray,
      InSliderIndex,
      IntotArticles
    } = this.props;
    return <div></div>;
  }
}

module.exports = ArticlesViewer;
