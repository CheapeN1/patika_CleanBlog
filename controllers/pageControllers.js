const Posts = require('../models/post');

exports.getAboutPage =  (req, res) => {
    res.render('about');
  }


exports.getAddPage = (req, res) => {
    res.render('add_post');
  }


exports.getPostPage =  async (req, res) => {
    const post = await Posts.findById(req.params.id);
    res.render('post', {
      post,
    });
  }


exports.getEditPage = async (req, res) => {
    const post = await Posts.findById(req.params.id);
  
    res.render('edit', {
      post,
    });
  }