import { saveNewClient } from './clientsApi.js';
import { createModal } from './createModal.js';
import { validationContacts, validationNames } from './validator.js';

export const addClient = () => {
	const modalPopup = createModal('Новый клиент', 'Сохранить', 'Отмена', '');
	let client = {};
	let contacts =[];

	modalPopup.agreeBtn.addEventListener('click', async (event) => {
		event.preventDefault();
		if (!validationNames()) {
			return;
		}
		const contactTypes = document.querySelectorAll('.contact__name');
		const contactInputs = document.querySelectorAll('.contact__input');
		for (let i = 0; i < contactTypes.length; i++) {
			if (!validationContacts(contactTypes[i], contactInputs[i])) return;
			contacts.push({
				type: contactTypes[i].textContent?.trim().replace(/\s+/g, ''),
				value: contactInputs[i].value
			});
		}
		client = {
			surname: formatText(modalPopup.inputSurname.input.value),
			name: formatText(modalPopup.inputName.input.value),
			lastName: formatText(modalPopup.inputLastname.input.value),
			contacts: contacts
		};

		const spinner = document.getElementById('agree-spinner');
		await saveNewClient(client);
		if (spinner) spinner.style.display = 'block';
		modalPopup.shadow.classList.add('remove-animation');
		modalPopup.modal.classList.add('remove-animation');
		setTimeout(() => modalPopup.shadow.remove(), 500);
	});

	modalPopup.cancelBtn.addEventListener('click', (event) => {
		event.preventDefault();
		modalPopup.form.reset();
		const contactDelete = document.querySelectorAll('.contact__block');
		contactDelete.forEach(element => {
			element.remove();
		});
	});
};

const formatText = (text) => {
	const cleanedText = text.replace(/\s+/g, '');
	const trimmedText = cleanedText.trim();
	const formattedText = trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1).toLowerCase();
	if (formattedText.includes('-')) {
		const words = formattedText.split('-');
		const formattedWords = words.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		});
		return formattedWords.join('-');
	}

	return formattedText;
};
