var _ = require("lodash");

var findmemberlist = function (req, res) {
  console.log("member모듈에 findmemberlist 함수 호출함");
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

module.exports.findmemberlist = findmemberlist;
