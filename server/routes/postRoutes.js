import express from 'express';
import * as dotenv from 'dotenv';

//v2 -version 2 of cloudinary
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

//displaying all posts (get req)
router.route('/').get(async (req, res) => {

    try{
        const posts = await Post.find({}); //finds all the posts in the database
        res.status(200).json({ success: true, data: posts }); //sends the posts as the response body if no error occurs
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }


});

//creating a post

router.route('/').post(async (req, res) => {

    try{
        const { name, prompt, photo } = req.body; //passing data frm frontend
        const photoUrl = await cloudinary.uploader.upload(photo); //the photo is uploaded to cloudinary and the url is returned
        
        console.log("photo is:" ,photoUrl.url);

    //creates an entry in the database
    const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
    });

    

    newPost.save(); //saves the new post in the database

    res.status(200).json({ success: true, data: newPost }); // the new post is sent as the response body if no error occurs to the frontend
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }


});




export default router;