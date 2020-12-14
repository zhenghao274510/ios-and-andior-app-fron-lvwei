<template>
	<view class="">
		<pages-header :title="title" @click='pagesOnClick' :type='type'></pages-header>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" footerHeight="70" :headerHeight="top">
			<view class="grid">
				<view class="grid-item-3" v-for="(item, index) in dataList" :key="index" @click="gridClick(item)">
					<view class="lazyload lazypic item-img" :class="{loaded:item.loaded}">
						<image :src="item.image" mode="aspectFill" lazy-load="true" @load="imageload(item)"></image>
					</view>

					<view class="grid-title uni-ellipsis">{{item.title}}</view>
					<view class="grid-btn" hover-class="btn-hover">Go</view>
				</view>
			</view>
		</s-pull-scroll>
		<view class="uni-flex d-item-center d-between bottom-group" style="flex-direction:column;">
			<view class="d-tip" style="font-size: 24upx;">
				办公电话：05722052779
			</view>
			<view class="d-tip">
				联系电话：13839509059（微信同号）
			</view>
			<view class="d-tip">
				地址:浙江省湖州市新能源创新综合体B2座6F
			</view>


		</view>
		<drag-ball title="退出" :x='x' :y='y' @click="useroptions"></drag-ball>
	</view>
</template>

<script>
	import dragBall from "@/components/drag-ball/drag-ball.vue"
	import pagesHeader from "@/components/pages-header.vue"
	export default {
		components: {
			dragBall,
			pagesHeader
		},
		data() {
			return {
				dataList: [],
				type: 0,
				title: '绿维环保管家',
				top: uni.getSystemInfoSync()['statusBarHeight'] + 50,
				x: uni.getSystemInfoSync().screenWidth - 60,
				y: uni.getSystemInfoSync().screenHeight - 120
			}
		},
		onLoad() {
			if (uni.getStorageSync('uid')) {
				this.title = `绿维环保管家(${uni.getStorageSync('name')})`;
			}
			this.refresh();
		},
		methods: {
			pagesOnClick(e) {
				this.type = e;
				this.refresh();
			},
			imageload(e) {
				setTimeout(() => {
					this.$set(e, 'loaded', true);
				}, 80)
			},
			useroptions() {
				uni.showModal({
					content: "确定退出吗?",
					cancelText: "再看看",
					confirmText: "残忍离开",
					confirmColor: "#007AFF",
					cancelColor: '#999999',
					success(res) {
						if (res.confirm) {
							// #ifdef APP-PLUS
							uni.removeStorageSync('uid');
							plus.runtime.quit()
							// #endif 
						} else if (res.cancel) {
							console.log('取消')
						}
					}
				})
			},
			gridClick(e) {
				console.log(e)
				//  #ifdef APP-PLUS
				plus.runtime.openURL(encodeURI(e.url), (err) => {
					this.$api.tip('链接有误,打开失败！')
				})
				// plus.runtime.openWeb(e.url);
				// #endif
			},
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			async loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					userid: uni.getStorageSync('uid'),
					pageSize: pullScroll.page,
					pageNum: '10',
					type: this.type
				}
				console.log(e)
				const curList = [];
				const res = await this._reqw.post(e, 'quanxianlist');
				console.log(res);
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				if (res.juhelist.length == 0) {
					pullScroll.empty()
				} else {
					res.juhelist.forEach(item => {
						curList.push(item)
					});
					this.dataList = this.dataList.concat(curList);
					pullScroll.page >= res.totalpage ? pullScroll.finish() : pullScroll.success();
				}
			}

		}
	}
</script>

<style scoped lang="less">
	.top-view {
		width: 750upx;
		height: var(--status-bar-height);
		background: #007aff;
		position: fixed;
		top: 0;
		z-index: 9999;
	}

	.d-tip {
		font-size: 24upx;
		color: #999999;
	}

	.bottom-group {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		background: #FFFFFF;
		padding: 5px 0;
	}

	.grid {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.grid-item-3,
		.grid-item-4 {
			box-sizing: border-box;
			width: calc(100% / 3);
			text-align: center;
			padding: 20upx 0;
			margin-bottom: 20upx;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;

			.item-img {
				width: 200upx;
				height: 200upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.grid-title {
				font-size: 28upx;
				margin: 16upx 0;
				color: rgb(0, 0, 0);
				font-weight: bold;
				width: 90%;
			}

			.grid-btn {
				width: 80%;
				display: block;
				margin: 0 auto;
				padding: 8upx 0;
				text-align: center;
				border-radius: 10upx;
				font-size: 24upx;
				background-color: #007aff;
				color: rgba(255, 255, 255, 1);
			}
		}

		.grid-item-3:nth-child(3n + 3),
		.grid-item-4:nth-child(4n + 4) {
			border-right: none;
		}

		.grid-item-4 {
			width: calc(100% / 4);
		}
	}
</style>
