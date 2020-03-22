<template>
	<view class="page">
		<!-- 搜索框 -->
		<search></search>
		<!-- 轮播图 -->
		<view class="swiper-box">
			<SwiperBy :banners="banners"></SwiperBy>
		</view>
		
		<!-- 各种各样的票 -->
		<view class="ticket-list">
			<block v-for="(item,index) in ticket" :key="index">
				<view class="ticket-item">
					<image :src="item.image" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</block>
		</view>
		<!-- 去哪里 -->
		<view class="classify">
			<block v-for="(item,index) in tables" :key="index">
				<view class="classify-item">
					<view class="tick">{{item.tick}}</view>
					<view class="nametext">{{item.nametext}}</view>
				</view>
			</block>
		</view>
		<!-- 推荐列表 -->
		<view class="recommend" :class="{'recommend-fixed': isRecommend}">
				<scroll-view scroll-x="true" class="recommend-scroll" scroll-with-animation="true">
					<view class="recommend-list">
						<block v-for="(item,index) in strategyList" :key="index">
							<view class="strategy-item" 
							:class="{'active': index == currentIndex}" 
							v-on:tap="handleScrollTap(index,item.nav)"
							
							>
								<view class="item-title" :class="{'active-font': index == currentIndex}">{{item.name}}</view>
								<view class="item-labei">{{item.title}}</view>
							</view>
						</block>
					</view>
				</scroll-view>
		</view>
		<!-- 商品列表 -->
		<load-list v-if="isLoading"></load-list>
		<goodsList :goodsList="goodsList" v-if="!isLoading"></goodsList>
		
		<!-- 加载中 -->
		<uniLoadMore :status="uniLoad" v-if="isLoadMore" color="#4d8d55"></uniLoadMore>
		
		<!-- 页面加载时显示的pageLoad -->
		<pageLoad v-if="isPageLoad"></pageLoad>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import Search from '../../components/comment/Search.vue'
	import SwiperBy from '../../components/comment/SwiperBy.vue'
	import goodsList from '../../components/comment/goodsList.vue'
	import {databaseGet,goodsGet} from '../../utils/databaseGet.js'
	export default {
		data() {
			return {
				ticket: [
					{
						image: 'http://gw.alicdn.com/tfs/TB1DoXFwHsrBKNjSZFpXXcXhFXa-210-126.png_110x10000.jpg_.webp',
						name: '机票'
					},
					{
						image: 'http://gw.alicdn.com/tfs/TB1s51ECuOSBuNjy0FdXXbDnVXa-210-126.png_110x10000.jpg_.webp',
						name: '酒店'
					},
					{
						image: 'http://gw.alicdn.com/tfs/TB1BNE_wrZnBKNjSZFrXXaRLFXa-210-126.png_110x10000.jpg_.webp',
						name: '火车票'
					},
					{
						image: 'http://gw.alicdn.com/tfs/TB1pN01wsUrBKNjSZPxXXX00pXa-210-126.png_110x10000.jpg_.webp',
						name: '汽车票'
					},
					{
						image: 'http://gw.alicdn.com/tfs/TB1VZqNCuSSBuNjy0FlXXbBpVXa-210-126.png_110x10000.jpg_.webp',
						name: '门票'
					}
				],
				tables: [
					{
						tick: '出境游',
						nametext: '走遍全球'
					},
					{
						tick: '国内游',
						nametext: '精选路线'
					},
					{
						tick: '周边游',
						nametext: '暑假红包'
					},
					{
						tick: '精选购',
						nametext: '免税预购'
					},
					{
						tick: '签证/签注',
						nametext: '领劵'
					},
					{
						tick: '会员',
						nametext: '签到'
					},
					{
						tick: '每日福利',
						nametext: '领里程'
					},
					{
						tick: '全部',
						nametext: '更多推荐'
					}
				],
				strategyList: [],
				currentIndex: 0,
				isRecommend: false,
				banners: [],
				goodsList: [],
				isLoading: false,
				pageId: 0,
				nav: 'recommend',
				oldNav: 'recommend',
				isLoadMore: false,
				uniLoad: 'loading',
				isPageLoad: true
			}
		},
		components: {
			Search,
			SwiperBy,
			goodsList,
			uniLoadMore
		},
		onLoad() {
			
			Promise.all([databaseGet('tab'),databaseGet('flyPigBanner'),goodsGet('recommend',this.pageId)])
				.then(res => {
					this.banners = res[1].data
					this.strategyList = res[0].data
					this.goodsList = res[2].data
					this.isPageLoad = false
				})
				.catch(err => console.log(err))
		},
		onReachBottom(){
			if (this.oldNav == this.nav){
				this.pageId++ 
				console.log(this.pageId)
				goodsGet(this.nav,this.pageId)
					.then(res => {
						this.goodsList = [...this.goodsList,...res.data]
						if(res.data.length == 0){
							this.uniLoad = 'noMore'
						}
					})
			}else {
				this.oldNav = this.nav
				this.pageId = 0
				this.uniLoad = 'loading'
				goodsGet(this.nav,this.pageId)
					.then(res => {
						this.goodsList = [...res.data]
						if(res.data.length == 0){
							this.uniLoad = 'noMore'
						}
					})
			}
			this.isLoadMore = true
	
		},
		methods: {
			handleScrollTap(index,nav){
				this.currentIndex = index
				this.isLoading = true
				this.nav = nav
				console.log(index,nav)
				
				
				goodsGet(nav).then(res => {
					this.goodsList = res.data
					this.isLoading = false
					this.$store.dispatch('listDis',res.data)
					console.log(this.$store.state.list)
				})
				
				wx.pageScrollTo({
					scrollTop: 300,
					duration: 1000
				})
				
			}
			
		},
		onPageScroll(e){
			if (e.scrollTop >= 314) {
				this.isRecommend = true
			}else {
				this.isRecommend = false
			}
			// console.log(e)
		}
	}
