
function colorArray(arraySize, centerIndex, totSize) {
  const mainColor = [255, 255, 255];
  const sideColor = [114, 34, 0];

  let colorIndex = 0;
  console.log();

  if (46 <= centerIndex) {
    colorIndex = totSize - Math.round(totSize - (arraySize - 1) / 2) + 1;
    // console.log("colorIndex1 = " + colorIndex + " centerIndex = " + centerIndex)
    // if 46 < centerIndex
  } else if (centerIndex < (arraySize - 1) / 2) {
    // if centerIndex < 4
    colorIndex = centerIndex;
    // console.log("colorIndex2 = " + colorIndex + " centerIndex = " + centerIndex)
  } else {
    colorIndex = Math.floor((arraySize - 1) / 2);
    // console.log("colorIndex3 = " + colorIndex + " centerIndex = " + centerIndex)
  }
  const colorSetArray = Array(arraySize).fill([0, 0, 0]);
  const d_r = (mainColor[0] - sideColor[0]) / arraySize;
  const d_g = (mainColor[1] - sideColor[1]) / arraySize;
  const d_b = (mainColor[2] - sideColor[2]) / arraySize;

  const output = colorSetArray.map((val, index) => {
    const distFromCenter = Math.abs(index - colorIndex);
    return [
      -Math.floor(distFromCenter * d_r) + mainColor[0],
      -Math.floor(distFromCenter * d_g) + mainColor[1],
      -Math.floor(distFromCenter * d_b) + mainColor[2]
    ];
  });
  return output;
}

function determineTabsToShow() {
  const innerWidth = window.innerWidth;
  const showNumber_n =
    Math.floor(innerWidth / 500) - 1 > 0 ? Math.floor(innerWidth / 500) - 1 : 0;
  return showNumber_n;
}

function positionClosenessArray(articles, updatedDate, sizeArray) {
  const size_decay_multiplier = 0.8;
  const size_init = 1 / size_decay_multiplier;
  let index = 0;
  for (let i = 1; i < articles.length; i++) {
    const indexDate = new Date(articles[index].publisher.publishedAt);
    const articleDate = new Date(articles[i].publisher.publishedAt);
    if (
      Math.abs(articleDate - updatedDate) < Math.abs(indexDate - updatedDate)
    ) {
      index = i;
    }
  }
  const indexedArray = sizeArray;
  const newArray = indexedArray.map((val, ind) => {
    const powerVal = Math.abs(index - ind) + 1;
    return Number(
      size_init * Math.pow(size_decay_multiplier, powerVal).toPrecision(3)
    );
  });
  return { newArray, index };
}

module.exports = { colorArray, determineTabsToShow, positionClosenessArray };
