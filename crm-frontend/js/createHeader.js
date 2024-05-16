import { searchClient } from './searchClient.js';
import { headerLogo } from './svg.js';

export const createHeader = () => {
	const header = document.createElement('header');
	const logo = document.createElement('div');
	const search = document.createElement('input');

	header.classList.add('header', 'container');
	logo.classList.add('header__logo');
	search.classList.add('header__search');

	logo.innerHTML = headerLogo;
	search.placeholder = 'Введите запрос';

	header.append(logo, search);

	search.addEventListener('input', () => {
		searchClient(search.value);
	});

	return header;
};
