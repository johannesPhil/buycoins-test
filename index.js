let img = document.getElementsByTagName("img"),
	name = document.querySelector(".bio__name"),
	userName = document.querySelector(".bio__username"),
	bio = document.querySelector(".bio__about"),
	bars = document.querySelector(".mobile-menu"),
	closeMenu = document.querySelector(".mobile-menu-c"),
	mobileMenu = document.querySelector(".mobile-links-container"),
	smProfile = document.querySelectorAll(".username"),
	linkHolder = document.querySelectorAll(".link-holder"),
	repos = document.querySelector(".profile__repositories");

/* Controls for Mobile navigation bar */

bars.addEventListener("click", () => {
	mobileMenu.style.display = "block";
	bars.style.display = "none";
	closeMenu.style.display = "block";
});

closeMenu.addEventListener("click", () => {
	mobileMenu.style.display = "none";
	bars.style.display = "block";
	closeMenu.style.display = "none";
});

/* Github Authentication. Keeps getting revoked though  */

const githubData = {
	token: "387090f7cfc221a015ceff8b8636dbb26035044b",
	username: "johannesPhil",
};

/* Color codes for repo main language */

const languageColor = [
	{ lang: "PHP", color: "#4F5D95" },
	{ lang: "HTML", color: "#E34c26" },
	{ lang: "CSS", color: "#563D7C" },
	{ lang: "JavaScript", color: "#F1E05A" },
	{ lang: "Vue", color: "#2C3E50" },
	{ lang: "TypeScript", color: "#2B7289" },
	{ lang: "TSQL", color: "#CCCCCC" },
	{ lang: "", color: "#FFFFFF" },
];

const headers = {
	// "Content-Type": "application/json",
	Authorization: "bearer " + githubData.token,
};

fetchBio(`
    query{
      user(login: "${githubData.username}") {
        bio
		name
		login
		avatarUrl
      }
    }   
`).then((data) => {
	const user = data.data.user;
	for (i = 0; i < img.length; i++) {
		img[i].src = user.avatarUrl;
	}
	name.innerText = user.name;

	for (i = 0; i < smProfile.length; i++) {
		smProfile[i].innerText = user.login;
	}

	userName.innerText = user.login;
	bio.innerText = user.bio;
});

fetchRepo(`
	query{
		user(login: "${githubData.username}") {
			repositories(last:20){
				nodes{
					name
					primaryLanguage{
					name
					}
					updatedAt
					description
				}
			}
		}
	}
`).then((data) => {
	let repositories = data.data.user.repositories.nodes;
	console.log(repositories);
	repositories.map((repository) => {
		const formattedTime = convertTime(repository.updatedAt);

		let repoDiv = document.createElement("div"),
			repoNameHeader = document.createElement("h3"),
			repoDescDiv = document.createElement("div"),
			repoDescPar = document.createElement("p"),
			repoInfoDiv = document.createElement("div"),
			repoMainLanguage = document.createElement("div"),
			repoLanguageColor = document.createElement("div"),
			label = document.createElement("span"),
			timeValue = document.createElement("span");

		// Add classes to the created elements

		repoDiv.classList.add("repo");
		repoNameHeader.classList.add("repo__header");
		repoDescDiv.classList.add("repo__desc");
		repoInfoDiv.classList.add("repo__info", "flex");
		repoLanguageColor.classList.add("repo__langColor");

		repoNameHeader.textContent = repository.name;

		repoDescPar.textContent = repository.description
			? repository.description
			: "";

		let foundLang = languageColor.find((lang) => {
			let langValue = repository.primaryLanguage;
			if (langValue === null) {
				return;
			} else {
				return lang.lang === langValue.name;
			}
		});

		repoMainLanguage.textContent = repository.primaryLanguage
			? repository.primaryLanguage.name
			: "";

		repoLanguageColor.style.backgroundColor =
			foundLang === undefined ? "#FFF" : foundLang.color;

		label.textContent = "Updated";

		timeValue.textContent = formattedTime;

		repoDescDiv.innerHTML = repoDescPar.outerHTML;

		repoInfoDiv.innerHTML +=
			repoLanguageColor.outerHTML +
			repoMainLanguage.outerHTML +
			label.outerHTML +
			timeValue.outerHTML;

		repoDiv.innerHTML +=
			repoNameHeader.outerHTML + repoDescDiv.outerHTML + repoInfoDiv.outerHTML;

		repos.appendChild(repoDiv);
	});
});

async function fetchBio(query) {
	try {
		let result = await fetch(`https://api.github.com/graphql`, {
			method: "post",
			headers: headers,
			body: JSON.stringify({
				query: query,
			}),
		});
		return result.json();
	} catch (error) {
		console.log(error);
	}
}

async function fetchRepo(query) {
	try {
		let result = fetch(`https://api.github.com/graphql`, {
			method: "post",
			headers: headers,
			body: JSON.stringify({
				query: query,
			}),
		});
		return (await result).json();
	} catch (error) {
		console.log(error);
	}
}

function convertTime(unix) {
	let monthArray = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	//convert UNIX tiome to milliseconds
	let date = new Date(unix);

	let currentTime = new Date();

	let difference_ms = currentTime.getTime() - date.getTime();

	const difference_hr = Math.round(difference_ms / (1000 * 60 * 60));
	const difference_day = Math.round(difference_ms / (1000 * 60 * 60 * 24));

	if (difference_hr < 24) {
		console.log(difference_hr + " hours ago");
		return difference_hr + " hours ago";
	} else if (difference_hr < 48) {
		console.log("yesterday");
		return "yesterday";
	} else if (difference_day <= 30) {
		console.log(difference_day + " days ago");
		return difference_day + " days ago";
	} else {
		let year = date.getFullYear();
		// Month
		let month = monthArray[date.getMonth()];
		// Day
		let day = date.getDate();

		let full =
			year === 2020 ? month + " " + day : month + " " + day + " " + year;
		console.log(full);
		return full;
	}
}

window.addEventListener("scroll", () => {
	let navBar = document.querySelectorAll(".stick");
	navBar.forEach((nav) => {
		let navTop = nav.offsetTop;
		console.log(navTop);
		if (window.pageYOffset > navTop) {
			nav.classList.add("sticky-nav");
		} else {
			nav.classList.remove("sticky-nav");
		}
	});

	let miniProfile = document.querySelector(".navProfile");

	bioImg = document.querySelector(".bio__name");

	if (window.pageYOffset > bioImg.offsetTop) {
		miniProfile.style.display = "flex";
		miniProfile.style.alignItems = "center";
	} else {
		miniProfile.style.display = "none";
	}
});

// let navTop = navBar.offsetTop;
// if (window.pageYOffset > navTop) {
// 	navBar.classList.add("sticky-nav");
// } else {
// 	navBar.classList.remove("stick-nav");
// }
