export const warningModal = (message) => {
	const shadowWarn = document.createElement('div');
	const modalWarn = document.createElement('div');
	const messageWarn = document.createElement('p');
	const agreeBtnWarn = document.createElement('button');

	shadowWarn.classList.add('shadow-warn', 'display-animation-warn');
	modalWarn.classList.add('modal-warn', 'display-animation-warn');
	messageWarn.classList.add('modal-warn__message');
	agreeBtnWarn.classList.add('btn-reset', 'agree-btn-warn');

	messageWarn.textContent = message;
	agreeBtnWarn.textContent = 'ОК';

	modalWarn.append(messageWarn, agreeBtnWarn);
	shadowWarn.append(modalWarn);

	document.body.append(shadowWarn);

	agreeBtnWarn.addEventListener('click', () => {
		shadowWarn.remove();
	});

	return {
		shadowWarn,
		agreeBtnWarn
	};
}