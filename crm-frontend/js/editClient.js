import { saveEditedClient } from './clientsApi.js';
import { createModal } from './createModal.js';
import { deleteModal } from './deleteModal.js';
import { validationContacts, validationNames } from './validator.js';
import { warningModal } from './warningModal.js';

export const editClient = (data) => {
	const modalPopup = createModal('Изменить данные', 'Сохранить', 'Удалить клиента', data);
	let editedClient = {};
	let contacts =[];

	modalPopup.agreeBtn.addEventListener('click', (event) => {
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
				value: contactInputs[i].value,
			});
		}
		editedClient = {
			id: data.id,
			surname: formatText(modalPopup.inputSurname.input.value),
			name: formatText(modalPopup.inputName.input.value),
			lastName: formatText(modalPopup.inputLastname.input.value),
			contacts: contacts
		};

		if (
			editedClient.name === data.name &&
			editedClient.surname === data.surname &&
			editedClient.lastName === data.lastName &&
			editedClient.contacts.length === data.contacts.length
		) {
			for (let i = 0; i < editedClient.contacts.length; i++) {
				if (editedClient.contacts[i].type !== data.contacts[i].type || editedClient.contacts[i].value !== data.contacts[i].value) {
					const spinner = document.getElementById('agree-spinner');
					if (spinner) spinner.style.display = 'block';
					saveEditedClient(editedClient);
					modalPopup.shadow.classList.add('remove-animation');
					modalPopup.modal.classList.add('remove-animation');
					setTimeout(() => modalPopup.shadow.remove(), 500);
				}
			}
			const warning = warningModal('Вы не сделали изменений');
			warning.agreeBtnWarn.addEventListener('click', (event) => {
				event.preventDefault();
				warning.shadowWarn.classList.add('remove-animation');
				return;
			});
		} else {
			const spinner = document.getElementById('agree-spinner');
			if (spinner) spinner.style.display = 'block';
			saveEditedClient(editedClient);
			modalPopup.shadow.classList.add('remove-animation');
			modalPopup.modal.classList.add('remove-animation');
			setTimeout(() => modalPopup.shadow.remove(), 500);
		}
	});

	modalPopup.cancelBtn.addEventListener('click', (event) => {
		event.preventDefault();
		deleteModal(data);
	});
};

const formatText = (text) => {
	const cleanedText = text.replace(/\s+/g, '');
	const trimmedText = cleanedText.trim();
	const formattedText = trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1).toLowerCase();

	return formattedText;
};