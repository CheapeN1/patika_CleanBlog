const Posts = require('../models/post');

exports.getAllPost = async (req, res) => {
    const posts = await Posts.find({}).sort({ dateCreated: -1 });
    res.render('index', {
      posts,
    });
  }

exports.addPost = async (req, res) => {
    await Posts.create(req.body);
    res.redirect('/');
  }

exports.deletePost = async (req, res) => {
    await Posts.findByIdAndDelete(req.params.id);
    res.redirect('/');
  }

exports.editPost = async (req, res) => {
    console.log("Gelen Form Verisi:", req.body);  // Form verisini burada kontrol edin
    
    const post = await Posts.findOne({ _id: req.params.id });
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();
  
    res.redirect(`/posts/${req.params.id}`);
  }