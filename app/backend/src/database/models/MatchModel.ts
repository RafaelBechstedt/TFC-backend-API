import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  declare id: number;
  declare homeTeamId: string;
  declare homeTeamGoals: string;
  declare awayTeamId: string;
  declare awayTeamGoals: string;
  declare inProgress: string;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'match',
  underscored: true,
  timestamps: false,
});

export default Match;
