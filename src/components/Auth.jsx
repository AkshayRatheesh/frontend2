import React, { useState } from 'react';
import Cookies from 'universal-cookie';

import axios from 'axios';

import signinImage from '../assets/signup.jpg';


const cookies = new Cookies();

let initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
    checkBox:true,
}

let Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        let { username, password,confirmPassword, phoneNumber, avatarURL } = form;

 
     
//validation

       if(form.fullName.length === 0 && phoneNumber.length === 0 && confirmPassword.length === 0){
           if(username.length < 4){
               alert("your username "+ username + " is short");
           }
           else{
               if(password.length < 4){
                   alert("your password is short")
               }
               else{
                   // login validation success
        
                   const URL = 'http://localhost:5000/auth';
                   // const URL = 'https://medical-pager.herokuapp.com/auth';
                   
           
                   let { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                       username, password,fullName:form.fullName, phoneNumber, avatarURL,
                   });
                   
                  fullName =fullName.toLowerCase(); //To convert Upper Case
                   if(form.checkBox!==false){
                       fullName="DR."+fullName;
                       alert("d")
                   }
                   
           
                   cookies.set('token', token);
                   cookies.set('username', username);
                   cookies.set('fullName', fullName);
                   cookies.set('userId', userId);
                  
           
                   if(isSignup) {
                       cookies.set('phoneNumber', phoneNumber);
                       cookies.set('avatarURL', avatarURL);
                       cookies.set('hashedPassword', hashedPassword);
                   }
                 

  
                   fullName =fullName.toLowerCase(); //To convert Upper Case
                   if(form.checkBox!==false){
                       fullName="DR."+fullName;
                       alert("d")
                   }


               window.location.reload();

               }
           }
       }
       else{

            if(form.fullName.length < 4){
                alert("your fullname "+form.fullName+" is invalid");
            }
            else{
                if(username.length < 4){
                    alert("your username "+username+" is invalid");  
                }
                else{
                    if(phoneNumber.length !== 10){
                        alert("your phoneNumber "+phoneNumber+" is invalid");
                    }
                    else{
                        if(password.length < 4 ){
                            alert("your password is short is invalid");
                        }
                        else{
                            if(password !== confirmPassword){
                                alert("your password and confirm password doesn't match")
                            }
                            else{
                                // signup validation passed
                                        
        const URL = 'http://localhost:5000/auth';
        // const URL = 'https://medical-pager.herokuapp.com/auth';
        

        let { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });
        
    //    fullName =fullName.toLowerCase(); //To convert Upper Case
    //     if(form.checkBox===false){
    //         fullName="DR."+fullName;
    //         alert("d")
    //     }
        

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
       

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }


  
        fullName =fullName.toLowerCase(); //To convert Upper Case
        if(form.checkBox!==false){
            fullName="DR."+fullName;
            alert("d")
        }



    window.location.reload();
    
                            }
                        }
                    }
                }
            }
       }

}
      
    
    const switchMode = () => { 
       // fullName=""
        
        setIsSignup((prevIsSignup) => !prevIsSignup); 
    }


    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="number"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                  
                     <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth
