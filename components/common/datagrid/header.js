import React from 'react'

class ColumnHeader extends React.Component {

  onSort(sortDir) {
    const { name } = this.props

    return () => {
      this.props.onSort(name, sortDir)
    }
  }

  render() {
    const { sort, label, onSort } = this.props
    let element = <span>{label}</span>

    if (onSort) {
      let sortIcon = null
      if (sort) {
          sortIcon = this.renderIcon(sort)
      }
      const sortDir = 'ASC' === sort ? 'DESC' : 'ASC'

      element = <a onClick={this.onSort(sortDir)}>{label}{sortIcon}</a>
    }

    return element
  }
}

ColumnHeader.propTypes = {
    label: React.PropTypes.string.isRequired,
    sort: React.PropTypes.string,
    name: React.PropTypes.string,
    onSort: React.PropTypes.func
}

export default ColumnHeader
