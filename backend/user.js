const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true},
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcyrpt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.export = mongoose.model('User', userSchema);