import React from 'react';
import './Component5.css';

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';

export class Component5 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCommentIds: []
        }

        this.employees = [];
        this.reviews = [];
        this.getEmployees();
    }

    //posto je async, ona se obavlja asinkrono ali sada u njoj mozemo koristit await da se sve obavlja sinkrono unutra
    getEmployees = async () => {
        const init = {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        let employees = await fetch(url + '/employee', init)
            .then(response => response.json())
            .catch(err => alert(err));

        this.employees = [];
        employees.forEach(employee => this.employees.push(employee));
        this.getReviews();
    }

    getReviews = async () => {
        const init = {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        let reviews = await fetch(url + '/rating', init)
            .then(response => response.json())
            .catch(err => alert(err));
        this.reviews = [];
        reviews.forEach(review => this.reviews.push(review));
        this.forceUpdate();
    }

    countAverageGrade = (employeeId) => {
        if(this.reviews.length === 0)
            return 0;

        let sum = 0;
        let count = 0;
        this.reviews.forEach(review => {
            if(review.employee.id === employeeId) {
                count++;
                sum+=review.grade;
            }
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

    toggleComments = (employeeId) => {
        if(this.state.showCommentIds.includes(employeeId)) {
            this.state.showCommentIds = this.state.showCommentIds.filter((val, ind, arr) => {
                return val !== employeeId;
            });
        } else {
            this.state.showCommentIds.push(employeeId);
        }
        this.forceUpdate();
        console.log(this.state.showCommentIds);
    }

    ratings = (employeeId) => {
        let reviewList = [];
        this.reviews.forEach(review => {
            if(review.employee.id === employeeId) {
                reviewList.push(
                    <div key={review.id} className={'client-field'}>
                        {review.client.name} {review.client.surname}  {this.stars(review.grade)} {": "}

                        {review.comment}

                    </div>
                );
            }
        });

        return reviewList;
    }

    render() {
        let iconDown = <span>&#10549;</span>;
        let iconUp = <span>&#10548;</span>;

        let employeeList = [];
        this.employees.forEach(employee => {
            employeeList.push(
                <li key={employee.id}>
                    <div key={employee.id} className={'employee-rating'}>
                        <div key={employee.id*999} className={'employee-field'} onClick={(e) => { this.toggleComments(employee.id) }}>
                            {employee.name} {employee.surname} {this.stars(this.countAverageGrade(employee.id))}
                            {this.state.showCommentIds.includes(employee.id) ? iconUp : iconDown}
                        </div>
                        {this.state.showCommentIds.includes(employee.id) ? this.ratings(employee.id) : null}
                    </div>
                </li>
            );
        });

        return (
            <div className="component-five">
                <h2><br/>POPIS SVIH ZAPOSLENIKA I NJIHOVE RECENZIJE: <br/><br/></h2>
                <div className={'div-employee'}>
                    <ul>
                        {employeeList}
                    </ul>
                </div>
            </div>
        );
    }
}