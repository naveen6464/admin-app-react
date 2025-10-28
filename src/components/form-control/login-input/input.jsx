import React from 'react'
import "./input.css"
// import { CiUser } from "react-icons/ci"

function Input(props) {

    const {onChange,onKeyPress,onClick, style, name, onBlur, className, value, placeholder}  = props;

    return (
        <div>
            <div className='Login_relative'>
                <input
                    type="text"
                    className={className}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    onClick={onClick}
                    style={style}
                    name={name}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    value={value}
                />
                {/* <div className='Login_absolute'>
                    <div className='Input_icon '><CiUser /></div>
                </div> */}
            </div>

        </div>
    )
}

export default Input