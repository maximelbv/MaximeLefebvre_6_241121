import mongoose from 'mongoose';
// used to check the uniqueness of a data
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('user',userSchema);