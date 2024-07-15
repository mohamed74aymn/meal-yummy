getData();

async function getData() {
	$("#Bar").addClass("d-none");
	$(".loading").removeClass("d-none");
	const apiR = await fetch(
		"https://www.themealdb.com/api/json/v1/1/search.php?s="
	);
	const api = await apiR.json();
	displayData(api.meals);
	$(".loading").addClass("d-none");
}

function displayData(data) {
	console.log(data);
	if (data === null) {
		return;
	}
	let box = ``;
	for (let i = 0; i < data.length; i++) {
		box += `
      <div class="col-md-3">
      <div onclick="mealDetails('${data[i].idMeal}')" class=" position-relative overflow-hidden img">
      
        <img class= "w-100 rounded rounded-5"  src=${data[i].strMealThumb}  alt="">
        <div class=" p-4 d-flex position-absolute  start-0 end-0  top-0 bottom-0  rounded-3 tex  align-items-center ">
          <h2 class="text-dark">${data[i].strMeal}</h2>
        </div>
      </div>
    </div>
      `;
	}
	infoMain.innerHTML = box;
	$("#Bar").removeClass("d-none");
}
async function mealDetails(id) {
	$(".img").click(() => {
		$("#main").addClass("d-none");
		$("#card").addClass("d-block");
	});
	$(".loading").removeClass("d-none");

	const apiR = await fetch(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
	);
	let response = await apiR.json();
	displayMealData(response.meals[0]);
	$(".loading").addClass("d-none");
}

function displayMealData(data) {
	let tag = data.strTags?.split(",");
	if (!tag) {
		tag = [];
	}
	let tags = ``;
	for (let i = 0; i < tag.length; i++) {
		tags += `<li class="alert alert-danger m-2 p-1">${tag[i]}</li> `;
	}

	let recipes = ``;
	for (let i = 1; i <= 20; i++) {
		if (data[`strIngredient${i}`]) {
			recipes += `<li class="alert alert-info m-2 p-1">${
				data[`strMeasure${i}`]
			} ${data[`strIngredient${i}`]}</li>`;
		}
	}

	let cartons = `
    <div class="col-md-4">
    <div class="imgs">
      <img class= "w-100  rounded-4"  src="${data.strMealThumb}" alt="">
      <p class="fw-bold gold text-center  mt-2 h2">${data.strMeal}</p>
    </div>
  </div>
  <div class="col-md-8">
    <h2>Instructions : <span class="backPage" onclick="back()">home</span> -</h2>
  <p>${data.strInstructions}</p>
    <p class="fw-bold  h3"> Area: ${data.strArea}</p>
    <p class="fw-bold h3">Category : ${data.strCategory}</p>
    <p class="fw-bold topicss h3">Recipes :- </p>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${recipes}
    </ul>
    ${
			tags
				? `    <p class="fw-bold topics h3">Tags :- </p>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${tags}
    </ul>`
				: ""
		}

    <a href=${
			data.strSource
		} class="btn btn-success me-1 fw-bold" target="_blank">Source</a>
    <a href=${
			data.strYoutube
		} class="btn btn-danger fw-bold" target="_blank">Youtube</a>

  </div>
    `;
	infoMain.innerHTML = cartons;
}

function back() {
	$("#search").addClass("d-none");
	$(".leftSide li").filter(".active").removeClass("active");
	getData();
}

async function searchByName(name) {
	infoMain.innerHTML = "";
	const apiR = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
	);
	const response = await apiR.json();
	$(".loading").removeClass("d-none");
	displayData(response.meals);
	$(".loading").addClass("d-none");
}

