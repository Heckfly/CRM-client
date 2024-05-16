import { addClient } from './addClient.js';
// import { rotateArrow } from './utils.js';
import { svgAddClientBtn, svgArrow } from './svg.js';
import { preloader } from './preloader.js';

export const createSection = () => {
	const section = document.createElement('section');
	const sectionTitle = document.createElement('h1');
	const table = document.createElement('table');
	const thead = document.createElement('thead');
	const theadTr = document.createElement('tr');
	const theadThId = document.createElement('th');
	const theadThFullName = document.createElement('th');
	const theadThCreatedAt = document.createElement('th');
	const theadThUpdatedAt = document.createElement('th');
	const theadThContacts = document.createElement('th');
	const theadThActions = document.createElement('th');
	const theadSortId = document.createElement('button');
	const theadSortFullName = document.createElement('button');
	const theadSortCreatedAt = document.createElement('button');
	const theadSortUpdatedAt = document.createElement('button');
	const byId = document.createElement('span');
	const byFullName = document.createElement('span');
	const alphabetSpan = document.createElement('span');
	const byCreate = document.createElement('span');
	const byUpdate = document.createElement('span');
	const addClientBtn = document.createElement('button');
	const addClientBtnSvg = document.createElement('span');
	const tbody = document.createElement('tbody');

	theadThId.setAttribute('data-type', 'id');
	theadThFullName.setAttribute('data-type', 'fullname');
	theadThCreatedAt.setAttribute('data-type', 'createdAt');
	theadThUpdatedAt.setAttribute('data-type', 'updatedAt');
	
	section.classList.add('section', 'container');
	sectionTitle.classList.add('section__title');
	table.classList.add('table');
	thead.classList.add('table__thead');
	theadTr.classList.add('table__tr');
	theadThId.classList.add('table__th');
	theadThFullName.classList.add('table__th');
	theadThCreatedAt.classList.add('table__th');
	theadThUpdatedAt.classList.add('table__th');
	theadThContacts.classList.add('table__th');
	theadThActions.classList.add('table__th');
	theadSortId.classList.add('sort__btn', 'btn-reset', 'by-id');
	theadSortFullName.classList.add('sort__btn', 'btn-reset', 'by-fullname');
	theadSortCreatedAt.classList.add('sort__btn', 'btn-reset', 'by-create');
	theadSortUpdatedAt.classList.add('sort__btn', 'btn-reset', 'by-update');
	addClientBtn.classList.add('add__client_btn', 'btn-reset');
	byId.classList.add('sort__by-id', 'sort__by', 'by-id');
	byFullName.classList.add('sort__by-fullname', 'sort__by');
	alphabetSpan.classList.add('sort__alphabet', 'sort__by');
	byCreate.classList.add('sort__by-create', 'sort__by');
	byUpdate.classList.add('sort__by-update', 'sort__by');
	addClientBtnSvg.classList.add('add__client_btn-svg');
	tbody.classList.add('table__tbody');

	byId.id = 'sort__by-id';
	byFullName.id = 'sort__by-fullname';
	byCreate.id = 'sort__by-create';
	byUpdate.id = 'sort__by-update';
	alphabetSpan.id = 'sort__alphabet';

	sectionTitle.textContent = 'Клиенты';
	theadSortId.textContent = 'ID';
	byId.innerHTML = svgArrow;
	theadSortFullName.textContent = 'Фамилия Имя Отчество';
	byFullName.innerHTML = svgArrow;
	alphabetSpan.textContent = 'А-Я';
	theadSortCreatedAt.textContent = 'Дата и время создания';
	byCreate.innerHTML = svgArrow;
	theadSortUpdatedAt.textContent = 'Последние изменения';
	byUpdate.innerHTML = svgArrow;
	theadThContacts.textContent = 'Контакты';
	theadThActions.textContent = 'Действия';
	addClientBtnSvg.innerHTML = svgAddClientBtn;

	theadSortId.append(byId);
	theadSortFullName.append(byFullName, alphabetSpan);
	theadSortCreatedAt.append(byCreate);
	theadSortUpdatedAt.append(byUpdate);
	theadThId.append(theadSortId);
	theadThFullName.append(theadSortFullName);
	theadThCreatedAt.append(theadSortCreatedAt);
	theadThUpdatedAt.append(theadSortUpdatedAt);
	addClientBtn.append(addClientBtnSvg, 'Добавить клиента');
	theadTr.append(theadThId, theadThFullName, theadThCreatedAt, theadThUpdatedAt, theadThContacts, theadThActions);
	thead.append(theadTr);
	tbody.append(preloader());
	table.append(thead, tbody);
	section.append(sectionTitle, table, addClientBtn);

	// thead.addEventListener('click', (event) => {
	// 	event.preventDefault();
	// 	const target = event.target;
	// 	if (target instanceof HTMLElement) {
	// 		if (target.classList.contains('by-id')) {
	// 			rotateArrow(target);
	// 		} else if (target.classList.contains('by-fullname')) {
	// 			rotateArrow(target);
	// 		} else if (target.classList.contains('by-create')) {
	// 			rotateArrow(target);
	// 		} else if (target.classList.contains('by-update')) {
	// 			rotateArrow(target);
	// 		}
	// 	}
	// });

	addClientBtn.addEventListener('click', (event) => {
		event.preventDefault();
		addClient();
	});

	return {
		section,
		table,
		tbody,
	};
};
