var key = 'pastCartsKey';
chrome.storage.sync.get([key], function(result) {
    pastCarts = result[key].pastCarts;
    for (var i = 0; i < pastCarts.length; i++) {
        //Extract date submitted and total price of cart
        var dateSubmitted = pastCarts[i].dateSubmitted;
        var totalPrice = pastCarts[i].totalPrice;

        //Display date submitted
        var dateSubmittedElement = document.createElement('h3');					
		dateSubmittedElement.innerText = dateSubmitted;					
		const dateSubmittedColumn = document.querySelector('#dateSubmittedColumn');				
		dateSubmittedColumn.appendChild(dateSubmittedElement);

        //Display total price of cart
        var totalPriceElement = document.createElement('h3');					
		totalPriceElement.innerText = totalPrice.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");					
		const totalPriceColumn = document.querySelector('#totalPriceColumn');				
		totalPriceColumn.appendChild(totalPriceElement);

        //Add button
        var submitButton = document.createElement('button');
        submitButton.style = 'margin:3px;'						
		submitButton.innerText = "View Cart";
        const submitButtonColumn = document.querySelector('#submitButtonColumn');
        submitButtonColumn.append(submitButton);
    }
});