import React from 'react';
import './Component3.css';
import Popup from "../../Popup/Popup";

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';
let init = {
    method: '',
    headers: {
        'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: null
};

export class Component3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            addingEmployee: null,
            password: ""
        }

        //region popup attrs
        this.popupMessage = '';
        this.popupMessage2 = '';
        this.popupType = '';
        this.toBeDeletedE = null;
        this.toBeDeletedId = null;
        //endregion

        this.locations = new Set();
        this.services = [];

        //asinkrono izvodjenje
        this.getEmployees();
        this.getAddresses();
        this.getServices();
    }

    getEmployees = () => {
        init.method = "get";
        init.body = null;

        fetch(url + '/employee', init)
            .then(response => response.json())
            .then(employees => {
                console.log("employees", employees);

                this.setState({
                    employees: employees,
                    addingEmployee: false
                });
            })
            .catch(() => {
                alert('Nismo u mogućnosti dohvatiti zaposlenike. Molimo pokušajte ponovno.');
            });
    }

    togglePopup = (action, e, employeeId) => {

        if(this.state.showPopup) {
            console.log("about to close popup")
            //in popup; it will close after this block
            this.popupMessage = '';
            this.popupMessage2 = '';

            if(action === true) {
                console.log("about to do the action")
                //radnja ce se napraviti
                if(this.popupType === 'saveEmployee') {
                    console.log("The action is to save")
                    this.saveEmployee();
                }
                if(this.popupType === 'deleteEmployee') {
                    console.log("The action is to delete")
                    this.deleteEmployee();
                }
            } else {
                console.log("not going to do the action")
                //radnja se nece napraviti
                //neradi se return, mora showPopup postat false

                //oslobodi spremnik ako neces radit brisanje
                if(this.popupType === 'deleteEmployee') {
                    console.log("since i had to save values for deletion, i m gonna get rid of them now")
                    this.toBeDeletedId = null;
                    this.toBeDeletedE = null;
                }
            }
            this.popupType = '';
        } else {
            console.log("about to open popup")
            //outside of popup; it will open after this block
            if(action === 'saveButtonClicked') {
                console.log("save button was clicked")
                //region get elems
                let employeeName = document.getElementById('employeeName');
                let employeeSurname = document.getElementById('employeeSurname');
                let employeeEmail = document.getElementById('employeeEmail');
                let employeePassword = document.getElementById('employeePassword');

                let e2 = document.getElementById('selectObj');
                let selectedLocationAddress = e2.options[e2.selectedIndex].value;
                let selectedLocation = [...this.locations].find(location => location.address+', '+location.city === selectedLocationAddress);
                console.log(selectedLocation);

                let cbServices = document.getElementsByClassName('checkbox-services');  //svi cb-ovi iz navedene klase
                cbServices = [...cbServices].filter(cbService => cbService.checked===true); //oni cb-ovi gdje atr "checked"===true
                let services = [];
                cbServices.forEach(cbService => services.push(cbService.value));    //imena poslova izvucena iz "value" atributa od checked cb-ova
                services = this.services.filter(service => services.includes(service.name));    //poslovi iz globalne varijable cija se imena nalaze u listi linije povise
                //endregion

                if (this.checkValues(employeeName, employeeSurname, employeeEmail, employeePassword, selectedLocation, services) === false) {
                    return;
                }

                this.popupMessage = 'Jeste li sigurni da želite spremiti zaposlenika: ';
                this.popupMessage2 = employeeSurname.value + ', ' + employeeName.value + ', ' + employeeEmail.value;
                this.popupType = 'saveEmployee';
            }
            if(action === 'deleteButtonClicked') {
                console.log("delete button was clicked")

                this.toBeDeletedE = e;
                this.toBeDeletedId = employeeId;

                this.popupMessage = 'Jeste li sigurni da želite obrisati zaposlenika?';
                this.popupType = 'deleteEmployee';
            }
        }

        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    checkValues = (employeeName, employeeSurname, employeeEmail, employeePassword, selectedLocation, services) => {
        if(employeeName.value==="" || employeeSurname.value==="" || employeeEmail.value==="" || employeePassword.value==="" || selectedLocation===undefined || services.length===0) {
            alert("Molimo Vas popunite sva polja!");
            return false;
        }
        return true;
    }

    getAddresses = () => {
        init.method = "get";
        init.body = null;

        fetch(url + '/locations', init)
            .then(response => response.json())
            .then(locations => {
                locations.forEach(location => {
                    this.locations.add(location);
                });

                console.log("locations", this.locations);
            })
            .catch(() => {
                alert('Nismo u mogućnosti dohvatiti lokacije. Molimo pokušajte ponovno.');
            });
    }

    getServices = () => {
        init.method = "get";
        init.body = null;

        fetch(url + '/salonservices', init)
            .then(response => response.json())
            .then(services => {
                services.forEach(service => {
                    this.services.push(service);
                });

                console.log("services", this.services);
            })
            .catch(() => {
                alert('Nismo u mogućnosti dohvatiti servise. Molimo pokušajte ponovno.');
            });
    }

    saveEmployee = () => {
        let employeeName = document.getElementById('employeeName');
        let employeeSurname = document.getElementById('employeeSurname');
        let employeeEmail = document.getElementById('employeeEmail');
        let employeePassword = document.getElementById('employeePassword');

        let e = document.getElementById('selectObj');
        let selectedLocationAddress = e.options[e.selectedIndex].value;
        let selectedLocation = [...this.locations].find(location => location.address+', '+location.city === selectedLocationAddress);
        console.log(selectedLocation);

        let cbServices = document.getElementsByClassName('checkbox-services');  //svi cb-ovi iz navedene klase
        cbServices = [...cbServices].filter(cbService => cbService.checked===true); //oni cb-ovi gdje atr "checked"===true
        let services = [];
        cbServices.forEach(cbService => services.push(cbService.value));    //imena poslova izvucena iz "value" atributa od checked cb-ova
        services = this.services.filter(service => services.includes(service.name));    //poslovi iz globalne varijable cija se imena nalaze u listi linije povise

        /*if(employeeName.value==="" || employeeSurname.value==="" || employeeEmail.value==="" || employeePassword.value==="" || selectedLocation===undefined || services.length===0) {
            alert("Molimo Vas popunite sva polja!");
            return;
        }*/

        let employeeBody = {
            name: employeeName.value,
            surname: employeeSurname.value,
            email: employeeEmail.value,
            password: employeePassword.value,
            location: selectedLocation,
            salonServices: services,
            sendMail: 0
        };

        init.method = 'post';
        init.body = JSON.stringify(employeeBody);

        fetch(url + '/employee', init)
            .then(response => {
                if(response.ok) {
                    console.log(response);
                    this.getEmployees();
                    console.log(employeePassword.value);
                } else {
                    employeeName.value = "";
                    employeeSurname.value = "";
                    employeeEmail.value = "";
                    alert("Nemožeš dodati već postojećeg zaposlenika.");
                }
                this.setState({
                    password: ""
                });
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo Vas pokušajte ...');
            });
    }

    deleteEmployee = () => {
        let e = this.toBeDeletedE;
        let employeeId = this.toBeDeletedId;

        init.method = 'delete';
        init.body = '';

        fetch(url + '/employee/' + employeeId, init)
            .then(response => {
                if(response.ok) {
                    this.getEmployees();
                }
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo Vas pokušajte !.');
            });
    }

    displaySalonServices = (salonServices) => {
        let services = [];
        salonServices.forEach(salonService => {
           services += salonService.name + ", " ;
        });
        services = services.substring(0, services.length - 2);

        return services;
    }

    generatePassword = () => {
        let passwordLength = document.getElementById('passwordLenght').value;

        init.method = "get";
        init.body = null;

        fetch(url + '/employee/generatePassword/' + passwordLength, init)
            .then(response => response.json())
            .then(passwordObj => {
                console.log("password", passwordObj.password);

                this.setState({
                    password: passwordObj.password
                });
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo Vas pokušajte ponovno.');
            });
    }

    render() {
        let displayServiceCheckOptions = [];
        this.services.forEach(service => {
           displayServiceCheckOptions.push(
               <div key={service.id}>
                   <label htmlFor={'cbService'+service.id}> {service.name} </label> <input id={'cbService'+service.id} type={'checkbox'} name={service.name} value={service.name} className={'checkbox-services'}/>
               </div>
           );
        });


        let displayLocationSelectOptions = [];
        this.locations.forEach(location => {
            displayLocationSelectOptions.push(
                <option key={location.id*99} value={location.address+ ", "+ location.city}>{location.address + ', ' + location.city}</option>
            );
        });

        let employees = [];
        this.state.employees.forEach(employee => {
            employees.push(
                <tr key={employee.id}>
                    <td>{employee.email}</td>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{this.displaySalonServices(employee.salonServices)}</td>
                    <td><span>{employee.location.address}</span>, {employee.location.city}</td>
                    <td><span id={"deleteButtonEmpAdmin"} aria-hidden="true" onClick={(e) => { this.togglePopup('deleteButtonClicked', e, employee.id) }}>&#10060;</span></td>
                </tr>
            );
        });

        //TODO: u input type number-u, smanji sirinu
        let employeeInput = (
            <div className={'employee-info-container'}>
                <div className={'containerEmpDetails'} >
                    <br/><b>Unesi zaposlenika: </b> <br/><br/>
                    <label>Unesi ime: </label>
                    <input type={'text'} id={'employeeName'}/><br/><br/>
                    <label>Unesi prezime: </label>
                    <input type={'text'} id={'employeeSurname'}/><br/><br/>
                    <label>Unesi e-mail: </label>
                    <input type={'text'} id={'employeeEmail'}/><br/><br/><br/>
                </div>


                <div className={'password-generator-container'}>
                    <br/><b>Generator lozinke: </b><br/><br/>
                    <label>Duljina lozinke: </label>
                    <input type={'number'} id={'passwordLenght'} defaultValue={8} min={8}/><br/><br/>
                    <label>Generirana lozinka: </label>
                    <input type={'text'} readOnly={true} value={this.state.password} id={'employeePassword'}/><br/><br/>
                    <button onClick={ (e) => { this.generatePassword(); }}>GENERIRAJ LOZINKU</button><br/>
                </div>

                <div className={'location-chooser-container'}>
                    <b>Lokacija radnog mjesta: </b> <br/><br/>
                    <select id={"selectObj"} defaultValue={"odaberi"}>
                        <option value={"odaberi"} disabled>Odaberi lokaciju</option>
                        {displayLocationSelectOptions}
                    </select>
                </div>

                <div className={'service-chooser-container'} id={'serviceChooserContainer'}>
                    <b>Usluge koje zaposlenik obavlja: </b> <br/><br/>
                    {displayServiceCheckOptions}
                </div>
                <div className={'buttonSaveEmp'} >
                    <button onClick={(e) => {this.togglePopup('saveButtonClicked')}}>SPREMI NOVOG ZAPOSLENIKA</button>
                </div>

            </div>
        );

        let addEmployeeButton = (
            <button onClick={(e) => { this.setState({addingEmployee: true}) }}>DODAJ NOVOG ZAPOSLENIKA</button>
        );

        return (
            <div className="component-three">
                <table>
                    <thead>
                    <tr>
                        <th>E-MAIL ZAPOSLENIKA</th>
                        <th>IME ZAPOSLENIKA</th>
                        <th>PREZIME ZAPOSLENIKA</th>
                        <th>USLUGE</th>
                        <th>LOKACIJA</th>
                        <th>OBRIŠI</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees}
                    </tbody>
                </table>
                <br/>
                <div>
                    {this.state.addingEmployee ? employeeInput : addEmployeeButton}
                    {
                        this.state.showPopup ?
                            <Popup
                                text={this.popupMessage}
                                text2={this.popupMessage2}
                                exitButton={(e) => {this.togglePopup(false)}}
                                saveButton={(e) => {this.togglePopup(true)}}
                            />
                            : null
                    }
                </div>
            </div>
        );
    }
}