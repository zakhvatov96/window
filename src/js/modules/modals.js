const modals = (state) => {
	function bindModal (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector),
			  modal = document.querySelector(modalSelector),
			  close = document.querySelector(closeSelector),
			  windows = document.querySelectorAll('[data-modal]'),
			  scroll = calcScroll();

		function showStatusMessage(parent) {
			const statusMessage = document.createElement('div');

			statusMessage.classList.add('status');
			statusMessage.textContent = 'Введите все данные';
			parent.append(statusMessage);
			setTimeout(()=>{
				statusMessage.remove()
			}, 1000);
		}

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if(e.target) {
					e.preventDefault();
					if(e.target.getAttribute('data-call') || (e.target.getAttribute('data-next') === 'first' && Object.entries(state).length === 3) || (e.target.getAttribute('data-next') === 'second' && Object.entries(state).length === 5)) {
						windows.forEach(item => {
						item.style.display = 'none';
						})
						modal.style.display = 'block';
						document.body.style.overflow = 'hidden';
						document.body.style.marginRight = `${scroll}px`;
					} else {
						showStatusMessage(e.target.parentElement);					
					}
				}
			})
		})

		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			})
			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = '0px';

		})

		modal.addEventListener('click', (e) => {
			if(e.target === modal && closeClickOverlay) {
				windows.forEach(item => {
					item.style.display = 'none';
				})
				modal.style.display = 'none';
				document.body.style.overflow = '';
				document.body.style.marginRight = '0px';
	
			}
		})
	}

	function showModalByTime (selector, time) {
		const modal = document.querySelector(selector);
		setTimeout(function() {
			modal.style.display = 'block';
			document.body.style.overflow = 'hidden';
			document.body.style.marginRight = `${scroll}px`;

		}, time);
	}

	function calcScroll() {
		const div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);

		const scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();

		return scrollWidth;
	}

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
	// showModalByTime('.popup', 3000);
};

export default modals;