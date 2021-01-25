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
	
	var platforms = [];		
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
					var title = items[j][2];	
					if (title.includes("Details about")) title = title.substring(16, title.length);
					if (title.length > 30) title = title.substring(0, 30) + "...";
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
					var platformText = items[j][3];
						
					if (platformText.includes('www.')) platformText = platformText.substring(platformText.indexOf('www.') + 4, platformText.length);					
					if (platformText.includes('.com')) platformText = platformText.substring(0, platformText.indexOf('.com'));					
					platformText = platformText.substring(0, 1).toUpperCase() + platformText.substring(1, platformText.length);					
					var platform = document.createElement('p');					
					platform.innerText = platformText;					
					const platformColumn = document.querySelector('#platformColumn');				
					platformColumn.appendChild(platform);					
					if (!platforms.includes(platformText)) platforms.push(platformText);					
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
						unitPriceText = unitPriceText.substring(1, unitPriceText.length).replace(/,/g, '');

					
					totalPrice = totalPrice + parseFloat(unitPriceText) * parseFloat(quantityText);					
					if (j === items.length - 1) {					
						var totalPriceBox = document.createElement('h2');						
						totalPriceBox.innerText = "Total Price: $" + totalPrice.toFixed(2);						
						unitPriceColumn.appendChild(totalPriceBox);

						
						var submitButton = document.createElement('button');						
						submitButton.innerText = "Checkout";						
						titleColumn.appendChild(submitButton);						
						submitButton.addEventListener('click', function() {						
							chrome.storage.sync.clear();
								//chrome.tabs.create('https://www.google.com');
								//chrome.tabs.create('https://www.amazon.com');
								
							if (platforms.includes('Macys')) {
								/*
								let macysLink = document.createElement('a');
								macysLink.href = 'https://www.macys.com/my-bag';
								macysLink.target = '_blank';
								macysLink.click();
								//window.open('https://www.macys.com/my-bag');	
								*/
								var newUrl = 'https://www.macys.com/my-bag';
								chrome.tabs.create({ url: newUrl });
							}

							if (platforms.includes('Amazon')) {							
								//alert('amazon');								
								//window.open('https://www.amazon.com/gp/cart/view.html?ref_=nav_cart');
								var newUrl = 'https://www.amazon.com/gp/cart/view.html?ref_=nav_cart';
								chrome.tabs.create({ url: newUrl });
							}

							if (platforms.includes('Ebay')) {
								/*
								let ebayLink = document.createElement('a');								
								ebayLink.href = 'https://cart.ebay.com';								
								ebayLink.target = '_blank';
								ebayLink.click();
								*/
								var newUrl = 'https://cart.ebay.com';
								chrome.tabs.create({ url: newUrl });
							}

							
							if (platforms.includes('Walmart')) {	
								var newUrl = 'https://www.walmart.com/cart';
								chrome.tabs.create({ url: newUrl });
								/*
								let walmartLink = document.createElement('a');								
								walmartLink.href = 'https://www.walmart.com/cart';								
								walmartLink.target = '_blank';								
								walmartLink.click();								
								*/
							}
									/*
								if (platforms.includes('Ebay')) {
									//alert('ebay');
									window.open('https://www.ebay.com');
								}
								*/
								//window.open('https://www.xkcd.com');
								/*
								let amazonLink = document.createElement('a');
								amazonLink.href = 'https://www.google.com';
								amazonLink.target = '_blank';
								amazonLink.click();

								let ebayLink = document.createElement('a');
								ebayLink.href = 'https://www.google.com';
								ebayLink.target = '_blank';
								ebayLink.click();

								let walmartLink = document.createElement('a');
								walmartLink.href = 'https://www.amazon.com';
								walmartLink.target = '_blank';
								walmartLink.click();
								*/
							
						});
						
					}
						
					
				}

				
			}
			
		});
		
		i = i + 1;
		
		if (i <= cartSize) nextProduct(i, cartSize);
		
	}

	
	chrome.storage.sync.get([key], function(response) {
	
		var cartSize = response[key];
		
		if (cartSize == 0) {
			var message = document.createElement('h3');
			message.innerText = 'Your items will appear below once you add them';
			const messageHolder = document.querySelector('#messageHolder');
			messageHolder.appendChild(message);

			var tableHeaders = document.getElementsByClassName('row');
			for (var i = 0; i < tableHeaders.length; i++) {
				tableHeaders[i].style.visibility = 'hidden';
			}
			/*
			document.getElementById('titleColumn').style.visibility = 'hidden';
			document.getElementById('platformColumn').style.visibility = 'hidden';
			document.getElementById('quantityColumn').style.visibility = 'hidden';
			document.getElementById('unitPriceColumn').style.visibility = 'hidden';
			*/
		} else nextProduct(1, cartSize);
		
		
	});
}

