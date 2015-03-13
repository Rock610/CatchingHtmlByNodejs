var http = require("http");

var express = require('express');
var router = express.Router();
var cheerio = require("cheerio");
var url = "http://www.dailymail.co.uk/news/article-2297585/Wild-squirrels-pose-charming-pictures-photographer-hides-nuts-miniature-props.html"
var urls = [];
/* GET home page. */
router.get('/', function(req, res) {
  download(url, function(data) {
    if (data) {
      var $ = cheerio.load(data);

      $("div.artSplitter > img.blkBorder ").each(function(i, e) {
        urls[i] = $(e).attr("src");

      });
      res.send(urls);
    }
  });

});

/*
*download(url, function(data) {
    if (data) {
      var $ = cheerio.load(data);

      $("div.artSplitter > img.blkBorder ").each(function(i, e) {

        res.send($(e).attr("src"));

      });
    }
  });
*
*/
//Utility function that downloads a URL and invokes

//callback with the data.

function download(url, callback) {
  http.get(url, function(res) {

    var data = "";

    res.on('data', function(chunk) {

      data += chunk;

    });

    res.on("end", function() {

      callback(data);

    });

  }).on("error", function() {

    callback(null);

  });


}
module.exports = router;




// 



// download(url,function(data) {

//   if(data) {

//     //console.log(data);
//     var $ = cheerio.load(data);

//     $("div.artSplitter > img.blkBorder ").each(function(i,e) {

//       console.log($(e).attr("src"));

//     });



//   console.log("done");

// } else

//   console.log("error");

//});