export default function searchReducer(state={}, action) {
  switch (action.type) {
    case 'RESULTS':
      return Object.assign({}, state, { results: action.results });

    default:
      return state;
  }
}
