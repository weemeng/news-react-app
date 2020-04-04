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
  // if (!!search.earliestDate) {
  //   queryString.push(`earliestDate=${search.earliestDate.toISOString()}`);
  // }
  if (!!search.latestDate) {
    queryString.push(`latestDate=${search.latestDate.toISOString()}`);
  }
  return queryString.length > 0 ? "?" + queryString.join("&") : "";
};
function setURL(searchInput) {
  const baseURL = `https://intense-sea-36031.herokuapp.com/news`
  const queryURL = setQueryStringHerokuEndpoint(searchInput);
  return baseURL + queryURL;
}

export default setURL;
