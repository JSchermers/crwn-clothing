import "./../form-input/form-input.styles.scss"

const FormInput = ({label, htmlForName, ...otherProps}) => {
    return   <div className="group">
            <input className="form-input" {...otherProps}/>
        {label &&  <label className={`${otherProps.value.length > 0 ?  "shrink" : null} form-input-label`} htmlFor={htmlForName}>{label}</label>}
       </div>
}

export default FormInput