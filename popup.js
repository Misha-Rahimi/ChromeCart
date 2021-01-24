	function makeList() {
		console.log("gonna make a list");
		var key = "cartSizeKey";
		
		var items = [];
		/*
		console.log("before first get");
		chrome.storage.sync.get([key], function(response) {
			console.log("after first get");
			var cartSize = response[key];
			console.log("cart size " + cartSize);
			var i = 1;
			for (var i = 1; i <= 1; i++) {
				var productKey = i + "";
				console.log("before getter " + productKey);
				chrome.storage.sync.get([productKey], function(productResponse) {
					items.push(productResponse[productKey][0]);
					console.log("key: " + productKey + " " + productResponse[productKey][0]);
				});
				console.log("list lenght " + items.length);
			}
		});

		*/
		
		function nextProduct(i, cartSize) {
			console.log("enter next product with i equal to " + i);
			var productKey = i + "";
			chrome.storage.sync.get([productKey], function(productResponse) {
				items.push(productResponse[productKey]);	
				console.log(productResponse[productKey]);
				console.log(items.length);

				if (items.length == cartSize) {
					console.log("final length is " + items.length);
					for (var j = 0; j < items.length; j++) {
						var btn = document.createElement('h3');
						if (items[j][2].length > 30)btn.innerHTML = items[j][2].substring(0, 20) + "...";
						document.body.appendChild(btn);
					}
				}
			});
			i = i + 1;
			if (i <= cartSize) nextProduct(i, cartSize);
		}

		chrome.storage.sync.get([key], function(response) {
			var cartSize = response[key];
			nextProduct(1, cartSize);

		});


		//var items = ["item1", "item2", "item3", "item4"]; //items (change to stored data)
		/*

		// loops through each item, creating an element
		for (var i = 0; i < items.length; i++) {		
			var divider = document.createElement("div");
			divider.id = "div " + (i + 1);
			
			//adds link to website
			var itemLink = document.createElement("a");
			
			//gets url
			var url;
			chrome.tabs.query({'active': true, lastFocusedWindow: true},
			function(tabs){
				url = tabs[0].url;
			}); //move this to testInject and get url from data?
			
			itemLink.id = "item " + (i + 1);
            itemLink.setAttribute("href", url); //change to website link
			itemLink.target = "_blank";

			//makes header
			var itemHeader = document.createElement("h3");
			itemHeader.innerHTML = items[i];
			itemLink.appendChild(itemHeader);
			
			divider.appendChild(itemLink);
			document.body.appendChild(divider);
		} //for

		*/
	} //makeList()
	document.getElementById("makeList").onclick = makeList;

	  //buttons for each cart (to avoid pop-up blocker)
      document.getElementById("amazonCart").onclick = function () {
			window.open("https://www.amazon.com/gp/cart/view.html?ref_=nav_cart");
      };

document.getElementById('walmartCart").onclick = function() {
	window.open("https://www.walmart.com/cart");
};

	document.getElementById("macysCart").onclick = function() {
		window.opepn("https://www.macys.com/my-bag?cm_sp=navigation-_-top_nav-_-bag&lid=glbtopnav_bag-us");
	};

document.getElementById("ebayCart").onclick = function() {
	window.open("https://cart.ebay.com/");
};
