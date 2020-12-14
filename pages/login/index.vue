<template>
	<view class="">
		<evan-form class="" :hide-required-asterisk="hideRequiredAsterisk" label-position="left" ref="form" :labelStyle="labelStyle"
		 :model="userInfo">
			<view class="center-con">
				<evan-form-item prop="username">
					<view class="uni-flex uni-flex-item d-item-center d-between d-border" style="padding:30upx 0;">
						<view class="iconfont icon-zhanghao">

						</view>
						<input class="center-input" placeholder-class="placeholder" v-model="userInfo.username" placeholder="请输入您的账户名" />
					</view>

				</evan-form-item>
				<evan-form-item prop="password">
					<view class="uni-flex uni-flex-item d-item-center d-between d-border" style="padding:30upx 0;">
						<view class="iconfont icon-mima">

						</view>
						<input class="center-input " type='password' placeholder-class="placeholder" v-model="userInfo.password"
						 placeholder="请输入您的登录密码" />
					</view>

				</evan-form-item>
			</view>
		</evan-form>
		<view class="btn one" @click.stop="userSub" hover-class="btn-hover">登录</view>
		<navigator url='../resgin/index' class="btn two" hover-class="btn-hover">注册</navigator>
		<view class="uni-flex d-item-center d-content" style="padding:40upx 0;">
			<label class="radio uni-flex d-item-center d-content">
				<radio :checked="checked" @tap="checked=!checked" style="transform: scale(.7);" />
				<view class="uni-flex d-item-center d-content">请认真阅读并同意 <navigator url="../public/xieyi" style="color:#007AFF;font-size: 24upx;">
						《用户注册协议》</navigator>
					<navigator url="../public/zhengce" style="color:#007AFF;font-size: 24upx;">
						《隐私政策》</navigator>
				</view>
			</label>
		</view>
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
				checked: true,
				hideRequiredAsterisk: true,
				labelStyle: {
					"font-size": '30upx',
					"font-weight": "bold",
					"width": "20%",
					"color": "#333333"
				},
				userInfo: {
					username: "",
					password: ''
				},
				rules: {
					username: {
						required: true,
						message: '请输入您的账户名!'
					},
					password: {
						required: true,
						message: '请输入您的登录密码!'
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
				if (!this.checked) {
					this.$api.tip('请勾选用户协议!');
					return
				}
				this.$refs.form.validate(async (options) => {
					if (options) {
						let data = this.userInfo;
						let e = {
							username: data.username,
							password: data.password
						};
						console.log(e)
						const res = await this._reqw.post(e, 'login');

						if (res.result != 0) {
							this.$api.tip(res.resultNote);
							return
						}
						this.$api.tip('登录成功!');
						uni.setStorageSync('name', res.name);
						uni.setStorageSync('uid', res.userid);
						this.$api.redirect('/pages/index/index');
					}

				})
			}
		}
	}
</script>

<style scoped lang="less">
	.login-regsin {
		font-size: 24upx;
		color: #999999;
		padding: 20upx 0;
	}

	.btn {
		width: 500upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 16upx;
		font-size: 30upx;
	}

	.one {
		margin: 80upx auto;
		background: #007aff;
		color: #FFFFFF;

	}

	.two {
		margin: 0 auto;
		border: 1px solid #F2F2F2;
		box-sizing: border-box;
		background: #E3E3E3;
	}

	.center-con {
		padding: 300upx 40upx 40upx;
	}

	.center-input {
		height: 70upx;
		padding-left: 30upx;
		flex: 1;
		font-size: 24upx;
		color: #333333;
	}

	.other-input-con {
		background: rgba(246, 246, 246, 1);
		border-radius: 6upx;
		padding-right: 30upx;
	}

	.bg-input {
		background: rgba(246, 246, 246, 1);
		border-radius: 6upx;

	}
</style>
