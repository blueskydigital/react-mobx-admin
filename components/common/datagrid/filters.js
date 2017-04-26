import React from 'react'
import _ from 'lodash'

// dropdown with available filters
class DropdownBase extends React.Component {

  static propTypes = {
    filters: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    showFilter: React.PropTypes.func.isRequired
  }

  createItems(state, filters) {
    const onShowFilter = this.props.showFilter
    return _.map(filters, (val, name) => {
      if(state.currentView.filters.has(name)) {
        return null // don't add to menu already visible filters
      } else {
        return this.renderItem(name, val.title, val.icon, () => {onShowFilter(name)})
      }
    })
  }

  render() {
    const { filters, state } = this.props
    const show = state.currentView.filters.size < Object.keys(filters).length
    return (show) ? this.renderMenu(state, filters) : null
  }
}

// controls to set filter values
class ControlsBase extends React.Component {

  static propTypes = {
    filters: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    hideFilter: React.PropTypes.func.isRequired,
    showAttrFilters: React.PropTypes.bool
  }

  buildRows(filters, state, showAttrFilters) {
    let rows = []
    for(let name in filters) {

      const showAttribFilter = showAttrFilters && _.find(state.currentView.attrs, (i) => {
        return name.indexOf(i) >= 0
      })
      const visible = state.currentView.filters.has(name)

      if (visible && showAttribFilter) {
        const value = state.currentView.filters[name]
        const filter = filters[name]
        const onHide = () => {this.props.hideFilter(name)}
        const onUpdate = (name, val) => {state.updateFilterValue(state.currentView, name, val)}
        const ctrl = this.renderControl(filter, name, state, onHide, onUpdate)
        rows.push(ctrl)
      }
    }
    return rows
  }

  render() {
    const { filters, apply, state, showAttrFilters } = this.props
    const controls = this.buildRows(filters, state, showAttrFilters)
    const show = controls.length > 0 && state.currentView.filters.size > 0
    return (show) ? this.renderControls(controls, apply) : null
  }
}

export default { DropdownBase, ControlsBase }
