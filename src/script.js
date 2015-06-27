(function() {
	
	var
		frames,
		lastWndWidth = null,
		mqls = []
	;
	
	window.addEventListener('load', onLoadEvent, false);
	
	function onLoadEvent() {
		frames = document.querySelectorAll('.instagram .frame');
			
		var w = 180*2;
		while (w <= 1080) {
			var mql = window.matchMedia('(min-width: ' + w + 'px)');
			mqls.push(mql);
			mql.addListener(loadVisibleImages);
			
			w += 180;
		}
		
		var spinner = document.querySelector('.spinner').cloneNode(true)
		spinner.classList.remove('hidden');
		activityIndicator.setForegroundElement(spinner);
		
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
			
			var img = f.getElementsByTagName('img')[0];
			
			activityIndicator.block(f);
			/* img.onload = (function() {
				var currf = f;
				return function() {
					activityIndicator.unblock(currf);
				};
			})(); */
			
			img.src = img.dataset.src;
			
			img.removeAttribute('data-src');
			
			f.classList.add('loaded');
		}
	}
			
})();