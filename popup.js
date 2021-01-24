	function makeList() {
		console.log("gonna make a list");
		var items = ["item1", "item2", "item3", "item4"]; //items (change to stored data)
		
		// loops through each item, creating an element
		for (var i = 0; i < items.length; i++) {				
			var btn = document.createElement("h3");
			btn.innerHTML = items[i];
			document.body.appendChild(btn);
		} //for
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
