import React from 'react';
import { Route } from 'react-router-dom';   //Route tag
import Navigation from '../Navigation/Navigation';  //navigacija
import '../Navigation/NavigationHandler.css';   //da navigacija bude 15% livo, a stranica 15% desno
import {Component1} from "./Pages/Component1";  //stranice koje ce se minjat
import {Component2} from "./Pages/Component2";
import {Component3} from "./Pages/Component3";
import {Component4} from "./Pages/Component4";
import {accessDenied, security} from "../Security/Security";

export default class Employee extends React.Component {
    constructor(props) {
        super(props);

        this.accessGranted = false;
        security('employee')
            .then((response)=>{
                this.accessGranted=response;
                this.forceUpdate();
            });
    }

    render() {
        if(!this.accessGranted) {
            return accessDenied();
        }

        let navBarOptions = {
            option1: ["/employee/option1", "Raspored sati"],
            option3: ["/employee/option3", "Pogledaj recenzije"]
        }

        return (
            <div className="Employee">
                <div className='Navigation'>
                    <Navigation elements={navBarOptions} role='employee'/>
                </div>
                <div className='Page'>
                    <Route className='NavComponent' path='/employee/option1' component={ Component1 }/>
                    <Route className='NavComponent' path='/employee/option2' component={ Component2 }/>
                    <Route className='NavComponent' path='/employee/option3' component={ Component3 }/>
                    <Route className='NavComponent' path='/employee/option4' component={ Component4 }/>
                </div>
            </div>
        );
    }
}