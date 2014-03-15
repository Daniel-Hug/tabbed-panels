// toggleable tabbed panels
[].forEach.call(document.getElementsByClassName('tabbed-panels'), function(parent) {
	var tabs = this('tab', this('tabs', parent)[0] || parent);
	var panels = this('panel', parent);
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

// Get children with class:
}, function(className, scopeEl) {
	return [].filter.call(scopeEl.getElementsByClassName(className), function(child) {
		return child.parentNode === scopeEl;
	});
});
