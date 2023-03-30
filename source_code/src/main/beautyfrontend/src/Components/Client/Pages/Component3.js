import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Component3.css';
//import { FontAwesomeIcon } from 'react-fontawesome'

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';

export class Component3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCommentIds: []
        }

        this.grade = 0;
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

    saveGrade = (grade) => {
        this.grade = grade;

        let starIcon;
        for(let i = 1; i <= 5; i++) {
            starIcon = document.getElementById("star" + i.toString());
            if (i<=grade && !starIcon.classList.contains('activated')) {
                starIcon.classList.add('activated');
            }
            if (i>grade && starIcon.classList.contains('activated')) {
                starIcon.classList.remove('activated');
            }
        }
    }

    commentTag = (employeeId) => {
        let displayStars = (
                <div className = "rating-stars">
                    <span id={"star1"} onClick={(e) => this.saveGrade(1)}>&#10041;</span><span id={"star2"} onClick={(e) => this.saveGrade(2)}>&#10041;</span><span id={"star3"} onClick={(e) => this.saveGrade(3)}>&#10041;</span><span id={"star4"} onClick={(e) => this.saveGrade(4)}>&#10041;</span><span id={"star5"} onClick={(e) => this.saveGrade(5)}>&#10041;</span>
                </div>
        );

        return (
            <div className = "userSection">
                <textarea id={"userComment"} cols="40" rows="3"></textarea> {displayStars}<br/>
                <button onClick={(e) => this.submitComment(e,employeeId)}>ŽELIM OBJAVITI SVOJ OSVRT!</button><br/><br/>
            </div>
        );
    }

    submitComment = async (e, employeeEmail) => {
        let comment = document.getElementById('userComment').value;
        document.getElementById('userComment').value = "";

        //TODO: vidi jel zadovoljeno da ocjena nesmi bit 0
        if(this.grade === 0) {
            alert("Molimo popunite sva polja");
            return;
        }
        if(comment.length > 400) {
            alert("Komentar ne smije biti duži od 400 znakova");
            return;
        }

        let ratingBody = {
            employeeEMail: employeeEmail,
            clientEMail: window.localStorage.username,
            comment: comment,
            grade: this.grade
        }

        const init = {
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratingBody)
        };
        let response = await fetch(url + '/rating/create', init)
            .then(response => response)
            .catch(err => alert(err));

        this.saveGrade(0);
        await this.getReviews();
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
                        {this.state.showCommentIds.includes(employee.id) ? this.commentTag(employee.email) : null}
                    </div>
                </li>
            );
        });

        return (
            <div className="component-three">
                <h4><br/>POPIS SVIH ZAPOSLENIKA I NJIHOVE RECENZIJE: <br/><br/></h4>
                <br/>Za unos novog osvrta kliknuti na željenog zaposlenika te unijeti ocjenu i komentar. <br/><br/><br/>
                <ul>
                    {employeeList}
                </ul>
            </div>
        );
    }
}