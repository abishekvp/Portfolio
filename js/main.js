(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	var ye = new Date().getFullYear()-2019;

})(jQuery);

function startFunction(){
    document.getElementById("openbotbutton").textContent = "Chat to Bot";
	document.getElementById("myScrollable").style.opacity = "0";
	document.getElementById("message_send").style.opacity = "0";
}
function input_focus(){
    document.getElementById("mesg_input").focus();
}
window["c"]
window.c=0;

document.getElementById("send_button").addEventListener("click", input_focus);

function intro(){
    setTimeout(function () { botmesg("Text 'help' to know about commands") }, 900);
}

function openchatbot(){
    if(c>2){
        alert("ada pundaa ena mairukuda open panni, open panni, close pandraaa mairandi,...");
        window.c=1;
    }
    if(c===0){
		c=c+1;
        document.getElementById("message_box").innerHTML = "";
		setTimeout(function () { reply('intro') }, 500);

    }
    if(document.getElementById("openbotbutton").textContent==="X"){
        document.getElementById("openbotbutton").textContent = "Chat to Bot";
        document.getElementById("myScrollable").style.opacity = "0";
        document.getElementById("message_send").style.opacity = "0";
        document.getElementById("openbotbutton").style.bottom = "20px";
		setTimeout(function () { document.getElementById("chat-section").style.display = "none"; }, 1000);
    }
    else if(document.getElementById("openbotbutton").textContent==="Chat to Bot"){
        document.getElementById("chat-section").style.display = "block";
        c=c+1;
        intro();
        input_focus()
        document.getElementById("openbotbutton").textContent = "X";
        document.getElementById("message_send").style.opacity = "1";
        document.getElementById("myScrollable").style.opacity = "1";
        document.getElementById("chat-bot").style.opacity = "1";
        document.getElementById("openbotbutton").style.bottom = "315px";
    }
}

function isEnter(event) {
    if (event.keyCode == 13) {
        input_focus();
        usermesg();
    }
}

function clearChat() {
    document.getElementById("message_box").innerHTML = "";
    reply('intro');
}



function botmesg(textToSend) {
    var bmesg = document.createElement("p");
    var botdiv = document.createElement("div");
    bmesg.setAttribute("class", "bot-mesg")
    botdiv.setAttribute("class", "botdiv");
    botdiv.innerHTML = textToSend;
    bmesg.appendChild(botdiv);
    document.getElementById("message_box").appendChild(bmesg);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
}

function usermesg() {
    var input = document.getElementById("mesg_input");
    var inputmesg = input.value;
    input.autofocus = true;
    if(inputmesg!=""){
        var mesg = document.createElement("p");
        var userdiv = document.createElement("div");
        userdiv.setAttribute("class", "userdiv");
        userdiv.innerText = input.value;
        mesg.appendChild(userdiv);
        document.getElementById("message_box").appendChild(mesg);
        var s = document.getElementById("chatting");
        s.scrollTop = s.scrollHeight;
        setTimeout(function () { reply(inputmesg) }, 1000);
        input.value = "";
        window.c=1;
        input_focus();
    }
}


