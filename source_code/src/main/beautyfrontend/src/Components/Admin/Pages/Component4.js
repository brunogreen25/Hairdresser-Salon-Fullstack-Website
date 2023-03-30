import React from 'react';
import './Component4.css';

const url = 'https://heroku-favorito-backend.herokuapp.com/rest';
let init = {
    method: '',
    headers: {
        'Access-Control-Allow-Origin': 'https://heroku-favorito-backend.herokuapp.com',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: null
};

export class Component4 extends React.Component {
    constructor(props) {
        super(props);

        this.getDiscounts();
    }

    getDiscounts = () => {
        init.method = 'get';
        init.body = null;

        fetch(url + '/discounts', init)
            .then(response => response.json())
            .then(discounts => {
                if(discounts.length !== 0) {

                    let discountF = discounts.filter(discount => discount.type === "F")[0];
                    let discountR = discounts.filter(discount => discount.type === "R")[0];

                    document.getElementById('recCounter').value = discountR.value;
                    document.getElementById('freqAtt').value = discountF.discountFrequency;
                    document.getElementById('attCounter').value = discountF.value;
                }
            })
            .catch(err => {
                alert("Nismo u mogućnosti obraditi zahtjev!")
            })
    }

    saveRec = () => {
        let discountRPerc = document.getElementById('recCounter').value;

        if(this.checkPercentage(discountRPerc)) {
            return;
        }

        if(discountRPerc === "") {
            discountRPerc = "0";
        }

        let discountR = {
            percentage: discountRPerc
        }

        init.method = 'post';
        init.body = JSON.stringify(discountR);

        fetch(url + '/discounts/updateDiscountR', init)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                alert("Nismo u mogućnosti obraditi zahtjev!")
            })
    }

    checkPercentage(percentage) {
        if(percentage < 0 || percentage > 100) {
            alert("Postotak mora biti u intervalu [0, 100]");
            return true;
        }
    }

    saveAtt = () => {
        let discountFFreq = document.getElementById('freqAtt').value;
        let discountFPerc = document.getElementById('attCounter').value;

        if(this.checkPercentage(discountFPerc)) {
            return;
        }

        if( discountFFreq < 0) {
            alert("Dolaznost ne može biti negativna");
            return;
        }

        discountFPerc = discountFPerc==="" ? "0" : discountFPerc;
        discountFFreq = discountFFreq==="" ? 0 : discountFFreq;

        let discountF = {
            frequency: parseInt(discountFFreq),
            percentage: discountFPerc
        }

        init.method = 'post';
        init.body = JSON.stringify(discountF);

        fetch(url + '/discounts/updateDiscountF', init)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                alert("Nismo u mogućnosti obraditi zahtjev!")
            })
    }

    render() {
        return (
            <div className="component-fourth">
                <div className={"recommendation-container"}>
                    <h2><br/><br/><br/>Popusti na preporuku</h2><br/>
                    Iznos popusta će se obračunavati klijentu svaki puta<br/>
                    kad se njegova e-mail adresa upiše u polje preporuke<br/>
                    prilikom registracije novog klijenta. <br/><br/>
                    <b>Napomena:</b> upisom nule u polje, popust će se smatrati nevažećim.<br/><br/>
                    Iznos popusta zbog dodjeljivanja preporuke:<br/> <input type={'number'} min={0} max={100} id={'recCounter'}/>%
                    <br/><br/>
                    <button onClick={this.saveRec}>SPREMI</button>
                </div>

                <div className={'attendance-container'}>
                    <h2><br/><br/><br/>Popusti na dolaznost</h2><br/>
                    Nakon svakih <input type={'number'} min={0} max={100} id={'freqAtt'}/> ostvarenih rezervacija
                    termina<br/>
                    klijentu će se obračunati popust u iznosu od  <input type={'number'} min={0} max={100} id={'attCounter'}/>
                     %
                    <br/>na ukupnu cijenu.<br/><br/>
                    <b>Napomena:</b> upisom nule u oba polja, <br/> popust će se smatrati nevažećim.<br/><br/>
                    <br/><br/>
                    <button onClick={this.saveAtt}>SPREMI</button>
                </div>
            </div>
        );
    }
}