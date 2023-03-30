import React from 'react';
import Calendar from "../../Calendar/calendar";

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';
let init = {
    method: '',
    headers: {
        'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: ''
};

export class Component1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: [],
            unAvalibleHours: [],
            isBreakMode: false
        }

        this.date = {
            day: "",
            month: "",
            year: ""
        }
    }

    parseDate = () => {
        let year = this.date.year;
        let month = this.date.month;
        if(parseInt(month) >= 1 && parseInt(month) <= 9) {
            month = '0' + month;
        }

        let day = this.date.day;
        if(parseInt(day) >= 1 && parseInt(day) <= 9) {
            day = '0' + day;
        }

        let date = year + '-' + month + '-' + day;
        return date;
    }

    //u bazi je pauza tamo di je clientId == 0, a ode se vidi jer je to "-" pa broj
    parseHours = (reservations) => {
        let unAvalibleHours = [];
        reservations.map(reservation => {
            let minus = reservation.client ? 1 : -1;
            unAvalibleHours.push(parseInt(reservation.startTime.split(':')[0]) * minus);
        })

        return unAvalibleHours;
    }

    getDates = () => {
        let date = this.parseDate();

        init.method = 'get';
        init.body = null;

        fetch(url + '/reservations/schedule/' + window.localStorage.username + '/' + date, init)
            .then(response => response.json())
            .then(reservations => {
                console.log(reservations);

                let unAvalibleHours = reservations ? this.parseHours(reservations) : [];

                this.setState({
                    reservations: reservations,
                    unAvalibleHours: unAvalibleHours
                });

            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjev. Molimo pokušajte ponovno.');
            });
    }

    onDayClick = (e, day, month, year) => {
        this.date.day = day;
        this.date.month = month;
        this.date.year = year;

        this.getDates();
    }

    changeYear = (year) => {
        this.date.year = year;

        this.getDates();
    }

    changeMonth = (month) => {
        this.date.month = month;

        this.getDates();
    }

    cbClicked = (e) => {
        let cbBreak = e.target.checked;
        if(cbBreak) {
            this.setState({
                isBreakMode: true
            });
        } else {
            this.setState({
                isBreakMode: false
            });
        }
    }


    onBreakSet = (hour) => {
        let breakBody = {
            employeeMail: window.localStorage.username,
            date: this.parseDate(),
            startTime: hour+":00"
        }

        init.method = 'post';
        init.body = JSON.stringify(breakBody);

        fetch(url + '/reservations/break', init)
            .then(response => {
                if(response.ok) {
                    this.getDates();
                } else {
                    alert("Mala greska se dogodila")
                }
            })
            .catch(err => {
                alert("Nismo u mogucnosti obraditi zahtjev. Molimo Vas da ponovno pokusate spremiti pauzu.");
            })


    }

    render() {
        console.log("entered render...");

        return (
            <div className="ComponentOne">
                <Calendar onInit={(date) => this.onDayClick(null, date.day, (parseInt(date.month)+1).toString(), date.year)}
                          onDayClick={this.onDayClick}
                          onYearChange={(e, year) => {this.changeYear(year)}}
                          onMonthChange={(e, month) => {this.changeMonth(month)}}
                          unAvalibleHours={this.state.unAvalibleHours}

                          isEmployee={true}
                          isBreakMode={this.state.isBreakMode}
                          onBreakSet={ (hour) => {this.onBreakSet(hour)} }
                />
                <div>
                    Želim dodat pauzu:
                    <input type={'checkbox'} id={'cbBreak'} onClick={this.cbClicked} disabled={this.isPassedDay}/>
                </div>
            </div>
        );
    }
}