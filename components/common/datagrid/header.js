import React from 'react'
import PropTypes from 'prop-types'

class ColumnHeader extends React.Component {

  onSort (sortDir) {
    const { name } = this.props

    return () => {
      this.props.onSort(name, sortDir)
    }
  }

  render () {
    const { sort, label, onSort } = this.props
    let element = <span>{label}</span>

    if (onSort) {
      let sortIcon = null
      if (sort) {
        sortIcon = this.renderIcon(sort)
      }
      const sortDir = (sort === 'ASC') ? 'DESC' : 'ASC'

      element = <a onClick={this.onSort(sortDir)}>{label}{sortIcon}</a>
    }

    return element
  }
}

ColumnHeader.propTypes = {
  label: PropTypes.string.isRequired,
  sort: PropTypes.string,
  name: PropTypes.string,
  onSort: PropTypes.func
}

export default ColumnHeader
