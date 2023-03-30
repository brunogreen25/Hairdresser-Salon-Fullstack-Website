import React from 'react';
import './Component2.css';
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

export class Component2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            services: [],
            addingService: null
        }

        //region popup attrs
        this.popupMessage = '';
        this.popupMessage2 = '';
        this.popupType = '';
        this.toBeDeletedE = null;
        this.toBeDeletedId = null;
        //endregion

        this.getServices();
    }

    togglePopup = (action, e, serviceId) => {
        if(this.state.showPopup) {
            console.log("about to close popup")
            //in popup; it will close after this block
            this.popupMessage = '';
            this.popupMessage2 = '';

            if(action === true) {
                console.log("about to do the action")
                //radnja ce se napraviti
                if(this.popupType === 'saveService') {
                    console.log("The action is to save")
                    this.saveService();
                }
                if(this.popupType === 'deleteService') {
                    console.log("The action is to delete")
                    this.deleteService();
                }
            } else {
                console.log("not going to do the action")
                //radnja se nece napraviti
                //neradi se return, mora showPopup postat false

                //oslobodi spremnik ako neces radit brisanje
                if(this.popupType === 'deleteService') {
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
                let serviceName = document.getElementById('serviceName');
                let servicePrice = document.getElementById('servicePrice');
                //endregion

                if (this.checkValues(serviceName, servicePrice) === false) {
                    return;
                }

                this.popupMessage = 'Jeste li sigurni da želite spremiti uslugu: ';
                this.popupMessage2 = serviceName.value + ', ' + servicePrice.value + ' HRK';
                this.popupType = 'saveService';
            }
            if(action === 'deleteButtonClicked') {
                console.log("delete button was clicked")

                this.toBeDeletedE = e;
                this.toBeDeletedId = serviceId;

                this.popupMessage = 'Jeste li sigurni da želite obrisati uslugu?';
                this.popupType = 'deleteService';
            }
        }

        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    checkValues = (serviceName, servicePrice) => {
        if(serviceName.value==="" || servicePrice.value==="") {
            alert("Molimo Vas popunite sva polja!");
            return false;
        }
        return true;
    }

    getServices = () => {
        init.method = "get";
        init.body = null;

        fetch(url + '/salonservices', init)
            .then(response => response.json())
            .then(services => {
                console.log(services);

                this.setState({
                    services: services,
                    addingService: false
                });
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
            });
    }

    saveService = () => {
        let serviceName = document.getElementById('serviceName');
        let servicePrice = document.getElementById('servicePrice');

        /*if(serviceName.value==="" || servicePrice.value==="") {
            alert("Molimo Vas popunite sva polja!");
            return;
        }*/

        let serviceBody = {
            name: serviceName.value,
            price: servicePrice.value
        };

        init.method = 'post';
        init.body = JSON.stringify(serviceBody);

        fetch(url + '/salonservices', init)
            .then(response => {
                if(response.ok) {
                    this.getServices();
                } else {
                    serviceName.value = "";
                    servicePrice.value = "";
                    alert("Nemožeš dodati već postojeću uslugu.");
                }
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo Vas pokušajte ponovno.');
            });
    }

    deleteService = () => {
        let e = this.toBeDeletedE;
        let serviceId = this.toBeDeletedId;

        init.method = 'delete';
        init.body = '';

        fetch(url + '/salonservices/' + serviceId, init)
            .then(response => {
                if(response.ok) {
                    this.getServices();
                }
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo Vas pokušajte ponovno.');
            });

    }

    render() {
        console.log("render started..");

        let services = [];
        this.state.services.forEach(service => {
            services.push(
                <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                    <td><span aria-hidden="true" onClick={(e) => { this.togglePopup('deleteButtonClicked', e, service.id) }}>&#10060;</span></td>
                </tr>
            );
        })

        let serviceInput = (
            <div className={'service-input-container'}>
                <b>Unesi uslugu i njezinu cijenu:</b> <br/><br/>
                <label>Naziv usluge:   </label>
                <input type={'text'} id={'serviceName'}/><br/><br/>
                <label>Cijena usluge: </label>
                <input type={'text'} id={'servicePrice'}/><br/><br/>
                <button onClick={(e) => {this.togglePopup('saveButtonClicked')}}>SPREMI NOVU USLUGU</button>
            </div>
        );

        let addServiceButton = (
            <button onClick={(e) => { this.setState({addingService: true}) }}>DODAJ NOVU USLUGU</button>
        );

        return (
            <div className="ComponentTwo">
                <table>
                    <thead>
                        <tr>
                            <th>USLUGE</th>
                            <th>CIJENA (HRK)</th>
                            <th>OBRIŠI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services}
                    </tbody>
                </table>
                <br/>
                <div>
                    {this.state.addingService ? serviceInput : addServiceButton}
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