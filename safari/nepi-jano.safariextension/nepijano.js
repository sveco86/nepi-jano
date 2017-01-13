/**
 * Some utils
 */
var utils = {};

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
	return document.querySelector('.js-piano-teaser-standard');
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

/**
 * Remove possible 10 second refresh delay used by the server to delay initial page loading
 */
utils.noRefreshDelay = function () {
	var r = document.head.querySelector('[http-equiv=refresh]');
	if (r) {
		var u = r.content.match(/URL='(.*)'/);
		if (u && u.length === 2) {
			window.location = document.location.origin + u[1];
			return false;
		}
	}
	return true;
}

/**
 * Detect Piano video
 */
utils.isPianoVideo = function() {
	return document.querySelector('.tvpiano');
};

/**
 * Get article ID from URL
 */
utils.articleId = function() {
	return document.location.pathname.split('/')[2];
};

/**
 * Get video resolution from URL
 */
utils.isHD = function() {
	return (document.location.pathname.split('/')[1] == 'vhd') ? 1 : 0;
};

if (/\.sme\.sk\/c\/\d+\/.*/.test(document.location)) {
	if (utils.noRefreshDelay() && utils.noPianoTag() && utils.isPianoArticle()) {
		utils.removePianoCookie();
		utils.loadPianoArticle();
	}
}
else if (/tv\.sme\.sk\/v(hd)?\/\d+\/.*/.test(document.location)) {
	if (utils.noRefreshDelay() && utils.isPianoVideo()) {
		safari.self.tab.dispatchMessage('doXhr', ['video', 'http://www.sme.sk/storm/mmdata_get.asp?id=' + utils.articleId() + '&hd1=' + utils.isHD()]);
	}
}

safari.self.addEventListener('message', function(event) {
	if (event.name === 'video') {
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
