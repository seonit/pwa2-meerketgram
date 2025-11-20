/**
 * @file app/repositories/user.repository/js
 * @description User Repository
 * 251120 v1.0.0 seon init
 */
import db from '../models/index.js';
const { User } = db;

async function findByEmail(t = null, email) {
  return await User.findOne(
    {
      where: {
        email: email
      }
    },
    {
      transacion: t
    }
  );
}

export default {
  findByEmail,
}