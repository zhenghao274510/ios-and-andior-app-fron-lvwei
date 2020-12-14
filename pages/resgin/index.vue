<template>
	<view class="">
		<evan-form class="" :hide-required-asterisk="hideRequiredAsterisk" label-position="left" ref="form" :labelStyle="labelStyle"
		 :model="userInfo">
			<view class="center-con">
				<evan-form-item prop="username">
					<view class="uni-flex uni-flex-item d-item-center d-between d-border item-con">
						<view class="iconfont icon-zhanghao">

						</view>
						<input class="center-input" placeholder-class="placeholder" v-model="userInfo.username" placeholder="请输入您的账户名" />
					</view>
				</evan-form-item>
				<evan-form-item prop="password">
					<view class="uni-flex uni-flex-item d-item-center d-between d-border item-con">
						<view class="iconfont icon-mima">

						</view>
						<input class="center-input " type='password' placeholder-class="placeholder" v-model="userInfo.password"
						 placeholder="请输入您的登录密码" />
					</view>
				</evan-form-item>
				<evan-form-item prop="name">
					<view class="uni-flex uni-flex-item d-item-center d-between d-border item-con">
						<view class="iconfont icon-xingming">
						</view>
						<input class="center-input" type="text" placeholder-class="placeholder" v-model="userInfo.name" placeholder="请输入您的姓名" />
					</view>
				</evan-form-item>
				<evan-form-item prop="phone">
					<view class="uni-flex uni-flex-item d-item-center d-between d-border item-con">
						<view class="iconfont icon-ziyuan">

						</view>
						<input class="center-input " placeholder-class="placeholder" type="number" maxlength="11" v-model="userInfo.phone"
						 placeholder="请输入您的手机号" />
					</view>
				</evan-form-item>
				<evan-form-item  prop="job">
					<view class="uni-flex uni-flex-item d-item-center d-between d-border item-con">
						<view class="iconfont icon-danwei">
						</view>
						<input class="center-input " placeholder-class="placeholder" type="text" v-model="userInfo.job"
						 placeholder="请输入您所在单位名称" />
					</view>
				</evan-form-item>
			</view>

		</evan-form>
		<view class="btn" @click.stop="userSub" hover-class="btn-hover">提交</view>
	</view>
</template>

<script>
	import md5 from "js-md5"
	import evanFrom from "@/components/evan-form/evan-form.vue";
	import evanFromItem from "@/components/evan-form-item/evan-form-item.vue";
	export default {
		components: {
			evanFrom,
			evanFromItem
		},
		data() {
			return {
				hideRequiredAsterisk: true,
				labelStyle: {
					"font-size": '30upx',
					"font-weight": "bold",
					"width": "20%",
					"color": "#333333"
				},
				isuserSub:false,
				userInfo: {
					username: "",
					password: '',
					name:'',
					phone:'',
					job:''
				},
				rules: {
					username: {
						required: true,
						message: '请输入您的账户名!'
					},
					password: {
						required: true,
						message: '请输入您的登录密码!'
					},
					name: {
						required: true,
						message: '请输入您的登录密码!'
					},
					phone:[{
						required: true,
						message: '请输入手机号'
					},
					{
						pattern: '^[1][3456789]\\d{9}$',
						message: '手机号格式不正确'
					}],
					job: {
						required: true,
						message: '请输入您所在的单位名称!'
					}
				}

			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs.form.setRules(this.rules);
			})
		},
		methods: {
			userSub() {
				this.$refs.form.validate((res) => {
					if (res) {
						let data = this.userInfo;
						let e = {
							username:data.username.replace(/\s*/g,""),
							password:data.password,
							name:data.name,
							phone:data.phone,
							job:data.job
						};
						if(this.isuserSub){
							return
						}
						this.isuserSub=true;
						console.log(e)
						this._reqw.post(e, 'zhuce').then(res => {
							this.isuserSub=false;
							res.result == 0 ?
							uni.showModal({
								content: "注册成功，请联系管理员",
								showCancel:false,
								// cancelText: "取消",
								confirmText: "前往登录",
								confirmColor: "#007AFF",
								// cancelColor: '#999999',
								success(res) {
									if (res.confirm) {
										uni.navigateBack({
											delta:1
										})
									} else if (res.cancel) {
										uni.navigateBack({
											delta:1
										})
									}
								}
							}): this.$api.tip(res.resultNote)
						}).catch(err => {})
					}

				})
			}
		}
	}
</script>

<style scoped lang="less">
	.btn {
		width: 500upx;
		line-height: 80upx;
		text-align: center;
		background:#007aff;
		border-radius: 16upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin: 80upx auto;
	}
	.item-con{
		padding: 20upx 0;
		// background: #FFFFFF;
	}

	.center-con {
		padding: 40upx;
	}

	.center-input {
		height: 70upx;
		padding-left: 30upx;
		flex: 1;
		font-size: 24upx;
		color:#333333;
	}
</style>
