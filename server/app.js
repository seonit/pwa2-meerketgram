/**
 * @file app.js
 * @description Entry Point
 * 251117 v1.0.0 seon
 */

import express from 'express';
import './configs/env.config.js';
import authRouter from './routes/auth.router.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);

// 해당 Port로 express 실행
app.listen(3000);