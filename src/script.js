(function() {
	
	var
		frames
	;
	
	window.addEventListener('load', onLoadEvent, false);
	
	function onLoadEvent() {
		frames = [].slice.call(document.querySelectorAll('footer .shots .frame'), 0);
			
		var w = 180*2;
		while (w <= 1080) {
			window.matchMedia('(min-width: ' + w + 'px)').addListener(loadVisibleImages); // no addEventListener?!?
			w += 180;
		}
			
		loadVisibleImages();
	}
	
	function loadVisibleImages(/* mql */) {
		console.log('loadVisibleImages');
		
		var n =  Math.floor(window.innerWidth / 180);
		if (n > 7) n = 7;
		console.log(n);
		
		for (var i = 0; i < n; i++) {
			var f = frames[i];
			
			if (!f.classList.contains('loading'))
				continue;
			
			var img = f.querySelector('img');
			
			img.src = img.dataset.src;
			
			img.removeAttribute('data-src');
			
			f.classList.remove('loading');
		}
	}
			
})();