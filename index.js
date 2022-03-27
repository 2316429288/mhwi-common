// 全局方法混入
import mixin from './mixin/mixin.js';
// 格式化时间
import timeFormat from './utils/timeFormat.js';
// px转vh、vw
import pxTransform from './utils/pxTransform.js';

const $mhwi = {
	timeFormat: timeFormat,
	pxToVh: pxTransform.pxToVh,
	pxToVw: pxTransform.pxToVw
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