import "../button/button.styles.scss"

const btnTypes = {
    google: 'google-sign-in',
    inverted: 'inverted',

}

const Button = ({children, buttonType, ...otherProps}) => {
    return <button {...otherProps} className={`button-container ${btnTypes[buttonType]}`}>
        {children}
    </button>
}

export default Button;