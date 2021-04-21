const sequelize = require('../config/connection');
const { User, Blogs, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const CommentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for(const post of postData) {
    await Blogs.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  for(const comment of CommentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();
