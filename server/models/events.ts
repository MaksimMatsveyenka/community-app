import Sequelize from 'sequelize';
import { db } from './SequelizeConnect';
import { dbConfig } from 'config/dbconfig';
import { SequelizeStaticAndInstance } from 'sequelize';

export interface Event {
  id: number;
  title: string;
  description: string;
  city: string;;
  begginingInTime: string;
  begginingDate: string;
  isPublicEvent: boolean;
  isOnlineEvent: boolean;
}

export interface EventModel {
  event: Event;
  userId: number;
}

export const EventModel: SequelizeStaticAndInstance['Model'] = db.connect.define(
  dbConfig.eventModel,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(70),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    begginingInTime: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    begginingDate: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isPublicEvent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    },
    isOnlineEvent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: false
      }
    }
  },
  {
    // if freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
    // otherwise, the model name will be pluralized
    freezeTableName: true,
    // defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
    tableName: dbConfig.eventTable
  }
);
