module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    display_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  },
    {
      timestamps: false,
      tableName: 'users',
      underscored: false,
    }
  );

  User.associate = (models) => {

    User.hasMany(models.BlogPost,
      { foreignKey: 'user_id', as: 'blog_posts' });
  };

  return User;
};