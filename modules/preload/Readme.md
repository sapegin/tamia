# Preload

Image preload.


## Usage

	preload(
		[
			'../images/homepage-iphone.png',
			'../images/homepage-iphone-screenshot.png'
		],
		function(err) {
			// `err` contains array of not loaded images or null
			console.log('Images preloaded. Errors:', err);
		}
	);
