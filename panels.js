// toggleable tabbed panels
(function(){
	// Get descendants of scopeEl with className that have no
	// .tabbed-panels ancestor which is also a descendant of scopeEl
	// This is needed to support nesting of tabbed panels.
	function getElements(className, scopeEl) {
		return [].filter.call(scopeEl.getElementsByClassName(className), function(child) {
	        var el = child;
			while ((el = el.parentNode)) {
	            if (el === scopeEl) break;
	            if (el.classList.contains('tabbed-panels')) return false;
			}
			return true;
		});
	}

	[].forEach.call(document.getElementsByClassName('tabbed-panels'), function(parent) {
		var tabs = getElements('tab', parent);
		var panels = getElements('panel', parent);
		var closeable = parent.classList.contains('closeable');
		var hovering = parent.classList.contains('hovering');
		var lastClickedTab = null;
		var lastClickedTabI = null;

		function tabClick(clickedTab, clickedTabI) {
			// non-clicked tabs: deactivate
			tabs.forEach(function(tab) {
				if (tab != clickedTab) tab.classList.remove('active');
			});

			// clicked tab: if closeable, toggle its active state, otherwise activate
			var isActive = clickedTab.classList[closeable ? 'toggle' : 'add']('active');

			// parent: if not closeable or if a tab is active, activate parent, otherwise deactivate
			parent.classList[(!closeable || isActive) ? 'add' : 'remove']('active');

			// panels: activate clicked tab's panel, deactivate other panels
			panels.forEach(function(panel, panelI) {
				panel.classList[panelI === clickedTabI ? (closeable ? 'toggle' : 'add') : 'remove']('active');
			});

			lastClickedTab = clickedTab;
			lastClickedTabI = clickedTabI;
		}

		tabs.forEach(function(tab, i) {
			tab.addEventListener('click', tabClick.bind(null, tab, i));
		});

		if (closeable && hovering) {
			window.addEventListener('click', function(e) {
				if (
					parent.classList.contains('active') &&
					(!parent.contains(e.target) || e.target === parent)
				) {
					tabClick(lastClickedTab, lastClickedTabI);
				}
			});
		}
	});
})();