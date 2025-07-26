document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
  initContentLockdown();
  initializeKeyboardProtection();
  initFAQToggle();
  // initializeFormSubmission();
});

// function initializeFormSubmission() {
//   const form = document.querySelector("form");

//   if (!form) {
//     console.error("Form not found in DOM!");
//     return;
//   }

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const formData = new URLSearchParams();
//     formData.append("name", form.name.value);
//     formData.append("brand", form.bname.value);
//     formData.append("phone", form.phone.value);
//     formData.append("email", form.email.value);
//     formData.append("product", form.product.value);
//     formData.append("service", form.service.value);
//     formData.append("message", form.message?.value || "");

//     fetch("https://script.google.com/macros/s/AKfycbxXCBRNUtAFAOa6KeTNVBMkmk6uUSZg5x7uTNB3VPNc/dev", {
//       method: "POST",
//       body: formData
//       // No headers! Let the browser set Content-Type to x-www-form-urlencoded
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         alert("Form submitted successfully!");
//         form.reset();
//       })
//       .catch((err) => {
//         alert("Error submitting form");
//         console.error(err);
//       });
//   });
// }

function initFAQToggle() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      item.classList.toggle('active');

      // Collapse other FAQ items
      questions.forEach(otherBtn => {
        if (otherBtn !== button) {
          otherBtn.parentElement.classList.remove('active');
        }
      });
    });
  });
}


