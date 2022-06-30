const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const jsonParser = express.json();

router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/posts", jsonParser, async (req, res) => {
  if(!req.body) return res.sendStatus(400);

  const userName = req.body.title;
  const userAge = req.body.content;
  const post = new Post({title: userName, content: userAge});
  post.save(function(err){
    if(err) return console.log(err);
    res.send(req.body);
  });
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.put("/posts/:id", jsonParser, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.id },
      {
        title : req.body.title,
        content : req.body.content
      });

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

module.exports = router;
