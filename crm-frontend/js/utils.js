import { svgPhone, svgEmail, svgFb, svgVk, svgOther } from './svg.js';

export const rotates = (rotate, type) => {
	const sortId = document.getElementById('sort__by-id');
	const sortFullName = document.getElementById('sort__by-fullname');
	const sortCreate = document.getElementById('sort__by-create');
	const sortUpdate = document.getElementById('sort__by-update');
	const alphabet = document.getElementById('sort__alphabet');

	if (sortId && sortFullName && sortCreate && sortUpdate) {
		sortId.style.transform = `rotateX(${rotate}deg)`;
		sortFullName.style.transform = `rotateX(${rotate}deg)`;
		sortCreate.style.transform = `rotateX(${rotate}deg)`;
		sortUpdate.style.transform = `rotateX(${rotate}deg)`;
	}

	if (alphabet) {
		if (type === 'sort__by-fullname' && rotate === 0) {
			alphabet.textContent = 'Я-А';
			alphabet.style.opacity = '1';
		} else if (type === 'sort__by-fullname' && rotate === 180) {
			alphabet.textContent = 'А-Я';
			alphabet.style.opacity = '1';
		} else {
			alphabet.style.opacity = '0';
		}
	}
	
	const setOpacity = (id, fullname, create, update) => {
		if (sortId && sortFullName && sortCreate && sortUpdate) {
			sortId.style.opacity = id;
			sortFullName.style.opacity = fullname;
			sortCreate.style.opacity = create;
			sortUpdate.style.opacity = update;
		}
	};

	switch (type) {
	case 'sort__by-id':
		setOpacity('1', '0', '0', '0');
		break;
	case 'sort__by-fullname':
		setOpacity('0', '1', '0', '0');
		break;
	case 'sort__by-create':
		setOpacity('0', '0', '1', '0');
		break;
	case 'sort__by-update':
		setOpacity('0', '0', '0', '1');
		break;
	default:
		break;
	}
};

export const clientDate = (dateNew) => {
	const date = new Date(dateNew);
	const dd = String(date.getDate()).padStart(2, '0');
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const yyyy = date.getFullYear();
	const hh = String(date.getHours()).padStart(2, '0');
	const min = String(date.getMinutes()).padStart(2, '0');
	const ddmmyyyy = document.createElement('span');
	const hhmm = document.createElement('span');
	const cellDateTime = document.createElement('div');

	ddmmyyyy.classList.add('ddmmyyyy');
	hhmm.classList.add('hhmm');
	ddmmyyyy.textContent = `${dd}.${mm}.${yyyy}`;
	hhmm.textContent = `${hh}:${min}`;

	ddmmyyyy.classList.add('ddmmyyyy');
	hhmm.classList.add('hhmm');

	cellDateTime.append(ddmmyyyy, hhmm);

	return cellDateTime;
};

export const createContactLink = (type, value, element, svg, item) => {
	element = document.createElement('a');
	const contactPopup = document.createElement('div');
	const contactPopupType = document.createElement('span');
	const contactPopupValue = document.createElement('a');

	element.classList.add('contact__link');
	contactPopup.classList.add('contact__popup', 'small-popup');
	contactPopupType.classList.add('contact__popup_type');
	contactPopupValue.classList.add('contact__popup_value');

	element.innerHTML = svg;
	contactPopupType.textContent = type + ': ';
	contactPopupValue.textContent = value;

	if (type === 'Email') {
		element.href = `mailto:${value.trim()}`;
	} else if (type === 'Телефон') {
		element.href = `tel:${value.trim()}`;
	} else {
		element.href = value.trim();
	}

	contactPopup.append(contactPopupType, contactPopupValue);
	element.append(contactPopup);
	item.append(element);
};

export const createClientContactLink = (type, value, item) => {
	let phone, email, fb, vk, other;
	switch (type) {
	case 'Телефон':
		createContactLink(type, value, phone, svgPhone, item);
		break;
	case 'Email':
		createContactLink(type, value, email, svgEmail, item);
		break;
	case 'Facebook':
		createContactLink(type, value, fb, svgFb, item);
		break;
	case 'VK':
		createContactLink(type, value, vk, svgVk, item);
		break;
	case 'Другое':
		createContactLink(type, value, other, svgOther, item);
		break;
	default:
		break;
	}
};