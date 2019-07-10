const express = require("express"); //imports express package
const Posts = require("../data/db");
const router = express.Router(); //invokes router when used

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the posts" });
  }
});

router.get("/:id", async (req, res)=> {
    const id = req.params.id;
    try{
        const post = await Posts.findById(id)
        if (post && post.length) {
        res.status(200).json(post);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    } catch(error) {
        res.status(500).json({message: "The post information could not be retrieved."})
    }
})

router.get("/:id/comments", async(req, res)=> {
    const postId = req.params.id;
    try{
        const comments = await Posts.findPostComments(postId)
        if(comments && comments.length) {
            res.status(200).json(comments) 
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({message: "The comments information could not be retrieved"})
    }
})

router.post("/", async(req, res)=> {
    const {title, contents} = req.body
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    }else {
        try{
            const post = await Posts.insert(req.body);
            res.status(201).json(post)
        } catch {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        }
    }
})

router.post("/:id/comments", async(req, res)=> {
    if(!req.body.text){
        res.status(400).json({errorMessage: "Please provide text for the comment."})
    }else {    
    try{
        const comment = await Posts.insertComment(req.body)
        if(comment&&comment.length){
            res.status(201).json(comment)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    } catch {
        res.status(500).json({error: "There was an error while saving the comment to the database"})
    }
}
})

module.exports = router;
