// import from 'react';
import PropTypes from "prop-types";

import InputMask from "react-input-mask";


const InputField = ({ label, type, value, onChange, error, mask }) => {
    return (
        <div>
            <label>{label}:</label>
            {mask ? (
                <InputMask mask={mask} value={value} onChange={onChange} />
            ) : (
                <input type={type} value={value} onChange={onChange} />
            )}
            {error && <span>{error}</span>}
        </div>
    );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
  mask: PropTypes.func.isRequired,
};

export default InputField;
