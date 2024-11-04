const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config();

const app = express();

app.use(cors({origin:true, credentials:true}));
app.use(express.json());

// API 라우트 추가
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

// 서버 시작
const PORT = process.env.PORT || 5000; // 백엔드 서버를 5000번 포트에서 실행
app.listen(PORT, () => {
  console.log(`> Backend server ready on http://localhost:${PORT}`);
});
