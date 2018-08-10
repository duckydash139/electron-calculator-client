import React from 'react'

export default function CloudDrive ({ checked, changeValue }) {
  const handleChange = (e) => changeValue(e.target)

  return (
    <div className='is-pulled-right'>
      <label>
        <input name='drive' type='checkbox' checked={checked} onChange={handleChange} />
                &nbsp;Cloud Drive
      </label>
    </div>
  )
}
