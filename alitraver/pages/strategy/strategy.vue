<template>
	<view>
		<Adress :address="address"></Adress>
		<Locality></Locality>
		<Content :localdata="localdata" v-if="!loadinglist"></Content>
		<!-- 发表 -->
		<view class="publish animated fadeInUp">
			<image src="../../static/tab/fab.png" mode="widthFix" @click="travels()"></image>
		</view>
		<!-- tab切换的loading -->
		<load-list v-if="loadinglist"></load-list>
		<!-- 没有数据的提示 -->
		<none-data v-if="nonedata"></none-data>
		<!-- 进入页面的loading加载 -->
		<home-load v-if="homeload"></home-load>
	</view>
</template>

<script>
	import Adress from './components/address'
	import Locality from './components/locality'
	import Content from './components/content'  
	import {addressdata} from '../../common/list.js'
	// 取到vuex里的值
	import {mapState} from 'vuex'
	// 定义操作数据库
	var db = wx.cloud.database()
	var listdata = db.collection('userdata')
	export default{
		name:'strategy',
		components:{
			Adress,
			Locality,
			Content
		},
		data() {
			return {
				address: '',
				addressData:'',
				// 列表数据
				localdata:[],
				loadinglist:false,
				nonedata:false,
				homeload:true
			}
		},
		
		methods:{
			// 被子组件调用
			fatherMethod(name){
				console.log(name)
				// 点击tab  loading显示,没有数据的提示也消失
				this.loadinglist = true
				this.nonedata  = false
				if(name == "全部"){
					let city = this.address
					this.cityData(city)
				}else{
					console.log('不是全部')
					// 分类筛选
					let city = this.address
					this.tabCity(city,name)
				}
			},
			
			
			addRess(){
				addressdata()
				.then((res)=>{
					console.log(res)
					this.address = res.result.ad_info.city
					console.log(this.address)
					// 定位成功查询数据库取出该城市下的景点数据
					this.cityData(this.address)
				})
				.catch((err)=>{
					console.log('用户拒绝定位')
					this.address = '昆明市'
					this.cityData(this.address)
				})
			},
			
			// 定位成功查询数据库取出该城市下的景点数据
			cityData(city){
				listdata.where({
					datainfo:{
						address:city
					}
				})
				.orderBy('datainfo.time', 'desc')
				.get()
				.then((res)=>{
					console.log(res)
					let citydata = res.data
					// 筛选值 _id，datainfo里的数据，合并成一个数组返回来
					this.resultCity(citydata)
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
			
			// tab切换筛选的数据
			tabCity(city,name){
				listdata.where({
					datainfo:{
						address:city,
						classdata:name
					}
				})
				.get()
				.then((res)=>{
					console.log(res)
					let citydata = res.data
					this.resultCity(citydata)
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
			
			// 筛选值 _id，datainfo里的数据，合并成一个数组返回来
			resultCity(citydata){
				var adddata = citydata.map((item)=>{
					let id = item._id
					let datainfo  =item.datainfo
					return{
						id,
						datainfo
					}
				})
				console.log(adddata)
				this.localdata = adddata
				// 数据出来loading消失
				this.homeload = false
				// 数据出来 tab loading消失
				this.loadinglist = false
				// 没有数据给予提示
				if(adddata.length === 0){
					this.nonedata = true
				}else{
					this.nonedata  = false
				}
			},
			
			
			// 跳到发表页面
			travels(){
				uni.navigateTo({
					url:'../travels/travels'
				})
			}
		},
		
		created() {
			// 定位
			this.addRess()
		},
		
		// 计算属性
		computed:{
			...mapState(['city','roturn']),
			count(){
			this.addressData = this.city.citying
			},
			// 如果监听到值为true，那么表示用户发表游记成功，然后再次刷新当前页面
			routing(){
				if(this.roturn.pagesid == true){
					console.log('再次刷新当前页面')
					this.addRess()
				}
			}
		},
		
		// 侦听器
		watch:{
			addressData(newValue,oldValue){
				console.log(newValue)
				this.address = newValue
				this.cityData(newValue)
			}
		}
	
	}
</script>

<style scoped>
	.publish image{width: 120upx !important; height: 100upx !important; border-radius: 40upx;}
	.publish{position: fixed; bottom: 20upx; left: 0; right: 0; display: flex; justify-content: center;}
</style>
