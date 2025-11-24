/**
 * @file app/models/Like.js
 * @description like model
 * 251120 v1.0.0 seon init
 */

import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Like' // 모델 이름 정의

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '좋아요 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  postId: {
    field: 'post_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '게시글 PK'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

const options = {
  tableName: 'likes', // 실제 DB 테이블명
  timestamps: true,  // createdAt, updatedAt를 자동 관리
  paranoid: true,   // soft delete 설정 (deletedAt 자동 관리)
}

const User = {
  init: (sequelize) => {
    const define = sequelize.define(modelName,attributes, options);

    // JSON으로 serialize시, 제외할 컬럼을 지정
    define.prototype.toJSON = function() {
      const attributes = this.get();
      return attributes;
    }

    return define;
  },
  associate: (db) => {
    db.Like.belongsTo(db.User, { targetKey: 'id', foreignKey: 'userId', as: 'author' });
    db.Like.belongsTo(db.Post, { targetKey: 'id', foreignKey: 'postId', as: 'post' });
  },
};

export default User;