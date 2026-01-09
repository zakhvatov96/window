import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
	const form = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');
	const modals = document.querySelectorAll('[data-modal]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Мы скоро с вами свяжемся!',
		failure: 'Что-то пошло не так...'
	};

	checkNumInputs('input[name="user_phone"]');

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
	}

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		})
	}

	const clearState = () => {
		for(let prop of Object.keys(state)) {
			delete state[prop];
		}
	}

	// const resetCalc = () => {
	// 	hideTabContent();
	// 	showTabContent(0);
	// }

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();
			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);
			if(item.getAttribute('data-form') === 'end') {
				for(let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
			.then(res => {
				console.log(res);
				statusMessage.textContent = message.success;
				modals.forEach(item => {
					setTimeout(() => {
						item.style.display = 'none';
						document.body.style.overflow = '';
					}, 5000);
				})
			})
			.catch(res => statusMessage.textContent = message.failure)
			.finally(res => {
				clearInputs();
				setTimeout(() => {
					statusMessage.remove();
				}, 3000);
				clearState();
				// resetCalc();
			})
		})
	})
};

export default forms;