const router = require('express').Router();
const homepageRoutes = require('./homepageRoutes');
const userRoutes = require('./userRoutes');

router.use('/homepage', homepageRoutes);
router.use('/users', userRoutes);

module.exports = router;
