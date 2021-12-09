/* eslint-disable global-require */
import Vue from 'vue';
import VueRouter from 'vue-router';
// import apis from '@/apis'
// import store from '@/store/index'
// import dictCode from '@/unit/dict'
// import http from '@/plugins/axios'
import Home from '../views/Home.vue';

Vue.use(VueRouter);

// const getDict = (code) => {
//   if (store.state.TOKEN) {
//     http.post(apis.OptionConfig_GetDict, { dictGroups: code }).then((res) => {
//       if (res.data.code === 200) {
//         const { data } = res.data
//         const newDict = { ...store.state.DROPDOWNBOX, ...data }
//         store.commit('setDropDownbox', newDict)
//       }
//     })
//   }
// }

const routes = [
  {
    path: '/login',
      name: 'login',
      component: resolve => require(['../views/Login/index.vue'], resolve),
  },
  {
    path: '/register',
      name: 'register',
      component: resolve => require(['../views/Register/index.vue'], resolve),
  },
  {
    path: '/organizationLogin',
      name: 'organizationLogin',
      component: resolve => require(['../views/OrganizationLogin/index.vue'], resolve),
  },
  // {
  //   path: '/codeRegister',
  //     name: 'codeRegister',
  //     component: resolve => require(['../views/CodeRegister/index.vue'], resolve),
  // },
  {
    path: '/',
      name: 'home',
      component: Home,
      children: [
        // {
        //   path: 'welcome',
        //   name: 'Welcome',
        //   component: resolve => require(['../views/welcome/index.vue'], resolve),
        // },
        {
          path: 'registerMana',
          name: 'RegisterMana',
          component: resolve => require(['../views/RegisterMana/index.vue'], resolve),
          children: [
            {
              path: 'baseInfo',
              name: 'BaseInfo',
              component: resolve => require(['../views/RegisterMana/BaseInfo/index.vue'], resolve),
            },
          ],
        },
        {
          path: '/personalMana',
          name: 'PersonalMana',
          component: resolve => require(['../views/PersonalMana/index.vue'], resolve),
          children: [
            {
              path: 'application',
              name: 'Application',
              component: resolve => require(['../views/PersonalMana/application.vue'], resolve),
            },
            {
              path: 'job',
              name: 'Job',
              component: resolve => require(['../views/PersonalMana/job.vue'], resolve),
            },
            {
              path: 'certificate',
              name: 'Certificate',
              component: resolve => require(['../views/PersonalMana/certificate.vue'], resolve),
            },
            {
              path: 'allege',
              name: 'Allege',
              component: resolve => require(['../views/PersonalMana/allege.vue'], resolve),
            },
          ],
        },
        // {
        //   path: 'volunteerRecruitment',
        //   name: 'VolunteerRecruitment',
        //   component: resolve => require(['../views/VolunteerRecruitment/index.vue'], resolve),
        //   children: [
        //     {
        //       path: 'statisticalReporForms',
        //       name: 'StatisticalReporForms',
        //       component: resolve => require(['../views/VolunteerRecruitment/statisticalReporForms.vue'], resolve),
        //     },
        //     {
        //       path: 'statisticalExportForms',
        //       name: 'StatisticalExportForms',
        //       component: resolve => require(['../views/VolunteerRecruitment/statisticalExportForms.vue'], resolve),
        //     },
        //     {
        //       path: 'batchOperation',
        //       name: 'BatchOperation',
        //       component: resolve => require(['../views/VolunteerRecruitment/BatchOperation/index.vue'], resolve),
        //     },
        //     {
        //       path: 'highVolAllo',
        //       name: 'HighVolAllo',
        //       component: resolve => require(['../views/VolunteerRecruitment/HighVolAllo/index.vue'], resolve),
        //     },
        //     {
        //       path: 'socVolAllo',
        //       name: 'SocVolAllo',
        //       component: resolve => require(['../views/VolunteerRecruitment/SocVolAllo/index.vue'], resolve),
        //     },
        //   ],
        // },
        // {
        //   path: 'system',
        //   name: 'System',
        //   component: resolve => require(['../views/system/index.vue'], resolve),
        //   children: [
        //     {
        //       path: 'editNotice',
        //       name: 'EditNotice',
        //       component: resolve => require(['../views/system/editNotice/index.vue'], resolve),
        //     },
        //     {
        //       path: 'user',
        //       name: 'User',
        //       component: resolve => require(['../views/system/user/index.vue'], resolve),
        //     },
        //     {
        //       path: 'role',
        //       name: 'Role',
        //       component: resolve => require(['../views/system/role/index.vue'], resolve),
        //     },
        //     {
        //       path: 'resource',
        //       name: 'Resource',
        //       component: resolve => require(['../views/system/resource/index.vue'], resolve),
        //     },
        //     {
        //       path: 'highSchool',
        //       name: 'HighSchool',
        //       component: resolve => require(['../views/system/highSchool/index.vue'], resolve),
        //     },
        //     {
        //       path: 'unit',
        //       name: 'Unit',
        //       component: resolve => require(['../views/system/unit/index.vue'], resolve),
        //     },
        //     {
        //       path: 'systemSet',
        //       name: 'SystemSet',
        //       component: resolve => require(['../views/system/systemSet/index.vue'], resolve),
        //     },
        //     {
        //       path: 'codeManagement',
        //       name: 'CodeManagement',
        //       component: resolve => require(['../views/system/codeManagement/index.vue'], resolve),
        //     },
        //     {
        //       path: 'messageCenter',
        //       name: 'MessageCenter',
        //       component: resolve => require(['../views/system/messageCenter/index.vue'], resolve),
        //     },
        //     {
        //       path: 'smsManage',
        //       name: 'SmsManage',
        //       component: resolve => require(['../views/system/smsManage/index.vue'], resolve),
        //     },
        //     {
        //       path: 'silhouetteManager',
        //       name: 'SilhouetteManager',
        //       component: resolve => require(['../views/system/silhouetteManager/index.vue'], resolve),
        //     },
        //   ],
        // },
        // {
        //   path: 'allocateMana',
        //   name: 'AllocateMana',
        //   component: resolve => require(['../views/AllocateMana/index.vue'], resolve),
        //   children: [
        //     {
        //       path: 'gymSchDock',
        //       name: 'GymSchDock',
        //       component: resolve => require(['../views/AllocateMana/GymSchDock/index.vue'], resolve),
        //     },
        //     {
        //       path: 'volunteerAllocate',
        //       name: 'VolunteerAllocate',
        //       component: resolve => require(['../views/AllocateMana/VolunteerAllocate/index.vue'], resolve),
        //     },
        //     {
        //       path: 'volunteerAttendance',
        //       name: 'VolunteerAttendance',
        //       component: resolve => require(['../views/AllocateMana/VolunteerAttendance/index.vue'], resolve),
        //     },
        //     {
        //       path: 'volunteerAssignment',
        //       name: 'VolunteerAssignment',
        //       component: resolve => require(['../views/AllocateMana/VolunteerAssignment/index.vue'], resolve),
        //     },
        //     {
        //       path: 'allocationReview',
        //       name: 'AllocationReview',
        //       component: resolve => require(['../views/AllocateMana/AllocationReview/index.vue'], resolve),
        //     },
        //     {
        //       path: 'mailListMana',
        //       name: 'MailListMana',
        //       component: resolve => require(['../views/AllocateMana/MailListMana/index.vue'], resolve),
        //     },
        //   ],
        // },
        // {
        //   path: 'competitonMana',
        //   name: 'CompetitonMana',
        //   component: resolve => require(['../views/CompetitonMana/index.vue'], resolve),
        //   children: [
        //     {
        //       path: 'appeaMana',
        //       name: 'AppeaMana',
        //       component: resolve => require(['../views/CompetitonMana/AppeaMana/index.vue'], resolve),
        //     },
        //     {
        //       path: 'uniformStatictis',
        //       name: 'UniformStatictis',
        //       component: resolve => require(['../views/CompetitonMana/UniformStatictis/index.vue'], resolve),
        //     },
        //     {
        //       path: 'volunteerAttendanceStatictis',
        //       name: 'VolunteerAttendanceStatictis',
        //       component: resolve => require(['../views/CompetitonMana/VolunteerAttendanceStatictis/index.vue'], resolve),
        //     },
        //     {
        //       path: 'scheduledBusMana',
        //       name: 'ScheduledBusMana',
        //       component: resolve => require(['../views/CompetitonMana/ScheduledBusMana/index.vue'], resolve),
        //     },
        //     {
        //       path: 'allScheduledBusStatictis',
        //       name: 'AllScheduledBusStatictis',
        //       component: resolve => require(['../views/CompetitonMana/AllScheduledBusStatictis/index.vue'], resolve),
        //     },
        //     {
        //       path: 'dailyScheduledBusStatictis',
        //       name: 'DailyScheduledBusStatictis',
        //       component: resolve => require(['../views/CompetitonMana/DailyScheduledBusStatictis/index.vue'], resolve),
        //     },
        //     {
        //       path: 'reportCollect',
        //       name: 'ReportCollect',
        //       component: resolve => require(['../views/CompetitonMana/ReportCollect/index.vue'], resolve),
        //     },
        //     {
        //       path: 'dutyRateRanking',
        //       name: 'DutyRateRanking',
        //       component: resolve => require(['../views/CompetitonMana/DutyRateRanking/index.vue'], resolve),
        //     },
        //     {
        //       path: 'newsMana',
        //       name: 'NewsMana',
        //       component: resolve => require(['../views/CompetitonMana/NewsMana/index.vue'], resolve),
        //     },
        //     {
        //       path: 'eventMana',
        //       name: 'EventMana',
        //       component: resolve => require(['../views/CompetitonMana/EventMana/index.vue'], resolve),
        //     },
        //     {
        //       path: 'volunteerOrganization',
        //       name: 'VolunteerOrganization',
        //       component: resolve => require(['../views/CompetitonMana/VolunteerOrganization/index.vue'], resolve),
        //     },
        //     {
        //       path: 'volunteerMembers',
        //       name: 'VolunteerMembers',
        //       component: resolve => require(['../views/CompetitonMana/VolunteerMembers/index.vue'], resolve),
        //     },
        //     {
        //       path: 'leaveManag',
        //       name: 'leaveManag',
        //       component: resolve => require(['../views/CompetitonMana/leaveManag/index.vue'], resolve),
        //       meta: {
        //         title: '志愿者请假管理',
        //         keepAlive: true,
        //       },
        //     },
        //   ],
        // },
        // {
        //   path: 'logCenter',
        //   name: 'LogCenter',
        //   component: resolve => require(['../views/logCenter/index.vue'], resolve),
        //   children: [
        //     {
        //       path: 'logManager',
        //       name: 'LogManager',
        //       component: resolve => require(['../views/logCenter/logManager/index.vue'], resolve),
        //     },
        //     {
        //       path: 'apiLogManager',
        //       name: 'ApiLogManager',
        //       component: resolve => require(['../views/logCenter/apiLogManager/index.vue'], resolve),
        //     },
        //     {
        //       path: 'sqlLogManager',
        //       name: 'SqlLogManager',
        //       component: resolve => require(['../views/logCenter/sqlLogManager/index.vue'], resolve),
        //     },
        //   ],
        // },
      ],
  },
];

