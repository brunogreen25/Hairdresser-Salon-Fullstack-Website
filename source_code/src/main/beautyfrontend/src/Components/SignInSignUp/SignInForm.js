import React, { Component } from 'react';

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            rbAdmin: false,
            rbEmployee: false,
            rbClient: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearTextBoxes = this.clearTextBoxes.bind(this);
        this.checkRules = this.checkRules.bind(this);
        this.setAuthItems = this.setAuthItems.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        });
    }

    clearTextBoxes() {
        let usernameInput = document.getElementById('email');
        let passwordInput = document.getElementById('password');
        let loginWarning = document.getElementById('login_warn');

        loginWarning.className = 'LoginWarning';
        loginWarning.innerHTML = 'Neispravno korisničko ime ili lozinka';
        passwordInput.value = "";
        usernameInput.value = "";
    }

    checkRules() {
        let usernameInput = document.getElementById('email');
        let passwordInput = document.getElementById('password');
        let loginWarning = document.getElementById('login_warn')

        if (usernameInput.value == "") {
            loginWarning.className = 'LoginWarning';
            loginWarning.innerHTML = "Unesite korisničko ime!";
            return false;
        }
        else if(passwordInput.value == "") {
            loginWarning.className = 'LoginWarning';
            loginWarning.innerHTML = "Unesite lozinku!";
            return false;
        } else if(!this.state.rbAdmin && !this.state.rbEmployee && !this.state.rbClient) {
            loginWarning.className = 'LoginWarning';
            loginWarning.innerHTML = "Izaberi ulogu!";
        } else {
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.checkRules()) {
            return;
        }

        let loginBody = {
            eMail: this.state.email,
            password: this.state.password
        };

        let init = {
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginBody)
        };

       if(this.state.rbAdmin) {
           fetch(url + '/admin/login', init)
               .then(response => {
                   if(response.ok) {
                       this.setAuthItems(this.state.email, this.state.password, 'admin');
                        this.props.history.push('/admin/option1');
                   } else {
                       this.clearTextBoxes();
                   }
               })
               .catch(() => {
                    alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
               });
       }
       else if(this.state.rbEmployee) {
           fetch(url + '/employee/login', init)
               .then(response => {
                   if(response.ok) {
                       this.setAuthItems(this.state.email, this.state.password, 'employee');
                       this.props.history.push('/employee/option1');
                   } else {
                       this.clearTextBoxes();
                   }
               })
               .catch(() => {
                    alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
                });
       }
       else if(this.state.rbClient) {
           fetch(url + '/client/login', init)
               .then(response => {
                   if(response.ok) {
                       this.setAuthItems(this.state.email, this.state.password, 'client');
                       this.props.history.push('/client/option2');
                   } else {
                       this.clearTextBoxes();
                   }
               })
               .catch(() => {
                    alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
           });;
       }
    }



    switchRadioButton(e) {
        let value = e.target.value;
        switch (value) {
            case "admin":
                this.setState({
                    rbAdmin: true,
                    rbEmployee: false,
                    rbClient: false
                });
                break;
            case "employee":
                this.setState({
                    rbAdmin: false,
                    rbEmployee: true,
                    rbClient: false
                });
                break;
            case "client":
                this.setState({
                    rbAdmin: false,
                    rbEmployee: false,
                    rbClient: true
                });
                break;
        }
    }

    setAuthItems(username, password, role) {
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        switch(role) {
            case "admin":
                window.localStorage.setItem('admin', true);
                break;
            case "employee":
                window.localStorage.setItem('employee', true);
                break;
            case "client":
                window.localStorage.setItem('client', true);
                break;
        }
    }

    render() {
        return (
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <input type="radio" name="role" value="admin" id="rbAdmin" onClick={(e)=>{this.switchRadioButton(e)}}/>
                        <label htmlFor="rbAdmin">Administrator</label><br/>
                        <input type="radio" name="role" value="employee" id="rbEmployee" onClick={(e)=>{this.switchRadioButton(e)}}/>
                        <label htmlFor="rbEmployee">Zaposlenik</label><br/>
                        <input type="radio" name="role" value="client" id="rbClient" onClick={(e)=>{this.switchRadioButton(e)}}/>
                        <label htmlFor="rbClient">Klijent</label>
                    </div>
                    <div className="FormField">
                        <label className="Label" htmlFor="email">E-Mail Adresa</label>
                        <input type="email" id="email" className="Input" placeholder="Upiši si e-mail" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="FormField">
                        <label className="Label" htmlFor="password">Lozinka</label>
                        <input type="password" id="password" className="Input" placeholder="Upiši si lozinku" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <button className="Button" id={'loginId'}>Prijavi se</button><br/>
                        <label id="login_warn" className="Hidden"></label>
                    </div>
                </form>
            </div>
        );
    }
}
export default SignInForm;