<template>
	<view>
		<view class="navs">
			<block v-for="(item,index) in navalue" :key="index">
				<text :class="{activetext:index == num}" @click="navbtn(index)">{{item.name}}</text>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		name:'navs',
		data() {
			return {
				num:0,
				navalue: [
					{
						'name':'宝贝',
					},
					{
						'name':'详情',
					},
					{
						'name':'评价',
					}
				]
			}
		},
		
		methods:{
			navbtn(index){
				this.num = index
				// console.log(index)
				if(index === 0){
					this.backTop()
				}else{
					// console.log('不是点击宝贝tab')
					this.$parent.fatherTab(index)
				}
			},
			
			// 回到顶部
			backTop(){
				wx.pageScrollTo({
					scrollTop:0
				})
			}
			
		}
		
	}
</script>

<style scoped>
	.navs text{display: block; font-size: 30upx; width: 100upx; text-align: center; color: #464230;}
	.navs{display: flex; justify-content: center; height: 35px; line-height: 35px; padding: 5upx 0;}
	.activetext{border-bottom: 6upx solid #3d3b32;}
</style>
