function hideTabContent(content, tabs, activeClass) {
	content.forEach(item => {
		item.style.display = 'none';
	})

	tabs.forEach(item => {
		item.classList.remove(activeClass);
	})
}

function showTabContent(content, tabs, activeClass, i = 0, display = 'block') {
	content[i].style.display = display;
	tabs[i].classList.add(activeClass);
}

export { hideTabContent, showTabContent };