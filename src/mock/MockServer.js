import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/shopgoods', {code: 0, data: data.goods})
Mock.mock('/shopinfo', {code: 0, data: data.info})
Mock.mock('/shopratings', {code: 0, data: data.ratings})
