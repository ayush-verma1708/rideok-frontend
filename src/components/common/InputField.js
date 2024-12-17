// Shared Input Field Component
const InputField = ({ label, type, name, value, onChange }) => (
  <div className='mb-3'>
    <label className='form-label'>{label}</label>
    <input
      type={type}
      name={name}
      className='form-control'
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default InputField;
