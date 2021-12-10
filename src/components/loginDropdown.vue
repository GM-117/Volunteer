<template>
<div class="right-content">
  <div class="dropDownHeader">
    <div class="red" v-if="newFlag"></div>
    <img class="bell" @click="visibleDialog=!visibleDialog" src="../assets/images/bell.png" alt="" v-if="isShow">
    <el-dropdown>
      <div class="el-dropdown-link">
        <h2><span class="name">{{$t('欢迎您')}}，{{NAME}}</span><i class="el-icon-arrow-down el-icon--right"></i></h2>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="c" @click.native.stop="registerEnter">{{$t('志愿组织成员登记入口')}}</el-dropdown-item>
        <el-dropdown-item command="a" @click.native.stop="modifyPasswordButton">{{$t('修改密码')}}</el-dropdown-item>
        <el-dropdown-item command="b" @click.native.stop="outButton">{{$t('退出')}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <div class="dialog-container">
    <el-dialog :visible.sync="visibleDialog" title="消息中心" width="800px" center :before-close="closeDialog">
      <div v-if="messageList.length>0">
        <div class="message-item" @click="changeDetail(item.id)" v-for="(item, index) in messageList" :key="index">
          <div class="blue" v-if="item.readFlag==='N'"></div>
          <div class="flex">
            <p class="message-title">{{item.title}}</p>
          </div>
          <div class="flex">
            <p class="message-content">{{item.content}}</p>
          </div>
          <div class="flex">
            <span class="message-name">{{item.createId}}</span>
            <span class="message-time">{{`发送时间：${item.createTime}`}}</span>
          </div>
        </div>
      </div>
      <div class="zwxx" v-else>
        <img src="../assets/images/zwxx.png" alt="">
        <p>暂无消息～</p>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="detailVisibleDialog" :title="detailList.title" width="800px" center>
        <!-- <img class="detail-img" src="../assets/images/leftErrow.png" alt=""> -->
        <quill-editor v-model="detailList.content" :options="editorOption"></quill-editor>
        <!-- <p class="detail-content" v-html="detailList.content"></p> -->
        <span class="detail-bottom">{{`${detailList.createId} ${detailList.createTime}`}}</span>
      <div slot="footer">
        <el-button type="info" @click="closeDetail">{{$t('closeBtn')}}</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import apis from '@/apis'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor,
  },
  computed: {
    ...mapState(['NAME']),
    isShow() {
      if (store.state.USERTYPE) { // 如果存在是管理员
        return false
      }
      return true
    },
  },
  data() {
    return {
      newFlag: false,
      visibleDialog: false,
      detailVisibleDialog: false,
      messageList: [],
      detailList: {},
      editorOption: {
        placeholder: '请输入文本2000字以内...',
        // modules: {
        //   toolbar: false,
        // },
      },
    }
  },
  mounted() {
    if (store.state.TOKEN && !store.state.USERTYPE) {
      // setInterval(() => {
        this.getMessageList()
      //   // 查询待办消息列表
      // }, 15000)
    }
  },
  methods: {
    ...mapActions(['LoginOut']),
    // dropdownCommand(command) {
    //   if (command === 'a') {
    //     this.modifyPasswordButton()
    //   } else {
    //     this.outButton()
    //   }
    // },
    modifyPasswordButton() {
      this.$emit('updatePassword', true)
    },
    registerEnter() {
      this.$emit('registerEnter', true)
    },
    outButton() {
      this.$http.post(apis.Auth_Logout).then(() => {
        this.LoginOut()
        this.$router.push('/login')
      }).catch(() => {
        this.LoginOut()
        this.$router.push('/login')
      })
    },
    getMessageList() {
      this.newFlag = false
      this.$http.post(apis.MessageCenter_TodoMessageList).then((res) => {
        if (res.data.code === 200) {
          this.messageList = res.data.data.record
          for (let i = 0; i < this.messageList.length; i += 1) {
            if (this.messageList[i].readFlag !== 'Y') {
              this.newFlag = true
              break
            }
          }
        }
      })
    },
    changeDetail(data) {
      this.$http.post(apis.MessageCenter_GetById, { id: data }).then((res) => {
        if (res.data.code === 200) {
          this.detailList = res.data.data
          this.detailVisibleDialog = !this.detailVisibleDialog
        }
      })
    },
    closeDetail() {
      this.detailVisibleDialog = false
        this.$http.post(apis.MessageCenter_TodoMessageList).then((res) => {
        if (res.data.code === 200) {
          this.messageList = res.data.data.record
        }
      })
    },
    closeDialog() {
      this.visibleDialog = false
      this.getMessageList()
    },
  },
}
</script>

<style lang="less" scoped>
.name {
  width: 60px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 120px;
  vertical-align: middle;
}
.dropDownHeader {
  width: 200px;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 60px;
  display: flex;
  align-content: center;
  align-items: center;
}
.bell {
  width: 16px;
  height: 19px;
  margin-right: 5px;
  cursor: pointer;
}
.red {
  width: 4px;
  height: 4px;
  border: 1px solid red;
  background-color: red;
  border-radius: 4px;
  position: absolute;
  top: 17px;
  right: 186px;
}
.blue {
  width: 7px;
  height: 7px;
  border: 1px solid blue;
  background-color: blue;
  border-radius: 8px;
  position: absolute;
  margin-left: 4px;
  margin-top: 10px;
}
.message-item {
  // width: 650px;
  height: 109px;
  background: rgba(255,255,255,1);
  border-radius: 4px;
  border: 1px solid rgba(228,233,241,1);
  cursor: pointer;
  .message-title {
    // width: 238px;
    height: 30px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 550;
    color: rgba(51,51,51,1);
    line-height: 30px;
    margin-left: 3%;
  }
  .message-content {
    width: 560px;
    height: 36px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 18px;
    margin-left: 3%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .message-name {
    // width: 48px;
    height: 30px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(95,95,95,1);
    line-height: 30px;
    margin-left: 3%;
  }
  .message-time {
    // width: 166px;
    height: 20px;
    font-size:1 2px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(95,95,95,1);
    line-height: 20px;
    margin-right: 15px;
  }
}
.detail-img {
  // width: 466px;
  height: 220px;
}
.detail-content {
  // width: 466px;
  // height: 266px;
  font-size:1 6px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: 400;
  color: rgba(51,51,51,1);
  line-height: 25px;
}
.detail-bottom {
  // width: 350px;
  height: 25px;
  font-size: 13px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: 400;
  color: rgba(98,98,98,1);
  line-height: 25px;
  float: right;
}
.zwxx {
  text-align: center;
  img {
    margin-top: 84px;
    margin-bottom: 40px;
  }
  p {
    margin-bottom: 20px;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
<style lang="less">
.right-content {
  .quill-editor {
    border: 1px solid #ccc;
  }
  .ql-toolbar.ql-snow {
    display: none;
  }
  .ql-container.ql-snow {
    border: 0;
  }
}
</style>
