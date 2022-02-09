/* Function getJSON below uses AJAX ( see homework 6 in MAMP for more detail)
It accepts a url (where the JSON data is contained) and a callback function
It gets the data, and as long as the request status is successful (200) 
it returns the data/response. If not successful, error message displays */
			var getJSON = function(urlSource, callback){
				var request = new XMLHttpRequest();
				request.open('get', urlSource, true);
				request.responseType = 'json';
				request.onload = function(){
					var requestStatus = request.status;
					if (requestStatus == 200){
						callback(null, request.response);
					}
					else {
						callback(requestStatus);
					}
				};
				request.send();
			};
/* Below we call function getJSON, passing our specific url and the callback function
as parameters. The function then manipulates the data that it returns to display
a readable menu to the user. It performs this by 'for in' looping through each layer of the object;
and using if statements within to display only elements that are readble to the user*/
			getJSON('https://mm214.com/menu.php', function(errorStatus, JSONdata){
				if (errorStatus != null){
					alert('There was a problem with the request. Status: ' + errorStatus);
				}
				else {
					console.log(JSONdata);
					console.log(JSONdata.menu);
					console.log(JSONdata.menu.sides);
				}
				var finalContent = '';
				var pizzaMenu = JSONdata.menu;

				for (i in pizzaMenu){
					finalContent += i + ': '; 
					if (typeof(pizzaMenu[i]) === 'object'){
						finalContent += '<br />';
					}
					if (typeof(pizzaMenu[i]) !== 'object'){
						finalContent += pizzaMenu[i] + '<br />';
					}
					for (j in pizzaMenu[i]){
						if (i == 'toppings'){
							finalContent += j + ': ' + pizzaMenu[i][j] + '<br />';
						}
						if (i == 'sides'){
							finalContent += j + ': ' + pizzaMenu[i][j] + '<br />';
						}
						if (i == 'drinks'){
							finalContent += j + ': ';
							if (typeof(pizzaMenu[i][j]) === 'object'){
							finalContent += '<br />';
							}
							if (typeof(pizzaMenu[i][j]) !== 'object'){
							finalContent += pizzaMenu[i][j] + '<br />';
							}
							if (j == 'soda'){
								for (k in pizzaMenu[i][j]){
									finalContent += k + ': ' + pizzaMenu[i][j][k] + '<br />';
								}
							}
						}
					}
				}		
				document.getElementById('menu').innerHTML = finalContent;
			});
			
/* Function displayOrder is called onclick of the 'your order' button within the html form.
It 'for' loops through the form elements and captures the values selected or entered by the user
and stores them in variables/an array. It then displays the final result to the user
and also stores that result as a string in localStorage */
			function displayOrder(){
				var formElements = document.forms[0].elements
				var checkedValues = [];
				for (let i=0;i<formElements.length;i++){
					if (formElements[i].type == 'text'){
						let slices = formElements[i].value;
						localStorage.setItem('slices',slices);
						localStorage.getItem('slices');
						document.getElementById('pizzaSlices').innerHTML = 'You have ordered ' + slices + ' slices of pizza. <br />';
					}
					if (formElements[i].type == 'checkbox' && formElements[i].checked === true){
						checkedValues.push(formElements[i].value);
						localStorage.setItem('add-ons',checkedValues.toString());
						localStorage.getItem('add-ons');
						document.getElementById('add-ons').innerHTML = 'Your toppings, sides, & drinks include: ' + checkedValues;
						console.log(checkedValues);
					}
				}
			}
			console.log(displayOrder);
