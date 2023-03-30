import React from 'react';
import './Component1.css';
import '../../Popup/Popup';
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

export class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            addingLocation: false,
            showPopup: false
        }

        //region popup attrs
        this.popupMessage = '';
        this.popupMessage2 = '';
        this.popupType = '';
        this.toBeDeletedE = null;
        this.toBeDeletedId = null;
        //endregion

        this.getLocations();
    }

    togglePopup = (action, e, locationId) => {
        if(this.state.showPopup) {
            console.log("about to close popup")
            //in popup; it will close after this block
            this.popupMessage = '';
            this.popupMessage2 = '';

            if(action === true) {
                console.log("about to do the action")
                //radnja ce se napraviti
                if(this.popupType === 'saveLocation') {
                    console.log("The action is to save")
                    this.saveLocation();
                }
                if(this.popupType === 'deleteLocation') {
                    console.log("The action is to delete")
                    this.deleteLocation();
                }
            } else {
                console.log("not going to do the action")
                //radnja se nece napraviti
                //neradi se return, mora showPopup postat false

                //oslobodi spremnik ako neces radit brisanje
                if(this.popupType === 'deleteLocation') {
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
                let address = document.getElementById('locationAddress');
                let city = document.getElementById('locationCity');
                //endregion

                if (this.checkValues(address, city) === false) {
                    return;
                }

                this.popupMessage = 'Jeste li sigurni da želite spremiti lokaciju: ';
                this.popupMessage2 = address.value + ', ' + city.value;
                this.popupType = 'saveLocation';
            }
            if(action === 'deleteButtonClicked') {
                console.log("delete button was clicked")

                this.toBeDeletedE = e;
                this.toBeDeletedId = locationId;

                this.popupMessage = 'Jeste li sigurni da želite obrisati lokaciju?';
                this.popupType = 'deleteLocation';
            }
        }

        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    getLocations = () => {
        init.method = 'get';
        init.body = null;

        fetch(url + '/locations', init)
            .then(response => response.json())
            .then(locations => {
                this.setState({
                    locations: locations,
                    addingLocation: false
                })
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
            });
    }

    checkValues = (locationAddress, locationCity) => {
        if(locationAddress.value==="" || locationCity.value==="") {
            alert("Molimo Vas popunite sva polja!");
            return false;
        }
        return true;
    }

    saveLocation = () => {
        let locationAddress = document.getElementById('locationAddress');
        let locationCity = document.getElementById('locationCity');

        /*if(this.checkValues(locationAddress, locationCity) === false) {
            alert("Molimo Vas popunite sva polja!");
            return;
        }*/

        let locationBody = {
            address: locationAddress.value,
            city: locationCity.value
        };

        init.method = 'post';
        init.body = JSON.stringify(locationBody);

        fetch(url + '/locations', init)
            .then(response => {
                if(response.ok) {
                    this.getLocations();
                } else {
                    locationAddress.value = "";
                    locationCity.value = "";
                    alert("Nemožeš dodati već postojeću adresu");
                }
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo Vas pokušajte ponovno.');
            });
    }

    deleteLocation = () => {
        let e = this.toBeDeletedE;
        let locationId = this.toBeDeletedId;

        init.method = 'delete';
        init.body = '';

        fetch(url + '/locations/' + locationId, init)
            .then(response => {
                if(response.ok) {
                    this.getLocations();
                } else {
                    alert("Nemoguće obrisati lokaciju na kojoj je registriran zaposlenik.")
                }
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo Vas pokušajte ponovno.');
            });

    }

    render() {

        let locationInput = (
              <div className={'location-input-container'}>
                  <b>Unesi valjanu adresu i grad:</b> <br/><br/>
                <label>Adresa ulice:      </label>
                <input type={'text'} id={'locationAddress'}/><br/><br/>
                <label> Ime grada:  </label>
                <input type={'text'} id={'locationCity'}/><br/><br/>
                <button onClick={(e) => {this.togglePopup('saveButtonClicked')}}>SPREMI NOVU LOKACIJU SALONA</button>
              </div>
        );

        let addLocationButton = (
            <button onClick={(e) => { this.setState({addingLocation: true}) }}>DODAJ NOVU LOKACIJU SALONA</button>
        );

        let locations = [];
        this.state.locations.forEach(location => {
           locations.push(
               <tr key={location.id} className={'location-container'}>
                   <td>{location.address}</td>
                   <td>{location.city}</td>
                   <td><span aria-hidden="true" onClick={(e) => { this.togglePopup('deleteButtonClicked', e, location.id) }}>&#10060;</span></td>
               </tr>
           )
        });

        return (
            <div className="ComponentOne">
                <table>
                    <thead>
                        <tr>
                            <th>ADRESA</th>
                            <th>GRAD</th>
                            <th>OBRIŠI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations}
                    </tbody>
                </table>
                <br/>
                <div>
                {this.state.addingLocation ? locationInput : addLocationButton}
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