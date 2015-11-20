/**
 * Some utils
 */
var utils = {};

/**
 * Generate HTML player code
 */
utils.playerCode = function() {
	var identifier = utils.articleId();
	var title = document.querySelector('meta[property="og:title"]').getAttribute('content').replace(/ \|.*/, '');;
	var image = document.querySelector('meta[property="og:image"]').getAttribute('content');
	var size = (utils.isHD()) ? '950' : '630';

	return	'<div id="smeplayer_id' + identifier + '">' +
		'<div class="vplayer-box">' +
		'	<div class="player5-upper-panel front-player-position js-player5-upnot">' +
		'		<span class="player5-title">' + title + '</span>' +
		'		<span class="player5-share-icon js-player5-share" title="Zdieľajte video"><svg width="20" height="20" viewBox="0 0 1024 1024" class="icon"><path class="path1" d="M768 665.6c-35.226 0-67.482 11.93-93.389 31.846l-267.213-160.307c1.28-8.192 2.202-16.589 2.202-25.139 0-8.602-0.922-16.947-2.202-25.139l267.213-160.307c25.907 19.917 58.163 31.846 93.389 31.846 84.787 0 153.6-68.762 153.6-153.6s-68.813-153.6-153.6-153.6-153.6 68.762-153.6 153.6c0 8.55 0.922 16.947 2.253 25.139l-267.213 160.358c-25.907-19.968-58.214-31.898-93.44-31.898-84.838 0-153.6 68.762-153.6 153.6 0 84.787 68.762 153.6 153.6 153.6 35.226 0 67.533-11.93 93.44-31.846l267.213 160.307c-1.331 8.192-2.253 16.538-2.253 25.139 0 84.787 68.813 153.6 153.6 153.6s153.6-68.813 153.6-153.6-68.813-153.6-153.6-153.6z"></path></svg></span>' +
		'		<span class="player5-piktogram js-player5-piktogram"></span>' +
		'	</div>' +
		'	<a href="javascript:void();" onclick="return st_create_video_html5_or_flash_' + identifier + '();">' +
		'	<img src="' + image + '" alt="video" style="width: ' + size + 'px;;"></a>' +
		'	<a href="javascript:void();" class="playbtn js-playbtn" onclick="return st_create_video_html5_or_flash_' + identifier + '();">' +
		'	<svg width="64" height="64" viewBox="0 0 1024 1024"><path class="path1" d="M981.188 160.108c-143.632-20.65-302.332-32.108-469.186-32.108-166.86 0-325.556 11.458-469.194 32.108-27.53 107.726-42.808 226.75-42.808 351.892 0 125.14 15.278 244.166 42.808 351.89 143.638 20.652 302.336 32.11 469.194 32.11 166.854 0 325.552-11.458 469.186-32.11 27.532-107.724 42.812-226.75 42.812-351.89 0-125.142-15.28-244.166-42.812-351.892zM384.002 704v-384l320 192-320 192z"></path></svg><span class="text">Spustiť video</span>' +
		'	</a>' +
		'</div>' +
		'</div>' +
		'<video class="player5-video js-player5-video" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><source></video>';
}

/**
 * Get video resolution from URL
 */
utils.isHD = function() {
	return (document.location.pathname.split('/')[1] == 'vhd');
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
	if (html = document.querySelector('div[id^=pianoArticle]')) {
		html.innerHTML = utils.playerCode();
		// workaround to prevent HD switch button overlaping the video
		document.querySelector('.v-podcast-box').style.marginTop = "35px";
	}
};