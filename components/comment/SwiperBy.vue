<template>
	<view class="swiper-box">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" 
		indicator-active-color="#ff0000" indicator-color="rgba(0, 0, 0, .3)" class="swiper">
			<block v-for="(item,index) in banners" :key="index">
				<swiper-item>
					<view class="swiper-item">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</block>	
		</swiper>
	</view>
</template>

<script>
	// import databaseGet from '../../utils/databaseGet.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		created(){
			// databaseGet('flyPigBanner')
			// 	.then(res => {
			// 		this.banners = res.data
			// 	})
			// 	.catch(err => console.log(err))
		},
		props: {
			banners: Array
		}
	}
</script>

<style>
	.swiper-box {
		box-sizing: border-box;
		width: 92%;
		margin: 20upx 4% 0 4%;
		border-radius: 15upx;
		overflow: hidden;
		box-shadow: 0 8upx 25upx rgba(0,0,0,.3);
	}
	.swiper {
		width: 100%;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
	}
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
</style>
