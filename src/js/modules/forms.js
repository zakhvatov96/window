const forms = () => {
	const form = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');
	const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Мы скоро с вами свяжемся!',
		failure: 'Что-то пошло не так...'
	};

	phoneInputs.forEach(item => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/\D/, '');
		})
	})

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

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();
			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);

			postData('assets/server.php', formData)
			.then(res => {
				console.log(res);
				statusMessage.textContent = message.success;
			})
			.catch(res => statusMessage.textContent = message.failure)
			.finally(res => {
				clearInputs();
				setTimeout(() => {
					statusMessage.remove();
				}, 5000)
			})
		})
	})
};

export default forms;