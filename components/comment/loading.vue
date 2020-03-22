<template>
	<view class="loading">
		<view class="loader"></view>
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
	.loading {
		margin-top: 20upx;
		display: flex;
		justify-content: center;
	}
	.loader {
		width: 40upx;
		height: 40upx;
		border: 7upx solid greenyellow;
		border-radius: 50%;
		border-bottom-color: transparent;
		animation: load 1s linear infinite;
	}
	@keyframes load{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
