//Disable Sessions

//After successful authentication, Passport will establish a persistent login session.
//This is useful for the common scenario of users accessing a web application via a browser.However,
//in some cases, session support is not necessary.For example,
//API servers typically require credentials to be supplied with each request.
//When this is the case, session support can be safely disabled by setting the session option to false.

//npm run dev

// Register on submit: else{
// const newUser = {
//   name,
//   email,
//   password,
//   password2
// };

// try {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   const body = JSON.stringify(newUser);

//   const res = await axios.post(
//     "http://localhost:5555/api/users",
//     body,
//     config
//   );
//   console.log(res.data);
// } catch (err) {
//   console.error(err);
// }
//}
