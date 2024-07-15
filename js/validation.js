// Regex
const regxValid = {
	name: /^[a-zA-Z '-]+$/,
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	phone: /^\+?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/,
	age: /^(1[89]|[2-9]\d|1[01]\d|120)$/,
	password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{10,}$/,
};

// Validate
function validateName() {
	const nameI = document.getElementById("nameI");
	const nameFeedback = nameI.nextElementSibling;

	if (regxValid.name.test(nameI.value)) {
		nameI.classList.remove("invalid");
		nameFeedback.classList.add("d-none");
	} else {
		nameI.classList.add("invalid");
		nameFeedback.classList.remove("d-none");
	}
}

function validateEmail() {
	const emailInput = document.getElementById("emailInput");
	const emailFeedback = emailInput.nextElementSibling;

	if (regxValid.email.test(emailInput.value)) {
		emailInput.classList.remove("invalid");
		emailFeedback.classList.add("d-none");
	} else {
		emailInput.classList.add("invalid");
		emailFeedback.classList.remove("d-none");
	}
}

function validatePhone() {
	const phoneInput = document.getElementById("phoneInput");
	const phoneFeedback = phoneInput.nextElementSibling;

	if (regxValid.phone.test(phoneInput.value)) {
		phoneInput.classList.remove("invalid");
		phoneFeedback.classList.add("d-none");
	} else {
		phoneInput.classList.add("invalid");
		phoneFeedback.classList.remove("d-none");
	}
}

function validateAge() {
	const ageInput = document.getElementById("ageInput");
	const ageFeedback = ageInput.nextElementSibling;

	if (regxValid.age.test(ageInput.value)) {
		ageInput.classList.remove("invalid");
		ageFeedback.classList.add("d-none");
	} else {
		ageInput.classList.add("invalid");
		ageFeedback.classList.remove("d-none");
	}
}

function validatePassword() {
	const passwordInput = document.getElementById("passwordInput");
	const passwordFeedback = passwordInput.nextElementSibling;

	if (regxValid.password.test(passwordInput.value)) {
		passwordInput.classList.remove("invalid");
		passwordFeedback.classList.add("d-none");
	} else {
		passwordInput.classList.add("invalid");
		passwordFeedback.classList.remove("d-none");
	}
}

function validateRepassword() {
	const repasswordInput = document.getElementById("repasswordInput");
	const repasswordFeedback = repasswordInput.nextElementSibling;
	const passwordInput = document.getElementById("passwordInput");

	if (
		repasswordInput.value === passwordInput.value &&
		regxValid.password.test(repasswordInput.value)
	) {
		repasswordInput.classList.remove("invalid");
		repasswordFeedback.classList.add("d-none");
	} else {
		repasswordInput.classList.add("invalid");
		repasswordFeedback.classList.remove("d-none");
	}
}
