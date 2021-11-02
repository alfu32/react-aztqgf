import axios from 'axios';

export async function fetchFakeList() {
  let payload = {
    token: 'BNd220_TwvnMTdgHRxyZ_w',
    data: {
      name: 'nameFirst',
      email: 'internetEmail',
      phone: 'phoneHome',
      _repeat: 300,
    },
  };

  return axios({
    method: 'post',
    url: 'https://app.fakejson.com/q',
    data: payload,
  });
}
export async function fetchList() {
  return fetch('https://mtest.free.beeceptor.com/items').then((res) =>
    res.json()
  );
}
/*
GET https://reqres.in/api/users?page=2
GET https://reqres.in/api/users/2
 */
export async function reqres(fName) {
  const url = 'https://reqres.in/api/' + fName + '/';
  console.log('fetching ' + url);
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);
  return json;
}