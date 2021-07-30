var _ = require("lodash");

var findmemberlist = function (req, res) {
  console.log("itemlist모듈에 showitemlist함수 호출함");
  var id = req.params.id;
  var database = req.app.get("database");
  database.MemberListModel.find({ id: id }, function (err, results) {
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
module.exports.findmemberlist = findmemberlist;
