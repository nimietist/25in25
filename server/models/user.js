export default function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
  return User;
}
