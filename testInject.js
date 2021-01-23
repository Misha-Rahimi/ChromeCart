var amazonButton = document.getElementById("add-to-cart-button");
if (amazonButton !== null) {
	amazonButton.addEventListener("click", function() {
		var price = document.getElementById("price_inside_buybox").innerText;
		var quantity = document.getElementsByClassName("a-dropdown-prompt")[0].innerText;
		alert("You added " + quantity + " items that cost " + price + " each to your ChromeCart");
	}, false);
}

var ebayButton = document.getElementById("isCartBtn_btn");
if (ebayButton !== null) {
	ebayButton.addEventListener("click", function() {
		var price = document.getElementById("prcIsum").innerText;
		alert("ebay add to ChromeCart" + price);
	}, false);
}


