// clsaa 面向对象类
// promise  封装
const db = wx.cloud.database()   //指定要操作数据库

// 请求轮播,tab数据
var home = function(banner){
	return new Promise((resolve,reject)=>{
		const banners = db.collection(banner)
		banners.get()
		.then((res)=>{
			resolve(res)
		})
		.catch((err)=>{
			reject(err)
		})
	})
	
}


// 请求攻略列表的数据
var homelist = function(listing,pageid){
	return new Promise((resolve,reject)=>{
		const listdata = db.collection(listing)
		.limit(6)
		.skip(pageid * 6) 
		listdata.get()
		.then((res)=>{
			resolve(res)
		})
		.catch((err)=>{
			reject(err)
		})
	})
	
}

export {home,homelist}