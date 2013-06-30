// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Avustralya</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">İngilizce</span><span id="country1City1">Melbourne</span><span id="country1City2">Sidney</span><span id="country1HelpUrl">http://tr.wikipedia.org/wiki/Avustralya</span><span id="country2">Almanya</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Almanca</span><span id="country2City1">Berlin</span><span id="country2City2">Münih</span><span id="country2HelpUrl">http://tr.wikipedia.org/wiki/Almanya</span><span id="country3">Çin</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Çince</span><span id="country3City1">Pekin</span><span id="country3City2">Şangay</span><span id="country3HelpUrl">http://tr.wikipedia.org/wiki/Çin_Halk_Cumhuriyeti</span><span id="country4">Brezilya</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Portekizce</span><span id="country4City1">Rio de Janeiro</span><span id="country4City2">São Paulo</span><span id="country4HelpUrl">http://tr.wikipedia.org/wiki/Brezilya</span><span id="flag">flag:</span><span id="language">dil:</span><span id="languageChoose">seçim yapın...</span><span id="cities">şehirler:</span><span id="error0">Muhteşem!\n%1 bloğun hepsi de doğru.</span><span id="error1">Neredeyse oluyordu! Bir blok yanlış.</span><span id="error2">%1 blok yanlış.</span><span id="tryAgain">Vurgulanan blok yanlış.\nDenemeye devam.</span></div><table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html"><span id="blocklyName">Blockly</span></a> : Bulmaca</span></h1></td><td class="farSide"><select id="languageMenu" onchange="Puzzle.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp();">Yardım</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Yanıtları Kontrol Et</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="help"><div style="padding-bottom: 0.7ex">Her ülkenin (yeşil), bayrağını ekle, dilini seç ve şehirlerinden bir yığın oluştur.</div><div><img src="help/help_tr.png"></div><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp()">TAMAM</button></div></div>';
};
