import { rotates } from './utils.js';

let prevType = 'id';
let directions =[];

export const sorting = () => {
	const table = document.querySelector('table');
	if (!table) return;
	const headers = table.querySelectorAll('th');
	const tbody = table.querySelector('tbody');

	directions = Array.from(headers).map(() => 'sortUp');

	const transform = (type, content) => {
		switch (type) {
		case 'id':
			return Number(content);
		case 'createdAt':
		case 'updatedAt':
			return content.split('-').reverse().join('.');
		case 'fullname':
		default:
			return content;
		}
	};

	const sortColumn = (index) => {
		const type = headers[index].getAttribute('data-type');
		if (prevType !== type) {
			prevType = type;
			directions = Array.from(headers).map(() => 'sortUp');
		}
		if (!tbody) return;
		const rows = tbody.querySelectorAll('tr');
		const direction = directions[index];
		const multiply = direction === 'sortUp' ? 1 : -1;
		const newRows = Array.from(rows);

		newRows.sort((row1, row2) => {
			const cell1 = row1.querySelectorAll('td')[index].textContent;
			const cell2 = row2.querySelectorAll('td')[index].textContent;

			const a = transform(type, cell1);
			const b = transform(type, cell2);

			switch (true) {
			case a > b:
				return 1 * multiply;
			case a < b:
				return -1 * multiply;
			case a === b:
				return 0;
			default:
				break;
			}
		});

		[].forEach.call(rows, row => {
			tbody?.removeChild(row);
		});

		directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';
		const rotateArrow = (directions, index) => {
			const rotate = directions[index] === 'sortUp' ? 0 : 180;
			const type = ['sort__by-id', 'sort__by-fullname', 'sort__by-create', 'sort__by-update'];
			rotates(rotate, type[index]);
		};
		rotateArrow(directions, index);

		newRows.forEach(newRow => {
			tbody?.appendChild(newRow);
		});
	};

	sortColumn(0);
	[].forEach.call(headers, (header, index) => {
		header.addEventListener('click', () => {
			sortColumn(index);
		});
	});
};
