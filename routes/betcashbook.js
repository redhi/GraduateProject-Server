var _ = require("lodash");

var groupvalidate = function (req, res) {
  console.log("login모듈에 validate함수 호출함");
  var inviteCode = req.body.inviteCode || req.query.inviteCode;
  var database = req.app.get("database");
  console.log(inviteCode);
  if (database.db) {
    database.BetCashBookModel.findOne(
      { inviteCode: inviteCode },
      function (err, results) {
        if (err) {
          console.log("데이터베이스에서 사용자 확인하는 과정중 오류 발생함");
          return;
        }
        if (results === null) {
          console.log("아직 사용되지 않은 랜덤코드임");
          res.writeHead("200", {
            "Content-Type": "application/json;charset=utf8",
          });
          var message = { success: true };
          res.write(JSON.stringify(message));
          res.end();
        } else {
          console.log("이미 존재하는 랜덤코드임");
          res.writeHead("200", {
            "Content-Type": "application/json;charset=utf8",
          });
          var message = { success: false };
          res.write(JSON.stringify(message));
          res.end();
        }
      }
    );
  } else {
    console.log("데이터베이스가 연결되어 있지않음");
  }
};

var addbetcashbook = function (req, res) {
  console.log("betcashbook모듈에 addbetcashbook 함수 호출함");

  var groupname = req.body.groupname || req.query.groupname;
  var goal = req.body.goal || req.query.goal;
  var goalprice = req.body.goalprice || req.query.goalprice;
  var reward = req.body.reward || req.query.reward;
  var penalty = req.body.penalty || req.query.penalty;
  var endDay = req.body.endDay || req.query.endDay;
  var startDay = req.body.startDay || req.query.startDay;
  var inviteCode = req.body.inviteCode || req.query.inviteCode;
  //var month = req.body.m//onth || re//q.query.month;
  //var date = req.body.date// || req.quer//y.date;
  var id = req.body.id || req.query.id;
  var category = req.body.category || req.query.category;
  var database = req.app.get("database");
  var betcashbook = new database.BetCashBookModel({
    groupname: groupname,
    goal: goal,
    goalprice: goalprice,
    reward: reward,
    penalty: penalty,
    endDay: endDay,
    startDay: startDay,
    inviteCode: inviteCode,
    //   // month: month,
    //    d//ate: date,
    id: id,
    category: category,
  });
  betcashbook.save(function (err) {
    if (err) {
      res.writeHead("200", { "Content-Type": "application/json;charset=utf8" });
      var message = { success: false, error: err.message };
      res.write(JSON.stringify(message));
      res.end();
      return;
    }
    console.log(id + "에 itemlist추가함");
    console.dir(betcashbook);
    res.writeHead("200", { "Content-Type": "application/json;charset=utf8" });
    var message = { success: true };
    res.write(JSON.stringify(message));
    res.end();
  });
};

var showbetcashbook = function (req, res) {
  console.log("itemlist모듈에 showbetcashbook함수 호출함");
  var id = req.params.id;

  var database = req.app.get("database");
  database.BetCashBookModel.find({ id: id }, function (err, results) {
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
  });
};

