/**
 * Some utils
 */
var utils = {};

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
 * Detect blocked Piano video
 */
utils.isPianoVideo = function() {
	return document.querySelector('.tvpiano');
};

/**
 * Return false if viewing unblocked Piano article
 */
utils.noPianoTag = function() {
	return /[?&]piano_t=1/.test(document.location.href) === false;
};

/**
 * Detect blocked Piano article
 */
utils.isPianoArticle = function() {
	return document.querySelector('.sme_piano_art_promo') || document.querySelector('.js-piano-teaser-standard');
};

/**
 * Remove Piano tracking cookie preventing loading of unblocked Piano article
 */
utils.removePianoCookie = function() {
	document.cookie = 'pianovisitkey=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=.sme.sk';
};

/**
 * Load unblocked Piano article
 */
utils.loadPianoArticle = function() {
	var uri       = document.location.href;
	var i         = uri.indexOf('#');
	var hash      = i === -1 ? ''  : uri.substr(i);
	var uri       = i === -1 ? uri : uri.substr(0, i);
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";

	window.location = uri + separator + 'piano_t=1' + hash;
};

if (/\.sme\.sk\/c\/\d+\/.*/.test(document.location)) {
	if (utils.noPianoTag() && utils.isPianoArticle()) {
		utils.removePianoCookie();
		utils.loadPianoArticle();
	}
}
else if (/tv\.sme\.sk\/v(hd)?\/\d+\/.*/.test(document.location)) {
	if (utils.isPianoVideo()) {
		safari.self.tab.dispatchMessage('doXhr', ['video', 'http://www.sme.sk/storm/mmdata_get.asp?id=' + utils.articleId() + '&hd1=' + utils.isHD()]);
	}
}

safari.self.addEventListener('message', function(event) {
	if (event.name === 'video') {
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
