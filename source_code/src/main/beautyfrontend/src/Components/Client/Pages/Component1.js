import React from 'react';

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';
const init = {
    method: 'get',
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
            reservations: []
        }

        this.getLocations();
    }

    getLocations = () => {
        init.method = 'get';
        init.body = null;

        fetch(url + '/reservations/clientMail:'+window.localStorage.username, init)
            .then(response => response.json())
            .then(reservations => {
                this.setState({
                    reservations: reservations
                });
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
            });
    }

    parseDate = (date) => {
        let newDate = ""
        let words = date.split("-");

        for(let i=words.length-1; i>=0; i--) {
            newDate += words[i] + "/"
        }
        newDate = newDate.substring(0, newDate.length - 1);
        return newDate;
    }

    generatePDF= (id) => {

    }


    render() {
        let reservations = [];
        this.state.reservations.forEach(reservation => {
            let date = this.parseDate(reservation.date);
            reservations.push(
                <tr key={reservation.id} className={'reservation-container'}>
                    <td>{date}</td>
                    <td>{reservation.startTime.substring(0, reservation.startTime.length-3)}</td>
                    <td>{reservation.employee.location.address}<br/> {reservation.employee.location.city}</td>
                    <td>{reservation.employee.name}<br/> {reservation.employee.surname}<br/> {reservation.employee.email}</td>
                    <td><button onClick={(e)=>window.open("https://heroku-favorito-backend.herokuapp.com/rest/pdf/pdf/"+reservation.id)}>Generiraj PDF</button></td>
                </tr>
            )
        });

        let reservationTable = (
            <table>
                <thead>
                <tr>
                    <th style={{width: 25 + '%'}}>DATUM</th>
                    <th style={{width: 25 + '%'}}>VRIJEME</th>
                    <th style={{width: 25 + '%'}}>LOKACIJA</th>
                    <th style={{width: 25 + '%'}}>ZAPOSLENIK</th>
                    <th style={{width: 25 + '%'}}>POTVRDA</th>
                </tr>
                </thead>
                <tbody>
                {reservations}
                </tbody>
            </table>
        )

        let reservationMessage = (
            <h1>Nemaš rezerviranih termina</h1>
        )


        return (
            <div className="ComponentOne">
                {this.state.reservations.length===0 ? reservationMessage : reservationTable}
            </div>
        );
    }
}