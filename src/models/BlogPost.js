module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    user_id: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  },
    {
      timestamps: false,
      tableName: 'blog_posts',
      underscored: false,
    }
  );

  BlogPost.associate = (models) => {

    BlogPost.hasMany(models.PostCategory,
      { foreignKey: 'post_id', as: 'blog_posts' });

    BlogPost.belongsTo(models.User,
      { foreignKey: 'user_id', as: 'user' });
  };

  return BlogPost;
};