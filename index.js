// 全局方法混入
import mixin from './mixin/mixin.js';
// 格式化时间
import timeFormat from './utils/timeFormat.js'

const $mhwi = {
	timeFormat: timeFormat
}

const install = Vue => {
	Vue.mixin(mixin)
	// 时间格式化
	Vue.filter('timeFormat', (timestamp, format) => {
		return timeFormat(timestamp, format)
	})
	Vue.prototype.$mhwi = $mhwi
}

export default {
	install
}