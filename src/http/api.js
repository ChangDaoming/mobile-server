import request from './request'

/* 用户相关接口
   1. 获取用户列表
   2. 用户登录
   3. 用户注册
   4. 删除用户
   5. 获取用户信息
*/
// 获取用户列表
export function getUsers() {
  return request({
    url: '/users/list',
    method: 'get'
  })
}
// 用户登录
export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}
// 用户注册
export function register(data) {
  return request({
    url: '/users/create',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteUser(data) {
  return request({
    url: '/users/delete',
    method: 'delete',
    data
  })
}
// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
