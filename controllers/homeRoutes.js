const router = require('express').Router();
const { Blogs, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Blogs.findAll({
      include: [
        {
          model: User, 
          attributes: ['name'],
        },
      ],
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Blogs.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['description', 'date_created', 'user_id'],
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render('singlepost', {
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const postData = await Blogs.findAll({
      include: [
        {
          model: User, 
          attributes: ['name'],
        },
      ],
      where: {
        user_id: req.session.user_id
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));
  
    res.render('profile', {
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
