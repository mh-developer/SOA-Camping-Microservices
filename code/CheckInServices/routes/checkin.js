const { json } = require("express");
const express = require("express");
const Posts = require("../models/Posts");
const router = express.Router();

let welcome_string="Welcome to AbusementPark! We hope you enjoy your stay! If you have any questions please contact Marko!"

/** 
*   @swagger 
*   /:
*   get:
*       description: Use to get all checkings  
*       responses:
*           200:
*               description: A successfull response
*/
router.get("/", async (req, res) => {
    try{
        const posts = await Posts.find();
        if(!posts) throw Error("no items!")
        res.status(200).json(posts);

    }catch(err){
        res.status(400).json({msg: err})
    }
})
/** 
* @swagger 
*   /informations:
*   get:
*       description: Use to get all checkings  
*       responses:
*           200:
*               description: A successfull response
*/
router.get("/informations", async (req, res) => {
    try{
        res.send(welcome_string)

    }catch(err){
        res.status(400).json({msg: err})
    }
})
router.get("/:name", async (req, res) => {
    try{
        const name = await Posts.findById(req.params.name);
        if(!name) throw Error("no items!")
        res.status(200).json(name);

    }catch(err){
        res.status(400).json({msg: err})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const posts = await Posts.findById(req.params.id);
        if(!posts) throw Error("no items!")
        res.status(200).json(posts);

    }catch(err){
        res.status(400).json({msg: err})
    }
})
router.post("/", async (req,res) => {
    //console.log(req.body)

    const newPost = new Posts(req.body);

    try{
        const post = await newPost.save()
        if(!post) throw Error("Something went wrong. Saving post to DB!")

        res.status(200).json(post);
    }catch(err){
        res.status(400).json({msg: err})
    }
})
router.post("/informations", async (req,res) => {
    //console.log(req.body)

    const newPost = new Posts(req.body);

    try{
        const post = await newPost.save()
        if(!post) throw Error("Something went wrong. Saving post to DB!")

        res.status(200).json(post);
    }catch(err){
        res.status(400).json({msg: err})
    }
})

//delete
router.delete("/:id", async (req, res) => {
    try{
        const post = await Posts.findByIdAndDelete(req.params.id)
        if(!post) throw Error("no post found!")
        res.status(200).json( {success: true});

    }catch(err){
        res.status(400).json({msg: err})
        
    }
})

//put aka update
router.patch("/:id", async (req, res) => {
    try{
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body)
        if(!post) throw Error("no post found!")
        res.status(200).json( {success: true});

    }catch(err){
        res.status(400).json({msg: err})
        
    }
})
//put aka update
router.put("/:id", async (req, res) => {
    try{
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body)
        if(!post) throw Error("no post found!")
        res.status(200).json( {success: true});

    }catch(err){
        res.status(400).json({msg: err})
        
    }
})


module.exports= router