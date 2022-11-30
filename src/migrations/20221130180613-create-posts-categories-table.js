'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER,
        field: 'post_id',
        allowNull: false,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('posts_categories');
  },
};
