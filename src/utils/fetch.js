const BASE_URL = "https://forkify-api.herokuapp.com/api/v2/recipes?search=";
// const KEY_RECEPY = "b51c2d32-2d0a-41eb-bdad-d5ddd3706ae7";


function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request(url, method, data) {
  const options = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json())
    .then(recipesData => recipesData.data.recipes);
}

export const client = {
  get: (url) => request(url),
}
