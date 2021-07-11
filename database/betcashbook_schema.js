var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var BetCashBookSchema = mongoose.Schema({
	    groupname: {type: String, 'default':''},
        goal:{type:String,required:true,'default':''},
        goalprice: {type: Number, 'default':''},
        reward: {type: String, 'default':''},
        penalty:{type: String, 'default':''}
        ,
        startDay:[ {year: {type: Number, 'default':''},
        month: {type: Number, 'default':''},
        date: {type: Number, 'default':''}}],
        endDay:[ {year: {type: Number, 'default':''},
        month: {type: Number, 'default':''},
        date: {type: Number, 'default':''}}],
        id: {type: String, 'default':''}
       
        //BoardExample에 post_schema참조  ,   ref-config.js확인 부탁 바람 제발
        refMember:{type:mongoose.Schema.ObjectId,ref:'member'},
        refItemlist:{type:mongoose.Schema.ObjectId,ref:'itemlist'},
        inviteCode:{type: String, 'default':''}
    
	  
	   
        
	    
	    
	});
    return BetCashBookSchema;
};
	

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;
