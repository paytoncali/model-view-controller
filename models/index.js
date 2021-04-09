const User = require('./user');
const Blogs = require('./blogs');

User.hasMany(Blogs, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blogs.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Blogs };
