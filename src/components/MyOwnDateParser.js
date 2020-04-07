function MyOwnDateParser(InputString) {
  // Input Template : 2020-01-28T13:51:37Z
  const fragment = InputString.slice(0, 19).split("T");
  const datefragment = fragment[0].split("-");
  const timefragment = fragment[1].split(":");
  const dateObj = {
    yr: Number(datefragment[0]),
    mn: Number(datefragment[1])-1,
    dy: Number(datefragment[2]),
    hr: Number(timefragment[0]),
    mi: Number(timefragment[1]),
    sc: Number(timefragment[2])
  };
  const parsedDate = new Date();
  parsedDate.setUTCFullYear(dateObj.yr);
  parsedDate.setUTCMonth(dateObj.mn);
  parsedDate.setUTCDate(dateObj.dy);
  parsedDate.setUTCHours(dateObj.hr);
  parsedDate.setUTCMinutes(dateObj.mi);
  parsedDate.setUTCSeconds(dateObj.sc);
  return parsedDate;
}

// module.exports = MyOwnDateParser