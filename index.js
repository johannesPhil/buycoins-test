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
	token: "a354d8dce38074390368313f68b4e7b23c3ecbe6",
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
	return fetch("httpsgu://developer.github.com/v4/explorer", {
		method: "POST",
		headers: headers,
		body: JSON.stringify({
			query: query,
		}),
	}).then((result) => result.json());
}
