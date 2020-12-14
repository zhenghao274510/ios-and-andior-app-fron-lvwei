<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(uni.getStorageSync('uid')){
				uni.redirectTo({
					url:'/pages/index/index'
				})
			}
			//  #ifdef APP-PLUS
			if (!plus.runtime.isAgreePrivacy()) {
				//弹出自定义隐私政策提示框  
				plus.runtime.quit();
			}
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	view,
	text {
		color: #000;
		font-size: 28upx;
	}
	page{
		height: 100%;
		background: #f6f6f6;
	}

	.uni-flex {
		display: flex;
		flex-direction: row;
	}

	.uni-flex-item {
		flex: 1;
	}

	.uni-row {
		flex-direction: row;
	}

	.uni-column {
		flex-direction: column;
	}

	.d-item-center {
		align-items: center;
	}

	.d-content {
		justify-content: center;
	}

	.d-between {
		justify-content: space-between;
	}

	.d-border {
		border-bottom: 2upx solid #e3e3e3;
	}

	/* 文本溢出隐藏 */
	.uni-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.btn-hover {
		opacity: .7;
	}

	@font-face {
		font-family: "iconfont";
		src: url('./static/iconfont/iconfont.ttf');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 26px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-fanhui2:before {
		content: "\e60a";
	}

	.icon-xingming:before {
		content: "\e609";
	}

	.icon-wenti:before {
		content: "\e756";
	}

	.icon-ziyuan:before {
		content: "\e63b";
	}

	.icon-zhanghao:before {
		content: "\e66d";
	}

	.icon-mima:before {
		content: "\e66c";
	}

	.icon-danwei:before {
		content: "\e649";
	}
	.lazyload{
		position: relative;
		
		&.lazypic{
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-image: url(./static/0.png);
				background-size: 100% 100%;
				opacity: 0.3;
			}
		}
		image{
			position: relative;
			z-index: 1;
			opacity:0;
		}
		&.loaded{
			image{
				transition: .7s;
				opacity:1 !important;
			}
		} 
	}
</style>
