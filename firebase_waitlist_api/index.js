var config = {
    apiKey: "AIzaSyChZfgaMdEk2hRX9czDZy5I_uvUoz5n2ic",
    authDomain: "hackillinois2018-d357f.firebaseapp.com",
    databaseURL: "https://hackillinois2018-d357f.firebaseio.com",
    projectId: "hackillinois2018-d357f",
    storageBucket: "hackillinois2018-d357f.appspot.com",
    messagingSenderId: "607645919867"
};
var firebase = require('firebase');
firebase.initializeApp(config);
var database = firebase.database();
var express = require('express')
var app = express()

function setupData(ticketNumber) {
    firebase.database().ref('waitlist/' + ticketNumber).set({
        dr: 0,
        age: 0,
        blood: 0,
        gender: 0,
        ethnicity: 0,
        bmi: 0,
        lod: 0,
        time: new Date().toISOString()
    });
    num = ticketNumber++;
    firebase.database().ref('ticket_number').update({ticket_number: num });
}

function getNumberInQueue(callback) {
    firebase.database().ref().once('value').then((snapshot) => {
        callback(snapshot);
    });
}

app.get('/api/newTicket', function (req, res) {
    firebase.database().ref('ticket_number').once('value').then((snapshot) => {
        var ticket_number = snapshot.val().ticket_number + 1;
        console.log(ticket_number);
        setupData(ticket_number);
        res.send(ticket_number + '');
    })
});

app.get('/api/insertValue/:dr/:age/:blood/:gender/:ethnicity/:bmi/:lod', function (req, res) {
    var data = {'dr': req.params.dr, 'age': req.params.age, 'blood': req.params.blood, 'gender': req.params.gender, 'ethnicity': req.params.ethnicity, 'bmi': req.params.bmi, 'lod': req.params.lod};
    firebase.database().ref('waitlist/' + ticketNumber).update({
        dr: data.dr,
        age: data.age,
        blood: data.blood,
        gender: data.gender,
        ethnicity: data.ethnicity,
        bmi: data.bmi,
        lod: data.bmi,
        time: new Date().toISOString()
    });
})

app.get('/api/getLineLength', (req, res) => {
    firebase.database().ref('waitlist/').once('value').then((snapshot) => {
        console.log(snapshot.val());
        res.send(snapshot.val());
    });
});

app.get('/api/getNextFourInLine', (req, res) => {
    firebase.database().ref().once('value').then((snapshot) => {

    });
});

app.post('/api/removeNumber', (req, res) => {
    firebase.database().ref().once('value').then((snapshot) => {

    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));