<template>
	<view class="goods-list">
		<block v-for="(item,index) in goodsList" :key="index">
			<goodsItem :goodsItem="item" class="goods-item"></goodsItem>
		</block>
	</view>
</template>

<script>
	import goodsItem from './goodsItem.vue'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components: {
			goodsItem
		},
		created(){
			// let db = wx.cloud.database()
			// let goodsList = db.collection('goodsList')
			// goodsList.get()
			// 	.then(res => {
			// 		this.goodsList = res.data
					
			// 	})
			// 	.catch(err => console.log(err))
		},
		props: {
			goodsList: Array
		}
	}
</script>

<style>
	.goods-list {
		margin: 20upx 0;
		padding: 0 20upx;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.goods-item {
		width: 48%;
	}
</style>
