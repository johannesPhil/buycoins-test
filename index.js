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
	return fetch("https://developer.github.com/v4/explorer/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: query,
		}),
	}).then((result) => result.json());
}
