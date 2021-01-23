//Handling for Amazon
var amazonButton = document.getElementById("add-to-cart-button");
if (amazonButton !== null) {
	amazonButton.addEventListener("click", function() {
		var price = document.getElementById("price_inside_buybox").innerText;
		var quantity = document.getElementsByClassName("a-dropdown-prompt")[0].innerText;
		var productTitle = document.getElementById("productTitle").innerText;
		alert("You added " + quantity + " of the item " + productTitle + " that cost " + price + " each to your ChromeCart");
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
		alert("added " + quantity + " items of " + itemTitle + " on ebay for " + price + " each");
	}, false);
}

//Handling for Macy's
var allMacysElements = document.getElementsByClassName("expanded");
var macysButton;

for (var i = 0; i < allMacysElements.length; i++) {
	var buttonText = allMacysElements[i].innerText.toLowerCase();
	//alert(buttonText);
	//if (buttonText.includes("bag")) alert("yes bag"); else alert("no bag");
	//if (buttonText.includes("add")) alert("yes add"); else alert("no add");
	if (buttonText.includes('bag') && buttonText.includes('add')) {
		macysButton = allMacysElements[i];
		//alert("in if");
		break;
	}
}

if (macysButton !== undefined) {
	macysButton.addEventListener('click', function() {
		var price = document.getElementsByClassName("price")[0];
		var salePrice = document.getElementsByClassName("medium-font bold on-sale");
		if (salePrice !== null) price = salePrice[0].innerText;
		var quantity = document.getElementsByClassName("qty-val")[0].innerText;
		var productTitle = document.getElementsByClassName("p-name h3")[0].innerText;
		
		alert("you have added " + quantity + " items of the product " + productTitle + " for a price of " + price + " each");
	}, false);
}
