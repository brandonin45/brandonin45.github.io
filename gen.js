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
    document.querySelector("#about").scrollIntoView();
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
lquali.onclick = function() { quali.scrollIntoView(); if (window.innerWidth < 480) { smallNav(); }};
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

window.onload = function() { if (window.innerWidth < 480) { navbar.classList.add("sticky"); } };

// ***CHANGE PIXELS FOR BETTER RECOGNITION***
function navEffect() {
  if (window.pageYOffset >= sticky || window.innerWidth < 480) { navbar.classList.add("sticky"); } 
  else { navbar.classList.remove("sticky"); }

  if (window.pageYOffset >= homePos && window.pageYOffset < aboutPos-100) {
        console.log("home");
        labout.style.color = "white";
        lhome.onmouseout = function() { lhome.style.color = "#FF3F8E"; };
        labout.onmouseout = function() { labout.style.color = "white"; };
        lhome.style.transition = "0.3s";
        lhome.style.color = "#FF3F8E";
    }
    else if (window.pageYOffset >= aboutPos-100 && window.pageYOffset < qualiPos-100) {
        console.log("about");
        lhome.style.color = "white";
        lhome.onmouseout = function() { lhome.style.color = "white"; };
        labout.onmouseout = function() { labout.style.color = "#FF3F8E"; };
        lquali.onmouseout = function() { lquali.style.color = "white"; };
        lquali.style.color = "white";
        labout.style.transition = "0.3s";
        labout.style.color = "#FF3F8E";
        
    }   
    else if (window.pageYOffset >= qualiPos-100 && window.pageYOffset < portfolioPos-100) {
        console.log("quali");
        lportfolio.style.color = "white";
        labout.style.color = "white";
        labout.onmouseout = function() { labout.style.color = "white"; };
        lquali.onmouseout = function() { lquali.style.color = "#FF3F8E"; };
        lportfolio.onmouseout = function() { lportfolio.style.color = "white"; };

        lquali.style.transition = "0.3s";
        lquali.style.color = "#FF3F8E";
    }
    else if (window.pageYOffset >= portfolioPos-100 && window.pageYOffset < contactPos-100) {
        console.log("portfolio");
        lcontact.style.color = "white";
        lquali.style.color = "white";
        lquali.onmouseout = function() { lquali.style.color = "white"; };
        lportfolio.onmouseout = function() { lportfolio.style.color = "#FF3F8E"; };
        lcontact.onmouseout = function() { lcontact.style.color = "white"; };

        lportfolio.style.transition = "0.3s";
        lportfolio.style.color = "#FF3F8E";
    }
    else if (window.pageYOffset >= contactPos-100) {
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
    if (flex.style.height === "175px") { 
        flex.style.height = "50px";
    }
    else { 
        flex.style.height = "175px";
    }
    
}

var atitle = document.querySelector(".about-title"),
    titleline = document.querySelector("#title-line"),
    profile = document.querySelector(".profile"),
    aboutText = document.querySelector(".about-wrapper p");



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

//load about section on scroll
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


//skill bar percentage counter 
function counter(element, count, final) {
    count += 1;
    element.innerHTML = count + "%";
    if (count < final) {
        setTimeout(function() { counter(element,count,final); }, 10);
    }
}

var bar1 = document.querySelector(".barfill.s1"),
    span1 = document.querySelector(".bar.s1 span"),
    bar2 = document.querySelector(".barfill.s2"),
    span2 = document.querySelector(".bar.s2 span"),
    bar3 = document.querySelector(".barfill.s3"),
    span3 = document.querySelector(".bar.s3 span"),
    bar4 = document.querySelector(".barfill.s4"),
    span4 = document.querySelector(".bar.s4 span"),
    bar5 = document.querySelector(".barfill.s5"),
    span5 = document.querySelector(".bar.s5 span"),
    bar6 = document.querySelector(".barfill.s6"),
    span6 = document.querySelector(".bar.s6 span"),
    bar7 = document.querySelector(".barfill.s7"),
    span7 = document.querySelector(".bar.s7 span");
    qtitle = document.querySelector(".quali-title"),
    qtitleline = document.querySelector("#quali-line"),
    qimg = document.querySelector(".edu-wrapper img"),
    qtable = document.querySelector("#edu-content"),
    qskilltable = document.querySelector(".skillbar"),
    edupic = document.querySelector(".edu-wrapper img"),
    edutext = document.querySelector("#edu-content");

var skillLoad = debounce(function() {
    if (window.pageYOffset > profile.offsetTop) {
        qtitle.style.transform = "translateX(0px)";
        qtitle.style.opacity = "1";
    }
    if (window.pageYOffset > profile.offsetTop/0.85) {
        qtitleline.style.transform = "translateX(0px)";
        qtitleline.style.opacity = "1";
    }
    if (window.pageYOffset > profile.offsetTop/0.8) {
        qskilltable.style.transform = "translateX(0px)";
        qskilltable.style.opacity = "1";
        edupic.style.transform = "translateX(0px)";
        edupic.style.opacity = "1";
        edutext.style.transform = "translateX(0px)";
        edutext.style.opacity = "1";
        setTimeout(function() {
            // ***MODIFY PERCENTAGES***
            if (bar1.style.width != "90%") { counter(span1,0,90); } 
            bar1.style.width = "90%";
            if (bar2.style.width != "80%") { counter(span2,0,80); } 
            bar2.style.width = "80%";    
            if (bar3.style.width != "80%") { counter(span3,0,80); } 
            bar3.style.width = "80%";    
            if (bar4.style.width != "65%") { counter(span4,0,65); } 
            bar4.style.width = "65%";    
            if (bar5.style.width != "70%") { counter(span5,0,70); } 
            bar5.style.width = "70%";     
            if (bar6.style.width != "60%") { counter(span6,0,60); } 
            bar6.style.width = "60%";     
            if (bar7.style.width != "70%") { counter(span7,0,70); } 
            bar7.style.width = "70%";
        }, 1000);
    }
    
}, 10, 1);

window.addEventListener('scroll', skillLoad);


var ptitle = document.querySelector(".proj-title"),
    ptitleline = document.querySelector("#proj-line"),
    row1 = document.querySelector(".r-1"),
    row2 = document.querySelector(".r-2"),
    learnwrap = document.querySelector(".learn-wrap");

var projLoad = debounce(function() {
    if (window.pageYOffset > qskilltable.offsetTop) {
        ptitle.style.transform = "translateX(0px)";
        ptitle.style.opacity = "1";
        ptitleline.style.transform = "translateX(0px)";
        ptitleline.style.opacity = "1";
    }
    if (window.pageYOffset > qskilltable.offsetTop/0.9) {
        learnwrap.style.opacity = "1";
        row1.style.transform = "translateY(0px)";
        row1.style.opacity = "1";
    } 
    if (window.pageYOffset > qskilltable.offsetTop/0.8) {
        row2.style.transform = "translateY(0px)";
        row2.style.opacity = "1";
    } 
    
}, 10, 1);

window.addEventListener('scroll', projLoad);


var pimgA = document.querySelector(".a img"),
    subA = document.querySelector(".a .sub"),
    slineA = document.querySelector(".a .sline"),
    pimgB = document.querySelector(".b img"),
    subB = document.querySelector(".b .sub"),
    slineB = document.querySelector(".b .sline");
    pimgC = document.querySelector(".c img"),
    subC = document.querySelector(".c .sub"),
    slineC = document.querySelector(".c .sline");
    pimgD = document.querySelector(".d img"),
    subD = document.querySelector(".d .sub"),
    slineD = document.querySelector(".d .sline");
    pimgE = document.querySelector(".e img"),
    subE = document.querySelector(".e .sub"),
    slineE = document.querySelector(".e .sline");
    pimgF = document.querySelector(".f img"),
    subF = document.querySelector(".f .sub"),
    slineF = document.querySelector(".f .sline");

pimgA.onmouseover = function() {
    pimgA.src = "img/futureg.gif";
    subA.style.transform = "translateY(0)";
    slineA.style.transitionDelay = "0.2s"; 
    slineA.style.width = "11rem";
};

pimgA.onmouseout = function() {
    pimgA.src = "img/future2.PNG";
    subA.style.transform = "translateY(-40px)";
    slineA.style.transitionDelay = "0s"; 
    slineA.style.width = "0"; 
};

pimgB.onmouseover = function() {
    pimgB.src = "img/smartg.gif";
    pimgB.style.width = "100%";
    subB.style.transform = "translateY(0)";
    slineB.style.transitionDelay = "0.2s"; 
    slineB.style.width = "7rem";
};

pimgB.onmouseout = function() {
    pimgB.src = "img/smart.PNG";
    pimgB.style.width = "75%";
    subB.style.transform = "translateY(-40px)";
    slineB.style.transitionDelay = "0s"; 
    slineB.style.width = "0"; 
};

pimgC.onmouseover = function() {
    pimgC.src = "img/pelletgg.gif";
    subC.style.transform = "translateY(0)";
    slineC.style.transitionDelay = "0.2s"; 
    slineC.style.width = "7rem";
};

pimgC.onmouseout = function() {
    pimgC.src = "img/pellet.png";
    subC.style.transform = "translateY(-40px)";
    slineC.style.transitionDelay = "0s"; 
    slineC.style.width = "0"; 
};

pimgD.onmouseover = function() {
    subD.style.transform = "translateY(0)";
    slineD.style.transitionDelay = "0.2s"; 
    slineD.style.width = "6rem";
};

pimgD.onmouseout = function() {
    subD.style.transform = "translateY(-40px)";
    slineD.style.transitionDelay = "0s"; 
    slineD.style.width = "0"; 
};

pimgE.onmouseover = function() {
    pimgE.src = "img/audiog.gif";
    subE.style.transform = "translateY(0)";
    slineE.style.transitionDelay = "0.2s"; 
    slineE.style.width = "9rem";
};

pimgE.onmouseout = function() {
    pimgE.src = "img/audio1.PNG";
    subE.style.transform = "translateY(-40px)";
    slineE.style.transitionDelay = "0s"; 
    slineE.style.width = "0"; 
};

pimgF.onmouseover = function() {
    subF.style.transform = "translateY(0)";
    slineF.style.transitionDelay = "0.2s"; 
    slineF.style.width = "8rem";
};

pimgF.onmouseout = function() {
    subF.style.transform = "translateY(-40px)";
    slineF.style.transitionDelay = "0s"; 
    slineF.style.width = "0"; 
};


var cwrapper = document.querySelector(".contact-wrapper"),
    ctitle = document.querySelector(".con-title"),
    ctitleline = document.querySelector(".con-line");


