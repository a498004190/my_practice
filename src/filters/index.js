import Vue from 'vue'
// import moment from 'moment'
import { format } from 'date-fns'
Vue.filter('date-format', (value, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
    // return moment(value).format('YYYY-MM-DD HH:mm:ss')
    return format(value,formatStr)
})
