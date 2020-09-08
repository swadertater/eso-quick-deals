const curl = require("curl");
const jsdom = require("jsdom");
const url =
  "https://us.tamrieltradecentre.com/pc/Trade/SearchResult?ItemID=18124&SortBy=LastSeen&Order=desc";

curl.get(url, null, (err, resp, body) => {
  if (resp.statusCode == 200) {
    const goldAmounts = getGoldAmounts(body);
    console.log(goldAmounts);
  } else {
    console.log("error while fetching url");
  }
});

getGoldAmounts = (html) => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  const goldAmountElements = $(".gold-amount");
  const goldAmounts = [];
  for (var i = 0; i < goldAmountElements.length; i++) {
    const goldAmount = $(goldAmountElements[i]).text().split("X")[0].trim();
    goldAmounts.push(goldAmount);
  }
  return goldAmounts;
};
