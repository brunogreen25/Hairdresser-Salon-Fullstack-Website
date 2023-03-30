import React from 'react';
import { signOut } from './../../Navigation/Navigation'
import './Component4.css';
const url = 'https://heroku-favorito-backend.herokuapp.com/rest';
const homeUrl = 'https://heroku-favorito-backend.herokuapp.com';

export class Component4 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            allowDeletion: null
        }
    }

    passwordCheck = () => {
        let typedPassword = document.getElementById("passwordInput").value;
        return window.localStorage.password === typedPassword;
    }

    onDeleteAccount = () => {
        if(this.passwordCheck()) {
            this.setState({
                allowDeletion: true
            });
        } else {
            this.setState({
                allowDeletion: false
            });
            return;
        }

        let init = {
            method: 'delete',
            headers: {
                'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch(url + '/client/delte/email:' + window.localStorage.username.toString(), init)
            .then(response => {
                if(response.ok) {
                    signOut();
                    this.props.history.location = homeUrl;
                    this.props.history.push('');
                }
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
            });
    }

    render() {
        let passwordCheckLabel = [];
        if(this.state.allowDeletion === true) {
            passwordCheckLabel.push(
                <label key={"1"}>LOZINKA JE ISPRAVNA</label>
            );
        } else if(this.state.allowDeletion === false) {
            passwordCheckLabel.push(
                <label key={"2"}>LOZINKA NIJE ISPRAVNA</label>
            );
        }

        return (
            <div className="ComponentFourth">
                <br/><br/><br/><br/><br/><b>Jesi li siguran/sigurna da želiš obrisati korisnički račun?</b>
                <br/><br/><br/><b>UPOZORENJE!</b> Brisanjem korisničkog računa
                gube se svi Vaši podaci, kao i prethodno ostvarene rezervacije. <br/>
                Novim stvaranjem računa nije moguće povezati stare i izgubljene podatke u svrhu
                ostvarivanja popusta. <br/>
                <br/><br/><br/>
                <b>Unesi lozinku za potvrdu:</b><br/>
                <br/>
                <input type={"password"} id={"passwordInput"}></input>
                <br/><br/>
                {passwordCheckLabel}
                <br/><br/>
                <button onClick={this.onDeleteAccount}>Da, 100% sam siguran da želim napraviti ovu nepovratnu akciju</button>
            </div>
        );
    }
}