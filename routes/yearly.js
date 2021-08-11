var _ = require("lodash");

var plusyearcheck = function (req, res) {
  console.log("yearlycashbook모듈에 yearcheck 함수 호출함");
  var id = req.body.id || req.query.id;
  //var startDay=req.body.startDay||req.query.startDay;
  //var endDay=req.body.endDay||req.query.endDay;
  var num = req.body.num || req.query.num;
  var profit = req.body.profit || req.query.profit;
  var arrlen = parseInt(num);
  //var start=new Date(startDay);
  //var end=new Date(endDay);
  var aJsonArray = new Array();
  var myObj = new Object();
  var start;
  var end;
  var cntp = 0;
  var answer;

  console.log("num: " + arrlen);
  console.log("뭐야이게??????????" + profit);

  var database = req.app.get("database");
  async function foo() {
    var results = await database.ItemListModel.find({
      id: id,
      profit: profit,
      wholeday: { $gte: start, $lt: end },
    });
    answer = 0;

    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        console.log(start + ~+end + "의 결과는  " + results[i]._doc.price);
        answer += parseInt(results[i]._doc.price);
      }
    }
    console.log("기간은 " + start + "~" + end + ":" + answer);
    cntp = cntp + 1;
    aJsonArray.push(answer);

    console.log(aJsonArray);
    if (aJsonArray.length == arrlen) {
      res.writeHead("200", {
        "Content-Type": "application/json;charset=utf8",
      });

      res.write(JSON.stringify(aJsonArray));
      res.write(JSON.stringify(results));
      res.end();
    }
  }

  var startday = /^s/;
  for (var key in req.body) {
    //console.log(req.body);

    if (key != "num" && key != "id" && startday.exec(key) == "s") {
      start = new Date(req.body[key]);
      // 시작연도에 1을 더해 끝연도를 구하기 위해 형변환 시행
      req.body[key] *= 1;
      intend = req.body[key] + 1;
      console.log("끝" + intend);
      intend += "";

      end = new Date(intend);
      console.log("시작년도는:" + start);
      foo();
    }
  }

  console.log(aJsonArray);
};

var minusyearcheck = function (req, res) {
  console.log("yearlycashbook모듈에 yearcheck 함수 호출함");
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

var showminus = function (req, res) {
  console.log("itemlist모듈에 showminus함수 호출함");
  var id = req.body.id || req.query.id;
  var startDay = req.body.startDay || req.query.startDay;
  var endDay = req.body.endDay || req.query.endDay;
  //var num=req.body.num||req.query.num;
  var profit = req.body.profit || req.query.profit;
  //var arrlen=parseInt(num);
  var start = new Date(startDay);
  var end = new Date(endDay);
  console.log("시작끝" + startDay + "~" + endDay);
  console.log("시작끝" + start + "~" + end);
  console.log("수입" + profit);
  console.log("id" + id);
  var database = req.app.get("database");
  database.ItemListModel.find(
    { /* id: id, wholeday:{$gte:start,$lte:end},*/ profit: profit },
    function (err, results) {
      if (err) {
        console.log(err);
        return res.end(err);
      }
      if (results.length > 0) {
        res.writeHead("200", {
          "Content-Type": "application/json;charset=utf8",
        });

        res.write(JSON.stringify(results));
        res.end();
      } else {
        res.write("[]");
        res.end();
      }
    }
  );
};

module.exports.plusyearcheck = plusyearcheck;
module.exports.minusyearcheck = minusyearcheck;
module.exports.showminus = showminus;
