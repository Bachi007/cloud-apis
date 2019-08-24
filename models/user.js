var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
   
   
    email: String,
    username: String,
    password: String,
    passwordConf: String
}),

User = mongoose.model('Users', userSchema);



module.exports = User;