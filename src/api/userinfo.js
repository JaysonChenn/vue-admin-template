import request from './axios/api'

// 用户信息
export function UserInfoApi (params) {
  return request.get('auth/agent/users/' + params)
}