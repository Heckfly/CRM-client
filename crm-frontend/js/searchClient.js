import { getClients } from './clientsApi.js';
import { showClients } from './showClients.js';

export const searchClient = async (value) => {
	const clients = await getClients();
	const tbody = document.querySelector('tbody');

	const filteredClients = clients.filter(client => {
		return client.fullname.toLowerCase().includes(value.toLowerCase());
	});

	if (tbody) tbody.innerHTML = '';

	filteredClients.forEach(client => {
		document.querySelector('.table__tbody')?.append(showClients(client));
	});
};