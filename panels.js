// toggleable tabbed panels
(function($) {
	$('.tabbed-panels').forEach(function(parent) {
		var tabsParent = $('tabs', parent)[0];
		var tabs = $('tab', tabsParent || parent);
		var panels = $('panel', parent);
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

// Get children with class:
})(function(className, scopeEl) {
	var elements = (scopeEl || document).getElementsByClassName(className);
	return scopeEl ? [].filter.call(elements, function(child) {
		return child.parentNode === scopeEl;
	}) : elements;
});
