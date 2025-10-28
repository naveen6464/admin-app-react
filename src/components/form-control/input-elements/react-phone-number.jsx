import React from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function PhoneNumber(props) {
  const { value, onChange, name, placeholder, disabled } = props;
  
  return (
    <div className={"react_phone_number"}>
      <PhoneInput
        // onlyCountries={['us']}
        country={"us"}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        // countryCodeEditable={false}     
      />
    </div>
  );
}

export default PhoneNumber;
