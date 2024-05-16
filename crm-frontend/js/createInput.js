export const createInput = (title, name) => {
	if (title !== 'Отчество') {
		const input = document.createElement('input');
		const label = document.createElement('label');
		const required = document.createElement('span');
		const floatingLabel = document.createElement('div');

		input.classList.add('form__input');
		label.classList.add('form__label');
		required.classList.add('form__required');
		floatingLabel.classList.add('form__floating-label');

		if (title === 'Фамилия') {
			input.id = 'input-surname';
		} else if (title === 'Имя') {
			input.id = 'input-name';
		}

		input.placeholder = title;
		label.innerText = title;
		required.textContent = '*';
		if (name) {
			input.value = name;
		}

		label.appendChild(required);
		floatingLabel.append(input, label);
		return {
			floatingLabel,
			input
		};
	} else {
		const input = document.createElement('input');
		const label = document.createElement('label');
		const floatingLabel = document.createElement('div');

		input.classList.add('form__input');
		label.classList.add('form__label');
		floatingLabel.classList.add('form__floating-label');

		input.id = 'input-lastname';

		input.placeholder = title;
		label.innerText = title;
		if (name) {
			input.value = name;
		}

		floatingLabel.append(input, label);

		return {
			floatingLabel,
			input
		};
	}
};
