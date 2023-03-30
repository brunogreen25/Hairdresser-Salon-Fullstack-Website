import React from 'react';
import {NavLink} from 'react-router-dom';   //Route tag
import '../Navigation/NavigationHandler.css';   //da navigacija bude 15% livo, a stranica 15% desno
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import './Map.css';
import {User} from "../User/User";
import {Component2} from "../Client/Pages/Component2";
//    /*global google*/

export class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        let zagrebLatLng = { lat: 45.815399, lng: 15.966568};

        this.state = {
            selectedIndex: null,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: zagrebLatLng
        };

        this.latLong = [];
        this.locationJobs = {};
        this.cities = [];
        this.latLongAddressDict = {};
        this.isClient = false;

        this.getLocations();
    }

    getLocations() {
        let init = {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch('https://heroku-favorito-backend.herokuapp.com/rest/employee/services', init)
            .then(response => response.json())
            .then(locationJobs => {
                let addresses = Object.keys(locationJobs);

                let geocodeUrls;
                let url;
                let promiseCounterEnd = addresses.length;
                let city;

                addresses.forEach(address => {
                    url = this.getUrl(address);

                    fetch(url)
                        .then(response => response.json())
                        .then(response => {
                            this.latLong.push(response.results[0].geometry.location);
                            city = response.results[0].formatted_address.split(",")[2].trim();
                            this.locationJobs[JSON.stringify(response.results[0].geometry.location)] = locationJobs[address];

                            //potrebno za on Marker Click
                            this.latLongAddressDict[JSON.stringify(response.results[0].geometry.location)] = address.split(';')[0] + ', ' + city;

                            //dodaj gradove bez duplica
                            if(!this.cities.includes(city)) {
                                this.cities.push(city);
                            }

                            //neka se render() poziva tek na zadnjem fetchu
                            promiseCounterEnd--;
                            if(promiseCounterEnd === 0) {
                                //console.log(this.latLong);
                                //console.log(this.locationJobs)
                                this.forceUpdate();
                            }
                        })
                        .catch(err => alert(err))
                });
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
            });
    }

    getUrl(address) {
        let addressWords = address.split(' ');
        let addressUrl = '';
        addressWords.forEach(word => {
            if(word.includes(';')) {
                addressUrl += word.split(';')[0] + ',+';
                addressUrl += word.split(';')[1] + '+';
            } else {
                addressUrl += word + '+';
            }
        });
        addressUrl = addressUrl.substring(0, addressUrl.length - 1);

        return "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressUrl + "&key=AIzaSyD2TtgKXTft0qT_ApXEkCa--fHhv0K8zYc";
    }

    onMarkerClick = (props, marker, e) => {
        if(this.state.activeMarker !== marker) {
            //console.log(this.latLongAddressDict);
            this.props.onLocationClicked && this.props.onLocationClicked(this.latLongAddressDict[JSON.stringify(props.position)]);

            this.setState({
                selectedIndex: parseInt(marker.name),
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true
            });
        }
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                selectedIndex: null,
                selectedPlace: null,
                activeMarker: null,
                showingInfoWindow: false
            })
        }
    }

    displayJobs = (jobs) => {
        let jobHTML = [];
        let i = 0;

        jobs.forEach(job => {
            i++;
            jobHTML.push(
                <h3 key={i*97}>{job}</h3>
            );
        })
        return jobHTML;
    }

    displayInfoWindow = () => {
        let jobs = this.state.selectedPlace ? this.locationJobs[JSON.stringify(this.state.selectedPlace.position)] : null;

        if(this.isClient) {
            return(
                <InfoWindow visible={this.state.showingInfoWindow} marker={this.state.activeMarker} onClose={this.onMapClicked}>
                    <div>
                        <i>{this.state.selectedPlace ? this.latLongAddressDict[JSON.stringify(this.state.selectedPlace.position)] : null}</i>
                    </div>
                </InfoWindow>
            );
        }

        return (
            <InfoWindow visible={this.state.showingInfoWindow} marker={this.state.activeMarker} onClose={this.onMapClicked}>
                <div>
                    <i>{this.state.selectedPlace ? this.latLongAddressDict[JSON.stringify(this.state.selectedPlace.position)] : null}</i>
                    {
                            jobs ? this.displayJobs(jobs) : null
                    }
                </div>
            </InfoWindow>
        );
    }

    displayMarkers = () => {
        let markers = [];

        if(this.latLong.length !== 0) {
            let i=0;

            this.latLong.forEach(latLong => {
                i++;
                markers.push(
                    <Marker position={latLong} key={i*100} name={(i-1).toString()} onClick={this.onMarkerClick}  icon={{
                        url: "https://heroku-favorito-backend.herokuapp.com/marker1.png",
                        scaledSize: new this.props.google.maps.Size(40, 40)
                    }}/>
                );
            });
        }
        return markers;
    }

    displaySelectOptions = () => {
        let selects = [];
        let i=102;

        this.cities.forEach(city => {
            i++;
            selects.push(
                <option value={city} key={i*100}>{city}</option>
            );
        });
        return selects;
    }

    onSelectChange = () => {
        let select = document.getElementById("selectObj");

        let selectedCity = select.options[select.selectedIndex].value + ",city";
        let url = this.getUrl(selectedCity);
        let latLong;

        fetch(url)
            .then(response => response.json())
            .then(response => {
				console.log("Google: ", response);
                latLong = response.results[0].geometry.location;
                this.setState({
                    mapCenter: latLong
                });
            });
    }

    render() {
        const mapStyles = this.props.mapStyles;

        let login = null;
        if(this.props.isUser) {
            login = (
                <div className={"content"}>
                    <br/>

                    <div>
                        Kako bi mogli koristiti sve mogućnosti aplikacije,<br/> prijavite se ili ako još niste, izradite korisnički račun.
                        <br/>
                        <br/>

                    </div>
                    <NavLink exact to="/auth" activeClassName="Link_Active" className={"Link"} id={"button1"}><button>PRIJAVI SE/ REGISTRIRAJ SE</button></NavLink>
                </div>
            );
        }

        //da promjeni redoslijed div-ova za reg korisnika
        this.isClient = false;
        if(this.props.isClient && this.props.isClient===true) {
            this.isClient = true;
        }
        let mapClassComponentInnerClass = this.isClient ? "map-component-innerC" : "map-component-inner";

        return (
            <div className={mapClassComponentInnerClass}>
                <div className={"map"}>
                    <Map
                        className={"googleMap"}
                        style={mapStyles}
                        google={this.props.google}
                        zoom={11}
                        center={this.state.mapCenter}
                        initialCenter={{lat: 45.815399, lng: 15.966568}}
                        onClick={this.onMapClicked}
                        disableDefaultUI={true}
                    >
                        {this.displayMarkers()}
                        {this.displayInfoWindow()}
                    </Map>
                </div>

                <div className={"map-controller"}>
                    <div>
                        <br/>
                        U kojem su ti gradu potrebne naše usluge? <br/>
                        <select id={"selectObj"} onChange={this.onSelectChange} defaultValue={"odaberi"}>
                            <option disabled value={"odaberi"}>Odaberi grad</option>
                            {this.displaySelectOptions()}
                        </select>
                    </div>
                </div>

                {login}
            </div>
        );
    }
}
