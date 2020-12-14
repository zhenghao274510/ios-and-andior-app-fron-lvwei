<template>
	<view class="">
		<view class="pages-header fixed" :style="{height: statusBarContent + 'px',background:bgColor}">
			<view class="" :style="{paddingTop: statusBarHeight + 'px'}">
			</view>
			<view class="header_content">
				<view class="header_title header_title_center" :style="{color:fontColor}" v-if="title!=''">
					{{title}}
				</view>
				<view class="header_right">
					<view class="icon-con"  @tap="onClick(0)" v-if="type==0">
						<image src="../static/shouji.png" mode="aspectFill"></image>
					</view>
					<view class="icon-con"  @tap="onClick(0)" v-else>
						<image src="../static/shoujimoren.png" mode="aspectFill"></image>
					</view>
					<view class="icon-con"  @tap="onClick(1)" v-if="type==1">
						<image src="../static/icon-test.png" mode="aspectFill"></image>
					</view>
					<view class="icon-con"  @tap="onClick(1)" v-else>
						<image src="../static/pcmoren.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="pages-header" :style="{height: statusBarContent + 'px',background:bgColor}">

		</view>
	</view>

</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: "#007AFF"
			},
			fontColor: {
				type: String,
				default: "#333333"
			},
			type: {
				type: [String, Number],
				default:0
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				statusBarContent: 0
			}
		},
		//第一次加载
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			this.statusBarContent = uni.getSystemInfoSync()['statusBarHeight'] + 44;
		},
		methods: {
			back() {
				this.$api.back() 
			},
			onClick(index){
				this.$emit('click',index)
			}
		}
	}
</script>

<style scoped lang="scss">
	.active{
		border: 1px solid #FFFFFF;
	}
	.icon-con{
		width: 48upx;
		height: 48upx;
		margin-right:10upx;
		padding:0 10upx;
		image{
			width: 100%;
			height: 100%;
		}
		
	}
	.header_right {
		position: absolute;
		right: 10upx;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
	}

	.back-icon {
		width: 31upx;
		height: 26upx;
		z-index: 9999;
		color: transparent ;

	}

	.fixed {
		position: fixed;
		z-index: 96;
	}

	.pages-header {
		width: 750rpx;
		height: calc(88upx + var(--status-bar-height));
		background: #007AFF;
	}

	.header_content {
		width: 750rpx;
		align-items: flex-end;
		justify-content: space-between;
		flex-direction: row;
		height: 88rpx;
		position: relative;
	}

	.header_left_box {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		height: 88rpx;
		flex: 1;
		margin-left: 20rpx;

	}

	.header_title {
		height: 88rpx;
		font-size: 32rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		font-weight: 700;
		text-overflow: ellipsis;
		/* #ifndef APP-PLUS-NVUE */
		white-space: nowrap;
		display: flex;
		overflow: hidden;
		/* #endif */
		/* #ifdef APP-PLUS-NVUE */
		lines: 1;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* #ifdef MP */
		max-width: calc(100vw - 160rpx);
		/* #endif */
	}

	.header_title_center {
		position: absolute;
		bottom: 0rpx;
		left: 375rpx;
		transform: translateX(-50%);
	}
</style>
