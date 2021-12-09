import { mapState } from 'vuex'
import md5 from 'js-md5'
import PageClass from '@/unit/pageClass'
import uploadHttp from '@/uploadHttp'

export default {
  data() {
    return {
      selectedArr: [],
      key: 'aa87d606-ba41-4d2e-85e6-fcd94e0e5ba3',
      userStatusAesKey: 'One@-!Sports456G',
      userStatusAesIv: 'One@-!SportsG654',
    }
  },
  computed: {
    ...mapState(['DROPDOWNBOX', 'TOKEN']),
  },
  methods: {
    /**
     * @function 关闭弹窗
     * @description 先初始化，然后传值到组件外部进行关闭
     **/
    closeDialog() {
      // this.$refs.form.resetFields()
      this.init()
      this.$emit('closeDialog', false)
    },
    /**
     * @function 打开弹窗调用的方法,一般是不用写
     */
    openDialog() {
      if (this.searchWidthOpen) {
        this.searchEvent()
      }
    },
    /**
     * @function 回显的时候获取数据
     * @param {String} url 获取回显的地址
     * @param {Object} data 请求接口的数据
     */
    // getDataQuery(url, data) {
    //   // 在这里获取回显的数据
    // },
    /**
     * @function 点击搜索按钮触发的事件，对分页进行初始化，然后获取数据
     */
    searchEvent() {
      this.form = { ...this.form, ...new PageClass(), pageSize: this.form.pageSize }
      // 这里执行搜索操作
      if (this.searchData) {
        this.searchData()
      }
    },
    /**
     * @function 分页尺寸修改方法
     * @param {Number} pageSize 修改后的分页大小
     */
    handleSizeChange(pageSize) {
      this.form.pageSize = pageSize
      // 业务问题，每次修改分页大小后要不要重新返回第一页
      this.form.pageIndex = 1
      this.searchData()
    },
    /**
     * @function 当前页修改方法
     * @param {Number} pageIndex 修改后的当前页
     */
    handleCurrentChange(pageIndex) {
      this.form.pageIndex = pageIndex
      this.searchData()
    },
    /**
     * @function 表格勾选后赋值给变量
     * @param {Array} arr 表格选中时所有选中的数组
     */
    handleSelectionChange(arr) {
      this.selectedArr = arr
    },
        /**
     * @function 对表格实现斑马纹路
     */
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      }
      return ''
    },
    /* 导入上传 */
    uploadHttpDefault(e) {
      uploadHttp(e)
    },
    /**
     * @function 将new Date（）转化为当前本地时间 yyyy-MM-dd HH:mm:ss格式
     */
    dateFormat(time) {
      const date = new Date(time + 8 * 3600000)
      const str = date.toISOString().replace('T', ' ')
      return str.substr(0, str.lastIndexOf('.'))
    },
    /**
     * @function 获取当天日期 yyyy-MM-dd格式
     */
    dateInitFormat() {
      const date = this.dateFormat(Date.now())
      const str = date.substring(0, 10)
      return str
    },
    /* ajax导出 */
    exportFunc(url, other) {
      const data = other === undefined ? this.form : other
      this.$http.post(url, data, { responseType: 'blob' }).then((res) => {
        // 处理返回的文件流
        if (res.headers['content-type'] === 'application/octet-stream' && res.config.responseType === 'blob') {
          const content = res.data
          const blob = new Blob([content])
          let fileName = `${new Date().getTime()}.xlsx`
          try {
            fileName = decodeURIComponent(res.headers['content-filedownloadname'])
          } catch (e) {
            //
          }
          if ('download' in document.createElement('a')) {
            // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        } else {
          let content = res.data
          const blob = new Blob([content])
          const reader = new FileReader()
          reader.onload = () => {
            content = JSON.parse(reader.result) // 内容就在这里
            if (content.msg) {
              this.$message.error(content.msg)
            }
            if (content.code === 302) {
              sessionStorage.clear()
              this.setName('')
              this.setUserName('')
              this.setUserId('')
              this.setAuthority([])
              this.$router.push('/login')
            }
          }
          reader.readAsText(blob)
        }
      })
    },
    /**
     * @function 返回图片加密后的地址
     */
    returnPicUrl(url) {
      if (url) {
        const arr = url.split('/')
        const path = arr[arr.length - 1]
        // x.jpg&TOKEN&
        let str = md5(`${path}&${this.TOKEN}&${this.key}`)
        str = `${url}?sign=${str}.${this.TOKEN}`
        return str
      }
        return url
    },
  },
}
