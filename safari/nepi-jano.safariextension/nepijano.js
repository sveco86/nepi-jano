/**
 * Some utils
 */
var utils = {};

/**
 * Get parameter from URL (if exists)
 */
utils.urlParam = function(name, url) {
	url = (url) ? url : window.location.href;
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	if (results === null) {
		return false;
	} else {
		return results[1];
	}
	return false;
};

/**
 * Remove elements from document using selector
 */
utils.removeSelector = function(doc, selector) {
	var elements = doc.querySelectorAll(selector);
	var i = elements.length;
	while (i--) {
		elements[i].parentNode.removeChild(elements[i]);
	}
	return doc;
};

/**
 * Fix URLs in anchors
 */
utils.fixAnchors = function(doc) {
	var elements = doc.querySelectorAll('a');
	var i = elements.length;
	while (i--) {
		var url = elements[i].getAttribute('href');
		var articleId = utils.urlParam('c', url);
		var galleryId = utils.urlParam('g', url);
		if (/s.sme.sk\//i.test(url) && articleId) {
			elements[i].setAttribute('href', document.location.protocol + '//' + document.location.hostname + '/c/' + articleId + '/');
		}
		if (/s.sme.sk\//i.test(url) && galleryId) {
			elements[i].setAttribute('href', document.location.protocol + '//' + document.location.hostname + '/galeria/' + galleryId + '/' + Math.random().toString(36).substr(2, length) + '/');
		}

	}
	return doc;
};

/**
 * Fix video tags
 */
utils.fixVideos = function(doc) {
	var elements = doc.querySelectorAll('.iosvideo');
	var i = elements.length;
	while (i--) {
		var videoUrl = elements[i].querySelector('a[href$=mp4]').getAttribute('href');
		var videoPosterUrl = elements[i].querySelector('.videoimg').getAttribute('src');
		elements[i].innerHTML = '<video src="' + videoUrl + '" controls poster="' + videoPosterUrl + '" width="100%" preload="none">';
	}
	return doc;
};

/**
 * Get video resolution from URL
 */
utils.isHD = function() {
	return (document.location.pathname.split('/')[1] == 'vhd') ? 1 : 0;
};

/**
 * Get article ID from URL
 */
utils.articleId = function() {
	return document.location.pathname.split('/')[2];
};

/**
 * Detect Piano article
 */
utils.isPianoArticle = function() {
	return document.querySelector('.sme_piano_art_promo') || document.querySelector('.js-piano-teaser-standard');
};

/**
 * Detect Piano video
 */
utils.isPianoVideo = function() {
	return document.querySelector('.tvpiano');
};

if (/\.sme\.sk\/c\/\d+\/.*/.test(document.location)) {
	if (utils.isPianoArticle()) {
		safari.self.tab.dispatchMessage('doXhr', ['article', 'http://s.sme.sk/export/ma/?c=' + utils.articleId()]);
	}
}
else if (/tv\.sme\.sk\/v(hd)?\/\d+\/.*/.test(document.location)) {
	if (utils.isPianoVideo()) {
		safari.self.tab.dispatchMessage('doXhr', ['video', 'http://www.sme.sk/storm/mmdata_get.asp?id=' + utils.articleId() + '&hd1=' + utils.isHD()]);
	}
}

safari.self.addEventListener('message', function(event) {
	if (event.name === 'article') {
		var doc = (new DOMParser()).parseFromString(event.message, 'text/html');
		doc = utils.removeSelector(doc, 'script');
		doc = utils.removeSelector(doc, 'link');
		doc = utils.removeSelector(doc, 'style');
		doc = utils.fixAnchors(doc);
		doc = utils.fixVideos(doc);

		/* articles */
		var html;
		if (html = document.querySelector('#article-box #itext_content')) {
			doc = utils.removeSelector(doc, '.button-bar');
			html.innerHTML = doc.querySelector('.articlewrap').innerHTML;
		}
		/* tech articles */
		else if (html = document.getElementsByTagName('article')[0]) {
			if (doc.querySelector('.articlewrap')) {
				doc = utils.removeSelector(doc, 'p:first-of-type');
				doc = utils.removeSelector(doc, '.button-bar');
				html.innerHTML = doc.querySelector('.articlewrap').innerHTML;
			}
			else {
				html.innerHTML = doc.getElementsByTagName('article')[0].innerHTML + doc.querySelector('.button-bar').innerHTML;
			}
		}
	}
	else if (event.name === 'video') {
		var image    = event.message.match(/<image>(.*)<\/image>/)[1];
		var location = event.message.match(/<location>(.*)<\/location>/)[1];

		if (html = document.querySelector('div.video')) {
			html.innerHTML = '<video controls="controls" poster="' + image + '"><source src="' + location + '"></source></video>';
			// remove Piano add
			utils.removeSelector(document, 'div.sme_piano_art_promo');
			// workaround to prevent HD switch button overlaping the video
			document.querySelector('.v-podcast-box').style.marginTop = "35px";
		}
	}
}, false);
