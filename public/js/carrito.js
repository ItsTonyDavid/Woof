var token = sessionStorage.getItem('token'); //Guardar cookies
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
