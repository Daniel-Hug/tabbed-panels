// toggleable tabbed panels
[].forEach.call(document.getElementsByClassName('tabbed-panels'), function(parent) {
	var tabs = this('tab', this('tabs', parent)[0] || parent);
	var panels = this('panel', parent);
	var closeable = parent.classList.contains('closeable');
	var hovering = parent.classList.contains('hovering');
	var lastClickedTab = null;
	var lastClickedTabI = null;

	function tabClick(i) {
		lastClickedTab = this;
		lastClickedTabI = i;

		// non-clicked tabs: deactivate
		tabs.forEach(function(tab) {
			if (tab != this) tab.classList.remove('active');
		}, this);

		// clicked tab: if closeable, toggle its active state, otherwise activate
		var isActive = this.classList[closeable ? 'toggle' : 'add']('active');

		// parent: if not closeable or if a tab is active, activate parent, otherwise deactivate
		parent.classList[(!closeable || isActive) ? 'add' : 'remove']('active');

		// panels: activate clicked tab's panel, deactivate other panels
		panels.forEach(function(panel, j) {
			panel.classList[j === i ? (closeable ? 'toggle' : 'add') : 'remove']('active');
		});
	}

	tabs.forEach(function(tab, i) {
		tab.addEventListener('click', tabClick.bind(tab, i));
	});

	if (closeable && hovering) {
		window.addEventListener('click', function(e) {
			if (
				parent.classList.contains('active') &&
				(!parent.contains(e.target) || e.target === parent)
			) {
				tabClick.call(lastClickedTab, lastClickedTabI);
			}
		});
	}

// Get children with class:
}, function(className, scopeEl) {
	return [].filter.call(scopeEl.getElementsByClassName(className), function(child) {
		return child.parentNode === scopeEl;
	});
});