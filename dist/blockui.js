(function() {
	
	var 
		root,
		foregroundEl = null
	;

	init();
	
	function init() {
		root = document.createElement('div');
		root.innerHTML = 
			`
				<div class="activity-indicator">
				</div>
			`;
		root = root.firstElementChild;
		
		installCSS();
	}
	
	function block(el) {
		var elRoot = root.cloneNode(true);
		if (foregroundEl) {
			foregroundEl.classList.add('activity-indicator__fg');
			elRoot.appendChild(foregroundEl.cloneNode(true));
		}
		document.body.appendChild(elRoot);
		
		// Make elRoot overlay over el
		var clientRect = el.getBoundingClientRect();
		var docLeft = clientRect.left + window.pageXOffset;
		var docTop = clientRect.top + window.pageYOffset;
		
		elRoot.style.left = docLeft + 'px';
		elRoot.style.top = docTop + 'px';
		elRoot.style.width = (clientRect.right - clientRect.left) + 'px';
		elRoot.style.height = (clientRect.bottom - clientRect.top) + 'px';
		
		el.activityIndicator = elRoot;
	}
	
	function unblock(el) {
		document.body.removeChild(el.activityIndicator);
	}
	
	function setForegroundElement(el) {
		foregroundEl = el;
	}
	
	function installCSS() {
		var styleEl = document.createElement('style');
		styleEl.id = "blockui-css";
		
		var css = `
			.activity-indicator {
				position: absolute; 
				background: rgba(0,0,0,0.5);
			}
			.activity-indicator__fg {
				position: absolute; 
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, -50%);
				transform: translate(-50%, -50%);
			}
		`;
		
		styleEl.textContent = css;
		
		document.head.insertBefore(styleEl, document.head.firstElementChild);
	}
	
	window.activityIndicator = {
		block: block,
		unblock: unblock,
		setForegroundElement: setForegroundElement
	};
	
})();