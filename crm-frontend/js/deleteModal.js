import { deleteClient } from './clientsApi.js';
import { svgCloseModalBtn } from './svg.js';

export const deleteModal = (client) => {
	const shadowDel = document.createElement('div');
	const modalDel = document.createElement('div');
	const closeBtnDel = document.createElement('button');
	const modalTitleDel = document.createElement('h2');
	const questionDel = document.createElement('p');
	const agreeBtnDel = document.createElement('button');
	const cancelBtnDel = document.createElement('button');

	shadowDel.classList.add('shadow-del', 'display-animation-del');
	modalDel.classList.add('modal-del', 'display-animation-del');
	closeBtnDel.classList.add('btn-reset', 'close__modal-btn-del');
	modalTitleDel.classList.add('modal__title-del');
	questionDel.classList.add('modal__question-del');
	agreeBtnDel.classList.add('btn-reset', 'agree-btn-del');
	cancelBtnDel.classList.add('btn-reset', 'cancel-btn-del');

	modalTitleDel.textContent = 'Удалить клиента';
	questionDel.textContent = 'Вы действительно хотите удалить данного клиента?';
	agreeBtnDel.textContent = 'Удалить';
	cancelBtnDel.textContent = 'Отмена';

	closeBtnDel.innerHTML = svgCloseModalBtn;

	modalDel.append(modalTitleDel, closeBtnDel, questionDel, agreeBtnDel, cancelBtnDel);
	shadowDel.append(modalDel);
	document.body.append(shadowDel);

	closeBtnDel.addEventListener('click', (event) => {
		event.preventDefault();
		modalDel.classList.add('remove-animation-del');
		shadowDel.classList.add('remove-animation-del');
		setTimeout(() => shadowDel.remove(), 500);
	});

	document.addEventListener('click', (event) => {
		event.preventDefault();
		if (event.target === shadowDel) {
			shadowDel.classList.add('remove-animation-del');
			modalDel.classList.add('remove-animation-del');
			setTimeout(() => shadowDel.remove(), 500);
		}
	});

	agreeBtnDel.addEventListener('click', (event) => {
		event.preventDefault();
		shadowDel.classList.add('remove-animation-del');
		modalDel.classList.add('remove-animation-del');
		setTimeout(() => shadowDel.remove(), 500);
		deleteClient(client.id);
	});

	cancelBtnDel.addEventListener('click', (event) => {
		event.preventDefault();
		shadowDel.classList.add('remove-animation-del');
		modalDel.classList.add('remove-animation-del');
		setTimeout(() => shadowDel.remove(), 500);
	});
};