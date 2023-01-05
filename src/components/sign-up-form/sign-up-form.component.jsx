import { useState } from 'react';
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import "../sign-up-form/sign-up-form.styles.scss";
import Button from "../button/button.component"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmpassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmpassword} = formFields;

    const resetFormFields = () => {
        setFormFields({...defaultFormFields})
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if ( password !== confirmpassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailandPassword(email, password);
            // console.log(response);
            await createUserDocumentFromAuth(user, {displayName})
            
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert("email already in use")
            }
            console.log("error createuseremailpassword", e);
        }
        resetFormFields()
    }

    console.log(formFields)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value })
    } 

    return <div className="sign-up-container">
        <h2>Don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form name="myForm" id="myForm" onSubmit={handleSubmit}>
            <FormInput htmlForName="displayName" label="Display Name" id="displayName" name="displayName" required type="text" onChange={handleChange} value={displayName}/>
            <FormInput htmlForName="email" label="E-mail" name="email" id="email" required type="email" onChange={handleChange} value={email}/>
            <FormInput htmlForName="password" label="password" name="Password" id="password" required type="password" onChange={handleChange} value={password}/>
            <FormInput htmlForName="confirmpassword" label="Confirm password" id="confirmpassword" required type="password" onChange={handleChange} value={confirmpassword}/>
          
        </form>
        <Button type="submit" form="myForm">Sign up</Button>
    </div>
}

export default SignUpForm;