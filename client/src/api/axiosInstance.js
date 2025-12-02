import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '', // 기본 URL (axios 호출 시, 가장 앞에 자동으로 연결하여 동작)
  headers: {
    'Content-Type': 'application/json',
  },
  // 크로스 도메인(서로 다른 도메인)에 요청 보낼 때, credentionial 정보를 담아서 보낼지 지정
  withCredentials: true,
});

export default axiosInstance;