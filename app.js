const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');


const app = express();

const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');

//connect DB
mongoose.connect('mongodb://localhost:27017/cleanblog-test-db');

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'PUT'],
  })
);

app.get('/', postController.getAllPost);

app.get('/posts/:id',pageController.getPostPage);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/post/edit/:id', pageController.getEditPage);

app.post('/posts', postController.addPost);

app.delete('/post/:id', postController.deletePost);

app.put('/post/update/:id', postController.editPost );



const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
