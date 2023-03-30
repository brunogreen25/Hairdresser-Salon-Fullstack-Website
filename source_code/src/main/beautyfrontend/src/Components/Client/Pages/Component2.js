import React from 'react';
import {NavLink} from 'react-router-dom';   //Route tag
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {MapComponent} from "../../Map/MapComponent";
import './Component2.css';
import Calendar from "../../Calendar/calendar";
import Popup from "../../Popup/Popup";
//    /*global google*/

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

export class Component2 extends React.Component {
    constructor(props) {
        super(props);

        //imas sada podatke o lokaciji
        //TODO: i u User-a stavit MapComponent
        this.state = {
            services: [],
            employees: [],
            reservations: [],
            unAvalibleHours: null,
            showCalendar: false
        }

        this.date = {
            day: "",
            month: "",
            year: ""
        }

        this.clickedPlace = "Klikni na marker na karti za prikaz usluga"
        this.clickedService = "Odaberi lokaciju, zatim odaberi uslugu"
        this.clickedEmployee = {};
        this.clickedHour = "";
        this.myId = null;

        //region popup attrs
        this.popupMessage = '';
        this.popupMessage2 = '';
        //endregion

        this.getMyId();
    }

    togglePopup = (action) => {
        if(this.state.showPopup) {
            console.log("about to close popup")
            //in popup; it will close after this block
            this.popupMessage = '';
            this.popupMessage2 = '';

            if(action === true) {
                console.log("about to do the create reservation action")
                //radnja ce se napraviti
                this.createReservation();
            } else {
                console.log("not going to do the action")
                //radnja se nece napraviti
                //neradi se return, mora showPopup postat false
            }
        } else {
            console.log("about to open popup")
            //outside of popup; it will open after this block

            if (this.checkValues() === false) {
                return;
            }

            this.popupMessage = 'Jeste li sigurni da želite napraviti rezervaciju: ';
            this.popupMessage2 = this.date.day + '/' + this.date.month + '/' + this.date.year + ' ' + this.clickedHour + ', ' + this.clickedPlace+ ': ' + this.clickedService;
        }

        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    checkValues = () => {
        if(this.date.day==="" || this.date.month==="" || this.date.year==="" || this.clickedHour==="" || this.clickedEmployee === {} || this.clickedEmployee===null || this.clickedService===null) {
            alert("Unesite sve potrebne podatke");
            return false;
        }

        if(!this.dateNotExpired()) {
            alert("Morate odabrati barem 1 dan unaprijed.");
            return false;
        }
        return true;
    }


    //region remove this region later
    getMyId = () => {
        init.method="get";
        init.body=null;
        fetch(url + '/client/e-mail:' + window.localStorage.username, init)
            .then(response => response.json())
            .then(client => {
                this.myId = client.id;
            })
            .catch(() => {
                alert('Nismo u mogućnosti obraditi zahtjevice. Molimo pokušajte ponovno.');
            });
    }

    parseHours = (reservations) => {
        let unAvalibleHours = [];
        reservations.map(reservation => {
            if(reservation.client.id === this.myId && this.parseDate()===reservation.date) {
                let minus = -1
                unAvalibleHours.push(parseInt(reservation.startTime.split(':')[0]) * minus);
            }
        })
        return unAvalibleHours;
    }

    parseHoursOld = (reservations) => {
        let unAvalibleHours = [];
        reservations.map(reservation => {
            unAvalibleHours.push(parseInt(reservation.startTime.split(':')[0]));
        })
        return unAvalibleHours;
    }

    getReservationsByClientAndDate = () => {
        init.method = 'get';
        init.body = null;
        fetch(url + '/reservations/clientMail:'+window.localStorage.username, init)
            .then(response => response.json())
            .then(reservationsByClient => {

                let unAvalibleHours = this.state.unAvalibleHours;
                let bonusUnAvalibleHours = this.parseHours(reservationsByClient);
                unAvalibleHours.forEach(hour => {
                    if(!bonusUnAvalibleHours.includes(hour * -1)) {
                        bonusUnAvalibleHours.push(hour)
                    }
                });

                this.setState({
                    unAvalibleHours: bonusUnAvalibleHours
                });
            })
            .catch(err => {
                alert("Nismo mogli dohvatiti sve rezervacije od klijenta")
            })
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

    parseLocation = (location) => {
        let words=location.split(' ');
        let locationUrl = '';
        words.forEach(word => {
            locationUrl += word + '&';
        })
        locationUrl = locationUrl.substring(0, locationUrl.length - 1);
        return locationUrl;
    }

    getServices = () => {
        let locationUrl = this.parseLocation(this.clickedPlace);

        init.method = 'get';
        init.body = null;
        fetch(url+'/employee/services-by-location:'+locationUrl, init)
            .then(response => response.json())
            .then(services => {
                this.setState({
                    services: services,
                    employees: []
                });
            })
            .catch(err => {
                alert("Nismo dohvatili usluge po lokaciji. Molimo pokusajte ponovno")
            })
    }

    getEmployeesForService = (service) => {
        init.method = 'get';
        init.body = null;
        let locationUrl = this.parseLocation(this.clickedPlace);
        fetch(url+'/employee/employees-by-loc-service:'+locationUrl+'/'+service.id.toString(), init)
            .then(response => response.json())
            .then(employees => {
                this.setState({
                    employees: employees
                })
            })
            .catch(err => {
                alert("Nismo dohvatili usluge po lokaciji. Molimo pokusajte ponovno")
            })
    }

    getCalendarByEmployee = () => {
        let employee = this.clickedEmployee;

        if(Object.keys(employee).length !== 0) {
            let date = this.parseDate();

            init.method = 'get';
            init.body = null;
            fetch(url + '/reservations/schedule/' + employee.email + '/' + date, init)
                .then(response => response.json())
                .then(reservations => {

                    let unAvalibleHours=reservations ? this.parseHoursOld(reservations) : null;

                    //nezab
                    this.setState({
                        reservations: reservations,
                        unAvalibleHours: unAvalibleHours
                    });

                    this.getReservationsByClientAndDate();
                })
                .catch(() => {
                    alert('Nismo u mogućnosti obraditi zahtjevice. Molimo pokušajte ponovno.');
                });
        } else {

        }
    }

    onDayClick = (e, day, month, year) => {
        //console.log("day clicked")
        this.date.day = day;
        this.date.month = month;
        this.date.year = year;

        this.getCalendarByEmployee();
    }

    changeYear = (year) => {
        this.date.year = year;

        this.getCalendarByEmployee();
    }

    changeMonth = (month) => {
        this.date.month = month;

        this.getCalendarByEmployee();
    }
    //endregion

    //region event listeners
    onMarkerClick = (clickedPlace) => {
        this.clickedService = "Odaberi lokaciju, zatim odaberi uslugu"
        this.clickedEmployee = {};
        this.clickedHour = "";
        this.clickedPlace=clickedPlace;
        this.removeClickingTrClasses('serviceTable', 'employeeTable');
        this.getServices();
    }

    onEmployeeClick = (e, employee) => {
        this.clickedEmployee = employee;

        this.getCalendarByEmployee();
        this.managingClickingTrClasses(e,'employeeTable');
    }

    onServiceClick = (e, service) => {
        this.clickedHour = "";
        this.clickedService = service.name;
        this.clickedEmployee = {}
        this.setState({
            unAvalibleHours: null
        });

        this.getEmployeesForService(service);
        this.managingClickingTrClasses(e,'serviceTable');
        this.removeClickingTrClasses('employeeTable');
    }

    onReservation = (hour) => {
        //console.log("sat", hour);
        this.clickedHour = hour;
    }
    //endregion

    //region click effects
    managingClickingTrClasses = (e, tableId) => {
        let table = document.getElementById(tableId);
        let htmlCollection = table.children[1].children;

        for(let i=0;i<htmlCollection.length;i++) {
            if(htmlCollection[i].classList.contains('clicked-tr')) {
                htmlCollection[i].classList.remove('clicked-tr');
            }
        }

        let trClicker = e.target.parentElement;
        trClicker.classList.add('clicked-tr');
    }

    removeClickingTrClasses = (...tableIds) => {
        tableIds.forEach(tableId => {
            let table = document.getElementById(tableId);
            let htmlCollection = table.children[1].children

            for (let i = 0; i < htmlCollection.length; i++) {
                if (htmlCollection[i].classList.contains('clicked-tr')) {
                    htmlCollection[i].classList.remove('clicked-tr');
                }
            }
        })
    }
    //endregion

    dateNotExpired = () => {
        let today = new Date();
        let dd = parseInt(String(today.getDate()));
        let mm = parseInt(String(today.getMonth() + 1));
        let yyyy = parseInt(today.getFullYear());

        let d = parseInt(this.date.day);
        let m = parseInt(this.date.month);
        let y = parseInt(this.date.year);

        if(yyyy > y) {
            return false;
        }
        if (yyyy === y && mm > m) {

            return false;
        }
        if(yyyy === y && mm === m && dd >= d) {

            return false;
        }
        return true;
    }

    createReservation = () => {
        /*console.log("date:", this.parseDate());
        console.log("clicked employee", this.clickedEmployee);
        console.log("hour", this.clickedHour);*/

        let reservationBody = {
            employeeId: this.clickedEmployee.id,
            clientMail: window.localStorage.username,
            date: this.parseDate(),
            startTime: this.clickedHour+":00"
        }

        init.method = 'post';
        init.body = JSON.stringify(reservationBody);
        fetch(url + '/reservations/new', init)
            .then(response => {
                //console.log(response)

                this.getCalendarByEmployee();
            })
            .catch(err => {
                alert("Nismo u mogucnosti obraditi Vaš zahtjev. Molimo Vas da ponovno pokusate spremiti pauzu.");
            })
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '40vh'
        };

        console.log("entered render");

        //region table elems

        let services = [];
        if(this.state.services.length !== 0) {
            this.state.services.forEach((service, index) => {
                services.push(
                    <tr key={index+1} onClick={(e) => {this.onServiceClick(e, service)}} className={'clickable-tr'}>
                        <td>
                            {service.name}
                        </td>
                        <td>
                            {service.price}
                        </td>
                    </tr>
                );
            });
        } else {
            let blanks = "   ";
            for(let i=0;i<5;i++) {
                services.push(
                    <tr key={(i+1)*19999}>
                        <td>
                            {blanks}
                        </td>
                        <td>
                            {blanks}
                        </td>
                    </tr>
                );
            }
        }

        let employees = [];
        if(this.state.employees.length !== 0) {
            this.state.employees.forEach((employee, index) => {
                employees.push(
                    <tr key={index*99} onClick={(e) => {this.onEmployeeClick(e, employee)}} className={'clickable-tr'}>
                        <td>
                            {employee.email}
                        </td>
                        <td>
                            {employee.name}
                        </td>
                        <td>
                            {employee.surname}
                        </td>
                    </tr>
                );
            });
        } else {
            let blanks = "   ";
            for(let i=0;i<5;i++) {
                employees.push(
                    <tr key={(i+1)*9999}>
                        <td>
                            {blanks}
                        </td>
                        <td>
                            {blanks}
                        </td>
                        <td>
                            {blanks}
                        </td>
                    </tr>
                );
            }
        }
        //endregion

        //filter part moze bit grid sa elementima
       return (
           <div className={'component2'}>
               <div className={'map-part'}>
                    <MapComponent {...this.props}
                                  onLocationClicked = {this.onMarkerClick}
                                  isClient={true}
                                  mapStyles={mapStyles}
                    />
               </div>
                <div className={'filter-part'}>
                    <div className={'services'}>
                        <table id={'serviceTable'}>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        {this.clickedPlace}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        NAZIV USLUGE
                                    </th>
                                    <th>
                                        CIJENA USLUGE
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {services}
                            </tbody>
                        </table>
                    </div>

                    <div className={'employees'}>
                        <table id={'employeeTable'}>
                            <thead>
                            <tr>
                                <th colSpan={3}>
                                    {this.clickedService}
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    E-MAIL ZAPOSLENIKA
                                </th>
                                <th>
                                    IME ZAPOSLENIKA
                                </th>
                                <th>
                                    PREZIME ZAPOSLENIKA
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h1>Raspored</h1>
                        <Calendar onInit={(date) => this.onDayClick(null, date.day, (parseInt(date.month)+1).toString(), date.year)}
                                  onDayClick={this.onDayClick}
                                  onYearChange={(e, year) => {this.changeYear(year)}}
                                  onMonthChange={(e, month) => {this.changeMonth(month)}}
                                  unAvalibleHours={this.state.unAvalibleHours}

                                  isEmployee={false}
                                  isClient={true}
                                  onReservation={(hour) => {this.onReservation(hour)}}
                                  isBreakMode={false}
                        />
                    </div>

                    <div>
                        <button onClick={this.togglePopup}>Rezerviraj</button>
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

           </div>
       )
    }
}