import React from 'react';
import moment from 'moment';    //za vrijeme
import './calendar.css';

export default class Calendar extends React.Component {

    state = {       //state cini dateContext,koji je danas dan,hoce li se month Pop Up pokazat, hoce li se year pop up popkazat, da li je dan izabran
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null
    }

    constructor(props) {        //ako su property-ji za width, style i style.width poslani, aktiviraj ih
        super(props);
        this.width = props.width || "550px";
        this.style = props.style || {};

        this.style.width = this.width;

        let currentDate = this.currentDate();
        this.props.onInit && this.props.onInit(Object.assign(currentDate,{month: (this.state.today.format("M")-1).toString() }));        //Object.assign da se zamijeni naziv mjeseca sa njegovim indexom
    }

    componentWillMount() {

    }

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        return {
            day: this.state.today.format("D"),
            month: this.state.today.format("MMMM"),
            year: this.state.today.format("Y")
        }
    }
    currentDateMonthNum = () => {
        return {
            day: parseInt(this.state.today.format("D")),
            month: parseInt(this.state.today.format("M")),
            year: parseInt(this.state.today.format("Y"))
        }
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);  //kloniranje objekta
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        })
        this.props.onMonthChange && this.props.onMonthChange(null, dateContext.format("M").toString());     //ako postoji property onNextMonth, onda ga aktiviraj (jer taj property mora bit funkcija)
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        })
        this.props.onMonthChange && this.props.onMonthChange(null, dateContext.format("M").toString());
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange(e, (this.months.indexOf(data)+1).toString());
    }

    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a href={"#"} onClick={(e)=>{this.onSelectChange(e, data)}}>
                        {data}
                    </a>
                </div>
            )
        });

        return (
          <div className="month-popup">
              {popup}
          </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }


    //za prikaz pop-upa
    /*
    {this.state.showMonthPopup &&
              <this.SelectList data={this.months}/>}
     */

    MonthNav = () => {          //data se salje kao argument funckije SelectList
        return (
          <span className="label-month" onClick={(e) => this.onChangeMonth(e, this.month())}>
              {this.month()}
              {false &&
              <this.SelectList data={this.months}/>}
          </span>
        );
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }

    onYearChange = (e) => {
        this.setYear(e.target.value);
    }

    onKeyUpYear = (e) => {      //13=enter, 37=Esc; e.which je da skuzimo koja je tipka pritisnila
        if (e.which === 13 || e.which===27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            });
            this.props.onYearChange && this.props.onYearChange(e, e.target.value);
        }
    }

    YearNav = () => {
        return (
          this.state.showYearNav
              ?
                <input defaultValue = {this.year()} className="editor-year" ref={(yearInput)=>{this.yearInput=yearInput}} onKeyUp = {(e)=>this.onKeyUpYear(e)} onChange={(e)=> this.onYearChange(e)} type="number" placeholder={"year"}/>
              :
                <span
                    className={"label-year"}
                    onClick = {(e) => {this.showYearEditor()}}>
                    {this.year()}
                </span>
        );
    }

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        });

        this.props.onDayClick && this.props.onDayClick(e, day, this.state.dateContext.format("M").toString(), this.year());
    }

    checkIfCurrentDay = (d) => {
        let today = this.currentDate();
        if(d.toString() === today.day && this.month() === today.month && this.year() === today.year) {
            return true;
        }
        return false;
    }

    checkIfPassedDay = (d) => {
        let today = this.currentDateMonthNum();

        let dateContext = {
            day: d,
            month: parseInt(this.state.dateContext.format("M")),
            year: parseInt(this.year())
        };

        if(today.year > dateContext.year) {
            return true;
        }

        if(today.year === dateContext.year && today.month > dateContext.month) {
            return true;
        }

        if(today.year === dateContext.year && today.month === dateContext.month && today.day > dateContext.day) {
            return true;
        }

        return false;
    }

    //ono sto render metoda returna, to zamijenjuje ovaj tag
    render() {
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });     //broj dana u tjedan

        //console.log("index of the first day in current month: ", this.daysInMonth());
        let blanks = [];    //lista praznih celija u tekucem mjesecu
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td key={i * 80} className="emptySlot">
                    {""}
                </td>
            );
        }
        //console.log("blanks: ", blanks);    //vrati ih 2, zato sta je skroz livo nedilja, a ne ponediljak

        let daysInMonth = [];      //lista celija u tekucem mjesecu popunjena brojevima dana
        for (let d = 1; d <= this.daysInMonth(); d++) {

            let className = this.checkIfCurrentDay(d) ? "day current-day" : "day";
            let selectedClass = (d === this.state.selectedDay ? " selected-day " : "");
            let passedDayClass = this.checkIfPassedDay(d) ? " passed-day" : "";
            daysInMonth.push(
                <td key={d} className={className + selectedClass + passedDayClass} id="hovered-day" onClick={(e)=>{this.onDayClick(e, d)}}>
                    <span>{d}</span>
                </td>
            );
        }
        //console.log("days: ", daysInMonth);

        var totalSlots = [...blanks, ...daysInMonth];       //lista svih celija koje postoje(prazne+one u tekucem mjesecu)
        let rows = [];      //lista redova
        let cells = [];     //pomocna varijabla za spremit celije; tjedan po tjedan
        totalSlots.forEach((row, i) => {
            if(i % 7 !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();      //kopira sve "cells" u "insertRow" koji prebaci u "rows"
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {      //ako smo dosli do kraja, sve prebaci u "rows"
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {           //od "rows" liste napravi trElms
            return (
              <tr key={i*100}>
                  {d}
              </tr>
            );
        });

        //TODO: Nezaboravi na ovo
        let isClient = this.props.isClient ? this.props.isClient : false;
        let isEmployee = this.props.isEmployee ? this.props.isEmployee : false;
        let isBreakMode = this.props.isBreakMode ? this.props.isBreakMode : false;
        let trHours;

        let unavalibleHours = this.props.unAvalibleHours || null;
        let hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

        //console.log("unavalible hours", unavalibleHours)
        if(unavalibleHours === null) {
            trHours = hours.map((d, i) => {
                return (
                        <tr key={i * 1009}>
                            <td>
                                {d}
                            </td>
                            <td className="un-avalible-hour">
                                Odaberi zaposlenika
                            </td>
                        </tr>
                );
            });
        } else {
            //console.log("satovi:", unavalibleHours);
            trHours = hours.map((d, i) => {
                let avalible = true;

                //za brojeve 8 i 9
                let rawHour = d.substring(0, 2);
                if (rawHour[1] === ':') {
                    rawHour = d.substring(0, 1);
                }

                let breakMode = isBreakMode ? "break-mode" : "";
                let clientMode = isClient ? "client-mode " : "";

                if (unavalibleHours.includes(parseInt(rawHour, 10))) {
                    avalible = false;
                } else if (unavalibleHours.includes(parseInt(rawHour) * -1)) {

                    if(isEmployee) {
                        return (<tr key={i * 10}>
                            <td>
                                {d}
                            </td>
                            <td className={"break-hour " + breakMode}>
                                Pauza
                            </td>
                        </tr>);
                    }
                    if(isClient) {
                        return (<tr key={i * 10}>
                            <td>
                                {d}
                            </td>
                            <td className={"break-hour " + breakMode}>
                                Zauzet si ovaj termin
                            </td>
                        </tr>);
                    }
                }

                return (
                    avalible
                        ?
                        <tr key={i * 10}>
                            <td>
                                {d}
                            </td>
                            <td className={"avalible-hour " + clientMode + breakMode} onClick={(e) => {
                                if (isBreakMode) {
                                    this.props.onBreakSet && this.props.onBreakSet(d);
                                }
                                if (clientMode) {
                                    this.props.onReservation && this.props.onReservation(d);
                                    let trs = document.getElementById('hourTableBody').children;
                                    let thisTd = e.target

                                    for(let i=0;i<trs.length-1;i++) {
                                        let td = trs[i].children[1];
                                        if(td.classList.contains('client-chose-mode')) {
                                            td.classList.remove('client-chose-mode');
                                        }
                                    }

                                    thisTd.classList.add('client-chose-mode');
                                }

                            }}>
                                Slobodno
                            </td>
                        </tr>
                        :
                        <tr key={i * 1009}>
                            <td>
                                {d}
                            </td>
                            <td className="un-avalible-hour">
                                Zauzeto
                            </td>
                        </tr>
                );
            });
        }

        return (
            <div>
                <div className="calendar-container" style={this.style}>
                    <table className="calendar">
                        <thead>
                            <tr className="calendar-header">
                                <td>
                                    {
                                        this.month() !== 'January'
                                        ?
                                        <span className="left-arrow" onClick={(e) => {
                                            this.prevMonth()
                                        }}>&#8678;</span>
                                            :
                                            null
                                    }
                                </td>
                                <td colSpan="5">
                                    <this.MonthNav/>
                                    {" "}
                                    <this.YearNav/>
                                </td>
                                <td>
                                    {
                                        this.month() !== 'December' ?
                                        <span className="right-arrow" onClick={(e) => {
                                            this.nextMonth()
                                        }}>&#8680;</span> : null
                                    }
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {weekdays}
                            </tr>
                            {trElems}
                        </tbody>
                    </table>
                </div>
                <div className="calendar-container" style={this.style}>
                    <table className="hour-calendar" cellSpacing="20">
                        <tbody id={'hourTableBody'}>
                            {trHours}
                            <tr>
                                <td>
                                    {"21:00"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}