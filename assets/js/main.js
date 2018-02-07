// Open Nav Menu
var navOpen = document.getElementById('navToggleOpen');

function openNav() {
  document.getElementById('navMenu').classList.remove('c-nav__main--close');
  
  setTimeout(function() {
    document.getElementById('navMenu').classList.add('c-nav__main--open');        
  }, 300);

}

navOpen.addEventListener('click', openNav);

// Close Nav Menu

var navClose = document.getElementById('navToggleClose');

function closeNav() {
  document.getElementById('navMenu').classList.remove('c-nav__main--open');
  
  setTimeout(function() {
    document.getElementById('navMenu').classList.add('c-nav__main--close');
  }, 300);
}

navClose.addEventListener('click', closeNav);

// Adds background to Nav when scrolled 

function addBackground() {
  
  var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop

  if (scrollTop >= 100) {
    document.getElementById('nav').classList.add('has-scrolled');
  } else {
    document.getElementById('nav').classList.remove('has-scrolled');
  }

}

window.addEventListener('scroll', addBackground);


