var key = 'currentCartKey';
var viewingKey = 'viewingCartKey';

chrome.storage.sync.get([viewingKey], function(result) {
	if (result[viewingKey] !== undefined && result[viewingKey].cartViewing !== undefined && result[viewingKey].cartViewing == 'past') {
		displayCurrentCart(result[viewingKey].pastCart, result[viewingKey].cartViewing);
		resetViewing();
	} else {
		chrome.storage.sync.get([key], function(currentResult) {
			//Either display current cart contents or message inviting user to add items
			if (currentResult[key] === undefined || currentResult[key] === undefined || currentResult[key].items == 0) {
				//Hide all the elements besides the main title
				document.getElementById('titleColumn').style.visibility = 'hidden';
				document.getElementById('platformColumn').style.visibility = 'hidden'
				document.getElementById('quantityColumn').style.visibility = 'hidden'
				document.getElementById('unitPriceColumn').style.visibility = 'hidden';
				
				//Add the message to the user
				var emptyCartMessage = document.createElement('h3');
				emptyCartMessage.innerText = 'You will see your items below once you add them!';
				const emptyCartMessageHolder = document.querySelector('#emptyCartMessageHolder');
				emptyCartMessageHolder.appendChild(emptyCartMessage);
			} else displayCurrentCart(currentResult[key], result[viewingKey].cartViewing);
		});
	}
});

