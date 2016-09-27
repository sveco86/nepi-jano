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

if (utils.noPianoTag() && utils.isPianoArticle()) {
	utils.removePianoCookie();
	utils.loadPianoArticle();
}
