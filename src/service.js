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
