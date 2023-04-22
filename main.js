const body = document.querySelector("body");
const contactBtn = document.getElementById("contactMe");
const dialog = document.getElementById("contactDialog");
const resetBtn = document.querySelector("[type='reset']");

// A way to check which button was click to escape dialog
// Note that button X is of type submit but has a noformvalidate attr
// Therefore returnValues is unchanged through that path
dialog.returnValue = "initialValue";

// Side-effect
const openCheck = (dialog) => {
  if (dialog.open) {
    body.classList.add("scroll-lock");
  } else {
    body.classList.remove("scroll-lock");
  }
};

// Open and lock
contactBtn.addEventListener("click", () => {
  dialog.showModal();
  openCheck(dialog);
});

// Close and unlock
resetBtn.addEventListener("click", () => {
  dialog.close();
});

// When dialog is closed
dialog.addEventListener("close", async (event) => {
  // I think it's already prevented
  // event.preventDefault();

  // Unlock
  openCheck(dialog);

  console.log(dialog.returnValue);

  if (dialog.returnValue !== "confirmBtn") return;

  const formData = new FormData(dialog.querySelector("form"));

  const payload = {
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    email: formData.get("email"),
    message: formData.get("message"),
  };
  // console.log(payload);

  // Supplementary validation
  for (const value of Object.values(payload)) {
    console.log(value);
    if (!value) {
      // window.alert("All fields are required");
      // return
      throw new Error("Empty field aren't allowed");
    }
  }

  // Request to backend
  try {
    // const result = await axios.post("http://localhost:3000/send", payload);
    // Deployed
    const result = await axios.post(
      "https://site--form-back--dqr6xggsg6hp.code.run/send",
      payload
    );
    console.log(result.data);
    window.alert("Thank you! 😉");
  } catch (error) {
    console.error(error.message);
  }
});
