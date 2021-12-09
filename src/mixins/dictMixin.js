import apis from '@/apis'

export default {
  methods: {
    getUnitList() {
      this.$http.post(apis.OptionConfig_GetAllUnit).then((res) => {
        if (res.data.code === 200) {
          this.units = res.data.data
        }
      })
    },
    // getSchool() {
    //   this.$http.post(apis.OptionConfig_GetAllDictByGroupno, { groupNo: 'ZYZ_SCHOOL' }).then((res) => {
    //     if (res.data.code === 200) {
    //       this.schools = res.data.data
    //     }
    //   })
    // },
    getCountry() {
      this.$http.post(apis.OptionConfig_GetCountry).then((res) => {
        if (res.data.code === 200) {
          this.country = res.data.data
        }
      })
    },
    getHeightSchool() {
      this.$http.post(apis.OptionConfig_GetAllColleges, { groupNo: 'ZYZ_SCHOOL' }).then((res) => {
        if (res.data.code === 200) {
          this.height_schools = res.data.data
        }
      })
    },
    GetProvince() {
      this.$http.post(apis.OptionConfig_GetProvince).then((res) => {
        if (res.data.code === 200) {
          this.province = res.data.data
        }
      })
    },
  },
}
