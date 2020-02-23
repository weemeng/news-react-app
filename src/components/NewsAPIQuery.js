// const countryList = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de"]
//eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za
// const categoryList = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

const QueryParam = {
  country: "us",
  category: "",
  sources: "",
  q: "trump",
  pageSize: 50,
  apiKey: process.env.REACT_APP_SECRET
};
// country = "us"
// q = ""
// qInTitle = ""
// earliestDate
// latestDate

const setQueryStringHerokuEndpoint = search => {
  const queryString = [];
  if (!!search.query) {
    queryString.push(`q=${search.query}`);
  }
  if (!!search.qInTitle) {
    queryString.push(`qInTitle=${search.qInTitle}`);
  }
  if (!!search.country) {
    queryString.push(`country=${search.country}`);
  }
//   if (!!search.earliestDate) {
//     queryString.push(`earliestDate=${search.earliestDate.toISOString()}`);
//   }
  if (!!search.latestDate) {
    queryString.push(`latestDate=${search.latestDate.toISOString()}`);
  }
  return queryString.length > 0 ? "?" + queryString.join("&") : "";
};
function setURL(searchInput) {
  // country=${QueryParam.country}&
  //   const inputQ = searchInput;
  //   let outputURL = `https://newsapi.org/v2/everything?q=${inputQ}&pageSize=${QueryParam.pageSize}&apiKey=${QueryParam.apiKey}`;
  //   console.log(outputURL);
  // return outputURL
  const baseURL = `https://intense-sea-36031.herokuapp.com/news`
  const queryURL = setQueryStringHerokuEndpoint(searchInput);
  console.log(baseURL + queryURL)
  return baseURL + queryURL;
}

export default setURL;
