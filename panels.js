// toggleable tabbed panels
[].forEach.call(document.getElementsByClassName('tabbed-panels'), function(parent) {
	var tabs = this('tab', this('tabs', parent)[0] || parent);
	var panels = this('panel', parent);
	var closeable = parent.classList.contains('closeable');

	tabs.forEach(function(tab, i) {
		tab.addEventListener('click', function() {
			// non-clicked tabs: deactivate
			tabs.forEach(function(tab) {
				if (tab != this) tab.classList.remove('active');
			}, this);

			// clicked tab: if closeable, toggle its active state, otherwise activate
			var isActive = closeable ? this.classList.toggle('active') : this.classList.add('active');

			// parent: if a tab is active, activate parent, otherwise deactivate
			parent.classList[(!closeable || isActive) ? 'add' : 'remove']('active');

			// panels: activate clicked tab's panel, deactivate other panels
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
