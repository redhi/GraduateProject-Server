var _ = require("lodash");

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

var randomcodecheck = function (req, res) {
  console.log("betcashbook모듈에 randomcodecheck 함수 호출함");
  var inviteCode = req.body.inviteCode || req.query.inviteCode;
  console.log(inviteCode);
  var database = req.app.get("database");
  database.BetCashBookModel.find(
    { inviteCode: inviteCode },
    function (err, results) {
      if (err) {
        console.log(err);
        return res.end(err);
      }
      if (results.length > 0) {
        console.log(results);
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
        console.log("데베에 없음");
      }
    }
  );
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
var idarraycheck2 = function (req, res) {
  console.log("betcashbook모듈에 idarraycheck2 함수 호출함");
  var startDay = req.body.startDay || req.query.startDay;
  var endDay = req.body.endDay || req.query.endDay;
  var category = req.body.category || req.query.category;
  var num = req.body.num || req.query.num;
  var num2 = parseInt(num);
  var start = new Date(startDay);
  var end = new Date(endDay);
  var aJsonArray = new Array();
  var myObj = new Object();
  var str;
  var cntp = 0;
  var answer;
  console.log(start);
  console.log("num: " + num2);
  console.log(end);
  console.log(category);
  var database = req.app.get("database");
  async function foo() {
    var results = await database.ItemListModel.find({
      id: str,
      category: category,
      wholeday: { $gte: start, $lte: end },
    });
    answer = 0;
    console.log("str2: " + str);
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        console.log("결과는" + results[i]._doc.price);
        answer += parseInt(results[i]._doc.price);
      }
    }
    console.log("str,ans" + str + ":" + answer);
    cntp = cntp + 1;
    aJsonArray.push(answer);

    console.log(aJsonArray);
    if (aJsonArray.length == num2) {
      res.writeHead("200", {
        "Content-Type": "application/json;charset=utf8",
      });

      res.write(JSON.stringify(aJsonArray));
      res.end();
    }
  }

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
      foo();
    }
  }

  console.log(aJsonArray);

  //console.log("myobj="+myObj);

  //console.log("answer은:"+answer);

  // console.log("여기str==="+str);

  //myObj[str]=answer;

  // console.log("myObj: "+myObj);

  // var str=req.body[key];
  //console.log(req.body[key]);

  // console.log(myObj);
};
module.exports.randomcodecheck = randomcodecheck;
module.exports.addbetcashbook = addbetcashbook;
module.exports.showbetcashbook = showbetcashbook;
module.exports.showdetailbetcashbook = showdetailbetcashbook;
module.exports.deletebetcashbook = deletebetcashbook;
module.exports.invitebetcashbook = invitebetcashbook;
module.exports.idarraycheck2 = idarraycheck2;
