//Handling for Amazon

//alert("at the top");
initializeCart();

var amazonButton = document.getElementById("add-to-cart-button");
if (amazonButton !== null) {
	amazonButton.addEventListener("click", function() {
		var price = document.getElementById("price_inside_buybox").innerText;
		var quantity = document.getElementsByClassName("a-dropdown-prompt")[0].innerText;
		var productTitle = document.getElementById("productTitle").innerText;
		alert("You added " + quantity + " of the item " + productTitle + " that cost " + price + " each to your ChromeCart");
		//difAddProduct(quantity, price, productTitle);
		addProduct(quantity, price, productTitle, getListingUrl());
	}, false);
}

//Handling for Ebay
var allEbayElements = document.getElementsByTagName("a");
var ebayButton;
for (var i = 0; i < allEbayElements.length; i++) {
	var buttonText = allEbayElements[i].innerText.toLowerCase();
	if (buttonText.includes('cart') && buttonText.includes('add')) {
		ebayButton = allEbayElements[i];
		break;
	}
}
if (ebayButton !== undefined) {
	ebayButton.addEventListener("click", function() {
		var itemTitle = document.getElementsByClassName("it-ttl")[0].innerText;
		var price = document.getElementById("prcIsum").innerText;
		var quantity = document.getElementById("qtyTextBox").value;
		addProduct(quantity, price, itemTitle, getListingUrl());
		alert("added " + quantity + " items of " + itemTitle + " on ebay for " + price + " each");
	}, false);
}

//Handling for Macy's
var allMacysElements = document.getElementsByClassName("expanded");
var macysButton;
//alert("length " + allMacysElements.length);

for (var i = 0; i < allMacysElements.length; i++) {
	var buttonText = allMacysElements[i].innerText.toLowerCase();
	alert(buttonText);
	//if (buttonText.includes("bag")) alert("yes bag"); else alert("no bag");
	//if (buttonText.includes("add")) alert("yes add"); else alert("no add");
	if (buttonText.includes('bag') && buttonText.includes('add')) {
		macysButton = allMacysElements[i];
		alert("in if");
		break;
	}
}

if (macysButton !== undefined) {
	alert("button defined");
var price = document.getElementsByClassName("price")[0];
	//TODO: move this stuff back under the event listener after we figure out the issue	
	alert("price good");
		var salePrice = document.getElementsByClassName("medium-font bold on-sale");
		alert("sale price seen");
		if (salePrice !== null) price = salePrice[0].innerText;
		alert("past if");
		var quantity = document.getElementsByClassName("qty-val")[0].innerText;
		alert("quantity good");
		var productTitle = document.getElementsByClassName("p-name h3")[0].innerText;
		alert("title good");
alert("you have added " + quantity + " items of the product " + productTitle + " for a price of " + price + " each");

	macysButton.addEventListener('click', function() {
		alert("inside action listener");
		

		
	}, false);
}

//alert("after macy's");

//Walmart
var walmartButton = document.getElementsByClassName("spin-button-children")[0];
if (walmartButton !== undefined) {
	walmartButton.addEventListener("click", function() {
		var price = document.getElementsByClassName("price display-inline-block arrange-fit price price--stylized")[0].innerText;
		var name = document.getElementsByClassName("prod-ProductTitle prod-productTitle-buyBox font-bold")[0].innerText;
		alert("You added " + name + " that costs " + price + " to your ChromeCart");
		addProduct("1", price, name, getListingUrl());
	}, false);
}

//clearCart();
function getListingUrl() {
	alert("asked for url");
	return window.location.href;
	/*
	var url;
	chrome.tabs.query({'active': true, lastFocusedWindow: true},
		function(tabs){
			url = tabs[0].url;
		});
	return url;
	*/
}


/*
var key = 'currentNumberProducts';
var value = 0;
chrome.storage.sync.set({key: value}, function() {
	alert('3 value is set to ' + value);
});
alert("4 stored value");

chrome.storage.sync.get(['key'], function(result) {
	alert('5 value currently is ' + result.key);

	var newValue = result.key + 1;
	alert("6 why isn't the below changing to " + newValue);
	chrome.storage.sync.set({key: newValue}, function() {
		alert("7 changed value to " + newValue);
	});
});
*/
/*
var key = 'currentNumberProducts';
chrome.storage.sync.get(['key'], function(result) {
	alert('size of ChromeCart is currently ' + result.key);
});
*/

