import request from '../utils/request';

export function login(params) {
  console.log('services处理');
  return request('/login', 'POST', params);
}
