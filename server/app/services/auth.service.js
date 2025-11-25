/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 seon init
 */

import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERED_ERROR } from '../../configs/responseCode.config.js';
import jwtUtil from '../utils/jwt/jwt.util.js';


async function login(body) {
  const { email, password } = body;

  // email로 유저  정보 획득
  const user = await userRepository.findByEmail(null, email);

  // 유저 존재 여부 체크
  if(!user) {
    throw myError('유저 미존재', NOT_REGISTERED_ERROR);
  }

  // 비밀번호 체크
  if(!bcrypt.compareSync(password, user.password)) {
    throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR);
  }

  // JWT 생성(accessToken, refreshToken)
  const accessToken = jwtUtil.generateAccessToken(user);
  const refreshToken = jwtUtil.generateRefreshToken(user);

  // refreshToken 저장


  return {
    accessToken,
    refreshToken,
    user
  };
}

export default {
  login,
}