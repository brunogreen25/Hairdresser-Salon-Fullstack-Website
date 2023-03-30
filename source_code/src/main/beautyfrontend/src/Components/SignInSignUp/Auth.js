import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import './Auth.css';
import Quotes from './Quotes'

export default function Auth() {

    return (
        <div className="Auth">
            <div className="AuthAside">
                <Quotes ratingNumber={ 6 }/>
            </div>
            <div className="AuthForm">
                <div className="PageSwitcher">
                    <NavLink exact to='/auth' activeClassName="Item_Active" className="Item">Prijava</NavLink>
                    <NavLink to='/auth/sign_up' activeClassName="Item_Active" className="Item">Registracija</NavLink>
                </div>

                <div className="FormTitle">
                    <NavLink exact to="/auth" activeClassName="Link_Active" className="Link">Prijavi se</NavLink> ili <NavLink to="/auth/sign_up" activeClassName="Link_Active" className="Link">Registriraj se</NavLink>
                </div>

                <Route path='/auth/sign_up' component={SignUpForm}/>
                <Route exact path='/auth' component={SignInForm}/>
            </div>
        </div>

    );
}