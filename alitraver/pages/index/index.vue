<template>
	<view>
		<Search :banner="banner"></Search>
		<Ticket></Ticket>
		<Classify></Classify>
		<Content id="boxFixed" :class="{'is_fixed' : isFixed}" :tab="tab"></Content>
		<view style="height: 140upx;"></view>
		<!-- tab切换的loading -->
		<load-list v-if="loadinglist"></load-list>
		<Article :Articleend="Articleend" v-if="!loadinglist"></Article>
		<!-- 进入页面的loading加载 -->
		<home-load v-if="homeload"></home-load>
		<!-- 没有数据的提示 -->
		<none-data v-if="nonedata"></none-data>
		<!-- 上拉加载组件 -->
		<view class="load-more" v-if="loadmore">
		<uni-load-more :status="uniload" color="#ffcc99"></uni-load-more>	
		</view>
		
	</view>
</template>
 
<script>
	import Search from './components/search'
	import Ticket from './components/ticket'
	import Classify from './components/classify'
	import Content from './components/content'
	import Article from './components/article'
	// 引入上拉加载组件
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	// 结构
	var {log} = console
	// 引入公用方法
	import {home,homelist} from '../../common/cloundfun.js'
	import {mapState} from 'vuex'
	export default {
		components:{
			Search,
			Ticket,
			Classify,
			Content,
			Article,
			uniLoadMore
		},
		data() {
			return {
				isFixed:false,
				rect:'',
				menutop:'',
				banner:[],
				tab:[],
				Articleend:[],
				loadinglist:false   ,//tab切换的loading状态
				// 上拉加载值
				pageid:0,
				nav:''  ,//tab切换拿到的集合
				uniload:'loading',//上拉加载的状态
				loadmore:false,//隐藏上拉加载
				nonedata:false,//tab切换没有数据的提示 
				homeload:true,  //进入页面的loading加载
			}
		},
		
		created() {
			// 请求轮播数据
			let banner = 'banner'
			let tab = 'tab'
			let listing = 'recommend'
			// 并发批量请求 promise.all,可以批量请求多个接口，而且同时得到所有数据
			Promise.all([home(banner),home(tab),homelist(listing,this.pageid)])
			.then((res)=>{
				log(res)
				// 轮播
				this.banner = res[0].data
				// tab切换
				this.tab = res[1].data
				// 攻略景点列表数据的第一个tab的数据
				this.Articleend = res[2].data
				// 本页所有数据请求成功之后消除loading
				this.homeload = false
			})
			.catch((err)=>{
				log(err)
			})
			
			
		},
		
		methods:{
			// 上拉加载
			pullon(){
				let listing = this.nav
				homelist(listing,this.pageid)
				.then((res)=>{
					log(res)
					// 如果没有数据了
					if(res.data.length == 0){
						this.uniload = 'noMore'
					}else{
						// 把之前得到的数据和上拉加载的数据做合并:数组合并
						this.Articleend = [...this.Articleend,...res.data]
					}
				})
				.catch((err)=>{
					log(err)
				})
			}
		},
		
		onLoad() {
			const query = wx.createSelectorQuery()
			query.select('#boxFixed').boundingClientRect()
			query.exec((res)=>{
			  // console.log(res)
			  this.menutop = res[0].top
			})
		},
		
		// 监听页面滚动
		onPageScroll(e) {
			// console.log(e)
			this.rect = e.scrollTop
		},
		
		// 上拉加载
		onReachBottom(){
			// 上拉加载显示上拉加载组件
			this.loadmore = true
			this.uniload = 'loading'
			log('触底')
			this.pageid++
			console.log(this.pageid)
			this.pullon()
		},
		
		// 计算属性会时刻监听数据变化，只要数据发生变化，计算属性就会重新执行
		computed:{
			// 取出vuex数据仓库的数据
			...mapState(['list','load','navmin','nonemin']),
			// 取到tab切换的数据
			count(){
				this.Articleend = this.list.listing
			},
			// tab切换的loading状态
			countload(){
				this.loadinglist = this.load.loading
			},
			
			// 以对象传过来的值
			navdata(){
				this.loadinglist = this.navmin.loading
				this.nav = this.navmin.naving
				this.pageid = this.navmin.pageid
				this.loadmore = this.navmin.uniload,
				this.nonedata = this.navmin.nonedata
			},
			// tab切换没有数据的提示
			noneted(){
				this.nonedata = this.nonemin.nonedata
			},
			// 滑动组件置顶
			namepage(){
				// console.log('执行')
				if(this.rect > this.menutop){
					this.isFixed = true
				}else{
					this.isFixed = false

				}
			}
		}
		
	}
</script>

<style scoped>
	.is_fixed{position: fixed; left: 0; right: 0; top: 0;}
	/* 上拉加载组件样式 */
	.load-more{height: 160upx;
	display: flex;
	align-items: center;
	justify-content: center;}
</style>
