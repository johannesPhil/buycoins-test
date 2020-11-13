// https://git.heroku.com/stormy-forest-36871
// stormy-forest-36871.herokuapp.com/

const githubData = {
	token: "e081de9e17491a3fb7002f6f78b69da61b3fa3e5",
	username: "johannesPhil",
};

const headers = {
	"Content-Type": "application/json",
};

fetchBio(`
    query{
      user(login: ${githubData.username}) {
        bio
        name
      }
    }   
`).then((data) => {
	console.log(data.data);
});

fetchRepo(`
	query{
	user(login: "johannesPhil") {
		repositories(last:20){
		nodes{
			name
			primaryLanguage{
			name
			}
			updatedAt
		}
		}
	}
	}`).then((data) => {
	console.log(data.data);
});

function fetchBio(query) {
	return fetch(
		"https://cors-anywhere.herokuapp.com/https://developer.github.com/v4/explorer",
		{
			method: "POST",
			headers,
			body: JSON.stringify({
				query: query,
			}),
		}
	).then((result) => result.json());
}

function fetchRepo(query) {
	return fetch(
		"https://cors-anywhere.herokuapp.com/https://developer.github.com/v4/explorer",
		{
			method: "POST",
			headers,
			body: JSON.stringify({
				query: query,
			}),
		}
	).then((result) => result.json());
}
