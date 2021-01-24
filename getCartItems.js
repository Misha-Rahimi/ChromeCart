var key = "cartSizeKey";

/*
chrome.storage.sync.set({[key]: 0}, function() {
});*/

chrome.storage.sync.get([key], function(cartSizeResult) {
	alert("cart size: " + cartSizeResult[key]);
});

