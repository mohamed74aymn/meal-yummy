document.addEventListener("DOMContentLoaded", function () {
	createNavList();
});

const infoMain = document.querySelector(".datath");
let sideWidth = $(".leftSide").innerWidth();
$("#Bar").css({ left: -sideWidth });

$(".leftSide li").click(function () {
	$(this).addClass("active");
	$(this).siblings().removeClass("active");
});

function createNavList() {
	const listItems = [
		{ text: "Search", onClick: searchCom },
		{ text: "Categories", onClick: categoryData },
		{ text: "Area", onClick: areaCom },
		{ text: "Ingredients", onClick: ingredientsCom },
		{ text: "Contact Us", onClick: ContactCom },
	];

	const ul = document.createElement("ul");
	ul.className = "list-unstyled h5 position-relative";

	listItems.forEach((item) => {
		const li = document.createElement("li");
		li.textContent = item.text;
		li.onclick = item.onClick;
		ul.appendChild(li);
	});

	const navSidebar = document.getElementById("navSidebar");
	if (navSidebar) {
		navSidebar.appendChild(ul);
	} else {
		console.error("Parent element  error");
	}
}

$(".cont-m").click(() => {
	if ($("#Bar").css("left") == "0px") {
		$("#Bar").animate({ left: -sideWidth }, 900);
		$(".leftSide li").animate({ top: 200 }, 600);
		$(".cont-m").attr("name", "menu-outline");
	} else {
		$("#Bar").animate({ left: 0 }, 900);
		$(".leftSide li").animate({ top: 0 }, 900);
		$(".cont-m").attr("name", "close-outline");
	}
});
