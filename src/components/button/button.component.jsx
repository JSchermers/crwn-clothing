import "../button/button.styles.scss"
import "../spinner/spinner.styles.scss"

const btnTypes = {
    google: 'google-sign-in',
    inverted: 'inverted',

}

const Button = ({children, buttonType, isLoading, ...otherProps}) => {
    return <button disabled={isLoading} {...otherProps} className={`button-container ${btnTypes[buttonType]}`}>
         { isLoading ? <div>
            <div className="spinnerContainer"></div>
        </div> : children }
            
    </button>
}

export default Button;