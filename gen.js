//view more content animations
var d1 = document.querySelector(".scroll-div"); 
var i1 = document.querySelector("#arrow");

d1.onmouseover = function() {func1()};
d1.onmouseout = function() {func2()};
d1.onclick = function() {func3()};

function func1() {
    i1.style.transition = "0.3s";
    i1.style.transform = "rotate(90deg)";
}

function func2() {
    i1.style.transform = "rotate(0deg)";
}

function func3() {
    document.getElementById("about").scrollIntoView();
}

//sticky navbar and navbar animations
var lhome = document.getElementById("link-home"),
    labout = document.getElementById("link-about"),
    lquali = document.getElementById("link-quali"),
    lportfolio = document.getElementById("link-portfolio"),
    lcontact = document.getElementById("link-contact");


window.onscroll = function() {navEffect()};


var navbar = document.querySelector(".flex-nav");
var sticky = navbar.offsetTop;

//sections
var home = document.getElementById("home-wrapper"),
    about = document.getElementById("about"),
    quali = document.getElementById("quali"),
    portfolio = document.getElementById("portfolio"),
    contact = document.getElementById("contact"),
    navlinks = document.querySelectorAll("link-home, link-about");

//sections top y offset
var homePos = home.offsetTop,
    aboutPos = about.offsetTop,
    qualiPos = quali.offsetTop,
    portfolioPos = portfolio.offsetTop,
    contactPos = contact.offsetTop;

//navbar scroll to section
lhome.onclick = function() { home.scrollIntoView(); if (window.innerWidth < 480) { smallNav(); }};
labout.onclick = function() { about.scrollIntoView(); if (window.innerWidth < 480) { smallNav(); }};
lquali.onclick = function() { quali.scrollIntoView(); if (window.innerWidth< 480) { smallNav(); }};
lportfolio.onclick = function() { portfolio.scrollIntoView(); if (window.innerWidth < 480) { smallNav(); }};
lcontact.onclick = function() { contact.scrollIntoView(); if (window.innerWidth< 480) { smallNav(); }};

//hover and highlight animations
lhome.onmouseover = function() { lhome.style.color = "#FF3F8E"; };
lhome.onmouseout = function() { lhome.style.color = "white"; };
labout.onmouseover = function() { labout.style.color = "#FF3F8E"; };
labout.onmouseout = function() { labout.style.color = "white"; };
lquali.onmouseover = function() { lquali.style.color = "#FF3F8E"; };
lquali.onmouseout = function() { lquali.style.color = "white"; };
lportfolio.onmouseover = function() { lportfolio.style.color = "#FF3F8E"; };
lportfolio.onmouseout = function() { lportfolio.style.color = "white"; };
lcontact.onmouseover = function() { lcontact.style.color = "#FF3F8E"; };
lcontact.onmouseout = function() { lcontact.style.color = "white"; };


// **CHANGE PIXELS FOR BETTER RECOGNITION**
function navEffect() {
  if (window.pageYOffset >= sticky) { navbar.classList.add("sticky"); } 
  else { navbar.classList.remove("sticky"); }

  if (window.pageYOffset >= homePos && window.pageYOffset < aboutPos-100) {
        console.log("home");
        labout.style.color = "white";
        lhome.onmouseout = function() { lhome.style.color = "#FF3F8E"; };
        labout.onmouseout = function() { labout.style.color = "white"; };
        lhome.style.transition = "0.3s";
        lhome.style.color = "#FF3F8E";
    }
    else if (window.pageYOffset >= aboutPos-100 && window.pageYOffset < qualiPos) {
        console.log("about");
        lhome.style.color = "white";
        lhome.onmouseout = function() { lhome.style.color = "white"; };
        labout.onmouseout = function() { labout.style.color = "#FF3F8E"; };
        lquali.onmouseout = function() { lquali.style.color = "white"; };
        lquali.style.color = "white";
        labout.style.transition = "0.3s";
        labout.style.color = "#FF3F8E";
        
    }   
    else if (window.pageYOffset >= qualiPos && window.pageYOffset < portfolioPos) {
        console.log("quali");
        lportfolio.style.color = "white";
        labout.style.color = "white";
        labout.onmouseout = function() { labout.style.color = "white"; };
        lquali.onmouseout = function() { lquali.style.color = "#FF3F8E"; };
        lportfolio.onmouseout = function() { lportfolio.style.color = "white"; };

        lquali.style.transition = "0.3s";
        lquali.style.color = "#FF3F8E";
    }
    else if (window.pageYOffset >= portfolioPos && window.pageYOffset < contactPos) {
        console.log("portfolio");
        lcontact.style.color = "white";
        lquali.style.color = "white";
        lquali.onmouseout = function() { lquali.style.color = "white"; };
        lportfolio.onmouseout = function() { lportfolio.style.color = "#FF3F8E"; };
        lcontact.onmouseout = function() { lcontact.style.color = "white"; };

        lportfolio.style.transition = "0.3s";
        lportfolio.style.color = "#FF3F8E";
    }
    else if (window.pageYOffset >= contactPos) {
        console.log("contact");
        lportfolio.style.color = "white";
        lportfolio.onmouseout = function() { lportfolio.style.color = "white"; };
        lcontact.onmouseout = function() { lcontact.style.color = "#FF3F8E"; };

        lcontact.style.transition = "0.3s";
        lcontact.style.color = "#FF3F8E";
    }

    
}

// open and close mobile nav
var flex = document.querySelector(".flex-nav");
var link = document.querySelector(".link-wrap div");
function smallNav() {
    console.log("hi");
    if (flex.style.height === "170px") { 
        flex.style.height = "50px";
    }
    else { 
        flex.style.height = "170px";
    }
    
}

var atitle = document.querySelector(".about-title");
var titleline = document.querySelector("#title-line");
var profile = document.querySelector(".profile");
var aboutText = document.querySelector(".about-wrapper p");



//debouncer for optimization
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var aboutLoad = debounce(function() {
    if (window.pageYOffset > atitle.offsetTop/5) { 
        atitle.style.transform = "translateX(0px)";
        atitle.style.opacity = "1";
    }

    if (window.pageYOffset > atitle.offsetTop/2) {
        titleline.style.transform = "translateX(0px)";
        titleline.style.opacity = "1";

        profile.style.transform = "translateY(0px)";
        profile.style.opacity = "1";
        
        aboutText.style.transform = "translateX(0px)";
        aboutText.style.opacity = "1";
    }
}, 10, 1);

window.addEventListener('scroll', aboutLoad);