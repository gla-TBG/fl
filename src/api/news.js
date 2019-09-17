import axios from 'axios'

const baseUrl = 'http://47.105.184.58:8080/qs-one-0.0.1-SNAPSHOT/api/web/news/'

// 首页接口
export const getHomeApi = () => {
  return axios({
    method: 'GET',
    url: baseUrl + 'home'
  })
}
// 推荐新闻列表
export const getRecomendListApi = () => {
  return axios({
    url: baseUrl + 'topnews',
    method: 'GET'
  })
}
// 搜索新闻列表
export const getSeacrhListApi = (title, pageNum, pageSize) => {
  return axios({
    url: baseUrl + 'newseach',
    params: {
      title: title,
      pageNum: pageNum,
      pageSize: pageSize
    },
    method: 'GET'
  })
}
// 新闻详接口
export const getNewsInfoApi = (id) => {
  return axios({
    url: baseUrl + id,
    method: 'GET'
  })
}
// 提交评价
export const submitCommentApi = (content, newsId, userId) => {
  const data = {
    content: content,
    newsId: newsId,
    userId: userId
  }
  return axios({
    url: baseUrl + 'comment',
    data,
    method: 'POST'
  })
}
// 获取分类新闻列表
export const getTypeNewsApi = (typeId) => {
  return axios({
    url: baseUrl + 'type/' + typeId,
    params: {
      pageNum: 1,
      pageSize: 5
    },
    method: 'GET'
  })
}
// 发布新闻
export const publishNewApi = (title, content, userId, newsPhoto, newstypeId) => {
  const data = {
    title,
    content,
    userId,
    newsPhoto,
    newstypeId
  }
  return axios({
    url: baseUrl,
    data,
    method: 'POST'
  })
}
// 发布公告
export const publishNoticeApi = (title, content, userId, newstypeId) => {
  const data = {
    title,
    content,
    userId,
    newstypeId
  }
  return axios({
    url: baseUrl,
    data,
    method: 'POST'
  })
}
// 删除新闻
export const delNewsApi = (newId) => {
  return axios({
    url: baseUrl + newId,
    method: 'DELETE'
  })
}
// 设置热搜/推荐新闻
export const setNewsTypeApi = (userId, query) => {
  return axios({
    url: baseUrl + userId,
    data: query,
    method: 'PUT'
  })
}
