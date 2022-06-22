import { format, parseISO } from 'date-fns'

export default {
  created() {
    this.myEventHandler()
    window.addEventListener('resize', this.myEventHandler)
  },
  data() {
    // CakePHP の people_page_vue.ctp から値を受け取る。
    // URL: https://xxx.cydascloud.com/{company}/personal-profile/1
    // el.dataset.company = /{company}/
    // company はユーザーごとに変わる値
    return {
      company: window.companyPath,
      token: window.CSRF_TOKEN,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    }
  },
  methods: {
    myEventHandler() {
      if (window.innerWidth < 768) {
        this.isMobile = true
        this.isTablet = false
        this.isDesktop = false
      } else if (window.innerWidth == 768) {
        this.isTablet = true
        this.isMobile = false
        this.isDesktop = false
      } else if (window.innerWidth > 768) {
        this.isDesktop = true
        this.isMobile = false
        this.isTablet = false
      }
    },
    dateFormat(payload, type) {
      const newPayload = new Date(payload).getTime()
      if (newPayload) {
        if (type) {
          return format(newPayload, type)
        }
        return format(newPayload, 'yyyy/MM/dd')
      } else {
        return null
      }
    },
    formatPrice(value) {
      let val = (value/1).toLocaleString()
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler)
  },
}
