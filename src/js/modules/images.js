const images = () => {
	const imgPopup = document.createElement('div'),
		  imgWrapper = document.querySelector('.works'),
		  bigImage = document.createElement('img');

	imgPopup.classList.add('popup');
	imgWrapper.appendChild(imgPopup);

	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	imgPopup.style.display = 'none';

	bigImage.style.width = '40%';

	imgPopup.appendChild(bigImage);

	imgWrapper.addEventListener('click', (e) => {
		e.preventDefault();

		const target = e.target;

		if(target && target.classList.contains('preview')) {
			imgPopup.style.display = 'flex';
			document.body.style.overflow = 'hidden';

			const path = target.parentElement.getAttribute('href');
			bigImage.setAttribute('src', path);
		}

		if(target && target.matches('div.popup')) {
			imgPopup.style.display = 'none';
			document.body.style.overflow = '';
		}
	})
};

export default images;