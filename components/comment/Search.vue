<template>
	<view>
		<view class="search-box">
			<view class="iconfont scan">&#xe610;</view>
			<view class="search-group">
				<view class="search">
					<input type="text" placeholder="请输入关键字">
				</view>
			</view>
			<view class="iconfont liuyan">&#xe69f;</view>
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
			
		},
		
	}
</script>

<style>
	.search-box {
		display: flex;
		justify-content: center;
		padding: 20upx 30upx;
		height: 90upx;
		line-height: 90upx;
		background: linear-gradient(to top, #ffe566 10%, #ffd300 100%);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
	
	.search-group {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80%;
		border-radius: 300upx 0 300upx 300upx;
		overflow: hidden;
		margin-right: 50upx;
	}
	.search {
		width: 100%;
		background: #fff7d4;
	}
	
	.search input {
		box-sizing: border-box;
		width: 100%;
		padding-left: 60upx;	
		height: 70upx;
		line-height: 70upx;
		font-size: 30upx;
		color: #666666;
		position: relative;
	}
	.search input::before {
		font-family: 'iconfont';
		content: '\e60f';
		position: absolute;
		left: 10upx;
		font-size: 50upx;
	}
	.scan {
		margin-right: 50upx;
		color: #fff;
		font-size: 50upx;
	}
	.liuyan {
		color: #fff;
		font-size: 50upx;
	}
	
	
</style>
