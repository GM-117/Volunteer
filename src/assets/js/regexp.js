const regExpPhone = /^1[3456789]\d{9}$/; // 手机号 正则验证
// const regExpPassword = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/ // 密码正则验证
const regExpPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])[\da-zA-Z`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]{7,18}$/; // 密码正则验证
const regExpEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; // email正则验证
const isPassport = /^1[45][0-9]{7}|([P|p|S|s]\\d{7})|([S|s|G|g]\\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\\d{8})|([H|h|M|m]\\d{8,10})$/; // 护照
const isHKMacao = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/; // 港澳通行证
const isTaiwan = /^([a-zA-Z0-9]){8,10}$/; // 台湾通行证验证
const filterJg = /^[a-zA-Z0-9]{7,21}$/; // 军官证
const filterJg1 = /^[\u4E00-\u9FA5]{1,}(字第)([0-9a-zA-Z]{4,8})(号?)$/; // 军官证
const filterHx = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/; // 回乡证
const patternHongkong = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([0−9aA]\)|[0-9aA])$/; // 香港身份证
const patternTaiwan = /^[a-zA-Z][0-9]{9}$/; // 台湾身份证
const patternMacao = /^[1|5|7][0-9]{6}\([0-9Aa]\)/; // 澳门身份证
const isCardID = (sId) => {
  let iSum = 0;
  const aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外",
  };
  if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
  const idNum = sId.replace(/x$/i, "a");
  if (aCity[parseInt(idNum.substr(0, 2), 10)] === null) return "你的身份证地区非法";
  const sBirthday = `${idNum.substr(6, 4)}-${Number(idNum.substr(10, 2))}-${Number(idNum.substr(12, 2))}`;
  const d = new Date(sBirthday.replace(/-/g, "/"));
  if (sBirthday !== `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`) {
    return "身份证上的出生日期非法";
  }
  for (let i = 17; i >= 0; i -= 1) iSum += ((2 ** i) % 11) * parseInt(idNum.charAt(17 - i), 11);
  if (iSum % 11 !== 1) return "你输入的身份证号非法";
  // aCity[parseInt(sId.substr(0,2))]+','+sBirthday+','+(sId.substr(16,1)%2?'男':'女')//此次还可以判断出输入的身份证号的人性别
  return "true";
};

export {
  regExpPhone,
  isCardID,
  regExpPassword,
  regExpEmail,
  isPassport,
  isHKMacao,
  isTaiwan,
  filterJg,
  filterJg1,
  filterHx,
  patternHongkong,
  patternTaiwan,
  patternMacao,
};
