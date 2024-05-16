export const preloader = () => {
	const loader = document.createElement('tr');
	const loaderDoubleRing = document.createElement('div');
	const ringRotation = document.createElement('div');
	const ringRotationInner1 = document.createElement('div');

	loader.classList.add('loader');
	loaderDoubleRing.classList.add('loading-circle');
	ringRotation.classList.add('ring-rotation');
	loader.id = 'loader';

	ringRotation.append(ringRotationInner1);
	loaderDoubleRing.append(ringRotation);
	loader.append(loaderDoubleRing);

	return loader;
};