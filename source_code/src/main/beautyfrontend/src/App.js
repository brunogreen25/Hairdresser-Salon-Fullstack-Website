import React from 'react';
import './App.css';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Auth from './Components/SignInSignUp/Auth';
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import Employee from './Components/Employee/Employee';
import Client from './Components/Client/Client';
import {GoogleApiWrapper} from "google-maps-react";


/*const calendarStyle = {
    position: "relative",
    margin: "50px auto"
};

var unAvalibleHours = [8,10,12,13];    //ovo je za primjer, povlacit ce se iz baze
*/

function instantiateWindowItems() {
    window.localStorage.setItem('username', '');
    window.localStorage.setItem('password', '');
    window.localStorage.setItem('admin', false);
    window.localStorage.setItem('client', false);
    window.localStorage.setItem('employee', false);
}

function App() {
    let login= {
        username: "Bruno",
        password: "Jerkovic"
    };
    /*
    //neka se unAvalibleHours promijeni! (iz baze se povuku za drugi dan!)
    var onDayClick = (e, day, month, year) => {
        alert(day + " " + month + " " + year);
    }*/

    //za dodavanje Home komponente:
    //switch ce provjerit sadrzi li mozda nesto od navedenih stvari i ako sadrzi uc ce u tu, tek u zadnju ulazi (sa tim switchem je rjesen problem Homepage-a)



    return (
        <div>
        <Helmet>
            <title>Favorito Beauty</title>
        </Helmet>
            <Switch>
                <Route path='/auth' component={ Auth }/>
                <Route path='/admin'  component={ Admin }/>
                <Route path='/employee' component={ Employee }/>
                <Route path='/client' component={ Client }/>
                <Route path='/' component={ User }/>
            </Switch>
        </div>
    );
}

export default App;
