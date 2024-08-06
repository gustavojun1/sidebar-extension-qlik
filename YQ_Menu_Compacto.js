define(["qlik", "jquery", "text!./style.css"], function (qlik, $, cssContent) {
	'use strict';
  
	$("<style>").html(cssContent).appendTo("head");
  
	return {
	  paint: function ($element) {
		// Clear the element
		$element.empty();
  
		// Create a div with id 'root' where the React app will be mounted
		const rootDiv = $('<div id="root"></div>');
		$element.append(rootDiv);
  
		// Load the React bundle
		require(['./dist/bundle.js'], function () {
		  // The React app will be automatically mounted to the div with id 'root'
		});
	  }
	};
  });
  