const countryList = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de"]
//eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za
const categoryList = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

const QueryParam = {
    country: "us",
    category: "",
    sources: "",
    q: "trump",
    pageSize: 50,
    apiKey: process.env.REACT_APP_SECRET,
}

function setURL(queryInput) {
    //country=${QueryParam.country}&
    const inputQ = queryInput;
    let outputURL = `https://newsapi.org/v2/everything?q=${inputQ}&pageSize=${QueryParam.pageSize}&apiKey=${QueryParam.apiKey}`;
    console.log(outputURL)
    return outputURL
}

export default setURL