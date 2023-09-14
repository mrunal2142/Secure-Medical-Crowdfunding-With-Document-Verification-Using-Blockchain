import React from 'react'

const FormField = ({
  labelFor,
  labelTitle,
  isTextArea,
  type,
  id,
  placeHolder,
  value,
  handleChange,
  extra,
}) => {
  return (
    <React.Fragment>
      <div className="mb-3">
        <label for={labelFor} className="form-label">
          {labelTitle}
        </label>

        {isTextArea ? (
          <textarea
            required
            className="form-control"
            placeholder="Elaborate your need"
            id="floatingTextarea2"
            style={{ height: '100px' }}
          />
        ) : (
          <input
            required
            type={type}
            className="form-control flex-fill"
            id={id}
            placeholder={placeHolder}
            value={value}
            onChange={handleChange}
          />
        )}

        <div id="extra" className="form-text">
          {extra}
        </div>
      </div>
    </React.Fragment>
  )
}

export default FormField
