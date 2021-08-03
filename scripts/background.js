chrome.browserAction.onClicked.addListener(function () {
    var optionsUrl = chrome.extension.getURL('code.html');
    chrome.tabs.query({url: optionsUrl}, function (tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, {active: true});
        } else {
            chrome.tabs.create({url: optionsUrl + "#DesafioDaMemoria"});
        }
    });

});
