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
GET https://reqres.in/api/users/
GET https://reqres.in/api/users/${id}
GET https://reqres.in/api/i-t-e-m-s/
GET https://reqres.in/api/i-t-e-m-s/${id}
create POST https://reqres.in/api/users/
update PUT https://reqres.in/api/users/
update PATCH https://reqres.in/api/users/
delete DELETE https://reqres.in/api/users/
register POST https://reqres.in/api/register/
login POST https://reqres.in/api/login/
logout POST https://reqres.in/api/logout/

add ?delay=<seconds> to delay the answer
add ?page=<pagenum> to ge a page
 */
export async function reqres(fName) {
  const url = 'https://reqres.in/api/' + fName + '/';
  console.log('fetching ' + url);
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);
  return json;
}

export function factoryMockApi(token, endpointName) {
  const baseUrl =
    'https://6180fc328bfae60017adfd31.mockapi.io/api/v1/' + endpointName + '/';
  console.log(baseUrl);
  const getMany = baseUrl;
  async function req(method, url, body) {
    console.log('fetching ' + url);
    const res = await fetch(url, { method, body });
    const json = await res.json();
    console.log(json);
    return json;
  }
  return {
    all: async () => req('GET', baseUrl, null),
    one: async (id) => {
      return req('GET', baseUrl + '/' + id, null);
    },
    create: async (item) => {
      return req('PUT', baseUrl, item);
    },
    update: async (item) => {
      return req('POST', baseUrl, item);
    },
    del: async (item) => {
      return req('DELETE', baseUrl + '/' + id, null);
    },
  };
}
