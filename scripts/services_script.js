window.addEventListener('DOMContentLoaded', () => {
  initHeaderFlip();
  initContentLockdown();
  initializeKeyboardProtection();
  initCustomAccordion();
});

// function initDropDownDetails() {
//   const detailsElements = document.querySelectorAll(".expandable-bullet-list details");

//   detailsElements.forEach((details) => {
//     const summary = details.querySelector("summary");
//     const content = details.querySelector(".detail-content");

//     // Initial setup
//     if (!details.hasAttribute("open")) {
//       content.style.maxHeight = "0px";
//       content.style.opacity = "0";
//       details.classList.remove("is-open", "closing");
//     }

//     summary.addEventListener("click", (e) => {
//       e.preventDefault();
//       const isOpen = details.hasAttribute("open");

//       // Close all others
//       detailsElements.forEach((el) => {
//         if (el !== details) {
//           el.removeAttribute("open");
//           el.classList.remove("is-open", "closing");
//           const otherContent = el.querySelector(".detail-content");
//           otherContent.style.maxHeight = "0px";
//           otherContent.style.opacity = "0";
//         }
//       });

//       if (isOpen) {
//         // Step 1: Add .closing so arrow rotates
//         details.classList.add("closing");

//         // Step 2: Force layout reflow
//         void details.offsetWidth;

//         // Step 3: Animate collapse manually
//         content.style.maxHeight = content.scrollHeight + "px";
//         requestAnimationFrame(() => {
//           content.style.maxHeight = "0px";
//           content.style.opacity = "0";
//         });

//         // Step 4: Remove open *after* transition completes
//         setTimeout(() => {
//           details.classList.remove("is-open", "closing");
//           details.removeAttribute("open");
//         }, 600); // match your CSS transition
//       } else {
//         // Opening: set open and add class
//         details.setAttribute("open", "");
//         details.classList.add("is-open");

//         content.style.maxHeight = "0px";
//         content.style.opacity = "0";

//         requestAnimationFrame(() => {
//           content.style.maxHeight = content.scrollHeight + "px";
//           content.style.opacity = "1";
//         });

//         setTimeout(() => {
//           content.style.maxHeight = "none";
//         }, 600);
//       }
//     });
//   });
// }

// function initDropDownDetails() {
//   const detailsElements = document.querySelectorAll(".expandable-bullet-list details");

//   detailsElements.forEach((details) => {
//     const summary = details.querySelector("summary");
//     const content = details.querySelector(".detail-content");

//     // Initial setup
//     if (!details.hasAttribute("open")) {
//       content.style.maxHeight = "0px";
//       content.style.opacity = "0";
//       details.classList.remove("is-open", "closing");
//     }

//     summary.addEventListener("click", (e) => {
//       e.preventDefault();
//       const isOpen = details.hasAttribute("open");

//       // Close all others immediately without any animation
//       detailsElements.forEach((el) => {
//         if (el !== details) {
//           // Disable transitions temporarily
//           const otherContent = el.querySelector(".detail-content");
//           otherContent.style.transition = "none";
          
//           el.removeAttribute("open");
//           el.classList.remove("is-open", "closing");
//           otherContent.style.maxHeight = "0px";
//           otherContent.style.opacity = "0";
          
//           // Restore transitions after reset
//           setTimeout(() => {
//             otherContent.style.transition = "";
//           }, 10);
//         }
//       });

//       if (isOpen) {
//         // Animate closing of clicked dropdown
//         details.classList.add("closing");
//         content.style.maxHeight = content.scrollHeight + "px";
        
//         // Force reflow
//         void content.offsetHeight;
        
//         content.style.maxHeight = "0px";
//         content.style.opacity = "0";
        
//         setTimeout(() => {
//           details.removeAttribute("open");
//           details.classList.remove("is-open", "closing");
//         }, 300);
//       } else {
//         // Animate opening
//         details.setAttribute("open", "");
//         details.classList.add("is-open");
//         content.style.maxHeight = "0px";
//         content.style.opacity = "0";
        
//         // Force reflow
//         void content.offsetHeight;
        
//         content.style.maxHeight = content.scrollHeight + "px";
//         content.style.opacity = "1";
        
//         setTimeout(() => {
//           content.style.maxHeight = "none";
//         }, 300);
//       }
//     });
//   });
// }

// function initDropDownDetails() {
//   const detailsElements = document.querySelectorAll(".expandable-bullet-list details");

//   detailsElements.forEach((details) => {
//     const summary = details.querySelector("summary");
//     const content = details.querySelector(".detail-content");

//     // Initial setup
//     if (!details.hasAttribute("open")) {
//       content.style.maxHeight = "0px";
//       content.style.opacity = "0";
//       details.classList.remove("is-open", "closing");
//     }

//     summary.addEventListener("click", (e) => {
//       e.preventDefault();
//       const isOpen = details.hasAttribute("open");

//       // Close all others smoothly
//       detailsElements.forEach((el) => {
//         if (el !== details && el.hasAttribute("open")) {
//           const otherContent = el.querySelector(".detail-content");
//           el.classList.add("closing");
//           otherContent.style.maxHeight = otherContent.scrollHeight + "px";
          
//           // Force reflow before animating
//           void otherContent.offsetHeight;
          
//           otherContent.style.maxHeight = "0px";
//           otherContent.style.opacity = "0";
          
//           setTimeout(() => {
//             el.removeAttribute("open");
//             el.classList.remove("is-open", "closing");
//           }, 300); // Match this with CSS transition duration
//         }
//       });

//       if (isOpen) {
//         // Animate closing of clicked dropdown
//         details.classList.add("closing");
//         content.style.maxHeight = content.scrollHeight + "px";
        
//         // Force reflow
//         void content.offsetHeight;
        
//         content.style.maxHeight = "0px";
//         content.style.opacity = "0";
        
//         setTimeout(() => {
//           details.removeAttribute("open");
//           details.classList.remove("is-open", "closing");
//         }, 300);
//       } else {
//         // Animate opening
//         details.setAttribute("open", "");
//         details.classList.add("is-open");
//         content.style.maxHeight = "0px";
//         content.style.opacity = "0";
        
//         // Force reflow
//         void content.offsetHeight;
        
//         content.style.maxHeight = content.scrollHeight + "px";
//         content.style.opacity = "1";
        
//         setTimeout(() => {
//           content.style.maxHeight = "none";
//         }, 300);
//       }
//     });
//   });
// }

function initCustomAccordion() {
  const summaries = document.querySelectorAll('.accordion-summary');

  summaries.forEach(summary => {
    summary.addEventListener('click', () => {
      const item = summary.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // STEP 1: Close all other items (smoothly)
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.add('closing');
          openItem.classList.remove('open');
          setTimeout(() => {
            openItem.classList.remove('closing');
          }, 400); // match CSS transition
        }
      });

      // STEP 2: Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
      } else {
        // Delay the removal for smooth closing
        item.classList.add('closing');
        item.classList.remove('open');
        setTimeout(() => {
          item.classList.remove('closing');
        }, 400);
      }
    });
  });
}



