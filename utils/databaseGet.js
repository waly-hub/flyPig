 function databaseGet (col){
	const db = wx.cloud.database()
	const collection = db.collection(col)
	return collection.get()
	
}
function goodsGet(col,pageId=0){
	const db = wx.cloud.database()
	const collection = db.collection(col)
	const count = pageId * 6
	return collection.limit(6).skip(count).get()
}
export {databaseGet,goodsGet}