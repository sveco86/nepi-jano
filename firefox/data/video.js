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
 * Detect Piano video
 */
utils.isPiano = function() {
	return document.querySelector('.tvpiano');
};

if (/tv\.sme\.sk\/v(hd)?\/\d+\/.*/.test(document.location) && utils.isPiano()) {
	self.port.emit('loadPage', 'http://www.sme.sk/storm/mmdata_get.asp?id=' + utils.articleId() + '&hd1=' + utils.isHD());
}

self.port.on("rewritePage", function(responseText) {
	var image    = responseText.match(/<image>(.*)<\/image>/)[1];
	var location = responseText.match(/<location>(.*)<\/location>/)[1];

	if (html = document.querySelector('div.video')) {
		html.innerHTML = '<video controls="controls" poster="' + image + '"><source src="' + location + '"></source></video>';
		// remove Piano add
		utils.removeSelector(document, 'div.sme_piano_art_promo');
		// workaround to prevent HD switch button overlaping the video
		document.querySelector('.v-podcast-box').style.marginTop = "35px";
	}
});