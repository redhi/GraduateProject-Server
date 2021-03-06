var Schema = {};

Schema.createSchema = function (mongoose) {
  // 스키마 정의
  var ItemListSchema = mongoose.Schema({
    title: { type: String, default: "" },
    itemname: { type: String, required: true, default: "" },
    price: { type: Number, default: "" },
    category: { type: String, default: "" },
    paymethod: { type: String, default: "" }, //카드 현금 기타
    //수입지출
    profit: { type: String, default: "" },
    amount: { type: Number, default: "" },
    wholeDay: { type: Date, default: "" },
    year: { type: Number, default: "" },
    month: { type: Number, default: "" },
    date: { type: Number, default: "" },
    //BoardExample에 post_schema참조  ,   ref-config.js확인 부탁 바람 제발
    id: { type: String, default: "" },
  });

  ItemListSchema.static("findAll", function (id, callback) {
    return this.find({}, callback);
  });

  console.log("ItemListSchema 정의함.");

  return ItemListSchema;
};

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;
