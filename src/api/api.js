
// Fetches data from API
async function fetchData(url, queryParams) {
  const query = queryParams ? '?'+(new URLSearchParams(queryParams)) : '';
  const response = await fetch(url+query);
  console.log('fetchData url=', url, 'query = ', query);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

// Fetches data in effect for redux toolkit listner/effect and calls dispatch
export async function effectFetchData({ listenerApi, url, params, successAction, failureAction }) {
  console.log('effectFetchData', url, params);
  try {
    const data = await fetchData(url, params);
    await listenerApi.delay(300);
    //console.log('effectFetchData OK');
    listenerApi.dispatch(successAction(data));
  } catch (error) {
    console.log('effectFetchData ERROR', error.message);
    listenerApi.dispatch(failureAction(error.message));
  };
};

// Posts data to API
async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Posts data and calls dispatch
export async function effectPostData({ listenerApi, url, data, successAction, failureAction }) {
  console.log('effectPostData', url, data);
  try {
    const response = await postData(url, data);
    await listenerApi.delay(300);
    listenerApi.dispatch(successAction(response));
  } catch (error) {
    console.log('effectPostData ERROR', error.message);
    listenerApi.dispatch(failureAction(error.message));
  };
};