var key = "cartSizeKey";
var totalPrice = 0;		
var items = [];
var platforms = [];

//Displays all the product info in the popup
//First retrieves the number of items in the user's ChromeCart
chrome.storage.sync.get([key], function(response) {
	var cartSize = response[key];

	/*If the cart size is undefined or 0, hide everything and add a message inviting the user to add items
	If the cart size is defined and not zero, call nextProduct to display all the products on the popup*/
	if (cartSize === undefined || cartSize === 0) {
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
	} else nextProduct(1, cartSize);
});

//Recursive function to save all the products in a user's ChromeCart to the array, 'items'
function nextProduct(i, cartSize) {
	//The key for each product saved in chrome storage is a number between 1 and the size of the ChromeCart inclusive
	var productKey = i + "";
	chrome.storage.sync.get([productKey], function(productResponse) {
		//Save the product info to the array, 'items'
		items.push(productResponse[productKey]);

		i = i + 1;
		//If there are still more products remaining in the ChromeCart, continue retrieving product information
		if (i <= cartSize) nextProduct(i, cartSize);
		/*If i is greater than the cart size, then all the product information has been saved to the array 'items' and the information 
		  can now be displayed in the popup*/
		else {
			//Loop through each product in 'items' and display the information
			for (var j = 0; j < items.length; j++) {
				//Display the quantity of the item
				var quantityText = items[j][0];
				let quantity = document.createElement('p');
				quantity.innerText = quantityText;
				const quantityColumn = document.querySelector('#quantityColumn');
				quantityColumn.appendChild(quantity);	

				//Display the unit price of the item
				var unitPriceText = items[j][1];
				let unitPrice = document.createElement('p');					
				unitPrice.innerText = unitPriceText;					
				const unitPriceColumn = document.querySelector('#unitPriceColumn');					
				unitPriceColumn.appendChild(unitPrice);

				//Remove commas and $ from unit price, multiply by quantity, and add to total price
				unitPriceText = unitPriceText.substring(1, unitPriceText.length).replace(/,/g, '');
				totalPrice = totalPrice + parseFloat(unitPriceText) * parseFloat(quantityText);	

				//Display the title of the item as a link to the item's listing online
				var title = items[j][2];
				//Remove potential extra words and shorten to fit on popup if needed
				if (title.includes("Details about")) title = title.substring(16, title.length);
				if (title.length > 30) title = title.substring(0, 30) + "...";

				var p = document.createElement('p');					
				var a = document.createElement('a');					
				var linkText = document.createTextNode(title);					
				a.appendChild(linkText);					
				a.title = title;					
				a.href = items[j][3];					
				p.appendChild(a);
				const titleColumn = document.querySelector('#titleColumn');					
				titleColumn.appendChild(p);	
					
				//Extract the platform the item was sold on from the url, display it, and add to the 'platform' array
				var platformText = items[j][3];
						
				if (platformText.includes('www.')) platformText = platformText.substring(platformText.indexOf('www.') + 4, platformText.length);					
				if (platformText.includes('.com')) platformText = platformText.substring(0, platformText.indexOf('.com'));
				platformText = platformText.substring(0, 1).toUpperCase() + platformText.substring(1, platformText.length);

				var platform = document.createElement('p');					
				platform.innerText = platformText;					
				const platformColumn = document.querySelector('#platformColumn');				
				platformColumn.appendChild(platform);					
				if (!platforms.includes(platformText)) platforms.push(platformText);
					
				//If all the items have been added, display the total price and add the submit button
				if (j === items.length - 1) {
					//Diaplay the total price			
					var totalPriceBox = document.createElement('h2');						
					totalPriceBox.innerText = "Total Price: $" + totalPrice.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");						
					unitPriceColumn.appendChild(totalPriceBox);
						
					/*When the submit button is clicked, clear all the items from the memory, then open the carts for the websites the user
					added items from (Amazon, Ebay, Walmart, Macy's) */
					//Display the submit message
					var submitMessage = document.createElement('h4');
					submitMessage.innerText = "When you've found everything, click checkout and we'll take you to all you shopping carts!";
					titleColumn.append(submitMessage);

					//Add the submit button
					var submitButton = document.createElement('button');						
					submitButton.innerText = "Checkout";						
					titleColumn.appendChild(submitButton);
					
					//Action listener for submitButton
					submitButton.addEventListener('click', function() {	
						//Clear all the items from memory					
						chrome.storage.sync.clear();
						
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
					});
				}					
			}
		}			
	});
	
}