</script>

<style>
	
	.swiper-box {
		margin-top: 140upx;
	}
	.ticket-list {
		margin-top: 15upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 130upx;
	}
	.ticket-item {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.ticket-item image {
		width: 100%;
		height: 100%;
	}
	.ticket-item text {
		font-size: 30upx;
	}
	.classify {
		display: flex;
		flex-wrap: wrap;
		width: 92%;
		margin: 20upx 4% 0 4%;
		border: 1px solid #eee;
		border-radius: 10upx;
		/* box-shadow: 0 8upx 10upx rgba(0,0,0,.3); */
		
	}
	.classify-item {
		box-sizing: border-box;
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 10upx;
	}
	.classify-item:nth-child(-n+3) {
		border-right: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}
	.classify-item:nth-child(4) {
		border-bottom: 1px solid #eee;
	}
	.classify-item:nth-child(n+5) {
		border-right: 1px solid #eee;
	}
	.classify-item:last-child {
		border: none;
	}
	.tick {
		font-size: 38upx;
		margin-bottom: 5upx;
	}
	.nametext {
		font-size: 28upx;
		color: #ccc;
	}
	.recommend {
		margin-top: 20upx;
		background-color: #fff;
		z-index: 999;
	}
	
	.recommend-scroll {
		white-space: nowrap;
		height: 90upx;
		width: 100%;
		position: relative;
		left: 0;
		right: 0;
	}
	.strategy-item {
		width: 190upx;
		display: inline-block;
		text-align: center;
	}
	.item-title {
		font-size: 38upx;
	}
	.item-labei {
		font-size: 28upx;
		color: #ccc;
	}
	.active {
		background-image: linear-gradient(to right, #ccffff 0%, #ffcc00 100%);
		border-top-right-radius: 80upx;
		
	}
	.active-font {
		font-weight: 700;
	}
	.recommend-fixed {
		position: fixed;
		right: 0;
		left: 0;
		top: 110upx;
	}
</style>
