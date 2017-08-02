import React from 'react'
import PropTypes from 'prop-types'

const MultivalueField = ({val, Item, ...rest}) => {

  return val && val.length > 0 ? (
    <div>
    {
      val.map((i, idx) => (
        <div key={idx}><Item attr={idx} val={i} {...rest} /></div>
      ))
    }
    </div>
  ) : null

}
MultivalueField.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  Item: PropTypes.func.isRequired
}
export default MultivalueField
