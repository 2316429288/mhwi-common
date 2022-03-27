module.exports = {
	onLoad() {
		// getRect挂载到$mhwi上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
		this.$mhwi.getRect = this.$mhwiGetRect;
		this.$mhwi.pageJump = this.$mhwiPageJump;
		this.$mhwi.showToast = this.$mhwiShowToast;
	},
	methods: {
		// 查询节点信息
		// 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
		// 解决办法为在组件根部再套一个没有任何作用的view元素
		$mhwiGetRect(selector, all) {
			return new Promise(resolve => {
				uni.createSelectorQuery().
				in(this)[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(rect => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect)
						}
						if (!all && rect) {
							resolve(rect)
						}
					})
					.exec()
			})
		},
		/**
		 * @description 页面跳转方法
		 *
		 * @property {Srting} route 跳转的路由
		 * @property {String} type 保留页面跳转-hold;关闭页面跳转-close;返回上一次/多层-back
		 * @property {Object} args 跳转携带的参数
		 * @property {Number} len type为back时指定返回的层数，默认为 1
		 * */
		$mhwiPageJump(route, type, args = {}, len = 1) {
			let that = this;
			let data = JSON.parse(args);
			let res = '';
			switch(type) {
				case 'hold':
					uni.navigateTo({
						url: `${route}?${data}`,
						fail(err) {
							res = err;
						}
					})
				break;
				case 'close':
					uni.reLaunch({
						url: `${route}?${data}`,
						fail(err) {
							res = err;
						}
					})
				break;
				case 'back':
					uni.navigateBack({
						delta: len,
						fail(err) {
							res = err;
						}
					})
				break;
			};
			return res;
		},
		/**
		 * @description 消息提示弹框
		 * 
		 * @property {Srting} message 弹框消息
		 * @property {String} icon 成功-success;失败-fail;异常-error
		 * @property {Number} duration 弹框持续时间，默认1500
		 * */
		$mhwiShowToast(message, icon = 'none', duration = 1500) {
			uni.showToast({
				title: message,
				icon: icon,
				duration: duration
			});
		}
	}
}
