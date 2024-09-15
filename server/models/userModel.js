const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require: true
    }

}, {timestamps:true});

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();

});

userSchema.methods.matchPassword = async function(password){
    console.log(this.password)
    return await bcrypt.compare(password, this.password);
    
}


module.exports = mongoose.model('user', userSchema);