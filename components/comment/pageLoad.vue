<template>
	<view class="load-mask">
		<view class="loader">
			<image src="../../static/tab/homeload.svg" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.load-mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		overflow: hidden;
		background: rgba(242,243,244,0.6);
	}
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.loader image {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
		background: rgba(0,0,0,.2);
	}
</style>
