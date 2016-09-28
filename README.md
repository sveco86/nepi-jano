Nepi Jano! 2.1
======

Nepi Jano! je doplnok pre webove prehliadace Google Chrome a Mozilla Firefox umoznujuci bezplatne citanie platenych alias Piano clankov na [www.sme.sk](http://www.sme.sk). Staci si dane rozsirenie jednoducho nainstalovat z oficialnych stranok danych prehliadacov. Nasledne po otvoreni akehokolvek Piano clanku sa automaticky, v priebehu par sekund nacita jeho plna verzia.

## Instalacia

### Google Chrome

* [Rozsirenie pre Chrome sa instaluje z oficialnej stranky Chrome Store](https://chrome.google.com/webstore/detail/nepi-jano/dmiebaglkdeebobffhbomapifjjjjakj).
* Pripadne sa da nainstalovat manualne [stiahnutim z tejto stranky](https://github.com/viliampucik/nepi-jano/raw/master/releases/nepi-jano-2.1.crx),
* otvorenim zalozky doplnkov kliknutim na menu *-> Nastavenia -> Rozsirenia*
* a naslednym pretiahnutym stiahnuteho *.crx* suboru do spominanej zalozky.

### Mozilla Firefox

* [Doplnok pre Firefox sa instaluje z oficialnej stranky Mozilla doplnkov](https://addons.mozilla.org/sk/firefox/addon/nepi-jano/).

## Ako funguje spristupnovanie Piano clankov

V sucasnosti su Piano clanky spristupnovane doplnenim `piano_t=1` za koniec adresy povodneho clanku a zmazanim sledovacieho cookie suboru `pianovisitkey`, ktoreho vyskyt v prehliadaci by inak presmeroval pouzivatela na povodny, skrateny Piano clanok. Samotne Piano clanky si je mozne citat v plnom zneni aj bez pouzitie rozsirenia. Staci si otvorit prehliadac v privatnom alias inkognito mode a vlozit do neho upravenu adresu clanku obsahujucu `piano_t=1`, napriklad http://tech.sme.sk/c/20279505/bijuce-srdce-pluta-pasca-na-chlad-ktora-vytvara-ladovce.html?piano_t=1.

V minulosti boli Piano clanky spristupnovane komplikovanejsim sposobom, ktory bol podrobnejsie popisany na blogu povodneho autorom Miroslav Magdu: [Piano and SME.sk](http://blog.ejci.net/2013/04/21/piano-and-sme-sk/) a [Paid content for free on (Slovak) news portals](http://blog.ejci.net/2013/05/19/paid-content-for-free-on-slovak-news-portals/).

Terajsi doplnok je pokracovanim jeho povodnej prace z [Miroslav Magda](https://github.com/ejci/nepi-jano).

## Zoznam zmien

#### 2.1

* Pouzity bezpecnejsi sposob nacitania Piano videi zaroven spristupnujuci nativnu podporu pre mobilny Firefox

#### 2.0

* Pouzity novy, cistejsi sposob nacitania Piano clankov 
* Prepis Firefox rozsirenia do noveho WebExtensions formatu, Chrome a Firefox rozsirenia maju teraz identicky kod
* Zrusena podpora pre Pale Moon webovy prehliadac

#### 1.2.2

* Oprava URL adries XML dokumentov

#### 1.2.1

* Oprava pre novy format clankov

#### 1.2.0

* Oprava Piano videi

#### 1.1.1

* Pridana podpora pre Pale Moon webovy prehliadac

#### 1.1.0

* Pridana podpora pre Piano videa

#### 1.0.0

* Prvotne vydanie terajsieho autora

## Licencia

GPL a MIT

## O autoroch

##### Povodny autor
* [Miroslav Magda](http://ejci.net)

##### Terajsi autor
* [Viliam Pucik](https://github.com/viliampucik)

##### Prispievatelia
* [Jakub Zitny](https://github.com/jakubzitny)
* [Daniel Husar](https://github.com/danielhusar)
* Jozef Giusseppe
* and dalsi (Poprosim dajte mi o sebe vediet, aby som vas zaradil do tohto zoznamu)