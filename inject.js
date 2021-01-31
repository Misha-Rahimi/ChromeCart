//Intitializes cart if is user's first time with extension
initializeCart();

//Handling for Amazon

var amazonButton = document.getElementById("add-to-cart-button");
if (amazonButton !== null) {
	amazonButton.addEventListener("click", function() {
		var popupElement = document.getElementsByClassName('a-popover a-popover-modal a-declarative');

		//Clicked the regular add to cart button
		if (popupElement.length === 0) {
			//Extract price of item
			var priceElement = document.getElementById('price_inside_buybox');
			var price;
			if (priceElement !== null) price = priceElement.innerText;
			else price = document.getElementById('priceblock_ourprice').innerText;

			//Extract quantity
			var quantity = document.getElementsByClassName("a-dropdown-prompt")[0].innerText;

			//Extract title of product
			var productTitle = document.getElementById("productTitle").innerText.trim();

			//Add the product to ChromeCart
			addProduct(quantity, cleanPrice(price), productTitle, getListingUrl());
		}
	}, false);
}


//Handling for Ebay

var allEbayElements = document.getElementsByTagName("a");
var ebayButton;

//Go through all the elements with the 'a' tag and find the add to cart button
for (var i = 0; i < allEbayElements.length; i++) {
	var buttonText = allEbayElements[i].innerText.toLowerCase();
	if (buttonText.includes('cart') && buttonText.includes('add')) {
		ebayButton = allEbayElements[i];
		break;
	}
}

//Action listener for ebay's add to cart button
if (ebayButton !== undefined) {
	ebayButton.addEventListener("click", function() {
		//Extract title of item
		var productTitle = document.getElementsByClassName("it-ttl")[0].innerText;

		//Extract price of item
		var priceElement = document.getElementById("prcIsum");
		var price;
		if (priceElement !== null) price = document.getElementById("prcIsum").innerText;
		else price = document.getElementById('mm-saleDscPrc').innerText;

		//Extract quantity of item
		var quantity = document.getElementById("qtyTextBox").value

		//Add product to ChromeCart
		addProduct(quantity, cleanPrice(price), productTitle, getListingUrl());
	}, false);
}


//Handling for Macy's

var allMacysElements = document.getElementsByClassName("expanded");
var macysButton;

//Find Macy's add to bag button

window.addEventListener('load', function () {
	for (var i = 0; i < allMacysElements.length; i++) {
		var buttonText = allMacysElements[i].innerText.toLowerCase();
	
		if (buttonText.includes('bag') && buttonText.includes('add')) {
			macysButton = allMacysElements[i];
			break;
		}
	}

	//Action listener for Macy's add to cart button
	if (macysButton !== undefined) {
		macysButton.addEventListener('click', function() {
			//Extract price of item
			var price = document.getElementsByClassName('price')[0].innerText.replace(/\s+/g, '');

			//If item is on sale, set price to sale price
			var salePrice = document.getElementsByClassName("medium-font bold on-sale");
			if (salePrice !== null && salePrice[0] !== undefined) price = salePrice[0].innerText;
	
			//Extract quantity of item
			var quantity = document.getElementsByClassName('qty-val')[0].innerText;
	
			//Extract title of item
			var productTitle = document.getElementsByClassName('p-name h3')[0].innerText;
			productTitle = productTitle.replace(/\n/g, '').trim();
	
			//Add product to ChromeCart
			addProduct(quantity, cleanPrice(price), productTitle, getListingUrl());	
		}, false);
	}
});


//Handling for Walmart

var walmartButton = document.getElementsByClassName("spin-button-children")[0];

if (walmartButton !== undefined) {
	walmartButton.addEventListener("click", function() {
		//Extract price of item
		var price = document.getElementsByClassName("price display-inline-block arrange-fit price price--stylized")[0].innerText;

		//Extract quantity of item
		var quantity = document.getElementsByClassName('field-input field-input--secondary')[0].value;

		//Extract title of product
		var productTitle = document.getElementsByClassName("prod-ProductTitle prod-productTitle-buyBox font-bold")[0].innerText;
		
		//Add product to ChromeCart
		addProduct(quantity, cleanPrice(price), productTitle, getListingUrl());
	}, false);
}


//Saves the product info added to ChromeCart to chrome storage
function addProduct(quantity, price, productTitle, url) {
	var key = 'cartSizeKey';

	//If quantity wasn't read from website correctly, set quantity to 1
	quantity = parseInt(quantity);
	if (isNaN(quantity)) quantity = 1;

	//The info about the product added to the cart that will be saved
	var productInfo = [quantity, price, productTitle, url];

	//First get number of items in the cart
	chrome.storage.sync.get([key], function(cartSizeResult) {
		//Set the key for the item being added to the cart to the current size of the cart plus one
		var productKey = cartSizeResult[key] + 1;

		//Save the array productInfo with the productKey
		chrome.storage.sync.set({[productKey]: productInfo}, function() {
			//Increased the saved cart size by one
			chrome.storage.sync.set({[key]: productKey}, function() {
				//Alert user to what's been added to cart
				if (productTitle.length > 45) productTitle = productTitle.substring(0, 45) + '...';
				
				alert('You added the following: \nTitle: ' + productTitle 
				+ '\nQty: ' + quantity 
				+ '\nPrice: ' + price 
				+ '\nCurrent ChromeCart Size: ' + productKey);
			});
		});
	});
}

//If it is the user's first time with the extension, the current size of the cart must be initialized chrome storage
function initializeCart() {
	var key = 'cartSizeKey';
	var intialCartSize = 0;
	chrome.storage.sync.get([key], function(result) {
		if (result[key] === undefined) {
			chrome.storage.sync.set({[key]: intialCartSize});
		}
	});
}

//Returns just the price of the item including the '$' sign without leading or trailing characters and spaces
function cleanPrice(price) {
	price = price.replace(/\s+/g, '');					
	if (price.includes("$")) price = price.substring(price.indexOf("$"), price.length);			
	else price = "$" + price;					
	if (price.includes(".")) price = price.substring(0, price.indexOf(".") + 3);
	return price;
}

//Returns the url of the page currently being viewed
function getListingUrl() {
	return window.location.href;
}