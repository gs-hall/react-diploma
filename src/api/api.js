
// Fetch data over network
async function fetchData(url, queryParams) {
  const query = queryParams ? '?'+(new URLSearchParams(queryParams)) : '';
  const response = await fetch(url+query);
  console.log('fetchData url=', url, 'query = ', query);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

// Fetch data and call dispatch
export async function effectFetchData({ action, listenerApi, url, params, successAction, failureAction }) {
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