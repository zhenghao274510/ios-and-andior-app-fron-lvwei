<template>
	<view 		@touchstart="drag_start" @touchmove="drag_hmove" @tap.stop="useroptions">
		<view  	class="ball" :style="'left:'+moveX+'px;top :'+moveY+'px;'" v-if="!colse">{{title}}</view>
		<view 	class="ball" :style="'left:'+x+'px;top :'+y+'px;'" v-else>{{title}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			x: {
				type: [Number,String]
			},
			y: {
				type:[Number,String]
			},
			title: {
				type: String
			}
		},
		data() {
			return {
				start:[0,0],
				moveY:0,
				moveX:0,
				colse:true
			}
		},
		methods: {
			drag_start(event){
				this.start[0]= event.touches[0].clientX-event.target.offsetLeft;
				this.start[1]= event.touches[0].clientY-event.target.offsetTop;
			},
			drag_hmove(event){
					let	 tag 	 = event.touches;
					this.moveX	 = tag[0].clientX-this.start[0];
					this.moveY	 = tag[0].clientY-this.start[1];
					this.colse ? this.colse = false : this.colse;
			},
			useroptions(){
				this.$emit('click')
			}
		}}
</script>

<style lang="less">
	.ball{
		width: 70upx;height: 70upx;
		background:linear-gradient(to bottom, #F8F8FF,#87CEFA);
		border-radius: 50%;
		box-shadow: 0 0 15upx #87CEFA;
		color: #fff;
		font-size:26upx;
		display: flex;justify-content: center;align-items: center;
		position: fixed;
		z-index: 9999;
	}
</style>
