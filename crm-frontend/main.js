import { getClients } from './js/clientsApi.js';
import { createHeader } from './js/createHeader.js';
import { createSection } from './js/createSection.js';
import { showClients } from './js/showClients.js';
import { sorting } from './js/sorting.js';

export const  createApp = async() => {
	document.body.innerHTML = '';

	const header = createHeader();
	const clientSection = createSection();
	document.body.append(header, clientSection.section);
	const preloader = document.getElementById('loader');
	const tbody = document.querySelector('tbody');

	try {
		const data = await getClients();
		if (tbody) tbody.innerHTML = '';
		data.forEach(client => {
			if (tbody) tbody.append(showClients(client));
		});
	} catch (error) {
		console.log(error);
	} finally {
		if (preloader) preloader.remove();
		sorting();
	}
};

createApp();
