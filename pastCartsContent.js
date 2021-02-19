var key = 'pastCartsKey';
var pastCartsHolder = [];

chrome.storage.sync.get([key], function(result) {
    if (result[key] !== undefined && result[key].pastCarts.length != 0) {
        pastCarts = result[key].pastCarts;
        for (var i = 0; i < pastCarts.length; i++) {
            //Extract date submitted and total price of cart
            var dateSubmitted = pastCarts[i].dateSubmitted;
            var totalPrice = pastCarts[i].totalPrice;
            var cartSize = pastCarts[i].cartSize;

            //Display date submitted
            var dateSubmittedElement = document.createElement('h3');					
		    dateSubmittedElement.innerText = dateSubmitted;					
		    const dateSubmittedColumn = document.querySelector('#dateSubmittedColumn');				
		    dateSubmittedColumn.appendChild(dateSubmittedElement);

            //Display cart size
            var cartSizeEleemnt = document.createElement('h3');					
		    cartSizeEleemnt.innerText = cartSize;					
		    const cartSizeColumn = document.querySelector('#cartSizeColumn');				
		    cartSizeColumn.appendChild(cartSizeEleemnt);

            //Display total price of cart
            var totalPriceElement = document.createElement('h3');					
		    totalPriceElement.innerText = "$" + totalPrice.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");					
		    const totalPriceColumn = document.querySelector('#totalPriceColumn');				
		    totalPriceColumn.appendChild(totalPriceElement);

            //Add button
            var submitButton = document.createElement('button');
            submitButton.id = i;
            submitButton.style = 'margin:5px;'						
		    submitButton.innerText = "View Cart";
            const submitButtonColumn = document.querySelector('#submitButtonColumn');
            submitButtonColumn.append(submitButton);

            submitButton.addEventListener('click', function(e) {
                var viewingKey = 'viewingCartKey';
                chrome.storage.sync.get([viewingKey], function(result) {
                    var viewChange = result[viewingKey];
                    viewChange.cartViewing = 'past';
                    viewChange.pastCart = pastCarts[e.target.id];

                    chrome.storage.sync.set({[viewingKey]: viewChange}, function() {
                        window.location = 'index.html';
                    });
                });
            })
        }

    } else {
        //At this point, there are not carts in past carts
        document.getElementById('dateSubmittedColumn').style.visibility = 'hidden';
		document.getElementById('cartSizeColumn').style.visibility = 'hidden'
		document.getElementById('totalPriceColumn').style.visibility = 'hidden'
		document.getElementById('submitButtonColumn').style.visibility = 'hidden';

        var message = document.createElement('h3');
        message.innerText = 'You will see your past carts below after you submit them.';
        var messageHolder = document.getElementById('messageHolder');
        messageHolder.appendChild(message);
    }
});