async function searchByChar(char) {
	infoMain.innerHTML = "";

	char = char.slice(0, 1);

	document.querySelector(".one").value = char;

	const apiR = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`
	);

	const response = await apiR.json();

	$(".loading").removeClass("d-none");
	displayData(response.meals);
	$(".loading").addClass("d-none");
}

function searchCom() {
	$("#search").removeClass("d-none");
	infoMain.innerHTML = "";
}

function categoryData() {
	infoMain.innerHTML = "";

	categoryCards();
}

async function categoryCards() {
	$(".search").addClass("d-none");
	$(".loading").removeClass("d-none");
	const api = await fetch(
		"https://www.themealdb.com/api/json/v1/1/categories.php"
	);
	const response = await api.json();
	displayCategoryData(response.categories);
	$(".loading").addClass("d-none");
}

function displayCategoryData(data) {
	let box = ``;
	for (let i = 0; i < data.length; i++) {
		box += `
      <div class="col-md-3">
        <div onclick="filterByCategory('${data[i].strCategory}')" class="img position-relative overflow-hidden">
          <img class= "w-100 rounded-4"  src=${data[i].strCategoryThumb}  alt="">
          <div class="word p-3 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center rounded-4 ">
            <h3 class="text-dark">${data[i].strCategory}</h3>
          </div>
        </div>
      </div>
    `;
	}
	infoMain.innerHTML = box;
}

async function filterByCategory(category) {
	$(".loading").removeClass("d-none");
	const apiR = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
	);
	const response = await apiR.json();
	displayData(response.meals);
	$(".loading").addClass("d-none");
}

function areaCom() {
	infoMain.innerHTML = "";
	getArea();
}

async function getArea() {
	$(".loading").removeClass("d-none");
	const api = await fetch(
		"https://www.themealdb.com/api/json/v1/1/list.php?a=list"
	);
	const response = await api.json();
	displayArea(response.meals);
	$(".loading").addClass("d-none");
}

function displayArea(data) {
	let box = ``;
	for (let i = 0; i < data.length; i++) {
		box += `
      <div class="col-md-3 text-center">
        <div onclick="filterByArea('${data[i].strArea}')" class="img position-relative overflow-hidden">
          <i class="fa-solid fa-city fa-3x text-danger"></i>
          <h3 class="text-dark">${data[i].strArea}</h3>
        </div>
      </div>
    `;
	}
	infoMain.innerHTML = box;
}

async function filterByArea(area) {
	$(".loading").removeClass("d-none");
	const apiR = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
	);
	const response = await apiR.json();
	displayData(response.meals);
	$(".loading").addClass("d-none");
}

function ingredientsCom() {
	infoMain.innerHTML = "";
	ingredientsCards();
}

async function ingredientsCards() {
	$(".loading").removeClass("d-none");
	const api = await fetch(
		"https://www.themealdb.com/api/json/v1/1/list.php?i=list"
	);
	const response = await api.json();
	displayIngredients(response.meals);
	$(".loading").addClass("d-none");
}

function displayIngredients(data) {
	let box = ``;
	for (let i = 0; i < data.length; i++) {
		box += `
      <div class="col-md-3 text-center">
        <div onclick="filterByIngredient('${data[i].strIngredient}')" class="img position-relative overflow-hidden">
          <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
          <h3 class="text-dark">${data[i].strIngredient}</h3>
        </div>
      </div>
    `;
	}
	infoMain.innerHTML = box;
}

async function filterByIngredient(ingredient) {
	$(".loading").removeClass("d-none");
	const apiR = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
	);
	const response = await apiR.json();
	displayData(response.meals);
	$(".loading").addClass("d-none");
}

function ContactCom() {
	let contacts = `
    <div class="contact vh-100 d-flex justify-content-center align-items-center ">
      <div class="container w-75  text-center">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="form-floating">
              <input type="text" class="form-control" id="nameI" placeholder="Name">
              <label for="nameI">Name</label>
            </div>
            <div class="invalid-feedback">Invalid name</div>
          </div>
          <div class="col-md-6">
            <div class="form-floating">
              <input type="email" class="form-control" id="emailInput" placeholder="Email">
              <label for="emailInput">Email</label>
            </div>
            <div class="invalid-feedback">Invalid email</div>
          </div>
          <div class="col-md-6">
            <div class="form-floating">
              <input type="tel" class="form-control" id="phoneInput" placeholder="Phone">
              <label for="phoneInput">Phone</label>
            </div>
            <div class="invalid-feedback">Invalid phone</div>
          </div>
          <div class="col-md-6">
            <div class="form-floating">
              <input type="text" class="form-control" id="ageInput" placeholder="Age">
              <label for="ageInput">Age</label>
            </div>
            <div class="invalid-feedback">Invalid age</div>
          </div>
          <div class="col-md-6">
            <div class="form-floating">
              <input type="password" class="form-control" id="passwordInput" placeholder="Password">
              <label for="passwordInput">Password</label>
            </div>
            <div class="invalid-feedback">Invalid password</div>
          </div>
          <div class="col-md-6">
            <div class="form-floating">
              <input type="password" class="form-control" id="repasswordInput" placeholder="Confirm Password">
              <label for="repasswordInput">Confirm Password</label>
            </div>
            <div class="invalid-feedback">Passwords do not match</div>
          </div>
        </div>
        <button type="submit" class="btn btn-outline-danger p-2 mt-3">Submit</button>
      </div>
    </div>
  `;
	infoMain.innerHTML = contacts;

	document.getElementById("nameI").addEventListener("input", validateName);
	document
		.getElementById("emailInput")
		.addEventListener("input", validateEmail);
	document
		.getElementById("phoneInput")
		.addEventListener("input", validatePhone);
	document.getElementById("ageInput").addEventListener("input", validateAge);
	document
		.getElementById("passwordInput")
		.addEventListener("input", validatePassword);
	document
		.getElementById("repasswordInput")
		.addEventListener("input", validateRepassword);
}
