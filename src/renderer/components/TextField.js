import React from 'react'

export default function TextField ({ type = 'number', name, value, placeholder, changeValue, readOnly }) {
  const handleChange = (e) => changeValue(e.target)

  return (
    <div className="columns is-mobile">
      <div className="column is-2 has-text-centered">{name[0].toUpperCase() + name.slice(1)}&nbsp;</div>
      <div className="column"><input className="input" type={type} name={name} placeholder={placeholder} value={value} onChange={handleChange} readOnly={readOnly} /></div>
    </div>
  )
}