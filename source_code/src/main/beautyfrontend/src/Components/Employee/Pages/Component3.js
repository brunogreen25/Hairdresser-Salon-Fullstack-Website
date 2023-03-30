import React from 'react';
import './Component3.css';

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';

const init = {
    method: 'get',
    headers: {
        'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export class Component3 extends React.Component {
    constructor(props) {
        super(props);

        this.reviews = [];
        this.employee = null;

        this.getEmployee();
    }

    //posto je async, ona se obavlja asinkrono ali sada u njoj mozemo koristit await da se sve obavlja sinkrono unutra
    getEmployee = async () => {
        let employee = await fetch(url + '/employee/email:' + window.localStorage.username, init)
            .then(response => response.json())
            .catch(err => alert(err));

        console.log(employee);
        this.employee = employee;
        this.getReviews();
    }

    getReviews = async () => {
        let reviews = await fetch(url + '/rating/employeeRating/' + this.employee.email, init)
            .then(response => response.json())
            .catch(err => alert(err));

        this.reviews = [];
        reviews && reviews.forEach(review => this.reviews.push(review));

        this.forceUpdate();
    }

    countAverageGrade = () => {
        if(this.reviews.length === 0)
            return 0;

        let sum = 0;
        let count = 0;
        this.reviews.forEach(review => {
            count++;
            sum+=review.grade;
        });

        if(count === 0)
            return 0;

        let avg = sum/count;

        return Math.round(avg);
    }

    stars = (number) => {
        let maxNumber = 5;
        let starsList = [];
        for(let i=0;i<number;i++) {
            starsList.push(
                <span key={i} className="checked">&#10041;</span>
            );
        }
        while(maxNumber-number) {
            starsList.push(
                <span key={maxNumber}>&#10041;</span>
            );
            maxNumber--;
        }
        return starsList;
    }

    ratings = (employeeId) => {
        let reviewList = [];
        this.reviews.forEach(review => {
            if(review.employee.id === employeeId) {
                reviewList.push(
                    <div key={review.id} className={'client-field'}>
                        {review.client.name} {review.client.surname} {this.stars(review.grade)}{": "}
                        {review.comment}
                        <br/><br/>
                    </div>
                );
            }
        });

        return reviewList;
    }

    render() {
        let employee = this.employee;
        let employeeList;
        if(employee !== null) {
            employeeList = (
                <li key={employee.id}>
                    <div key={employee.id} className={'employee-rating'}>
                        <div key={employee.id * 999} className={'employee-field'}>
                            {employee.name} {employee.surname} <br/>{"Ukupna ocjena: "}{this.stars(this.countAverageGrade(employee.id))}<br/>
                        <br/><br/><br/>
                        </div>
                        <br/>{this.ratings(employee.id)}
                    </div>
                </li>
            );
        }


        return (
            <div className="component-three">
                <ul>
                    {employeeList}
                </ul>
            </div>
        );
    }
}