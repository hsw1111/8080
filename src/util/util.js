/**
 * 原生js仿 jq的 Siblings()兄弟选择器
*/
export function siblings (elem) {
    var nodes = [] // 定义一个数组，用来存elem的兄弟元素
    var previ = elem.previousSibling
    while (previ) { // 先取o的哥哥们判断有没有上一个哥哥元素，如果有则往下执行previ表示previousSibling
      if (previ.nodeType === 1) {
        nodes.push(previ)
      }
      previ = previ.previousSibling // 最后把上一个节点赋给previ
    }
    nodes.reverse()
    var nexts = elem.nextSibling // 再取elem的弟弟
    while (nexts) { // 判断有没有下一个弟弟结点nexts是nextSibling的意思
      if (nexts.nodeType === 1) {
        nodes.push(nexts)
      }
      nexts = nexts.nextSibling
    }
    return nodes
  }
  
  /**
   * 邮箱验证
   */
  export function isEmail (str) {
    var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+.)+[A-Za-z0-9]{2,3}$/
    if (myReg.test(str)) {
      return true
    } else {
      return false
    }
  }
  /**
   * 用途：检查输入手机号码是否正确
    输入：
    s：字符串
    返回：
    如果通过验证返回true,否则返回false
   */
  export function checkMobile (s) {
    var regu = /^[1][3-9][0-9]{9}$/
    var re = new RegExp(regu)
    if (re.test(s)) {
      return true
    } else {
      return false
    }
  }
  /**
   * 验证非负正整数
   * @param {*} value
   */
  export function checkPositiveNumber (value) {
    if (!isNaN(value)) {
       // 验证正整数包括0
      var bool = /^(0|[1-9][0-9]*)$/.test(value)
      return bool
    } else {
      return false
    }
  }
  
  /**
   * 用户名 验证 英文字母开头+ 数字组合
   */
  export function checkUserName (string) {
    if (string !== '') {
      var reg = /^[a-zA-Z][\w]{0,}$/
      return reg.test(string)
    }
  }
  /**
   * 设置cookie
   */
  
  export function setCookie (name, value) {
    var Days = 30
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  }
  /**
   * 读取cookie
   */
  export function getCookie (name) {
    // console.log(name)
    var arr = null
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (document.cookie) {
      arr = document.cookie.match(reg)  
    } else {
      arr = []
    }
    return arr[2]
  }
  /**
   * 删除cookie
   */
  export function delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  }
  
  /**
   *  如果需要设定自定义过期时间
   *  那么把上面的setCookie函数换成下面两个函数就ok;
   *  程序代码
   */
  export function setCookieWithTime (name, value, time) {
    var strsec = getsec(time)
    var exp = new Date()
    exp.setTime(exp.getTime() + strsec * 1)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  }
  export function getsec (str) {
    var str1 = str.substring(1, str.length) * 1
    var str2 = str.substring(0, 1)
    if (str2 === 's') {
      return str1 * 1000
    } else if (str2 === 'h') {
      return str1 * 60 * 60 * 1000
    } else if (str2 === 'd') {
      return str1 * 24 * 60 * 60 * 1000
    }
  }
  /**
   * 判断表单是否为空
   */
  export function IsEmpty (keyVal) {
    if (keyVal.length === 0) {
      return true
    } else {
      return false
    }
  }
  /**
   * 验证身份证
   * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
   * @param {*string} card
   */
  export function isCardNo (card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (reg.test(card) === false) {
      return false
    } else {
      return true
    }
  }
  /**
   * 验证护照
   */
  export function isPassportNo (card) {
    var reg = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/
    if (reg.test(card) === false) {
      return false
    } else {
      return true
    }
  }
  /*数组去重*/
  Array.prototype.unique = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
     if(!json[this[i]]){
      res.push(this[i]);
      json[this[i]] = 1;
     }
    }
    return res;
   }