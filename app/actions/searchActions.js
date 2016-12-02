import request from 'superagent';
import { openUserDoc } from './menuActions';
import { userDoc } from './displayActions';

export function searchQuery(datePicked) {
  return (dispatch) => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    return (
      request
      .get('/api/documents/')
      .set({ 'x-access-token': token })
      .query({
        limit: 10,
        page: 1,
        published: datePicked,
      })
      .accept('json')
      .then((res) => {
        console.log(res.body);
        if (res.body.total === 0) {
          const results = [{
            id: 'error1',
            owner: '',
            title: 'Search Results',
            content: 'No document found',
          }];
          dispatch(userDoc(results));
          const resultsMenu = true;
          dispatch(openUserDoc(resultsMenu));
        } else {
          const results = res.body.docs;
          dispatch(userDoc(results));
          const resultsMenu = true;
          dispatch(openUserDoc(resultsMenu));
        }
      })
    );
  };
}
