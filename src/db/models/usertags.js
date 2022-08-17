const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tag }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Tag, { foreignKey: 'tagId' });
    }
  }
  UserTags.init({
    userId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
    isFavorite: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'UserTags',
  });
  return UserTags;
};
