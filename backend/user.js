const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for a user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],  // Username must be provided
        unique: true,                              // Each username must be unique
        trim: true,                                // Removes extra spaces from the username
    },
    password: {
        type: String,
        required: [true, 'Password is required'],  // Password must be provided
    },
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    // If the password hasn't been changed, skip the hashing process
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt and hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Proceed to save the user
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

// Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model based on the schema
module.exports = mongoose.model('User', userSchema);
