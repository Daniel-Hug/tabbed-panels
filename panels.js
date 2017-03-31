// toggleable tabbed panels
(function(){
	// get nearest parent element matching selector
	var closestParent = (function() {
		var el = HTMLElement.prototype;
		var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

		function closestParent(el, selector) {
			if (el === null) return null;
			if (matches.call(el, selector)) {
				return el;
			} else {
				return closestParent(el.parentElement, selector);
			}
		}
		return closestParent;
	})();


	// handle events whose target matches a selector
	// works even on elements created after the event listener was added:
	//
	// delegateEvent('.todo .remove', 'click', function(removeBtn) {
	//     removeTodo(removeBtn.parentNode);
	// });

	function delegateEvent(selector, eventType, handler, elementScope) {
		(elementScope || document).addEventListener(eventType, function(event) {
			var listeningTarget = closestParent(event.target, selector);
			if (listeningTarget) {
				handler.call(listeningTarget, event);
			}
		});
	}

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

	function isAInB(a, b) {
		return a === b || b.contains(a);
	}

	function tabClick(clickedTab) {
		clickedTab = clickedTab.parentNode ? clickedTab : this;
		var parent = closestParent(clickedTab, '.tabbed-panels');
		if (!parent) return;

		var tabs = getElements('tab', parent);
		var panels = getElements('panel', parent);
		var closeable = parent.classList.contains('closeable');
		var clickedTabI = tabs.indexOf(clickedTab);

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
			if (panelI === clickedTabI) {
				panel.classList[closeable ? 'toggle' : 'add']('active');
			} else {
				panel.classList.remove('active');
			}
		});
	}

	delegateEvent('.tab', 'click', tabClick);

	window.addEventListener('click', function(event) {
		var parents = [].slice.call(document.querySelectorAll('.tabbed-panels.hovering.closeable.active'));
		parents.forEach(function(parent) {
			var tabs = getElements('tab', parent);
			var panels = getElements('panel', parent);

			// exit if click was in a tab or panel
			if (tabs.some(function(tab) {
				return isAInB(event.target, tab);
			}) || panels.some(function(panel) {
				return isAInB(event.target, panel);
			})) return;

			// otherwise unactivate everything
			for (var i = 0; i < tabs.length; i++) {
				if (tabs[i].classList.contains('active')) {
					parent.classList.remove('active');
					tabs[i].classList.remove('active');
					panels[i].classList.remove('active');
					return;
				}
			}
		});
	});
})();