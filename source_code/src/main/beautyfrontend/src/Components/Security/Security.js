import React from 'react';
import './Security.css';

/*
Kako koristit?
-> u constructoru:
     this.accessGranted = false;
        security('imeUloge')
            .then((response)=>{
                this.accessGranted=response;
                this.forceUpdate();
            });
-> u render() metodi:
    if(!this.accessGranted) {
            return accessDenied();
        }
 */

export async function security(role) {

    let credits = {
        username: window.localStorage.getItem('username'),
        password: window.localStorage.getItem('password'),
        admin: window.localStorage.getItem('admin'),
        employee: window.localStorage.getItem('employee'),
        client: window.localStorage.getItem('client')
    };

    let accessGranted = false;

    let url = 'https://heroku-favorito-backend.herokuapp.com/rest/security';

    if (role == 'admin') {
        url = url + '/admin';
        if(!credits.admin) {
            return accessGranted;
        }
    } else if(role == 'employee') {
        url = url + '/employee';
        if(!credits.employee) {
            return accessGranted;
        }
    } else if(role == 'client') {
        url = url + '/client';
        if(!credits.client) {
            return accessGranted;
        }
    } else {
        return accessGranted;
    }

    let init = {
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credits)
    };

    await fetch(url, init)
        .then(response => {
            if(response.ok) {
                accessGranted = true;
            } else {
                accessGranted = false;
            }
        });

    return accessGranted;
}

export function accessDenied() {
    return (
      <div className='Security grid-container'>
          <div className='title-grid'>
            <h1>NEDOZVOLJEN PRISTUP</h1>
          </div>
          <div className='img-grid'>
            <img src="https://media.giphy.com/media/Bcgilnov0J67b4AH2B/giphy.gif" width="300" height="300"/>
          </div>
      </div>
    );
}