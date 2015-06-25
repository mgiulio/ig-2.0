(function() {
	
	var
		frames,
		lastWndWidth = null,
		mqls = []
	;
	
	window.addEventListener('load', onLoadEvent, false);
	
	function onLoadEvent() {
		frames = [].slice.call(document.querySelectorAll('.instagram .frame'), 0);
			
		var w = 180*2;
		while (w <= 1080) {
			var mql = window.matchMedia('(min-width: ' + w + 'px)');
			mqls.push(mql);
			mql.addListener(loadVisibleImages);
			
			w += 180;
		}
			
		loadVisibleImages();
	}
	
	function loadVisibleImages() {
		if (window.innerWidth === lastWndWidth)
			return;
		
		lastWndWidth = window.innerWidth;
		
		var n =  Math.floor(lastWndWidth / 180);
		var maxCols = 7;
		if (n >= maxCols) { 
			n = maxCols;
			
			mqls.forEach(function(mql) {
				mql.removeListener(loadVisibleImages);
			});
			
			mqls = null;
		}
		
		for (var i = 0; i < n; i++) {
			var f = frames[i];
			
			if (f.classList.contains('loaded'))
				continue;
			
			var img = f.querySelector('img');
			
			img.src = img.dataset.src;
			
			img.removeAttribute('data-src');
			
			f.classList.add('loaded');
		}
	}
			
})();