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
			var btn = document.createElement("h3");
			btn.innerHTML = items[i];
			document.body.appendChild(btn);
		} //for

		*/
	} //makeList()
	document.getElementById("makeList").onclick = makeList;


		function edit() {
        console.log("peepeepoopoo");
        var elements = document.getElementById("delete");

        for (var i = 0, element; (element = elements[i++]); ) {
          console.log(element);
        }        
		if (document.getElementById("editButton").innerHTML === "Edit cart") {
          document.getElementById("editButton").innerHTML = "Delete Selected Items";
          console.log(document.getElementById("editButton").innerHTML);

          for (var i = 0, element; (element = elements[i++]); ) {
            element.disabled = false;
          }
        } else {
          document.getElementById("editButton").innerHTML = "Edit cart";
          console.log(document.getElementById("editButton").innerHTML);

          for (var i = 0, element; (element = elements[i++]); ) {
            element.disabled = true;
          }
          elements = deleter();
        }
      } //edit()
		document.getElementById("editButton").onclick = edit;

      function deleter() {
        var inputs = document.getElementsByTagName("input");
        var labels = document.getElementsByTagName("label");
        console.log(inputs.length);
        for (var i = 0; i < inputs.length; i++) {
          var inp = inputs[i];
          var l = labels[i];
          console.log(inp.checked);
          if (inp.checked == true) {
            inputs[i].parentNode.removeChild(inputs[i]);
            labels[i].parentNode.removeChild(lables[i]);
          }
        }
      }
	
/*
      document.getElementById("submit").onclick = function () {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "car";
        checkbox.name = "interest";
        checkbox.value = "car";

        var label = document.createElement("label");
        label.htmlFor = "car";
        label.appendChild(document.createTextNode("Car"));

        var br = document.createElement("br");

        var container = document.getElementById("container");
        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(br);
      };

      */
