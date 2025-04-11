/* eslint-disable react/prop-types */
export default function ProductTypeSelector({ type, dValues }) {
  if (!dValues) dValues = {}
  return type === 'furniture' ? (
    <div className="bg-secondary p-5 m-3">
      <div className="">
        <label className="label">
          <span className="label-text">Color</span>
        </label>
        <input
          type="text"
          placeholder="color"
          className="input"
          name="color"
          defaultValue={dValues.color || null}
          required
        />
      </div>
      <div className="">
        <label className="label">
          <span className="label-text">Material</span>
        </label>
        <input
          type="text"
          placeholder="Material"
          className="input"
          name="material"
          defaultValue={dValues.material || null}
          required
        />
      </div>
      <div className="">
        <label className="label">
          <span className="label-text">Width(cm)</span>
        </label>
        <input
          type="number"
          placeholder="width"
          className="input"
          name="width"
          defaultValue={dValues.width || null}
          step=".1"
          min="0"
          required
        />
      </div>
      <div className="">
        <label className="label">
          <span className="label-text">Length(cm)</span>
        </label>
        <input
          type="number"
          placeholder="width"
          className="input"
          name="length"
          defaultValue={dValues.length || null}
          step=".1"
          min="0"
          required
        />
      </div>
    </div>
  ) : type === 'clothing' ? (
    <div className="bg-secondary p-5 m-3">
      {' '}
      <div className="">
        <label className="label">
          <span className="label-text">Color</span>
        </label>
        <input
          type="text"
          placeholder="color"
          className="input"
          name="color"
          defaultValue={dValues.color || null}
          required
        />
      </div>
      <div className="">
        <label className="label">
          <span className="label-text">Size</span>
        </label>
        <input
          type="text"
          placeholder="Size"
          className="input"
          defaultValue={dValues.size || null}
          name="size"
          required
        />
      </div>
    </div>
  ) : (
    ''
  )
}
