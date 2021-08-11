//한달 지출, 한달 수입||날짜 해당하는 지출,수입 ||예산가져오기
var _ = require("lodash");

var monthmoneyminus = function (req, res) {
  //한달 지출
  console.log("monthlyscreen모듈에서 monthmoneyminus호출함");
  var amount1 = 0; //총 지출
  var budget2; //예산
  var cnt = 0;
  var id = req.body.id || req.query.id;
  var year = req.body.year || req.query.year;
  var month = req.body.month || req.query.month;
  var database = req.app.get("database");
  database.ItemListModel.find(
    { id: id, year: year, month: month, profit: "지출" },
    function (err, results) {
      for (var i = 0; i < results.length; i++) {
        console.log("결과1은" + results[i]._doc.price);
        amount1 += parseInt(results[i]._doc.price);
      }
      database.MemberModel.find({ id: id }, function (err, results) {
        if (results.length > 0) {
          console.log("results:-budget " + results[0]._doc.budget);
          budget2 = parseInt(results[0]._doc.budget);

          console.log("budget2: " + budget2);
        }
        var message = { 월지출: amount1, 예산: budget2 };
        console.log("message: " + message);
        res.writeHead("200", {
          "Content-Type": "application/json;charset=utf8",
        });
        res.write(JSON.stringify(message));
        res.end();
      });
    }
  );

  /*var message={"월지출":amount,"예산":budget2};
    res.writeHead("200", {"Content-Type": "application/json;charset=utf8",});
    res.write(JSON.stringify(message));
    res.end();*/
};

var daymoneyminusplus = function (req, res) {
  //날짜 해당 지출,수입
  console.log("monthlyscreen모듈에서 daymoneyminusplus 호출함");
  var amount1 = 0; //지출
  var amount2 = 0; //수입
  var id = req.body.id || req.query.id;
  var year = req.body.year || req.query.year;
  var month = req.body.month || req.query.month;
  var day = req.body.day || req.query.day;

  var database = req.app.get("database");
  database.ItemListModel.find(
    { id: id, year: year, month: month, date: day },
    function (err, results) {
      if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          if (results[i]._doc.profit == "수입") {
            console.log("결과1은" + results[i]._doc.price);
            amount2 += parseInt(results[i]._doc.price);
          }
          if (results[i]._doc.profit == "지출") {
            console.log("결과2은" + results[i]._doc.price);
            amount1 += parseInt(results[i]._doc.price);
          }
        }
      }
      var message = { 수입: amount2, 지출: amount1 };
      res.writeHead("200", { "Content-Type": "application/json;charset=utf8" });
      res.write(JSON.stringify(message));
      res.end();
    }
  );
};

var getbudget = function (req, res) {
  //예산
  console.log("monthlyscreen모듈에서 getbudget 호출함");
  var id = req.body.id || req.query.id;
  var database = req.app.get("database");
  database.MemberModel.find({ id: id }, function (err, results) {
    if (results.length > 0) {
      console.log("results: " + results);
      res.writeHead("200", { "Content-Type": "application/json;charset=utf8" });

      res.write(JSON.stringify(results));
      res.end();
    }
  });
};

module.exports.monthmoneyminus = monthmoneyminus;
module.exports.daymoneyminusplus = daymoneyminusplus;
module.exports.getbudget = getbudget;
