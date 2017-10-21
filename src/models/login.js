import * as service from '../services/login';
import { browserHistory } from 'react-router';
import { message } from 'antd';

export default {

  namespace: 'login',

  state: {
    loading: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          message.info('进入了登录页');
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      if(!payload.userName || !payload.passWord) {
        message.error('请输入账号密码');
        return;
      }
      yield put({ type: 'loadingShow' });
      const { data } = yield call(service.login, payload);
      if(data.code === '200') {
        yield put({ type: 'loadingHide' });
        browserHistory.push('/home');
      }else {
        yield put({ type: 'loadingHide' });
        message.error('登录失败');
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    loadingShow(state) {
      return { ...state, loading: true};
    },
    loadingHide(state) {
      return { ...state, loading: false};
    }
  },

};
