export const validationNames = () => {
	const userSurname = document.getElementById('input-surname');
	const userName = document.getElementById('input-name');
	const userLastname = document.getElementById('input-lastname');
	const errorLetters = document.getElementById('error-letters');
	const errorSurname = document.getElementById('error-surname');
	const errorName = document.getElementById('error-name');
	const errorRequired = document.getElementById('error-required');
	const validateArray = [errorLetters, errorSurname, errorName, errorRequired];
	const regexpName = /[^а-яА-ЯёЁ]+$/g;

	const onInputValue = input => {
		input.addEventListener('input', () => {
			input.style.borderColor = 'var(--lavender-gray-color)';
			for (const item of validateArray) {
				item.textContent = '';
			}
		});

		input.oncut = input.oncopy = input.onpaste = () => {
			input.style.borderColor = 'var(--lavender-gray-color)';
			for (const item of validateArray) {
				item.textContent = '';
			}
		};

		input.onchange = () => {
			input.style.borderColor = 'var(--lavender-gray-color)';
			if (userSurname.value && userName.value) {
				for (const item of validateArray) {
					item.textContent = '';
				}
			}
		};
	};

	onInputValue(userSurname);
	onInputValue(userName);

	const checkRequiredName = (input, message, name) => {
		if (!input.value) {
			input.style.borderColor = 'var(--tomato-color)';
			message.textContent = `Поле "${name}" обязательно для заполнения!`;
			return false;
		} else {
			message.textContent = '';
		}
		return true;
	};

	const checkByRegexpName = (input, regexpName) => {
		if (regexpName.test(input.value)) {
			input.style.borderColor = 'var(--tomato-color)';
			errorLetters.textContent = 'Недопустимые символы!';
			return false;
		}
		return true;
	};

	if (!checkRequiredName(userSurname, errorSurname, 'Фамилия') ||
		!checkRequiredName(userName, errorName, 'Имя') ||
		!checkByRegexpName(userSurname, regexpName) ||
		!checkByRegexpName(userName, regexpName) ||
		!checkByRegexpName(userLastname, regexpName)) {
		return false;
	}
	return true;
};

export const validationContacts = (contactType, contactValue) => {
	const errorContact = document.getElementById('error-letters');
	const regexpNum = /[^0-9]+$/g;
	const regexpEmail = /^\w+@\w+\.\w+$/;
	const regexpAllOther = /^[@._-]?[A-Za-z0-9]+$/g;

	const onInputValue = input => {
		input.addEventListener('input', () => {
			input.style.backgroundColor = 'transparent';
			errorContact.textContent = '';
		});

		input.oncut = input.oncopy = input.onpaste = () => {
			input.style.backgroundColor = 'transparent';
			errorContact.textContent = '';
		};
	};

	const showErrorMessage = (input, block, message) => {
		block.textContent = message;
		input.style.backgroundColor = 'var(--tomato-color)';
	};

	onInputValue(contactValue);

	if (!contactValue.value) {
		showErrorMessage(contactValue, errorContact, 'Поле обязательно для заполнения!');
		return false;
	}

	switch (contactType.textContent.trim().replace(/\s+/g, '')) {
	case 'Телефон':
		if (regexpNum.test(contactValue.value)) {
			showErrorMessage(contactValue, errorContact, 'Введите корректный номер телефона!');
			return false;
		} else if (contactValue.value.length !== 11) {
			showErrorMessage(contactValue, errorContact, 'Номер должен состоять из 11 цифр!');
			return false;
		}
		break;
	case 'Email':
		if (!regexpEmail.test(contactValue.value)) {
			showErrorMessage(contactValue, errorContact, 'Некорректный адрес электронной почты!');
			return false;
		}
		break;
	default:
		if (!regexpAllOther.test(contactValue.value)) {
			showErrorMessage(contactValue, errorContact, 'Недопустимые символы!');
			return false;
		}
	}

	return true;
};
