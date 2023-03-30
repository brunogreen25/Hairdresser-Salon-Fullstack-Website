import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Navigation.css';

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';

export function signOut() {
    window.localStorage.setItem('username', null);
    window.localStorage.setItem('password', null);
    window.localStorage.setItem('admin', false);
    window.localStorage.setItem('employee', false);
    window.localStorage.setItem('client', false);
}

function cbMailClick(e) {
    let checked = e.target.checked;

    let cbBody = {
        sendMail: checked,
        employeeUsername: window.localStorage.username
    }

    let init = {
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cbBody)
    };

    fetch(url + '/employee/changeMail', init)
        .then(response => response)
        .catch(err => {
            alert("Molimo pokusajte ponovno.")
        })
}

function checkForMailButton() {
    let init = {
        method: 'get',
        headers: {
            'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: null
    };

    fetch(url + '/employee/checkForMail:'+window.localStorage.username, init)
        .then(response => response.json())
        .then(check => {
            console.log("init", check);
            document.getElementById('checkboxEmail').checked = check;
        })
        .catch(err => {
            alert("Molimo pokusajte ponovno.")
        })
}

function Navigation(props) {
    let length = Object.keys(props.elements).length;
    let values = Object.values(props.elements);

    let lists = [];

    for(let i=0;i<length;i++) {
        lists.push(
            <li key={i*10}><NavLink to={values[i][0]} activeClassName="NavBar_Active" className="NavBar">{values[i][1]}</NavLink></li>
        );
    }

    let cbMail = [];
    if(props.role === 'employee') {
        checkForMailButton();
        cbMail.push(
            <li key={"2"}> <input  type="checkbox" className ="Chec" id={'checkboxEmail'} onClick={(e) => {cbMailClick(e)}}/> <label className="ne" htmlFor={'checkboxEmail'}>E-mail obavijesti o novim rezervacijama</label> </li>
        );

    }

    let bottomButton = [];
    if(props.role !== 'user') {
        bottomButton.push(
            <li key={"3"}><Link to='/auth' className="NavBar" id="sign_out" onClick={() => signOut() }>Odjava</Link></li>
        );
    }

    return (
        <nav>
            <ul className='Navigation'>
                {cbMail}
                {lists}
                {bottomButton}
            </ul>
        </nav>
    );
}

export default Navigation;