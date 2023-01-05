import "../button/button.styles.scss"

const btnTypes = {
    google: 'google-sign-in',
    inverted: 'inverted',

}

const Button = ({children, buttonType, ...otherProps}) => {
    return <button className={`button-container {buttonTypes[buttontype]}`}>
        {children}
    </button>
}

export default Button;