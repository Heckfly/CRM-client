import { svgContactDelete, svgContactType } from './svg.js';

export const createContact = () => {
	const contactBlock = document.createElement('div');
	const contactType = document.createElement('div');
	const contactName = document.createElement('button');
	const contactNameSvg = document.createElement('span');
	const contactList = document.createElement('ul');
	const contactListPhone = document.createElement('li');
	const contactListEmail = document.createElement('li');
	const contactListVk = document.createElement('li');
	const contactListFb = document.createElement('li');
	const contactListOther = document.createElement('li');
	const contactInput = document.createElement('input');
	const contactDeleteBtn = document.createElement('button');
	const contactDeleteBtnPopup = document.createElement('span');

	contactBlock.classList.add('contact__block');
	contactType.classList.add('contact__type');
	contactName.classList.add('contact__name', 'btn-reset');
	contactNameSvg.classList.add('contact__name_svg');
	contactList.classList.add('contact__list');
	contactListPhone.classList.add('contact__list_item');
	contactListEmail.classList.add('contact__list_item');
	contactListVk.classList.add('contact__list_item');
	contactListFb.classList.add('contact__list_item');
	contactListOther.classList.add('contact__list_item');
	contactInput.classList.add('contact__input');
	contactDeleteBtn.classList.add('contact__deletebtn', 'btn-reset');
	contactDeleteBtnPopup.classList.add('contact__deletebtn-popup', 'small-popup');

	contactNameSvg.innerHTML = svgContactType;
	contactDeleteBtnPopup.textContent = 'Удалить контакт';
	contactListPhone.textContent = 'Телефон';
	contactListEmail.textContent = 'Email';
	contactListVk.textContent = 'VK';
	contactListFb.textContent = 'Facebook';
	contactListOther.textContent = 'Другое';
	contactName.textContent = 'Телефон';
	contactInput.placeholder = 'Введите данные контакта';
	contactInput.type = 'text';
	contactDeleteBtn.innerHTML = svgContactDelete;

	contactDeleteBtn.append(contactDeleteBtnPopup);
	contactBlock.append(contactType, contactInput, contactDeleteBtn);
	contactName.append(contactNameSvg);
	contactType.append(contactName, contactList);
	contactList.append(
		contactListPhone,
		contactListEmail,
		contactListVk,
		contactListFb,
		contactListOther
	);

	contactName.addEventListener('click', (event) => {
		event.preventDefault();
		contactNameSvg.classList.toggle('contact__name_svg-active');
		contactList.classList.toggle('contact__list-active');
	});

	contactType.addEventListener('mouseleave', () => {
		contactNameSvg.classList.remove('contact__name_svg-active');
		contactList.classList.remove('contact__list-active');
	});

	const setType = (type) => {
		type.addEventListener('click', (event) => {
			event.preventDefault();
			contactName.textContent = type.textContent;
			contactName.append(contactNameSvg);
			contactNameSvg.classList.remove('contact__name_svg-active');
			contactList.classList.remove('contact__list-active');
		});
	};

	const typesArray = [
		contactListPhone,
		contactListEmail,
		contactListVk,
		contactListFb,
		contactListOther
	];

	for (const type of typesArray) {
		setType(type);
	}

	contactDeleteBtn.addEventListener('click', (event) => {
		event.preventDefault();
		contactBlock.remove();
		const button = document.querySelector('.form__contacts_add-btn-nodisplay');
		if (button) {
			button.classList.add('form__contacts_add-btn');
			button.classList.remove('form__contacts_add-btn-nodisplay');
		}
	});

	contactInput.addEventListener('input', () => {
		if (contactInput.value) {
			contactDeleteBtn.classList.add('contact__deletebtn-active');
			contactInput.classList.add('contact__input-active');
		} else {
			contactDeleteBtn.classList.remove('contact__deletebtn-active');
			contactInput.classList.remove('contact__input-active');
		}
	});

	return {
		contactBlock,
		contactName,
		contactNameSvg,
		contactInput,
		contactDeleteBtn
	};
};
