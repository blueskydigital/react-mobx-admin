import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// dropdown with available filters
class DropdownBase extends React.Component {

  static propTypes = {
    filters: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    showFilter: PropTypes.func.isRequired
  }

  createItems(state, filters) {
    const onShowFilter = this.props.showFilter
    return _.map(filters, (val, name) => {
      if(state.filters.has(name) || !val.globalFilter) {
        return null // don't add to menu already visible filters
      } else {
        return this.renderItem(name, val.title, val.icon, () => {onShowFilter(name)})
      }
    })
  }

  render() {
    const { filters, state } = this.props
    const dropdownFilters = Object.values(filters).filter((value) => value.globalFilter)
    const show = dropdownFilters.length && (state.filters.size < dropdownFilters.length)
    return (show) ? this.renderMenu(state, filters) : null
  }
}

// controls to set filter values
class ControlsBase extends React.Component {

  static propTypes = {
    filters: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    hideFilter: PropTypes.func.isRequired,
    showAttrFilters: PropTypes.bool
  }

  buildRows(filters, state, showAttrFilters) {
    let rows = []
    for(let name in filters) {

      const showAttribFilter = showAttrFilters || _.find(state.attrs, (i) => {
        return name.indexOf(i) >= 0
      }) !== null
      const visible = state.filters.has(name) && filters[name].globalFilter

      if (visible && showAttribFilter) {
        const value = state.filters.get(name)
        const filter = filters[name]
        const onHide = () => {this.props.hideFilter(name)}
        const onUpdate = state.updateFilterValue.bind(state)
        const ctrl = this.renderControl(filter, name, state, onHide, onUpdate)
        rows.push(ctrl)
      }
    }
    return rows
  }

  render() {
    const { filters, apply, state, showAttrFilters } = this.props
    const controls = this.buildRows(filters, state, showAttrFilters)
    const show = controls.length > 0 && state.filters.size > 0
    return (show) ? this.renderControls(controls, apply) : null
  }
}

export default { DropdownBase, ControlsBase }
