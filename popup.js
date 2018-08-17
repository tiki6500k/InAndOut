// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let changeColor = document.getElementById('changeColor');
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// function sendData(data) {
//   var XHR = new XMLHttpRequest();
//   var urlEncodedData = "";
//   var urlEncodedDataPairs = [];
//   var name;

//   // Turn the data object into an array of URL-encoded key/value pairs.
//   for(name in data) {
//     urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
//   }

//   // Combine the pairs into a single string and replace all %-encoded spaces to 
//   // the '+' character; matches the behaviour of browser form submissions.
//   urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

//   // Define what happens on successful data submission
//   XHR.addEventListener('load', function(event) {
//     console.log('Yeah! Data sent and response loaded.');
//   });

//   // Define what happens in case of error
//   XHR.addEventListener('error', function(event) {
//     console.log('Oops! Something goes wrong.');
//   });

//   // Set up our request
//   XHR.open('POST', 'tpehrweb.tutorabc.com');

//   // Add the required HTTP header for form data POST requests
//   XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//   // Finally, send our data.
//   XHR.send(urlEncodedData);
// }

function registButtonEvent () {
	document.addEventListener('DOMContentLoaded', function () {
		document.getElementById("GoOptions").addEventListener('click', goOptions);
		document.getElementById("GoIn").addEventListener('click', goIn);
		document.getElementById("GoOut").addEventListener('click', goOut);
	});
}

function updateTomorrow () {
	chrome.storage.sync.get("alarms", function(setting) {
		let p_tomorrow = document.getElementById("ptomorrow");
		let innerHTML = "";
		if (undefined != setting.alarms.daily) {
			let tomorrowDate = new Date(setting.alarms.daily);
			innerHTML = "will refresh @" + tomorrowDate.toLocaleString();
		}
		p_tomorrow.innerHTML = innerHTML;
	});
}

function updateCheckIn () {
	chrome.storage.sync.get("alarms", function(setting) {
		let p_tomorrow = document.getElementById("pcheck-in");
		let innerHTML = "No plan for check-in";
		if (undefined != setting.alarms.in) {
			let tomorrowDate = new Date(setting.alarms.in);
			innerHTML = "will check-in @" + tomorrowDate.toLocaleString();
		}
		p_tomorrow.innerHTML = innerHTML;
	});

}

function updateCheckOut () {
	chrome.storage.sync.get("alarms", function(setting) {
		let p_tomorrow = document.getElementById("pcheck-out");
		let innerHTML = "No plan for check-out";
		if (undefined != setting.alarms.out) {
			let tomorrowDate = new Date(setting.alarms.out);
			innerHTML = "will check-out @" + tomorrowDate.toLocaleString();
		}
		p_tomorrow.innerHTML = innerHTML;
	});
}

function updateHTML () {
	updateTomorrow();
	updateCheckIn();
	updateCheckOut();	
}

registButtonEvent();
updateHTML();


