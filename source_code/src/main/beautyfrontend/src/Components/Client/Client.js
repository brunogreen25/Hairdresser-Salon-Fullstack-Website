import React from 'react';
import { Route } from 'react-router-dom';   //Route tag
import Navigation from '../Navigation/Navigation';  //navigacija
import '../Navigation/NavigationHandler.css';   //da navigacija bude 15% livo, a stranica 15% desno
import {Component1} from "./Pages/Component1";  //stranice koje ce se minjat
import {Component2} from "./Pages/Component2";
import {Component3} from "./Pages/Component3";
import {Component4} from "./Pages/Component4";
import {accessDenied, security} from "../Security/Security";
import {GoogleApiWrapper} from "google-maps-react";

export class Client extends React.Component {
    constructor(props) {
        super(props);
        this.accessGranted = false;
        security('client')
            .then((response)=>{
                this.accessGranted=response;
                this.forceUpdate();
            });
    }



    render() {
        //nacin implementiranja "Component2" da bi se moga poslat atribut "this.props" (u kojem se nalazi "google" atribut koji je bitan za prikaz karte i dokaz API kljuca)
        const Option2 = () => {
            return (
            <Route className={'NavComponent'}
                   path="/client/option2" render={() =>
                <Component2 {...this.props}/>}
            />
            )
        };

        if(!this.accessGranted) {
            return accessDenied();
        }

        let navBarOptions = {
            option2: ["/client/option2", "Rezerviraj termin"],
            option1: ["/client/option1", "Moje rezervacije"],
            option3: ["/client/option3", "Unesi recenziju"],
            option4: ["/client/option4", "Obriši račun"]
        }

        return (
            <div className="Client">
                <div className='Navigation'>
                    <Navigation elements={navBarOptions} role='client'/>
                </div>
                <div className='Page'>
                    <Route className='NavComponent' path='/client/option1' component={ Component1 }/>
                    <Route className='NavComponent' path='/client/option3' component={ Component3 }/>
                    <Route className='NavComponent' path='/client/option4' component={ Component4 }/>
                    <Option2 />
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyClF7gGVQrVfWOPwULnyUOwuI4v8vicGm0"
})(Client)



