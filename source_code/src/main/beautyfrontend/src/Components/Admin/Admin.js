import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import '../Navigation/NavigationHandler.css';
import {Component1} from "./Pages/Component1";
import {Component2} from "./Pages/Component2";
import {Component3} from "./Pages/Component3";
import {Component4} from "./Pages/Component4";
import {Component5} from "./Pages/Component5";
import {security, accessDenied} from "../Security/Security";

export default class Admin extends React.Component {
    constructor(props) {
        super(props);

        //napravi checkCredidentials() metodu za logiranje

        this.accessGranted = false;
        security('admin')
            .then((response)=>{
                this.accessGranted=response;
                this.forceUpdate();
            });
    }

    render(props) {
        if(!this.accessGranted) {
            return accessDenied();
        }

        let navBarOptions = {
            option1: ["/admin/option1", "Lokacije"],
            option2: ["/admin/option2", "Usluge"],
            option3: ["/admin/option3", "Zaposlenici"],
            option4: ["/admin/option4", "Popusti"],
            option5: ["/admin/option5", "Ocjene"]
        }

        /*POKUSAJ DA SE DINAMICKI NAPRAVE ROUTE TAGOVI, ALI REALNO PREGLEDNIJE JE OVAKO
        let routeTags = [];
        let routersLength = Object.keys(routers).length;
        let routersValues = Object.values(routers);
        for(let i=0;i<routersLength;i++) {
            routeTags.push(
                <Route path={routersValues[i][0]} component={routersValues[i][2]}/>
            );
        }*/



        return (
            <div className="Admin">
                <div className='Navigation'>
                    <Navigation elements={navBarOptions} role='admin'/>
                </div>
                <div className='Page'>
                    <Route className='NavComponent' path='/admin/option1' component={ Component1 }/>
                    <Route className='NavComponent' path='/admin/option2' component={ Component2 }/>
                    <Route className='NavComponent' path='/admin/option3' component={ Component3 }/>
                    <Route className='NavComponent' path='/admin/option4' component={ Component4 }/>
                    <Route className='NavComponent' path='/admin/option5' component={ Component5 }/>
                </div>
            </div>
        );
    }
}