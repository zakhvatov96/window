import { hideTabContent, showTabContent } from './showAndHideTabContent';

const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
	const header = document.querySelector(headerSelector),
		  tabs = document.querySelectorAll(tabSelector),
		  content = document.querySelectorAll(contentSelector);


	hideTabContent(content, tabs, activeClass);
	showTabContent(content, tabs, activeClass, 0, display);

	header.addEventListener('click', (e) => {
		const target = e.target;
		if(target && 
			(target.classList.contains(tabSelector.replace(/\./, '')) ||
			target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
				tabs.forEach((item, i) => {
					if(target == item || target.parentNode == item) {
						hideTabContent(content, tabs, activeClass);
						showTabContent(content, tabs, activeClass, i, display);
					}
				})
		}
	})


};

export default tabs;