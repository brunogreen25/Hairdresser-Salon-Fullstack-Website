import React, { Component } from 'react';

const registerUrl = 'https://heroku-favorito-backend.herokuapp.com/rest/client/register';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            passwordMatch: true,
            name: '',
            surname: '',
            reccomendEmail: ''
        }

        //da nam se "this" u ovim funkcijama referira na klasu
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkRules = this.checkRules.bind(this);
        //this.checkForRecMail = this.checkForRecMail.bind(this);
        //this.emailExists = this.emailExists.bind(this);
        this.setAuthItems = this.setAuthItems.bind(this);
    }

    setAuthItems(username, password) {
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        window.localStorage.setItem('client', true);
    }

    handleChange(e) {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        //da i password tag moze minjat oce li se password warning vidit
        if(name == 'password')
            this.checkPassword();

        this.setState({
            [name]: value
        });
    }

    checkRules() {
        let signUpWarning = document.getElementById('signup_warn');
        let nameTb = document.getElementById('name');
        let surnameTb = document.getElementById('surname');
        let passwordTb = document.getElementById('password')
        let emailTb = document.getElementById('email');

        if(nameTb.value == "") {
            signUpWarning.className = 'SignUpWarning';
            signUpWarning.innerHTML = 'Unesi ime!';
            return false;
        }
        else if(surnameTb.value == "") {
            signUpWarning.className = 'SignUpWarning';
            signUpWarning.innerHTML = 'Unesi prezime!';
            return false;
        }
        else if(passwordTb.value == "") {
            signUpWarning.className = 'SignUpWarning';
            signUpWarning.innerHTML = 'Unesi lozinku!';
            return false;
        }
        else if(passwordTb.value.length < 8) {
            signUpWarning.className = 'SignUpWarning';
            signUpWarning.innerHTML = 'Lozinka mora imati najmanje 8 znakova!';
            return false;
        }
        else if(!this.state.passwordMatch) {
            signUpWarning.className = 'SignUpWarning';
            signUpWarning.innerHTML = 'Lozinke moraju biti iste!';
            return false;
        }
        else if(emailTb.value == "") {
            signUpWarning.className = 'SignUpWarning';
            signUpWarning.innerHTML = 'Unesi email!';
            return false;
        }
        else {
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let signUpWarning = document.getElementById('signup_warn');

        if(!this.checkRules()) {
            return;
        }

        let loginBody = {
            eMail: this.state.email,
            name: this.state.name,
            surname: this.state.surname,
            password: this.state.password,
            reccomendationEmail: this.state.reccomendEmail
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

        fetch(registerUrl, init)
            .then(response => {
                console.log(response);
                if(response.ok) {
                    this.setAuthItems(this.state.email, this.state.password);
                    this.props.history.push('/client/option2');
                } else if (response.status == 400) {
                    signUpWarning.className = 'SignUpWarning';
                    signUpWarning.innerHTML = 'Osoba s navedenim E-mailom već postoji!';
                } else if (response.status == 404) {
                    signUpWarning.className = 'SignUpWarning';
                    signUpWarning.innerHTML = 'E-mail osobe koja Vam je preporučila nije evidentiran u bazi!';
                }
            });
    }

    //posto nam je unutar funkcije bitno da se state napravi (nesmi se prvo funk zavrsit izvodit a da se onda state promini), koristimo =, a ne setState() da mijenjamo
    checkPassword() {
        //nek provjeri lozinku:
        let repPassword = document.getElementById('repeat_password').value;
        let passwordWarn = document.getElementById('password_warn');
        let password = document.getElementById('password').value;

        if(repPassword != password) {
            passwordWarn.className = "PasswordWarning";
            this.state.passwordMatch = false;
        } else {
            passwordWarn.className = "Hidden";
            this.state.passwordMatch = true;
        }
    }




    render() {
        //<!--htmlFor je da tekst referiramo sa id.name, a ne id.innerText-->
        //name prop sluzi da se postave komponente state-a u handleChange() metodi

        return (
          <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormFields">
                  <div className="FormField">
                      <label className="Label" htmlFor="name">Ime</label>
                      <input type="text" id="name" className="Input" placeholder="Upiši svoje ime" name="name" value={this.state.name} onChange={this.handleChange}/>
                  </div>
                  <div className="FormField">
                      <label className="Label" htmlFor="surname">Prezime</label>
                      <input type="text" id="surname" className="Input" placeholder="Upiši svoje prezime" name="surname" value={this.state.surname} onChange={this.handleChange}/>
                  </div>
                  <div className="FormField">
                      <label className="Label" htmlFor="password">Lozinka</label>
                      <input type="password" id="password" className="Input" placeholder="Kreiraj si lozinku" name="password" value={this.state.password} onChange={this.handleChange}/>
                  </div>
                  <div className="FormField">
                      <label className="Label" htmlFor="repeat_password">Ponovi lozinku</label>
                      <input type="password" id="repeat_password" className="Input" placeholder="Ponovi lozinku" onChange={this.checkPassword}/><br/>
                      <label id="password_warn" className="Hidden">Lozinke se ne poklapaju</label>
                  </div>

                  <div className="FormField">
                      <label className="Label" htmlFor="email">E-Mail Adresa</label>
                      <input type="email" id="email" className="Input" placeholder="Upiši svoj e-mail" name="email" value={this.state.email} onChange={this.handleChange} />
                  </div>
                  <div className="FormField">
                      <button className="Button">Registriraj se</button><br/>
                      <label id="signup_warn" className="Hidden">sadassa</label>
                  </div>

                  <div className="FormField">
                      <label className="Label" htmlFor="emailRec">Netko ti je preporučio?</label>
                      <input type="email" id="emailRec" className="Input" placeholder="Upiši e-mail" name="reccomendEmail" value={this.state.reccomendEmail} onChange={this.handleChange} />
                  </div>
              </form>
          </div>
        );
    }


}

export default SignUpForm;