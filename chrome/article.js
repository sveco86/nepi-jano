/**
 * Some utils
 */
var utils = {};

utils.whitelist = ['#text', 'BR', 'H1', 'H2', 'H3', 'P', 'DIV', 'SPAN', 'STRONG', 'SMALL', 'BLOCKQUOTE', 'UL', 'OL', 'LI', 'A', 'IMG'];

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
 * Get article ID from URL
 */
utils.articleId = function() {
	return document.location.pathname.split('/')[2];
};

/**
 * Detect Piano article
 */
utils.isPianoArticle = function() {
	return document.querySelector('.js-piano-teaser-standard');
};

/**
 * Copy only allowed HTML elements and their styles from the remote article
 */
utils.sanitizeContent = function(root, node) {
	for(var i = 0; i < node.childNodes.length; i++ ) {
		var child = node.childNodes[i];

		if (utils.whitelist.indexOf(child.nodeName) >= 0) {
			var element;

			if (child.nodeName == '#text') {
				element = document.createTextNode(child.textContent);
			}
			else {
				element = document.createElement(child.nodeName);
				element.className = child.className;

				if (child.nodeName == 'A') {
					element.href = child.href;
				}
				else if (child.nodeName == 'IMG') {
					element.src = child.src.replace(/^http:/, 'https:');
					element.alt = child.alt;
				}

				if (child.childNodes.length > 0) {
					utils.sanitizeContent(element, child);
				}
			}

			root.appendChild(element);
		}
	}
}

/**
 * Get mobile version of the article
 */
utils.getArticle = function(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		if (request.status == 200) {
			var doc = (new DOMParser()).parseFromString(request.responseText, 'text/html');
			doc = utils.removeSelector(doc, 'article > br:first-of-type');
			doc = utils.removeSelector(doc, '.button-bar');
			if (document.querySelector('.perex')) {
				doc = utils.removeSelector(doc, '.perex');
			}

			/* articles */
			var html;
			if (html = document.getElementsByTagName('article')[0]) {
				html.innerHTML = '';
				if (doc.querySelector('.articlewrap')) {
					utils.sanitizeContent(html, doc.querySelector('.articlewrap'));
				}
				else {
					utils.sanitizeContent(html, doc.getElementsByTagName('article')[0]);
				}
			}
		}
	};
	request.send();
};

if (/\.sme\.sk\/c\/\d+\/.*/.test(document.location) && utils.isPianoArticle()) {
	utils.getArticle('https://s.sme.sk/export/ma/?c=' + utils.articleId());
}
