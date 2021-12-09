/*
 * @Author: your name
 * @Date: 2020-09-11 15:59:35
 * @LastEditTime: 2021-05-31 09:42:39
 * @LastEditors: guojinhu
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\plugins\axios.js
 */
import axios from 'one-sport'
import store from '../store'

export default axios({
  store,
  isloaded: false,
  whiteList: [
  '/apis/api/AppConfig/OptionConfig/GetAllDictByGroupno',
  '/apis/api/AppConfig/OptionConfig/GetDict',
  '/apis/api/AppConfig/OptionConfig/GetSystemSettings',
  '/apis/api/AppConfig/OptionConfig/GetAllUnit',
  '/apis/api/Asserts/File/ImageUpload',
  '/apis/api/AppConfig/OptionConfig/GetCity',
  '/api/AppConfig/OptionConfig/GetCity',
  '/apis/api/AppConfig/OptionConfig/GetArea',
  '/api/AppConfig/OptionConfig/GetArea',
  '/apis/api/VolunteerRecruitment/SocialVolScreening/List',
  '/api/VolunteerRecruitment/SocialVolScreening/List',
  '/apis/api/VolunteerRecruitment/BatchOperatio/GetList',
  '/api/VolunteerRecruitment/BatchOperatio/GetList',
  '/apis/api/VolunteerRecruitment/SchoolVolScreening/List',
  '/api/VolunteerRecruitment/SchoolVolScreening/List',
  '/apis/api/SystemsManagement/MessageCenter/List',
  '/api/SystemsManagement/MessageCenter/List',
  '/apis/api/SystemsManagement/SmsManage/List',
  '/api/SystemsManagement/SmsManage/List',
  '/apis/api/AllocateManage/VolManage/GetList',
  '/api/AllocateManage/VolManage/GetList',
  '/apis/api/AppConfig/OptionConfig/GetLoggerLevel',
  'api/AppConfig/OptionConfig/GetLoggerLevel',
  '/apis/api/Loggers/Log/List',
  '/api/Loggers/Log/List',
  '/apis/api/Loggers/ApiLog/List',
  '/api/Loggers/ApiLog/List',
  '/apis/api/Loggers/SqlLog/List',
  '/api/Loggers/SqlLog/List',
  '/apis/api/SystemSettings/SystemSettings/SizeChartSave',
  '/api/SystemSettings/SystemSettings/SizeChartSave',
  '/apis/api/AppConfig/OptionConfig/GetProvince',
  '/api/AppConfig/OptionConfig/GetProvince',
  '/apis/api/AppConfig/OptionConfig/GetCountry',
  '/api/AppConfig/OptionConfig/GetCountry',
  '/apis/api/AppConfig/OptionConfig/GetAllColleges',
  '/api/AppConfig/OptionConfig/GetAllColleges',
  '/apis/api/SystemsManagement/InviteCode/List',
  '/api/SystemsManagement/InviteCode/List',
  '/apis/api/AllocateManage/AttendanceSettings/GetAssignId',
  '/api/AllocateManage/AttendanceSettings/GetAssignId',
  '/apis/api/AppConfig/OptionConfig/GetAllUnit',
  '/api/AppConfig/OptionConfig/GetAllUnit',
  '/apis/api/AppConfig/OptionConfig/OrganizationList',
  '/api/AppConfig/OptionConfig/OrganizationList',
  ],
})
