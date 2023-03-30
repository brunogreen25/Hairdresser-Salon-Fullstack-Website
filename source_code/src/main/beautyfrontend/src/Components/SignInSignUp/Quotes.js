import React from 'react';
import './Quotes.css';

const url = 'https://heroku-favorito-backend.herokuapp.com/rest/rating/rating-number:';

export default class Quotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        fetch(url + this.props.ratingNumber.toString(), {
            headers: {
                'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com'
            }
        })
            .then(response => response.json())
            .then(fetchedRatings => {
                //nakon ovoga se poziva render metoda
                this.setState({
                    comments: fetchedRatings
                });
            });
    }

    render() {
        let ratingsDiv = [];

        for(let i = 0;i<this.props.ratingNumber;i++) {
            ratingsDiv.push(
                <div className="Rating" key={ i*9 }>
                    {this.state.comments[i]}
                </div>

            );
        }


        return (
            <div className="Quotes">
                {ratingsDiv}
            </div>
        );
    }

}