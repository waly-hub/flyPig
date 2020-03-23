<template>
	<view>
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view>
				<block v-for="(item, index) in tab" :key="index">
					<view  class="list-cont" @click="tabs(index,item.nav)" :class="{active: index == num}">
						<view>
							<text  class="con-text-a">{{ item.name }}</text>
						</view>
						<view>
							<text  class="con-text-b" :class="{activeb: index == num}">{{ item.title }}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 引入攻略列表的数据库接口
	import {homelist} from '../../../common/cloundfun.js'
	export default{
		name:"tab",
		props:{
			tab:Array
		},
		data() {
			return {
				num:0,
			}
		},
		methods:{
			tabs(index,nav){
				// console.log(index)
				console.log(nav)
				this.num = index
				// 点击tab切换loading状态显示
				let loading = true
				
				// tab切换的时候把pageid值置为0
				let pageid = 0
				
				// tab切换的时候把上拉加载组件隐藏
				let uniload = false
				
				// tab切换把没有数据提示的组件隐藏
				let nonedata = false
				
				// 以对象的形式传值到vuex
				let pullobj = {
					loading:loading,
					nav:nav,
					pageid:pageid,
					uniload:uniload,
					nonedata:nonedata
				}
				this.$store.commit('navmuta',pullobj)
				
				
				// 请求数据库
				// 上拉加载值
				let listid = 0
				homelist(nav,listid)
				.then((res)=>{
					console.log(res)
					// tab切换没有数据的提示
					if(res.data.length == 0){
						let nonedata = true
						this.$store.commit('nomemuta',nonedata)
					}else{
						let nonedata = false
						this.$store.commit('nomemuta',nonedata)
					}
					// vuex传值 vuex登场
					let listdata = res.data
					this.$store.commit('listmuta',listdata)
					// 点击tab切换loading状态显示
					let loading = false
					this.$store.commit('loadmuat',loading)
				})
				.catch((err)=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.active {
		background-image: linear-gradient(to right, #ccffff 0%, #ffcc00 100%);
		border-top-right-radius: 50upx;
	}
	.activeb {
		color: #292c33 !important;
	}
	.scroll{ white-space: nowrap;
		width: 100%;
		position: absolute; left: 0; right: 0;
		background: #FFFFFF;
		padding: 20upx 0;
		}
		
	.con-text-a {
		color: #292c33;
		font-size: 30upx;
		font-weight: bold;
	}
	.con-text-b {
		color: #9ea0a5;
		font-size: 23upx;
	}
	.list-cont {
		width: 180upx;
		display: inline-block;
		text-align: center;
	}

	
</style>
