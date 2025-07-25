document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
  initContentLockdown();
  initializeKeyboardProtection();
  initializeFormSubmission();
});

function initializeFormSubmission() {
  const form = document.querySelector("form");

  if (!form) {
    console.error("Form not found in DOM!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      name: form.name.value,
      brand: form.bname.value,
      phone: form.phone.value,
      email: form.email.value,
      product: form.product.value,
      service: form.service.value,
      message: form.message ? form.message.value : "" 
    };

    fetch("https://script.google.com/macros/s/AKfycbzn1ALRNer9VdAL-FcSm0lhpz7ofqtIkyCoRcUrQ-B5D4r_0jLV4aV1FdiN902MZeHhbw/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Form submitted successfully!");
        form.reset();
      })
      .catch((err) => {
        alert("Error submitting form");
        console.error(err);
      });
  });
}
