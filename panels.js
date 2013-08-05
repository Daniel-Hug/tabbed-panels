// NodeList to Array:
function toArray(nl) {
	for(var a=[], l=nl.length; l--;) a[l]=nl[l];
	return a;
}

// Get elements by CSS selector
function $$(s, el) {
	return toArray( (el || document).querySelectorAll(s) );
}

// toggleable tabbed panels
$$('.tabbed-panels').forEach(function(parent) {
	var tabs = $$('.tab', parent);
	var panels = $$('.panel', parent);
	var closeable = parent.classList.contains('closeable');
	tabs.forEach(function(tab, i) {
		tab.addEventListener('click', function() {
			tabs.forEach(function(tab) {
				if (tab != this) tab.classList.remove('active');
			}, this);

			if (closeable) {
				var isActive = this.classList.toggle('active');
				parent.classList[isActive ? 'add' : 'remove']('active');
			} else {
				this.classList.add('active');
				parent.classList.add('active');
			}

			panels.forEach(function(panel, j) {
				panel.classList[j === i ? (closeable ? 'toggle' : 'add') : 'remove']('active');
			});
		});
	});
});
