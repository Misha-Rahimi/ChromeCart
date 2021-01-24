	function makeList() {
		console.log("gonna make a list");
		var items = ["item1", "item2", "item3", "item4"]; //items (change to stored data)
		
		// loops through each item, creating an element
		for (var i = 0; i < items.length; i++) {		
			var divider = document.createElement("div");
			divider.id = "div " + (i + 1);
			
			//adds link to website
			var itemLink = document.createElement("a");
			itemLink.id = "item " + (i + 1);
            itemLink.setAttribute("href", 
                "https://www.google.com"); //change to website link
			itemLink.target = "_blank";

			//makes header
			var itemHeader = document.createElement("h3");
			itemHeader.innerHTML = items[i];
			itemLink.appendChild(itemHeader);
			
			divider.appendChild(itemLink);
			document.body.appendChild(divider);
		} //for
	} //makeList()
	document.getElementById("makeList").onclick = makeList;

	  //buttons for each cart (to avoid pop-up blocker)
      document.getElementById("amazonCart").onclick = function () {
			window.open("https://www.amazon.com/gp/cart/view.html?ref_=nav_cart");
      };

	  document.getElementById("walmartCart").onclick = function () {
			window.open("https://www.walmart.com/cart");
	  };

	  document.getElementById("macysCart").onclick = function () {
			window.open("https://www.macys.com/my-bag?cm_sp=navigation-_-top_nav-_-bag&lid=glbtopnav_bag-us");
	  };

	  document.getElementById("ebayCart").onclick = function () {
			window.open("https://cart.ebay.com/");
	  };