//Display all the items in the current cart of the user
function displayCurrentCart(cart, viewing) {
	var items = cart.items;
	var key = 'currentCartKey';
	var totalPrice = 0;
	var totalQuantity = 0;
	var platforms = [];

	var backButton = document.getElementById('backButton');
	if (viewing == 'past') {
		backButton.innerText = 'Back to Past Carts';

		var currentButton = document.createElement('button');
		currentButton.innerText = 'Current Cart';

		currentButton.addEventListener('click', function() {
			window.location = 'index.html';
		})

		var buttonContainer = document.getElementsByClassName('buttonContainer')[0];
		buttonContainer.appendChild(currentButton);
	}

	chrome.storage.sync.get([key], function(result) {
		//var items = result[key].items;

		//Loop through each product in 'items' and display the information
		for (var j = 0; j < items.length; j++) {
			//Display the quantity of the item
			var quantityText = items[j].quantity;
			//If quantity wasn't read correctly from website
			if (isNaN(quantityText)) quantityText = 1;
			let quantity = document.createElement('p');
			quantity.innerText = quantityText;
			const quantityColumn = document.querySelector('#quantityColumn');
			quantityColumn.appendChild(quantity);
			totalQuantity += quantityText;

			//Display the unit price of the item
			var unitPriceText = items[j].price;

			let unitPrice = document.createElement('p');					
			unitPrice.innerText = unitPriceText;					
			const unitPriceColumn = document.querySelector('#unitPriceColumn');					
			unitPriceColumn.appendChild(unitPrice);

			//Remove commas and $ from unit price, multiply by quantity, and add to total price
			unitPriceText = unitPriceText.substring(1, unitPriceText.length).replace(/,/g, '');
			totalPrice = totalPrice + parseFloat(unitPriceText) * parseFloat(quantityText);	

			//Display the title of the item as a link to the item's listing online
			var title = items[j].productTitle;
			//Remove potential extra words and shorten to fit on popup if needed
			if (title.includes("Details about")) title = title.substring(16, title.length);
			if (title.length > 28) title = title.substring(0, 28) + "...";

			var p = document.createElement('p');					
			var a = document.createElement('a');					
			var linkText = document.createTextNode(title);					
			a.appendChild(linkText);					
			a.title = title;					
			a.href = items[j].url;
			a.target = "_blank";
			p.appendChild(a);
			const titleColumn = document.querySelector('#titleColumn');					
			titleColumn.appendChild(p);	
				
			//Extract the platform the item was sold on from the url, display it, and add to the 'platform' array
			var platformText = items[j].url;
					
			if (platformText.includes('www.')) platformText = platformText.substring(platformText.indexOf('www.') + 4, platformText.length);					
			if (platformText.includes('.com')) platformText = platformText.substring(0, platformText.indexOf('.com'));
			platformText = platformText.substring(0, 1).toUpperCase() + platformText.substring(1, platformText.length);

			var platform = document.createElement('p');					
			platform.innerText = platformText;					
			const platformColumn = document.querySelector('#platformColumn');				
			platformColumn.appendChild(platform);					
			if (!platforms.includes(platformText)) platforms.push(platformText);
		}

		//All the items have been added, so display the total price		
		var totalPriceBox = document.createElement('h3');						
		totalPriceBox.innerText = "Total Price: $" + totalPrice.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");						
		unitPriceColumn.appendChild(totalPriceBox);

		//Display total quantity
		var totalQuantityElment = document.createElement('h3');
		totalQuantityElment.innerText = "Cart Size: " + totalQuantity;
		quantityColumn.appendChild(totalQuantityElment);
			
		/*When the submit button is clicked, clear all the items from the memory, then open the carts for the websites the user
		added items from (Amazon, Ebay, Walmart, Macy's) */
		//Display the submit message
		var submitMessage = document.createElement('h4');

		//If viewing the current cart, show this message
		if (viewing == 'current') 
			submitMessage.innerText = "When you've found everything, click checkout and we'll take your to all you shopping carts!";

		//If viewing a past cart, show a different message
		else submitMessage.innerText = "You checked this cart out on " + cart.dateSubmitted;

		titleColumn.append(submitMessage);

		if (viewing == 'current') {

			//Add the submit button
			var submitButton = document.createElement('button');						
			submitButton.innerText = "Checkout";						
			titleColumn.appendChild(submitButton);
			
			//Action listener for submitButton
			submitButton.addEventListener('click', function() {
				var pastCartsKey = 'pastCartsKey';

				chrome.storage.sync.get([pastCartsKey], function(pastCartsResult) {
					//Add current cart to past carts

					//Past carts json object
					var pastCarts = pastCartsResult[pastCartsKey];

					//Today's date
					var today = new Date();
					var dd = String(today.getDate()).padStart(2, '0');
					var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
					var yyyy = today.getFullYear();

					today = mm + '/' + dd + '/' + yyyy;

					//Carts JSON object with items array, total price, and date submitted
					var newCart = {
						'items': items,
						'totalPrice': totalPrice,
						'cartSize': totalQuantity,
						'dateSubmitted': today
					}

					//Add current cart to past carts
					var carts = pastCarts.pastCarts;
					carts.push(newCart);
					pastCarts.carts = carts;
												
					//Save new value of past carts
					chrome.storage.sync.set({[pastCartsKey]: pastCarts}, function() {
					
						//Reset current cart
						var blankCart = {'items': []};
						chrome.storage.sync.set({[key]: blankCart}, function() {
							openPlatformCarts(platforms);
						});
					});
				});								
			});
		}
	});
}

function openPlatformCarts(platforms) {
	//If the user added an item from Macy's, Amazon, Ebay, or Walmart, open the shopping cart for that website
	if (platforms.includes('Macys')) {
		var newUrl = 'https://www.macys.com/my-bag';
		chrome.tabs.create({url: newUrl});
	}

	if (platforms.includes('Amazon')) {
		var newUrl = 'https://www.amazon.com/gp/cart/view.html?ref_=nav_cart';
		chrome.tabs.create({url: newUrl});
	}

	if (platforms.includes('Ebay')) {
		var newUrl = 'https://cart.ebay.com';
		chrome.tabs.create({url: newUrl});
	}

	if (platforms.includes('Walmart')) {	
		var newUrl = 'https://www.walmart.com/cart';
		chrome.tabs.create({url: newUrl});
	}		
}

function resetViewing() {
	//Change viewing cart back to current cart
	var viewingKey = 'viewingCartKey';
	chrome.storage.sync.get([viewingKey], function(result) {
		var viewChange = result[viewingKey];
		viewChange.cartViewing = 'current';

		chrome.storage.sync.set({[viewingKey]: viewChange}, function() {
			//Open all the user's shopping carts
		});
	});
}