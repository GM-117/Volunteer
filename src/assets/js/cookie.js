import {
  base64encode, utf8to16, utf16to8, base64decode,
} from './base64'

function changeStr(str) {
  const arr = str.split('')
  const arr1 = arr.filter((item, index) => index % 2 === 0)
  const arr2 = arr.filter((item, index) => index % 2 === 1)
  let str1 = ''
  // eslint-disable-next-line guard-for-in
  for (const i in arr1.length > arr2.length ? arr1 : arr2) {
    if (arr2[i] !== undefined) {
      str1 += arr2[i]
    }
    if (arr1[i] !== undefined) {
      str1 += arr1[i]
    }
  }
  return str1
}
class Cookie {
  constructor(name) {
    this.name = name
  }

  setCookie(value, expiredays) {
    let cookieValue
    if (typeof (value) === 'object') {
      cookieValue = JSON.stringify(value)
    } else {
      cookieValue = value
    }
    const data = new Date()
    data.setDate(data.getDate() + expiredays)
    document.cookie = `${this.name}=${changeStr(base64encode(utf16to8(cookieValue)))
    }${base64encode('one-sport')}${(expiredays == null) ? '' : `;expires=${data.toGMTString()}`}path=/`
  }

  getCookie() {
    if (document.cookie.length > 0) {
      let startIndex = document.cookie.indexOf(`${this.name}=`)
      if (startIndex !== -1) {
        startIndex = startIndex + this.name.length + 1
        let endIndex = document.cookie.indexOf(';', startIndex)
        if (endIndex === -1) {
          endIndex = document.cookie.length
        }
        return utf8to16(base64decode(changeStr(document.cookie.substring(startIndex, endIndex).replace(`${base64encode('one-sport')}`, ''))))
      }
    }
    return null
  }

  delCookie() {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    document.cookie = `${this.name}=0;expires=${new Date(0).toUTCString()}`
  }
}

export default Cookie
