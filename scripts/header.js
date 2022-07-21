const checkbox = document.querySelector('.menu__checkbox');
const header = document.querySelector('.header');

checkbox.addEventListener('click', function() {
  if (checkbox.checked) {
		header.classList.add('header_mobile-menu');
    header.classList.remove('header_theme_white');
    return;
	}
	header.classList.remove('header_mobile-menu');
  header.classList.add('header_theme_white')
});
