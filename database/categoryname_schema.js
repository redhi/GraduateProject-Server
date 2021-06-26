var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var CategoryNameSchema = mongoose.Schema({
            id: {type: String, 'default':''},
	    categoryname: {type: String, 'default':''},
       
        
	    
	    
	});
    return CategoryNameSchema;
};
// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;
