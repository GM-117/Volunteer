class searchFrom {
  constructor(type) {
    if (type === 'form') {
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.value5 = ''
      this.value6 = ''
      this.value7 = ''
    } else if (type === 'rule') {
      this.value1 = [
        {
          required: true,
          message: '请选择院校信息',
          trigger: 'change',
        },
      ]
    }
  }
}
export default searchFrom
