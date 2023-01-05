import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailandPassword } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss";
import Button from "../button/button.component"

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields({...defaultFormFields})
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    } 

    const handleSubmit = async(event) => {
        event.preventDefault();


        try {
            const response = await signInAuthUserWithEmailandPassword(email, password);

            resetFormFields()
            
        } catch (e) {
            switch(e.code) {
                case "auth/wrong-password":
                    alert("incorrect password");
                    break;

                case "auth/user-not-found":
                    alert("user not found");
                    break;
                default:
                    console.log(e)
            }

   
            console.log("error createuseremailpassword", e);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value })
    } 

    return <div className="sign-up-container">
        <h2>Already have an account</h2>
        <span>Sign up with your email and password</span>
        <form name="myForm" id="myForm" onSubmit={handleSubmit}>
            <FormInput htmlForName="email" label="E-mail" name="email" id="email" required type="email" onChange={handleChange} value={email}/>
            <FormInput htmlForName="password" label="password" name="Password" id="password" required type="password" onChange={handleChange} value={password}/>
       </form>
       <div className="buttons-container">
        <Button type="submit" form="myForm">Sign In</Button>
        <Button buttonType="google" type="button" onClick={signInWithGoogle}>Google sign In</Button>
        </div>
    </div>
}

export default SignInForm;