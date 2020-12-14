const bassUrl = require('./config.js').bass;
const api = {
	tip(a) {
		typeof(a) === 'string' ?
		uni.showToast({
			title: a,
			icon: "none",
			duration: 1500
		}): ''
	},
	reLaunch(url) {
		typeof(url) === 'string' ?
		uni.reLaunch({
			url: url
		}): ''
	},
	navTo(url) {
		typeof(url) === 'string' ?
		uni.navigateTo({
			url: url
		}): ''
	},
	redirect(url){
		typeof(url) === 'string' ?
		uni.redirectTo({
			url: url
		}): ''
	},
	back() {
		setTimeout(() => {
			uni.navigateBack()
		}, 200)

	},
	setNav(e) {
		typeof(e) === 'string' ?
		uni.setNavigationBarTitle({
			title: e
		}): ''
	},
	loading(e) {
		uni.showLoading({
			mask: false,
			title: e
		})
	}
}
export default api;
