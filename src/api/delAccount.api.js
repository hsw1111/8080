import request from 'superagent'
import {host} from '../config/index.js'
export const delAccount = function (query, cb) {
  request
    .post(host + 'beepartner/Franchisee/User/deleteFranchiseeUser')
    .withCredentials()
    .set({
      'content-type': 'application/x-www-form-urlencoded'
    })
    .send(query)
    .end(function (error, res) {
      cb(error, res)
    })
}
