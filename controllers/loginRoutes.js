const router = require('express').Router();
const { Blogs, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  if (req.session.logged_in) {
      res.redirect('homepage');
      return;
    }
  res.render('login');
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }
  res.render('login');
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
      const postData = await Blogs.findAll({
          where:{
              user_id: req.session.user_id
          }
      });

      const posts = postData.map((posts) => posts.get({ plain: true }));

      res.render('homepage', {
          posts,
          logged_in: true
      });
  } catch (error) {
      res.status(500).json(error);
  }
});


router.get('/newPost', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('newPost',
  {
    logged_in: true,
  })
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Blogs.findByPk(req.params.id, {
      include: [{
        model: User
      }]
    });
    
    const post = postData.get({ plain: true});

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
