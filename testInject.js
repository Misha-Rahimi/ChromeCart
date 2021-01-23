var button = document.getElementById("add-to-cart-button");
if (button !== null) {
	button.addEventListener("click", function() {
		var price = document.getElementById("price_inside_buybox").innerText;
		alert("You added an item to your cart that costs " + price);
	}, false);
}


