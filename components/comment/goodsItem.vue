<template>
	<view>
		<view class="goods">
			<view class="goods-img">
				<image :src="goodsItem.image" mode=""></image>
			</view>
			<view class="goods-introduce">
				<view class="goods-name">{{goodsItem.title}}</view>
				<view class="goods-title">{{goodsItem.list}}</view>
				<view class="goods-label">{{goodsItem.label}}</view>
				<view class="goods-info">
					<view class="goods-price">￥{{goodsItem.price}}</view>
					<view class="goods-buy">{{goodsItem.buy}}人已购</view>
				</view>
			</view>
			
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
		props: {
			goodsItem: Object
		},
		
	}
</script>

<style>
	.goods {
		width: 100%;
		margin-top: 10upx;
	}
	.goods-img {
		width: 100%;
		height: 400upx;
		border-radius: 15upx;
		overflow: hidden;
	}
	.goods-img image {
		width: 100%;
		height: 100%;
	}
	.goods-name {
		margin-top: 10upx;
		color: #d0b083;
		font-size: 28upx;
	}
	.goods-title {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 36upx;
	}
	.goods-label {
		margin-top: 6upx;
		color: #d0b083;
		font-size: 24upx;
	}
	.goods-info {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 32upx;
	}
	.goods-price {
		margin-right: 10upx;
		color: #F0AD4E;
		
	}
	.goods-buy {
		color: #ccc;
	}
</style>