function reply(inputmesg) {
    inputmesg = inputmesg.toLowerCase().trim();
    if(inputmesg.match("vanakam") || inputmesg.match("hi da") || inputmesg.match("vanakam da")){
        botmesg("Vanakam da mapla");
    }
    else if(inputmesg.match("intro")){
        botmesg("Greetings, I am Abi,");
        botmesg("<p id='greet_intro'>your go-to source for answering questions and dispelling doubts. Abishek is here to elevate your business acumen and offer insights into the world of tech.</p>");
    }
    else if(inputmesg.match("help")){
        botmesg("'service' to know what are services we do<br>'tech u use' to get what technologies we use");
    }
    else if(inputmesg.match("service") || inputmesg.match("services")){
        botmesg("- Dynamic Webiste<br>- Static Website<br>- Branding<br>- Business Consultancy");
    }
    else if(inputmesg.match("tech u use") || inputmesg.match("tech you use")){
        botmesg("- MERN Stack<br>- Selenium (Web Automation Tool)<br>- Web Scraping<br>- Text-to-Speech and<br>- Speech-to-text<br>- Both Linear and Document type Database");
    }
    else if(inputmesg.match("hello") || inputmesg.match("hi")){
        botmesg("Hello, text your doubt I will clarify as my knowledge Text 'help' to know about commands")
    }
    else if(inputmesg.match("okay") || inputmesg.match("ok") || inputmesg.match("thanks") || inputmesg.match("thank you") || inputmesg.match("thank u") || inputmesg.match("done")){
        botmesg("Your Welcome");
    }
    else if(inputmesg.match("what is html") || inputmesg.match("html")){
        botmesg("HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages and web applications.");
    }
    else if(inputmesg.match("what is css") || inputmesg.match("css")){
        botmesg("CSS stands for Cascading Style Sheets. It is a stylesheet language used to describe the presentation of a document written in HTML.");
    }
    else if(inputmesg.match("what is javascript") || inputmesg.match("what is js") || inputmesg.match("js")){
        botmesg("JavaScript is a high-level, interpreted programming language used for adding interactivity and dynamic behavior to websites.");
    }
    else if(inputmesg.match("difference between") && inputmesg.match("client side and server side") || inputmesg.match("client side and server side") && inputmesg.match("scripting")){
        botmesg("Client-side scripting refers to code that runs in the user's web browser, while server-side scripting runs on the web server. Client-side scripts are used for user interface interactions, while server-side scripts handle data processing and server-related tasks.");
    }
    else if(inputmesg.match("what is the document object model") || inputmesg.match("what is the dom") || inputmesg.match("dom")){
        botmesg("The DOM is a programming interface for web documents. It represents the structure of an HTML or XML document as a tree of objects, allowing developers to interact with and manipulate web page content.");
    }
    else if(inputmesg.match("what is database") || inputmesg.match("database") || inputmesg.match("what is db")){
        botmesg("A database is a structured collection of data organized for efficient storage, retrieval, and manipulation. In web development, databases are commonly used to store and manage application data.");
    }
    else if(inputmesg.match("what is domain name") || inputmesg.match("domain name")){
        botmesg("A domain name is a human-readable address used to identify a website on the internet. It typically consists of a unique name (e.g.,'example') and a top-level domain (e.g., '.com').");
    }
    else if(inputmesg.match("what is version control") || inputmesg.match("version control")){
        botmesg("Version Control is a system that tracks changes to files and directories over time, allowing multiple developers to collaborate on a project while maintaining a history of changes. Git is a popular version control system.");
    }
    else if(inputmesg.match("what is http") || inputmesg.match("http")){
        botmesg("HTTP stands for Hypertext Transfer Protocol. It is the foundation of data communication on the World Wide Web, governing how web browsers and servers exchange information.");
    }
    else if(inputmesg.match("what is url") || inputmesg.match("url")){
        botmesg("URL stands for Uniform Resource Locator. It is a web address that specifies the location of a resource on the internet. URLs consist of a protocol (e.g., http:// or https://), domain name, and optional path or parameters.");
    }
    else if(inputmesg.match("how to")){
        if(inputmesg.match("develop a website")){
            botmesg("1. Make a file structure - initally create folder Ex:'proj_name' inside the folder, create folders js, css, img and create file index.html");
            setTimeout(function () { botmesg("2. Create CSS file Ex:index.css in 'css' folder and Js file Ex:script.js in 'js' folder and save all images in 'img' folder") }, 1500);
            setTimeout(function () { botmesg("3. Write your HTML code in index.html and if you need additional html file then create and write html code") }, 1500);
            setTimeout(function () { botmesg("4. ") }, 1500);
            setTimeout(function () { botmesg("3. ") }, 1500);
            setTimeout(function () { botmesg("3. ") }, 1500);
        }
    }
    else{
        botmesg("Due to Chat-Bot under development your parse couldn't recognized");
    }
    input_focus();
}




