import mongoose from 'mongoose';

const Post= new mongoose.Schema({
    name:{type:String, required:true},
    prompt:{type:String, required:true},
    photo:{type:String, required:true},
});

const PostSchema = mongoose.model('Post', Post); //the one in quotes is the name whereas the one after the comma is the schema with name post assigned to it

export default PostSchema;