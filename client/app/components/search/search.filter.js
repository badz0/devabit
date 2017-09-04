function searchFilter($filter) {
  'ngInject';
  return function(users, currUser, searchWord) {
    let filtered = [];
    users.forEach(user => {
      if (!currUser.following.includes(user.id) && user.id !== currUser.id) {
        filtered.push(user);
      }
    });
    
    filtered = $filter('filter')(filtered, searchWord);

    return filtered;
  }
}

export default searchFilter;
