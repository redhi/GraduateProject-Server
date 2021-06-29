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
  //var id = req.body.id || re//q.query.i//d;

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
    //    id:// id,
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

module.exports.addbetcashbook = addbetcashbook;
