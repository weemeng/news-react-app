import React from "react";
import NewsCards from "../NewsCards/NewsCards";
import { colorArray, determineTabsToShow } from "./tabLayout";

function ArticlesViewer({
  InArticles,
  InSizeArray,
  InSliderIndex,
  IntotArticles,
}) {
  const showNumber_n = determineTabsToShow();
  const sliderArray = [
    Math.max(0, InSliderIndex - showNumber_n),
    Math.min(IntotArticles, InSliderIndex + showNumber_n + 1),
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
          key={articleData.id}
          className="articles-inline"
          style={{
            width: 300 * slicedField[index],
            height: 300 * slicedField[index],
          }}
        >
          <NewsCards
            key={articleData.id}
            data={articleData}
            color={colArray[index]}
          />
        </span>
      );
    }
  );
  return filteredNewsArticlesComponents;
}

export default ArticlesViewer;
