import React from 'react'

const MultivalueField = ({items, label, Item, ...rest}) => {

  return items && items.length > 0 ? (
    <div>
    {
      items.map((i, idx) => (
        <div key={idx}><Item attr={idx} record={items} {...rest} /></div>
      ))
    }
    </div>
  ) : null

}
MultivalueField.propTypes = {
  items: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
  Item: React.PropTypes.func.isRequired
}
export default MultivalueField
