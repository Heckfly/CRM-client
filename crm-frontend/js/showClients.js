import { getClientById } from './clientsApi.js';
import { deleteModal } from './deleteModal.js';
import { editClient } from './editClient.js';
import { svgClientDelete, svgClientEdit, svgDeleteSpinner, svgEditSpinner } from './svg.js';
import { clientDate, createClientContactLink } from './utils.js';

export const showClients = (client) => {
	const clientTr = document.createElement('tr');
	const clientId = document.createElement('td');
	const clientIdDiv = document.createElement('div');
	const clientFullName = document.createElement('td');
	const clientFullNameDiv = document.createElement('div');
	const clientCreatedAt = document.createElement('td');
	const createDate = clientDate(client.createdAt);
	const clientUpdatedAt = document.createElement('td');
	const updateDate = clientDate(client.updatedAt);
	const clientContacts = document.createElement('td');
	const clientContactsDiv = document.createElement('div');
	const clientContactsSpan = document.createElement('span');
	const clientActions = document.createElement('td');
	const clientActionsDiv = document.createElement('div');
	const clientEdit = document.createElement('button');
	const clientEditSvg = document.createElement('span');
	const clientDelete = document.createElement('button');
	const clientDeleteSvg = document.createElement('span');
	const editSpinner = document.createElement('span');
	const deleteSpinner = document.createElement('span');

	for (const contact of client.contacts) {
		createClientContactLink(contact.type, contact.value, clientContactsDiv);
	}
	if (clientContactsDiv.childElementCount > 5) {
		clientContactsSpan.textContent = `+${clientContactsDiv.childElementCount - 4}`;
		for (let i = 4; i < clientContactsDiv.childElementCount; i++) {
			clientContactsDiv.children[i].classList.add('client-line__contacts-hidden');
			clientContactsDiv.append(clientContactsSpan);
			clientContactsSpan.style.display = 'flex';
		}
	}

	clientTr.classList.add('client-line');
	clientIdDiv.classList.add('client-line__id', 'client-line__cell');
	clientFullNameDiv.classList.add('client-line__fullname', 'client-line__cell');
	createDate.classList.add('client-line__created', 'client-line__cell');
	updateDate.classList.add('client-line__updated', 'client-line__cell');
	clientContactsDiv.classList.add('client-line__contacts', 'client-line__cell');
	clientActionsDiv.classList.add('client-line__actions', 'client-line__cell');
	clientEdit.classList.add('client-line__edit', 'btn-reset');
	clientEditSvg.classList.add('client-line__edit-svg');
	clientDelete.classList.add('client-line__delete', 'btn-reset');
	clientDeleteSvg.classList.add('client-line__delete-svg');
	clientContactsSpan.classList.add('client-line__contacts-span');
	editSpinner.classList.add('edit-spinner');
	deleteSpinner.classList.add('delete-spinner');

	clientIdDiv.textContent = client.myId;
	clientFullNameDiv.textContent = client.fullname;
	clientEditSvg.innerHTML = svgClientEdit;
	clientDeleteSvg.innerHTML = svgClientDelete;
	editSpinner.innerHTML = svgEditSpinner;
	deleteSpinner.innerHTML = svgDeleteSpinner;

	clientId.append(clientIdDiv);
	clientFullName.append(clientFullNameDiv);
	clientCreatedAt.append(createDate);
	clientUpdatedAt.append(updateDate);
	clientContacts.append(clientContactsDiv);
	clientEdit.append(editSpinner,clientEditSvg, 'Изменить');
	clientDelete.append(deleteSpinner, clientDeleteSvg, 'Удалить');
	clientActionsDiv.append(clientEdit, clientDelete);
	clientActions.append(clientActionsDiv);
	clientTr.append(
		clientId,
		clientFullName,
		clientCreatedAt,
		clientUpdatedAt,
		clientContacts,
		clientActions
	);

	clientContactsSpan.addEventListener('click', (event) => {
		event.preventDefault();
		for (let i = 0; i < clientContactsDiv.childElementCount; i++) {
			clientContactsDiv.children[i].classList.remove('client-line__contacts-hidden');
			clientContactsDiv.append(clientContactsSpan);
			clientContactsSpan.style.display = 'none';
		}
	});

	clientContactsDiv.addEventListener('mouseleave', () => {
		for (let i = 4; i < clientContactsDiv.childElementCount; i++) {
			clientContactsDiv.children[i].classList.add('client-line__contacts-hidden');
			clientContactsDiv.append(clientContactsSpan);
			clientContactsSpan.style.display = 'flex';
		}
	});

	clientEdit.addEventListener('click', async (event) => {
		event.preventDefault();
		clientEditSvg.style.opacity = '0';
		clientEditSvg.style.visibility = 'hidden';
		editSpinner.style.display = 'block';
		const clientForEdit = await getClientById(client.id);
		editClient(clientForEdit);
		clientEditSvg.style.opacity = '1';
		clientEditSvg.style.visibility = 'visible';
		editSpinner.style.display = 'none';
	});

	clientDelete.addEventListener('click', async (event) => {
		event.preventDefault();
		clientDeleteSvg.style.opacity = '0';
		clientDeleteSvg.style.visibility = 'hidden';
		deleteSpinner.style.display = 'block';
		const clientForDelete = await getClientById(client.id);
		deleteModal(clientForDelete);
		clientDeleteSvg.style.opacity = '1';
		clientDeleteSvg.style.visibility = 'visible';
		deleteSpinner.style.display = 'none';
	});

	return clientTr;
};