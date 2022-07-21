const checkbox = document.querySelector('.menu__checkbox');
const header = document.querySelector('.header');
const linkDropdownMenu = document.querySelector('.menu__link_open-submenu');
const menuDropdown = document.querySelector('.menu__mobile-links-section_closed');

function removeClass(elem, className) {
  elem.classList.remove(className);
  return;
}

function addClass(elem, className) {
  elem.classList.add(className);
  return;
}

checkbox.addEventListener('click', function() {
  if (checkbox.checked) {
		header.classList.add('header_mobile-menu');
    return;
	}
	header.classList.remove('header_mobile-menu');
});

window.addEventListener('resize', evt => {
  console.log(evt.target.innerWidth)
  if (evt.target.innerWidth > 767) {
    checkbox.checked = false;
    removeClass(header, 'header_mobile-menu')
  }
})

linkDropdownMenu.addEventListener('mouseover', () => {
  removeClass(menuDropdown, 'menu__mobile-links-section_closed')
})

linkDropdownMenu.addEventListener('mouseout', () => {
  addClass(menuDropdown, 'menu__mobile-links-section_closed')
})
