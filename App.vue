<script>
	export default {
		onLaunch: function() {
			if (!wx.cloud) {
				console.error('请使用 2.2.3 或以上的基础库以使用云能力');
			} else {
				wx.cloud.init({
					env: 'cloud-b1dhq',
					traceUser: true
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
	  font-family: 'iconfont';  /* project id 1672650 */
	  src: url('//at.alicdn.com/t/font_1672650_fvv1ypiuyic.eot');
	  src: url('//at.alicdn.com/t/font_1672650_fvv1ypiuyic.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1672650_fvv1ypiuyic.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1672650_fvv1ypiuyic.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1672650_fvv1ypiuyic.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1672650_fvv1ypiuyic.svg#iconfont') format('svg');
	}
	.iconfont {
		font-family: 'iconfont';
	}
</style>
