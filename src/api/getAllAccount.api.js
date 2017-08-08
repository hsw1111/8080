import request from 'superagent'
import {host} from '../config/index.js'
export const getAllAccount = function (query, cb) {
  request
    .post(host + 'beepartner/Franchisee/User/findFranchiseeUser')
    .withCredentials()
    .set({
      'content-type': 'application/x-www-form-urlencoded'
    })
    .send(query)
    .end(function (error, res) {
      cb(error, res)
    })
}
