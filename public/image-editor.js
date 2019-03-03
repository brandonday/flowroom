window.onload = function () {
	var container = document.getElementById('editor')
	var editor = new PhotoEditorSDK.UI.ReactUI({
	  container: container,
		// Please replace this with your license: https://www.photoeditorsdk.com/dashboard/subscriptions
		license: '{"owner":"Imgly Inc.","version":"2.1", ...}',
	  assets: {
		baseUrl: './public/assets'
	  }
	})
  }