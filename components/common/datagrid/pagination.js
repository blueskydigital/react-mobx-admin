import React from 'react'
import PropTypes from 'prop-types'

export default class PaginationBase extends React.Component {

  static propTypes = {
      store: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired
  }

  onChange(store, page) {
    return () => { 
        this.props.onChange(page); 
        store && store.store && store.store.setEntityLastState &&
        store.store.setEntityLastState(store.store.cv.entityname, store.router.queryParams);
    };
  }

  range(page, perPage, total) {
    const input = [];
    const nbPages = Math.ceil(total / perPage) || 1;

    // display page links around the current page
    if (page > 2) {
        input.push('1');
    }
    if (page === 4) {
        input.push('2');
    }
    if (page > 4) {
        input.push('.');
    }
    if (page > 1) {
        input.push(page - 1);
    }
    input.push(page);
    if (page < nbPages) {
        input.push(page + 1);
    }
    if (page === (nbPages - 3)) {
        input.push(nbPages - 1);
    }
    if (page < (nbPages - 3)) {
        input.push('.');
    }
    if (page < (nbPages - 1)) {
        input.push(nbPages);
    }

    return input;
  }

}
