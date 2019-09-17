import axios from 'axios'

const baseUrl = 'http://47.105.184.58:8080/qs-one-0.0.1-SNAPSHOT/api/web/'

// 会员登陆
export const loginApi = (username, password, type) => {
  const data = {
    username,
    password,
    type
  }
  return axios({
    url: baseUrl + 'checkuser',
    data,
    method: 'POST'
  })
}
// 会员注册
export const registerApi = (username, password, email) => {
  const data = {
    username,
    password,
    email
  }
  return axios({
    url: baseUrl + 'user',
    data,
    method: 'POST'
  })
}
// 用户名查重
export const checkUserNameAPi = (user_name) => {
  return axios({
    url: baseUrl + 'Checkusername/' + user_name,
    method: 'GET'
  })
}
// 获取用户信息
export const getUserInfoApi = (user_id) => {
  return axios({
    url: baseUrl + 'user',
    params: {
      id: user_id
    },
    method: 'GET'
  })
}
// 修改用户信息
export const editUserInfoApi = (user_id, info_query) => {
  return axios({
    url: baseUrl + 'user/' + user_id,
    data: info_query,
    method: 'PUT'
  })
}
