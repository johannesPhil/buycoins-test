// query{
//   user(login: "johannesPhil") {
//     repositories(last:20){
//       nodes{
//         name
//         primaryLanguage{
//           name
//         }
//         updatedAt
//       }
//     }
//   }
// }

/* Bio */

const githubData = {
	token: "e081de9e17491a3fb7002f6f78b69da61b3fa3e5",
	username: "johannesPhil",
};

const headers = {
	"Content-Type": "application/json",
	Authentication: "bearer " + githubData.token,
};

fetchBio(`
    query{
      user(login: "johannesPhil") {
        bio
        name
      }
    }   
`).then((data) => {
	console.log(data);
});

function fetchBio(query) {
	return fetch("https://developer.github.com/v4/explorer", {
		method: "POST",
		headers,
		body: JSON.stringify({
			query: query,
		}),
	}).then((result) => result.json());
}
