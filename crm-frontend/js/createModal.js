import { createInput } from './createInput.js';
import { createContact } from './createContact.js';
import { svgCloseModalBtn, svgAddContactBtn, svgAddContactBtnHover, svgAgreeSpinner } from './svg.js';

export const createModal = (title, agreeBtnText, cancelBtnText, client) => {
	const shadow = document.createElement('div');
	const modal = document.createElement('div');
	const closeBtn = document.createElement('button');
	const modalTitle = document.createElement('h2');
	const modalTitleId = document.createElement('span');
	const form = document.createElement('form');
	const inputSurname = createInput('Фамилия', client.surname ? client.surname : '');
	const inputName = createInput('Имя', client.name ? client.name : '');
	const inputLastname = createInput('Отчество', client.lastName ? client.lastName : '');
	const contactsBlock = document.createElement('div');
	const addContactBtn = document.createElement('button');
	const addContactBtnSvg = document.createElement('span');
	const agreeBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');
	const agreeSpinner = document.createElement('span');

	const errorsBlock = document.createElement('div');
	const errorLetters = document.createElement('p');
	const errorSurname = document.createElement('p');
	const errorName = document.createElement('p');
	const errorRequired = document.createElement('p');

	shadow.classList.add('shadow', 'display-animation');
	modal.classList.add('modal', 'display-animation');
	closeBtn.classList.add('btn-reset', 'close__modal-btn');
	modalTitle.classList.add('modal__title');
	modalTitleId.classList.add('modal__title_id');
	form.classList.add('form');
	contactsBlock.classList.add('form__contacts');
	addContactBtn.classList.add('btn-reset', 'form__contacts_add-btn');
	addContactBtnSvg.classList.add('form__contacts_add-btn-svg');
	agreeBtn.classList.add('btn-reset', 'form__agree-btn');
	cancelBtn.classList.add('btn-reset', 'form__cancel-btn');
	agreeSpinner.classList.add('form__agree-btn-spinner');

	errorsBlock.classList.add('form__errors');
	errorLetters.id = 'error-letters';
	errorSurname.id = 'error-surname';
	errorName.id = 'error-name';
	errorRequired.id = 'error-required';
	agreeSpinner.id = 'agree-spinner';

	if (client) {
		modalTitleId.textContent = 'ID: ' + client.id.slice(-6);
	}
	modalTitle.textContent = title;
	addContactBtn.textContent = 'Добавить контакт';
	agreeBtn.textContent = agreeBtnText;
	cancelBtn.textContent = cancelBtnText;
	closeBtn.innerHTML = svgCloseModalBtn;
	addContactBtnSvg.innerHTML = svgAddContactBtn;
	agreeSpinner.innerHTML = svgAgreeSpinner;

	modalTitle.append(modalTitleId);
	addContactBtn.append(addContactBtnSvg);
	contactsBlock.append(addContactBtn);
	agreeBtn.append(agreeSpinner);
	errorsBlock.append(errorLetters, errorSurname, errorName, errorRequired);
	form.append(
		inputSurname.floatingLabel,
		inputName.floatingLabel,
		inputLastname.floatingLabel,
		contactsBlock,
		errorsBlock,
		agreeBtn,
		cancelBtn
	);
	modal.append(modalTitle, closeBtn, form);
	shadow.append(modal);
	document.body.append(shadow);
		
	if (client && client.contacts.length > 0) {
		for (let i = 0; i < client.contacts.length; i++) {
			const contactCreate = createContact();
			contactCreate.contactName.textContent = client.contacts[i].type;
			contactCreate.contactInput.value = client.contacts[i].value;

			contactCreate.contactDeleteBtn.classList.add('contact__deletebtn-active');
			contactCreate.contactInput.classList.add('contact__input-active');
			contactCreate.contactNameSvg.classList.add('contact__name_svg');

			contactCreate.contactName.append(contactCreate.contactNameSvg);
			contactsBlock.insertBefore(contactCreate.contactBlock, addContactBtn);
		}
	}

	closeBtn.addEventListener('click', (event) => {
		event.preventDefault();
		modal.classList.add('remove-animation');
		shadow.classList.add('remove-animation');
		setTimeout(() => shadow.remove(), 500);
	});

	document.addEventListener('click', (event) => {
		event.preventDefault();
		if (event.target === shadow) {
			shadow.classList.add('remove-animation');
			modal.classList.add('remove-animation');
			setTimeout(() => shadow.remove(), 500);
		}
	});

	addContactBtn.addEventListener('mouseover', () => {
		addContactBtnSvg.innerHTML = svgAddContactBtnHover;
	});

	addContactBtn.addEventListener('mouseout', () => {
		addContactBtnSvg.innerHTML = svgAddContactBtn;
	});

	const blocks = document.getElementsByClassName('contact__block');
	if (blocks.length === 10) {
		addContactBtn.classList.add('form__contacts_add-btn-nodisplay');
		addContactBtn.classList.remove('form__contacts_add-btn');
	}
	addContactBtn.addEventListener('click', (event) => {
		event.preventDefault();
		if (blocks.length < 9) {
			const contactCreate = createContact();
			contactsBlock.insertBefore(contactCreate.contactBlock, addContactBtn);
		} else if (blocks.length >= 9) {
			const contactCreate = createContact();
			contactsBlock.insertBefore(contactCreate.contactBlock, addContactBtn);
			addContactBtn.classList.add('form__contacts_add-btn-nodisplay');
			addContactBtn.classList.remove('form__contacts_add-btn');
		}
	});

	return {
		shadow,
		modal,
		modalTitle,
		form,
		inputSurname,
		inputName,
		inputLastname,
		contactsBlock,
		agreeBtn,
		cancelBtn,
	};
};