var showdetailbetcashbook = function (req, res) {
  console.log("itemlist모듈에 showdetailbetcashbook함수 호출함");
  var inviteCode = req.params.inviteCode;

  var database = req.app.get("database");
  database.BetCashBookModel.find(
    { inviteCode: inviteCode },
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

var deletebetcashbook = function (req, res) {
  // 제목에 해당하는거 다 삭제
  console.log("itemlist모듈에 deletebetcashbook 함수 호출함");
  var inviteCode = req.body.inviteCode || req.query.inviteCode;
  var id = req.body.id || req.body.id;
  var database = req.app.get("database");

  database.BetCashBookModel.update(
    { inviteCode: inviteCode },
    { $pull: { id: id } },
    function (err, results) {
      console.log(inviteCode);
      console.log(id);
      if (err) {
        console.log(err);
        return res.end(err);
      }
      if (results.length > 0) {
        console.log("들어옴");

        res.writeHead("200", {
          "Content-Type": "application/json;charset=utf8",
        });
        var message = { success: false };
        res.write(JSON.stringify(message));
        res.end();
      } else {
        res.writeHead("200", {
          "Content-Type": "application/json;charset=utf8",
        });
        var message = { success: true };
        res.write(JSON.stringify(message));
        res.end();
      }
    }
  );
};

var invitebetcashbook = function (req, res) {
  console.log("betcashbook모듈에 invitebetcashbook함수 호출함");
  var inviteCode = req.body.inviteCode || req.query.inviteCode;

  var id = req.body.id || req.query.id;
  var database = req.app.get("database");
  database.BetCashBookModel.findOneAndUpdate(
    { inviteCode: inviteCode },
    { $push: { id: id } },
    function (err, results) {
      console.log(inviteCode);
      console.log(id);
      if (err) {
        console.log(err);
        return res.end(err);
      }
      console.log(Object.keys(results).length);
      if (Object.keys(results).length > 0) {
        console.log("들어옴");

        res.writeHead("200", {
          "Content-Type": "application/json;charset=utf8",
        });
        res.write(JSON.stringify(results));
        res.end();
      } else {
        res.write("0");
        res.end();
      }
    }
  );
};

var idarraycheck = function (req, res) {
  console.log("betcashbook모듈에 idarraycheck 함수 호출함");
  var aJsonArray1 = new Array();
  var aJsonArray2 = new Array();
  var aJsonArray3 = new Array(); //aJsonArray1의 length가 num2가 됬을때 옮김
  var aJsonArray4 = new Array(); //aJsonArray2의 length가 num2가 됬을때 옮김
  var nameArray = new Array();

  var startDay = req.body.startDay || req.query.startDay;
  var endDay = req.body.endDay || req.query.endDay;
  var category = req.body.category || req.query.category;
  var num = req.body.num || req.query.num;
  var num2 = parseInt(num);
  var start = new Date(startDay);
  var end = new Date(endDay);
  console.log("num: " + num2);
  console.log(start);
  console.log(end);

  for (var key in req.body) {
    console.log(req.body);
    if (
      key != "startDay" &&
      key != "endDay" &&
      key != "category" &&
      key != "num"
    ) {
      str = req.body[key];
      console.log("아이디는:" + str);
      nameArray.push(str);
    }
  }
  /* console.log("nameArray: "+nameArray);
    for(var i=0; i<nameArray.length; i++){
        console.log("nameArray:=======: "+nameArray[i]);
    }
    for(var value of nameArray){
        console.log("nameArrayvalue==========:" +value);
    }*/

  var database = req.app.get("database");
  for (var i = 0; i < nameArray.length; i++) {
    var ids;

    var value = nameArray[i];
    console.log("value: " + value);

    database.ItemListModel.find(
      { id: value, category: category, wholeday: { $gte: start, $lte: end } },
      function (err, results) {
        var answer = 0;
        console.log("value-find안에: " + value);
        if (results.length > 0) {
          ids = results[0]._doc.id;
          for (var i = 0; i < results.length; i++) {
            console.log("결과는" + results[i]._doc.price);
            console.log("결과는id" + results[i]._doc.id);

            answer += parseInt(results[i]._doc.price);
          }
          var message = { id: ids, money: answer };
        } else {
          var message = { id: "---", money: answer };
        }

        console.log("str,ans" + value + ":" + answer);
        // aJsonArray1.push(answer);
        aJsonArray1.push(message);
        console.log("ajsonarray1는" + aJsonArray1);
        if (aJsonArray1.length == num2) {
          console.log("두번째로 들어옴: ");

          for (var j = 0; j < nameArray.length; j++) {
            console.log("value2: " + value2);

            var value2 = nameArray[j];

            database.MemberModel.find({ id: value2 }, function (err, results2) {
              if (results2.length > 0) {
                aJsonArray2.push(results2);
                console.log("ajsonarray는" + aJsonArray2);
              }
              if (aJsonArray2.length == num2) {
                //aJsonArray4.push(aJsonArray2);
                /// console.log("ajaonarray4는= "+aJsonArray4);
                console.log("ajsonarray2완료");
                aJsonArray1.push(aJsonArray2);
                console.log("array끼리 붙인거: " + aJsonArray1);
                res.writeHead("200", {
                  "Content-Type": "application/json;charset=utf8",
                });

                res.write(JSON.stringify(aJsonArray1));
                res.end();
              }
            });
          }
        }
      }
    );
  }

  // var documemtArray=myCursor.toArray();
};

module.exports.addbetcashbook = addbetcashbook;
module.exports.showbetcashbook = showbetcashbook;
module.exports.showdetailbetcashbook = showdetailbetcashbook;
module.exports.deletebetcashbook = deletebetcashbook;
module.exports.invitebetcashbook = invitebetcashbook;
module.exports.idarraycheck = idarraycheck;
module.exports.groupvalidate = groupvalidate;
