var data = require("sdk/self").data;
var request = require("sdk/request").Request;

var pageMod = require("sdk/page-mod").PageMod;
pageMod({
	include : /.*\.sme\.sk\/c\/\d+\/.*/,
	contentScriptFile : data.url("nepijano.js"),
	onAttach : function(worker) {
		worker.port.on("loadPage", function(url) {
			request({
				url : url,
				headers : {
					"User-Agent" : "",
				},
				onComplete : function(response) {
					if (response.status == 200) {
						worker.port.emit("rewritePage", response.text);
					}
				}
			}).get();
		});
	}
});

var videoMod = require("sdk/page-mod").PageMod;
videoMod({
	include : /http:\/\/tv\.sme\.sk\/v(hd)?\/\d+\/.*/,
	contentScriptFile : data.url("video.js"),
	onAttach : function(worker) {
		worker.port.on("loadPage", function(url) {
			request({
				url : url,
				headers : {
					"User-Agent" : "",
				},
				onComplete : function(response) {
					if (response.status == 200) {
						worker.port.emit("rewritePage", response.text);
					}
				}
			}).get();
		});
	}
});