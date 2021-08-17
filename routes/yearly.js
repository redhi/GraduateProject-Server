var _ = require("lodash");

var monthcheck = function (req, res) {
  console.log("yearlycashbook모듈에 monthcheck 함수 호출함");
  var id = req.body.id || req.query.id;
  //var startDay=req.body.startDay||req.query.startDay;
  //var endDay=req.body.endDay||req.query.endDay;
  var num = req.body.num || req.query.num;
  var profit = req.body.profit || req.query.profit;
  var arrlen = parseInt(num);
  //var startYear = req.body.year||req.query.year;
  //var start=new Date(startDay);
  //var end=new Date(endDay);
  var aJsonArray = new Array();
  var myObj = new Object();
  var start;
  var startYear;
  var endYear;
  var cntp = 0;
  var answer;
  var dictobject = {};
  var yearArray2 = [2017, 2018, 2019, 2020, 2021];
  var yearArray = new Array();
  var count = 0;
  console.log("num: " + arrlen);
  console.log("뭐야이게??????????" + profit);

  var startday = /^s/;
  for (var key in req.body) {
    if (key != "num" && key != "id" && startday.exec(key) == "s") {
      // 시작연도에 1을 더해 끝연도를 구하기 위해 형변환 시행
      req.body[key] *= 1;
      startYear = req.body[key];
      //intend = req.body[key]+1;
      //console.log("끝"+intend);
      //intend += "";
      endYear = req.body[key] + 1;
      //end = new Date(intend);
      console.log("시작년도는: " + startYear + "끝년도는: " + endYear);
      console.log(count);
      yearArray[count] = startYear;
      count = count + 1;
    }
  }
  console.log(yearArray);
  yearArray.sort(function (a, b) {
    return a - b;
  });
  console.log(yearArray);
  var database = req.app.get("database");
  var i = 0;
  while (i < yearArray.length) {
    var year;
    console.log("현재는 어디야????" + yearArray[i]);
    var yearnow = yearArray[i];
    database.ItemListModel.find(
      { id: id, profit: profit, year: yearnow },
      function (err, results) {
        var answer = 0;
        console.log("yearnow가 바른 값이니??????" + yearnow);
        if (results.length > 0) {
          year = results[0]._doc.year;

          for (var j = 0; j < results.length; j++) {
            console.log(
              yearnow +
                "~" +
                yearnow +
                1 +
                "의 결과는  " +
                results[j]._doc.price
            );
            console.log(
              "가격은 " +
                parseInt(results[j]._doc.price) +
                "원이고 수량은 " +
                parseInt(results[j]._doc.amount)
            );
            answer += parseInt(results[j]._doc.price);
          }
          var message = { year: year, money: answer };
        } else {
          var message = { year: "---", money: answer };
          console.log("값이 없는 id는 " + yearnow);
        }

        console.log("기간은 " + startYear + "~" + endYear + ":" + answer);

        aJsonArray.push(message);

        if (aJsonArray.length === arrlen) {
          console.log(aJsonArray);
          //aJsonArray4.push(aJsonArray2);
          /// console.log("ajaonarray4는= "+aJsonArray4);

          res.writeHead("200", {
            "Content-Type": "application/json;charset=utf8",
          });

          res.write(JSON.stringify(aJsonArray));
          res.end();
        }
      }
    );
    i += 1;
  }
};

module.exports.monthcheck = monthcheck;
