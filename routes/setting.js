var deleteuser = function (req, res) {
  // 제목에 해당하는거 다 삭제
  console.log("itemlist모듈에 deleteuser 함수 호출함");
  var id = req.body.id || req.query.id;

  var database = req.app.get("database");
  database.BetCashBookModel.updateMany(
    { id: id },
    { $pull: { id: id } },
    function (err, results) {
      console.log(id);
      if (err) {
        console.log(err);
        return res.end(err);
      }
    }
  );
  database.ItemListModel.remove({ id: id }, function (err) {
    if (err) {
      res.writeHead("200", { "Content-Type": "application/json;charset=utf8" });
      var message = { success: false };
      res.write(JSON.stringify(message));
      res.end();
      return;
    }
  });

  database.MemberModel.remove({ id: id }, function (err) {
    if (err) {
      res.writeHead("200", {
        "Content-Type": "application/json;charset=utf8",
      });
      var message = { success: false };
      res.write(JSON.stringify(message));
      res.end();
      return;
    }
    res.writeHead("200", { "Content-Type": "application/json;charset=utf8" });
    var message = { success: true };
    res.write(JSON.stringify(message));
    res.end();
    return;
  });
};

var setbudget = function (req, res) {
  console.log("setting모듈에 setbudget함수 호출함");
  var budget = req.body.budget || req.query.budget;

  var id = req.body.id || req.query.id;
  var database = req.app.get("database");
  database.MemberModel.findOneAndUpdate(
    { id: id },
    { $set: { budget: budget } },
    function (err, results) {
      console.log(budget);
      console.log(id);
      if (err) {
        console.log(err);
        return res.end(err);
      }
      //console.log(Object.keys(results).length);
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

var setphoto = function (req, res) {
  console.log("setting모듈에 setbudget함수 호출함");
  var photoname = req.body.photoname || req.query.photoname;

  var id = req.body.id || req.query.id;
  var database = req.app.get("database");
  database.MemberModel.findOneAndUpdate(
    { id: id },
    { $set: { photoname: photoname } },
    function (err, results) {
      console.log(photoname);
      console.log(id);
      if (err) {
        console.log(err);
        return res.end(err);
      }
      //console.log(Object.keys(results).length);
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

module.exports.deleteuser = deleteuser;
module.exports.setbudget = setbudget;
module.exports.setphoto = setphoto;
