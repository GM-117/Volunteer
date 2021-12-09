/*
 * @Author: XUnz
 * @Date: 2021-05-19 13:40:35
 * @LastEditors: guojinhu
 * @LastEditTime: 2021-06-03 18:42:47
 * @FilePath: \frontend\src\views\PersonalMana\dialog\applyCardDialogClass.js
 */

class searchFrom {
  constructor(type) {
    if (type === 'form') {
      this.checkInType = ''
      this.checkInTime = ''
      this.remark = ''
      this.checkInGroup = ''
      this.checkInPlace = ''
      this.longitude = ''
      this.latitude = ''
    } else if (type === 'rule') {
      this.signTime = [
        {
          required: true,
          message: '请选择补卡时间',
          trigger: 'blur',
        },
      ]
      this.remark = [
        {
          required: true,
          message: '请填写申请原因',
          trigger: 'blur',
        },
      ]
    }
  }
}
export default searchFrom
