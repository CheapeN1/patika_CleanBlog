const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Posts = require('./models/post');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost:27017/cleanblog-test-db' , {
  useNewUrlParser : true,
  useUnifiedTopology:true,

})

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const posts = await Posts.find({})
  res.render('index', {
    posts
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async  (req, res) => {
  await Posts.create(req.body)
  res.redirect('/');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
