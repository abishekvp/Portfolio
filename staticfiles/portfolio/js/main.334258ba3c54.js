const server_url = 'http://localhost:3000';
const get_data = server_url + '/get-key-value-dict';
const get_ids = server_url + '/get-ids';
const ids = [];

// document.addEventListener("DOMContentLoaded", function() {
//     fetch(get_ids)
//         .then(response => response.json())
//         .then(data => {
//             if (data.status_code === 200) {
//                 ids.push(...data.data);
//             }
//             if (data.testimonials) {
//                 loadTestimonials(data.testimonials);
//             }
//         })
//         .then(() => {
//             return fetch(get_data)
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.status_code === 200) {
//                         data.data.forEach(item => {
//                             item.value = item.value || item.image;
//                             localStorage.setItem(item.key, JSON.stringify({
//                                 html: item.html,
//                                 value: item.value
//                             }));
//                         });
//                     } else {
//                         console.error('Failed to fetch data');
//                     }
//                 });
//         })
//         .then(() => {
//             ids.forEach(id => observeElement(id));
//         })
//         .catch(error => console.error('Error:', error));
// });

// function loadTestimonials(testimonials) {
//     testimonials.forEach(testimonial => {
//         const testimonialElement = document.createElement('div');
//         testimonialElement.classList.add('testimonial-each');
//         testimonialElement.innerHTML = `
//             <div class="testimonial-profile">
//                 <img src="data:image/${testimonial.photo.type};base64,${testimonial.photo}" alt="Author image">
//             </div>
//             <div class="testimonial-detail">
//                 <cite>
//                     <strong class="text-pretitle with-line">${testimonial.name} - </strong>
//                     <span>${testimonial.position || ''}${testimonial.company ? ', ' + testimonial.company : ''}</span>
//                 </cite>
//                 <p>${testimonial.message}</p>
//             </div>
//         `;

//         document.querySelector('.testimonials-data').appendChild(testimonialElement);
//     });
// }

// function loadExperiences(experiences) {
//     experiences.forEach(experience => {
//         const experienceElement = document.createElement('div');
//         experienceElement.classList.add('timeline__block');
//         experienceElement.innerHTML = `
//             <div class="timeline__bullet"></div>
//             <div class="timeline__header">
//                 <h4 class="timeline__title">${experience.company}</h4>
//                 <h5 class="timeline__meta">${experience.title}</h5>
//                 <p class="timeline__timeframe">${experience.start} - ${experience.end}</p>
//             </div>
//             <div class="timeline__desc">
//                 <p>${experience.description}</p>
//             </div>
//         `;

//         document.getElementById('experiences').appendChild(experienceElement);
//     });
// }

// function loadProjects(projects) {
//     console.log(projects);
//     projects.forEach(project => {
//         console.log(project);
//         `
//         <li class="folio-list__item column" data-animate-el>
//             <a class="folio-list__item-link" href="#modal-1">
//                 <div class="folio-list__item-pic">
//                     <img src="images/portfolio/minimalismo.jpg" 
//                             srcset="images/portfolio/minimalismo.jpg 1x, images/portfolio/minimalismo@2x.jpg 2x" alt="">
//                 </div>
                
//                 <div class="folio-list__item-text">
//                     <div class="folio-list__item-cat">
//                         Branding
//                     </div>
//                     <div class="folio-list__item-title">
//                         Securden.
//                     </div>
//                 </div>
//             </a>
//             <a class="folio-list__proj-link" href="#" title="project link">
//                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
//             </a>
//         </li>
//         `
//         const projectElement = `
//             <li class="folio-list__item column" data-animate-el>
//                 <a class="folio-list__item-link" href="#modal-${project.id}">
//                     <div class="folio-list__item-pic">
//                         <img src="data:image/${project.image.type};base64,${project.image}" alt="${project.title}">
//                     </div>
                    
//                     <div class="folio-list__item-text">
//                         <div class="folio-list__item-cat">
//                             Soft
//                         </div>
//                         <div class="folio-list__item-title">
//                             ${project.title}
//                         </div>
//                     </div>
//                 </a>
//                 <a class="folio-list__proj-link" href="${project.link}" title="project link">
//                     <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
//                 </a>
//             </li>
//         `;
//         const modalElement = `
//             <div id="modal-${project.id}">
//                 <div class="modal-popup">
//                     <img src="data:image/${project.image.type};base64,${project.image}" alt="${project.title}">

//                     <div class="modal-popup__desc">
//                         <h5>${project.title}</h5>
//                         <p>${project.description}</p>
//                         <ul class="modal-popup__cat">
//                             <li>${project.stacks.join('</li><li>')}</li>
//                         </ul>
//                     </div>
        
//                     <a href="${project.link}" class="modal-popup__details">Project link</a>
//                 </div>
//             </div>
//         `;

//         document.getElementById('projects-list').insertAdjacentHTML('beforeend', projectElement);
//         document.getElementById('projects-modals').insertAdjacentHTML('beforeend', modalElement);
//     });
// }

// function loadContent(id) {
//     const rawData = localStorage.getItem(id);
//     const element = document.getElementById(id);
//     document.querySelectorAll('#' + id).forEach(element => {
//         if (!element) return;
//         if (rawData && isValidJSON(rawData)) {
//             const data = JSON.parse(rawData);
//             if (data.html) {
//                 element.innerHTML = data.value;
//             } else {
//                 element.innerText = data.value;
//             }
//         }
//     });
// }

// function load_data() {
//     fetch(server_url + '/get-data', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         Object.entries(data).forEach(([key, value]) => {
//             // store properly with JSON.stringify
//             localStorage.setItem(key, JSON.stringify(value));
//         });
//     })
//     .then(() => {
//         loadProjects(JSON.parse(localStorage.getItem('projects')) || []);
//         loadExperiences(JSON.parse(localStorage.getItem('experience')) || []);
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
// }


// function observeElement(id) {
//     const el = document.getElementById(id);
//     if (!el) return;
//     const observer = new IntersectionObserver((entries, obs) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 loadContent(id);
//                 obs.disconnect();
//             }
//         });
//     });
//     observer.observe(el);
// }

// function isValidJSON(str) {
//     try {
//         JSON.parse(str);
//         return true;
//     } catch (e) {
//         return false;
//     }
// }

// document.addEventListener("DOMContentLoaded", function() {
//     function getStorageValue(key) {
//         let raw = localStorage.getItem(key);
//         if (!raw) return "";
//         try {
//             let parsed = JSON.parse(raw);
//             if (parsed && typeof parsed === "object" && "value" in parsed) {
//                 return parsed.value;
//             }
//         } catch (e) {
//         }
//         return raw;
//     }
//     document.querySelectorAll("*").forEach(el => {
//         if (el.childNodes.length) {
//             el.childNodes.forEach(node => {
//                 if (node.nodeType === Node.TEXT_NODE && node.nodeValue.includes("{{")) {
//                     node.nodeValue = node.nodeValue.replace(/\{\{(.*?)\}\}/g, (_, key) => {
//                         return getStorageValue(key.trim());
//                     });
//                 }
//             });
//         }
//         for (let attr of el.attributes) {
//             if (attr.value.includes("{{")) {
//                 el.setAttribute(attr.name, attr.value.replace(/\{\{(.*?)\}\}/g, (_, key) => {
//                     return getStorageValue(key.trim());
//                 }));
//             }
//         }
//     });
//     load_data();
// });

function submitTestimonial(){
    const name = document.getElementById('testimonial-name').value;
    const position = document.getElementById('testimonial-position').value;
    const company = document.getElementById('testimonial-company').value;
    const message = document.getElementById('testimonial-message').value;

    if (!name || !position || !message) {
        alert("Please fill in all required fields.");
        return;
    }
    const fileInput = document.getElementById('testimonial-photo');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('company', company);
    formData.append('message', message);
    if (file) {
        formData.append('photo', file);
    }

    fetch(server_url + '/submit-testimonial', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status_code === 200) {
            alert("Testimonial submitted successfully!");
            document.getElementById('testimonialModal').style.display = 'none';
        } else {
            alert("Failed to submit testimonial. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while submitting the testimonial.");
    });

    console.log("Submitting testimonial:", testimonial);
}

function openTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease-in-out';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });
}

function openTestimonialViewModal(){
    const modal = document.getElementById('viewTestimonialModal');
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease-in-out';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });
}

document.querySelector('#close-testimonial-form').addEventListener('click', function() {
    document.getElementById('testimonialModal').style.display = 'none';
});

document.querySelector('#closeViewTestimonial').addEventListener('click', function() {
    document.getElementById('viewTestimonialModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('testimonialModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

/* =================================================================== */

(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';



   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');



   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();

    })();

})(document.documentElement);


