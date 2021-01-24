/*
var submitButton = document.getElementById('submitButton');
if (submitButton !== null && submitButton !== undefined) {
submitButton.addEventListner('click', function() {
	chrome.storage.sync.clear();
});
}
//else alert("button messed up");
*/
makeList();

function makeList() {


		console.log("gonna make a list");
		var key = "cartSizeKey";
		var totalPrice = 0;		
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
						/*
						var title = items[j][2];
						var quantity = items[j][0];
						var unitPrice = items[j][1];
						if (title.length > 40) title = title.substring(0, 20) + "...";
						var titleButton = document.createElement('p');
						titleButton.innerText = title;
						*/
						var title = items[j][2];
						if (title.length > 35) title = title.substring(0, 35) + "...";
						/*
						let productTitle = document.createElement('p');
						productTitle.innerText = title;
						const titleColumn = document.querySelector('#titleColumn');
						titleColumn.appendChild(productTitle);
						*/
					
						var quantityText = items[j][0];
						let quantity = document.createElement('p');
						quantity.innerText = quantityText;
						const quantityColumn = document.querySelector('#quantityColumn');
						quantityColumn.appendChild(quantity);
						
						var unitPriceText = items[j][1];
						unitPriceText = unitPriceText.replace(/\s+/g, '');
						if (unitPriceText.includes("$")) unitPriceText = unitPriceText.substring(unitPriceText.indexOf("$"), unitPriceText.length); 
							else unitPriceText = "$" + unitPriceText;
							if (unitPriceText.includes(".")) unitPriceText = unitPriceText.substring(0, unitPriceText.indexOf(".") + 3);

						let unitPrice = document.createElement('p');
						unitPrice.innerText = unitPriceText;
						const unitPriceColumn = document.querySelector('#unitPriceColumn');
						unitPriceColumn.appendChild(unitPrice);
						
						var p = document.createElement('p');
						var a = document.createElement('a');
						var linkText = document.createTextNode(title);
						a.appendChild(linkText);
						a.title = title;
						a.href = items[j][3];
						
						p.appendChild(a);
						
						const titleColumn = document.querySelector('#titleColumn');
						titleColumn.appendChild(p);
						//titleColumn.appendChild(a);
						//document.body.appendChild(a);
						unitPriceText = unitPriceText.substring(1, unitPriceText.length);

						totalPrice = totalPrice + parseFloat(unitPriceText) * parseFloat(quantityText);
						if (j === items.length - 1) {
							var totalPriceBox = document.createElement('h2');
							totalPriceBox.innerText = "Total Price: " + totalPrice.toFixed(2);
							unitPriceColumn.appendChild(totalPriceBox);
						}
						
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
/*
	var submitButton = document.getElementById('submitButton');
	submitButton.addEventListener('click', function() {
		console.log('click');
	});

*/

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
	//document.getElementById("makeList").onclick = makeList;
/*
	  //buttons for each cart (to avoid pop-up blocker)
      document.getElementById("amazonCart").onclick = function () {
			window.open("https://www.amazon.com/gp/cart/view.html?ref_=nav_cart");
      };

document.getElementById('walmartCart').onclick = function() {
	window.open("https://www.walmart.com/cart");
};

	document.getElementById("macysCart").onclick = function() {
		window.opepn("https://www.macys.com/my-bag?cm_sp=navigation-_-top_nav-_-bag&lid=glbtopnav_bag-us");
	};

document.getElementById("ebayCart").onclick = function() {
	window.open("https://cart.ebay.com/");
};

*/
