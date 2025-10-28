import React,{useState} from 'react'
import "./input.css"
// import {TfiKey} from "react-icons/tfi"
import {BsEye, BsEyeSlash} from "react-icons/bs"

function Input1(props) {

    const [showPassword, setShowPassword] = useState(false)
    const { onChange, onKeyPress, onClick, style, name, onBlur, className, value, placeholder } = props;

    return (
        <div>
            <div className='Login_relative'>
                <input
                    type={showPassword ? "text" : "password"}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    onClick={onClick}
                    style={style}
                    name={name}
                    onBlur={onBlur}
                    value={value}
                    className={className}
                    placeholder={placeholder}
                    // endAdorment={endAdorment}

                />
                {/* <div className='Login_absolute'>
                    <div className='Input_icon '><TfiKey style={{ fontWeight: "300px !important" }} /></div>
                </div> */}

                <div className='Login_absolute_right'>{showPassword ? (
                    <BsEye
                        className="cursor-pointer"
                        size={20}
                        onClick={() => setShowPassword(false)}
                    />
                ) : (
                    <BsEyeSlash
                        className="cursor-pointer"
                        size={20}
                        onClick={() => setShowPassword(true)}
                    />
                )}</div>
            </div>

        </div>
    )
}
export default Input1