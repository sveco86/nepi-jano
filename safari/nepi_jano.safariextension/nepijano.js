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
 * Get article ID from URL
 */
utils.articleId = function() {
	return document.location.pathname.split('/')[2];
};

/**
 * Detect Piano article
 */
utils.isPiano = function() {
	return document.querySelector('.sme_piano_art_promo');
};

if (/\.sme\.sk\/c\/\d+\/.*/.test(document.location) && utils.isPiano()) {
	safari.self.tab.dispatchMessage('doXhr', 'http://s.sme.sk/export/ma/?c=' + utils.articleId());
}

safari.self.addEventListener('message', function(event) {
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
		html.innerHTML = doc.getElementsByTagName('article')[0].innerHTML + doc.querySelector('.button-bar').innerHTML;
	}
}, false);
