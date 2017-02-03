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
					element.src = child.src.replace(/^http:/, "https:");
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
 * Detect Piano video
 */
utils.isPianoVideo = function() {
	return document.querySelector('.tvpiano');
};

/**
 * Get video resolution from URL
 */
utils.isHD = function() {
	return (document.location.pathname.split('/')[1] == 'vhd') ? 1 : 0;
};

if (/\.sme\.sk\/c\/\d+\/.*/.test(document.location)) {
	if (utils.isPianoArticle()) {
		safari.self.tab.dispatchMessage('doXhr', ['article', 'https://s.sme.sk/export/ma/?c=' + utils.articleId()]);
	}
}
else if (/tv\.sme\.sk\/v(hd)?\/\d+\/.*/.test(document.location)) {
	if (utils.isPianoVideo()) {
		safari.self.tab.dispatchMessage('doXhr', ['video', 'https://www.sme.sk/storm/mmdata_get.asp?id=' + utils.articleId() + '&hd1=' + utils.isHD()]);
	}
}
else if (/s\.sme\.sk\/export\/ma\/\?ch=\d+.*/.test(document.location)) {
	window.location = document.querySelector('web_url').textContent;
}

safari.self.addEventListener('message', function(event) {
	if (event.name === 'article') {
		var doc = (new DOMParser()).parseFromString(event.message, 'text/html');
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
	else if (event.name === 'video') {
		var image    = event.message.match(/<image>(http.*)<\/image>/)[1];
		var location = event.message.match(/<location>(http.*)<\/location>/)[1];

		if (html = document.querySelector('div.video')) {
			var source = document.createElement('source');
			source.setAttribute('src', location);

			var video = document.createElement('video');
			video.setAttribute('controls', 'controls');
			video.setAttribute('poster', image);
			video.appendChild(source);

			// replace the old video
			while (html.firstChild) {
				html.removeChild(html.firstChild);
			}
			html.appendChild(video);

			// remove Piano add
			var promo = document.querySelector('div.sme_piano_art_promo');
			promo.parentNode.removeChild(promo);

			// workaround to prevent HD switch button overlaping the video
			document.querySelector('.v-podcast-box').style.marginTop = '25px';
		}
	}
}, false);
