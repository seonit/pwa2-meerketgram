import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { reissueThunk } from '../store/thunks/authThunk.js';

// store 저장용 변수
let store = null;

// store 주입용 함수
export function injectStoreInAxios(_store) {
  store = _store;
}

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '', // 기본 URL (axios 호출 시, 가장 앞에 자동으로 연결하여 동작)
  headers: {
    'Content-Type': 'application/json',
  },
  // 크로스 도메인(서로 다른 도메인)에 요청 보낼 때, credentionial 정보를 담아서 보낼지 지정
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const noRetry = /^\/api\/auth\/reissue$/;
  let {accessToken } = store.getState().auth;

  try {
  if(accessToken && !noRetry.test(config.url)) {
    // 엑세스 토큰 만료 확인
    const claims = jwtDecode(accessToken);
    const now = dayjs().unix();
    const expTime = dayjs.unix(claims.exp).add(-5, 'minute').unix();

    if(now >= expTime) {
      config._retry = true;
      console.log('만료돼서 엑세스토큰 재발급');
      const response = await store.dispatch(reissueThunk()).unwrap();
      accessToken = response.data.accessToken;
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
} catch(error) {
  console.log('axios interceptor', error);
  return Promise.reject(error);
}
});


export default axiosInstance;