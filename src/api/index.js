
import request from '../utils/request'
export function getArticleList(data) {
  return request({
    url: 'https://blog.kaier001.com/index.php/api/posts',
    method: 'get',
    data
  })
}
export function getArticleDetail(data) {
  return request({
    url: 'https://blog.kaier001.com/index.php/api/post',
    method: 'get',
    data
  })
}
export function getTags(data) {
  return request({
    url: 'https://blog.kaier001.com/index.php/api/tags',
    method: 'get',
    data
  })
}


export function getSetting(data) {
  return request({
    url: 'https://blog.kaier001.com/index.php/api/settings',
    method: 'get',
    data
  })
}

export function getCate(data) {
  return request({
    url: 'https://blog.kaier001.com/index.php/api/categories',
    method: 'get',
    data
  })
}

export function getComments(data) {
  return request({
    url: 'https://blog.kaier001.com/index.php/api/comments?cid=12',
    method: 'get',
    data
  })
}