const router = new VueRouter({
  routes,
});

// �ж��Ƿ���
// eslint-disable-next-line no-unused-vars
// router.beforeEach((to, from, next) => {
//   if (dictCode[to.name]) {
//     const code = dictCode[to.name].filter(item => !store.state.DROPDOWNBOX[item])
//     if (code.length > 0) {
//       getDict(Array.from(new Set(code)))
//     }
//   }
//   // next();
//   if (to.name !== 'login' && to.name !== 'register' && to.name !== 'organizationLogin') {
//     const authority = []
//     try {
//       store.state.authority.forEach((path) => {
//         authority.push(path.url)
//         const map = (item) => {
//           item.children.forEach((child) => {
//             authority.push(child.url)
//             map(child)
//           })
//         }
//         if (path.children.length > 0) {
//           map(path)
//         }
//       })
//     } catch (e) {
//       // ����
//     }
//     if (!store.state.USERID && to.name !== 'login' && to.name !== 'codeRegister') {
//       next({ path: '/login' })
//     } else {
//       next()
//     }
//   //  else if (!authority.includes(to.path) && to.name !== 'home' && to.name !== 'Welcome' && store.state.USERID) {
//   //     next({ path: '/welcome' })
//   //   }
//   } else {
//     next()
//   }
// })

export default router;
