Nepi Jano! 2.0
============

Nepi Jano! is an extension for Google Chrome, Mozilla Firefox and Pale Moon to read paid articles on [www.sme.sk](http://www.sme.sk) for free. To use it just download and install the extension for your browser and visit a paid article on [www.sme.sk](http://www.sme.sk). Immediately or after couple of seconds you should see the full article.

For more technical details feel free to read Miroslav Magda's blog posts [Piano and SME.sk](http://blog.ejci.net/2013/04/21/piano-and-sme-sk/) and [Paid content for free on (Slovak) news portals](http://blog.ejci.net/2013/05/19/paid-content-for-free-on-slovak-news-portals/). Noting the currently used loading mechanism is different. It loads unblocked Piano articles in their original form by loading blocked articles URLs with `piano_t=1` parameter and discarding Piano tracking cookie `pianovisitkey` which would otherwise cause redirect to the blocked version.

This fork is a continuation of the original extension developed by [Miroslav Magda](https://github.com/ejci/nepi-jano).

# Instalation

## Google Chrome

* [Install Chrome extension from official Chrome Store web](https://chrome.google.com/webstore/detail/nepi-jano/dmiebaglkdeebobffhbomapifjjjjakj)
* Or [download Chrome extension from this site](https://github.com/viliampucik/nepi-jano/raw/master/releases/nepi-jano-2.0.crx)
* Type *chrome://extensions* to open extensions tab
* Drag and drop the downloaded *.crx* file to extensions tab

## Mozilla Firefox

* [Install Firefox add-on from official Mozilla Add-ons web](https://addons.mozilla.org/en-US/firefox/addon/nepi-jano/)

# License

All code is open source and dual licensed under GPL and MIT. Check the individual licenses for more information.

##### Original Author
* [Miroslav Magda](http://ejci.net)

##### Maintainer
* [Viliam Pucik](https://github.com/viliampucik)

##### Contributors
* [Jakub Zitny](https://github.com/jakubzitny)
* [Daniel Husar](https://github.com/danielhusar)
* Jozef Giusseppe
* and others (Please let me know to add your name here)

# Change log

#### 2.0

* Using improved Piano article loading method
* Firefox add-on ported into WebExtension effectively sharing the same code as Chrome extension
* Dropped Pale Moon support

#### 1.2.2

* Fixed URLs pointing to XML documents

#### 1.2.1

* Fixed new article format

#### 1.2.0

* Fixed Piano videos

#### 1.1.1

* Added support for Pale Moon

#### 1.1.0

* Added support for Piano videos

#### 1.0.0

* Initial maintained released