var key = 'cartSizeKey';
/*
var value = 0;
chrome.storage.sync.set({key: value}, function() {
	alert("set cart size to " + value);
});
*/




var testKey = 'cartSizeKey';

chrome.storage.sync.get([testKey], function(result) {
//	alert("cart size is " + result[testKey]);
});



/*
var testKey = 'cartSizeKey';
chrome.storage.sync.get([testKey], function(result) {
	var newValue = result.key + 1;
	alert("new value: " + newValue);
	chrome.storage.sync.set({key: newValue}, function() {
		alert("changed to new value: " + newValue);
	});
});
*/



/*
var key1 = 'testKey1';
var key2 = 'testKey2';
var value1 = "testValue1";
var value2 = "testValue2";

chrome.storage.sync.set({[key1]: value1}, function() {
	//alert("Set value to " + value1);
});
chrome.storage.sync.set({key2: value2}, function() {
	//alert("Set value to " + value2);
});

chrome.storage.sync.get([key1], function(result1) {
	//alert("Stringified: " + JSON.stringify(result1));
	//alert("Value of 1: " + result1[key1]);
});
chrome.storage.sync.get(['key2'], function(result2) {
	//alert("Value of 2: " + result2.key2);
});
//alert("End of testing");

var difKey1 = 'testKey1';
chrome.storage.sync.get([difKey1], function(result3) {
	//alert("Value of 1 with different variable: " + result3[difKey1]);
});

*/
//clearCart();
var testingProductKey = '3';

/*
chrome.storage.sync.set({[testingProductKey]: value1}, function() {
	alert("new product info is " + value1);
});
*/

/*
chrome.storage.sync.get([testingProductKey], function(result) {
	alert("product info: " + result[testingProductKey]);
});
*/


//clearCart();

function clearCart() {
	chrome.storage.sync.clear();
	initializeCart();
}

var allProductsKey = 'allProductsKey';
var allProductsValue = [];
if (allProductsValue === null) alert("true");
function initializeCart() {
	var checkCartSizeKey = 'cartSizeKey';
	var value = 0;
	chrome.storage.sync.get([checkCartSizeKey], function(result) {
		if (result[checkCartSizeKey] === undefined) {
			chrome.storage.sync.set({[checkCartSizeKey]: value}, function() {
				alert("initialized cart size");
			});
		}
	});
/*
			chrome.storage.sync.set({[allProductsKey]: allProductsValue}, function() {
				alert("all products intitialized to " + allProductsValue);
			});
*/		

}

function addProduct(quantity, price, productTitle, url) {
	var cartSizeKey = 'cartSizeKey';
	var productInfo = [quantity, price, productTitle, url];
	
	chrome.storage.sync.get([cartSizeKey], function(cartSizeResult) {
		//productKey is onre more than original cartSize
		alert("adding one to " + cartSizeResult[cartSizeKey]);
		var productKey = cartSizeResult[cartSizeKey] + 1;

		/*
		//change the size of the cart
		chrome.storage.sync.set({[cartSizeKey]: productKey}, function() {	
			alert("set cartsize to " + productKey);
			//add the item
			chrome.storage.sync.set({[cartSizeKey]: productKey}, function() {
				alert("New Key: " + productKey + " Value: ");
			});
		});
		*/

		chrome.storage.sync.set({[productKey]: productInfo}, function() {
			alert("Key: " + productKey + " plus the value");
			
			chrome.storage.sync.set({[cartSizeKey]: productKey}, function() {
				alert("set cartsize to " + productKey);
			});
		});
	});
}

function difAddProduct(quantity, price, productTitle) {
	alert("dif called");
	var productInfo = [quantity, price, productTitle];
	var newProductAdd = [];
	chrome.storage.sync.get([allProductsKey], function(response) {
		alert("into dif get");
		//var newValue = response[allProductsKey].push(productInfo);
		alert(response[allProductsKey]);
		newProductAdd = response[allProductsKey].push("value2");
		alert('lengt ' + newProductAdd);

		chrome.storage.sync.set({[allProductsKey]: newProductAdd}, function() {
			alert("current products list size " + newProductAdd.length);
		});
	});
}



//Respond to request from popup with all items in shopping cart

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  }
);

