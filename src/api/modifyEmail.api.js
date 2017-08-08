import request from 'superagent'
import {host} from '../config/index.js'
export const updateEmail = function (query, cb) {
  request
    .post(host + 'franchisee/account/updateEmail4Fran')
    .send(query)
    .end(function (error, res) {
      cb(error, res)
    })
}
