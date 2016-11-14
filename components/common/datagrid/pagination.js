import React from 'react'

export default class PaginationBase extends React.Component {

  static propTypes = {
      state: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func.isRequired
  }

  onChange(page) {
    return () => { this.props.onChange(page); };
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
