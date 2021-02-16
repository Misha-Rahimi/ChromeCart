var key = 'pastCartsKey';
chrome.storage.sync.get([key], function(result) {
    var pastCarts = result[key];
    alert(pastCarts.length);
    for (var i = 0; i < pastCarts.length; i++) {
        var totalPrice = 0;
        for (var j = 0; j < pastCarts[i].length; j++) {
            var quantityText = pastCarts[i][j][0]
            if (isNaN(quantityText)) quantityText = 1;

            var unitPriceText = pastCarts[i][j][1];
            unitPriceText = unitPriceText.substring(1, unitPriceText.length).replace(/,/g, '');
            totalPrice = totalPrice + parseFloat(unitPriceText) * parseFloat(quantityText);
        }
        //alert(totalPrice);
    }
});

var testAllPastCarts = 
{
    "pastCarts": []
}

var testCart1 = 
{
    "dateSubmitted": "1.2.21",
    "totalPrice": 11.23,
    "items": []
}

var testItem = {
    "title": "Axe",
    "platform": "Amazon",
    "price": 12
}

var tempArray = testCart1.items;
tempArray.push(testItem);
testCart1.items = tempArray;

tempArray = testAllPastCarts.pastCarts;
tempArray.push(testCart1);
testAllPastCarts.pastCarts = tempArray;

console.log(testAllPastCarts.pastCarts[0].items[0].title);