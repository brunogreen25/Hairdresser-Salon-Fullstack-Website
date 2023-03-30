import React from 'react';
import {NavLink} from 'react-router-dom';   //Route tag
import '../Navigation/NavigationHandler.css';   //da navigacija bude 15% livo, a stranica 15% desno
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import './User.css';
import '../Map/MapComponent';
import '../Map/Map.css';
import {Component2} from "../Client/Pages/Component2";
import {MapComponent} from "../Map/MapComponent";
//    /*global google*/

export class User extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        const mapStyles = {
            width: '50vw',
            height: '70vh'
        };

        return (
            <div className={"userContainer"}>
                <div className={"header"}>
                    <h1>FAVORITO BEAUTY SALONI</h1>
                </div>

                <MapComponent {...this.props} className={'map-component'} isUser={true} mapStyles={mapStyles}/>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyD2TtgKXTft0qT_ApXEkCa--fHhv0K8zYc"
})(User)
