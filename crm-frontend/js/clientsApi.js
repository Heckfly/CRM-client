import { createApp } from '../main.js';

export const saveNewClient = async (client) => {
	try {
		const response = await fetch('http://localhost:3000/api/clients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(client)
		});

		if (response.ok) {
			await response.json();
			createApp();
		} else {
			throw new Error('Произошла ошибка при создании клиента.');
		}
	} catch (error) {
		console.error('Ошибка при отправке запроса на сервер:', error);
	}
};


export const getClients = async () => {
	let clients;
	try {
		const response = await fetch('http://localhost:3000/api/clients');
		const data = await response.json();
		clients = data.map(client => ({
			...client,
			myId: client.id.slice(-6),
			fullname: `${client.surname} ${client.name} ${client.lastName}`,
		}));
	} catch (error) {
		console.error('Ошибка при загрузке данных с сервера:', error);
	}

	return clients;
};

export const deleteClient = (id) => {
	fetch(`http://localhost:3000/api/clients/${id}`, {
		method: 'DELETE'
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Произошла ошибка при удалении клиента.');
			}
		})
		.then(() => {
			createApp();
		})
		.catch((error) => {
			console.error('Ошибка при отправке запроса на сервер:', error);
		});
};

export const saveEditedClient = (client) => {
	fetch(`http://localhost:3000/api/clients/${client.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(client)
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Произошла ошибка при редактировании клиента.');
			}
		})
		.then(() => {
			createApp();
		})
		.catch((error) => {
			console.error('Ошибка при отправке запроса на сервер:', error);
		});
};

export const getClientById = async (id) => {
	const response = await fetch(`http://localhost:3000/api/clients/${id}`);
	if (!response.ok) {
		throw new Error('Произошла ошибка при получении информации о клиенте.');
	}
	const data = await response.json();
	const client = {
		...data,
		fullname: `${data.surname} ${data.name} ${data.lastName}`,
	};
	return client;
};
