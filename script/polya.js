const checkbox = document.querySelector('.menu__checkbox');
const header = document.querySelector('.header');

checkbox.addEventListener('click', function() {
  if (checkbox.checked) {
		header.classList.add('header_mobile-menu');
	}
	else {
		header.classList.remove('header_mobile-menu');
	}
})
