'use strict';

const Consult = require('../models/Consult.js');

exports.post = (req, res, next) => {
    let birthday = new Date(req.body.birthday);
    
    if ((birthday.getMonth() + 1 == 1 && birthday.getDate() <=19) || (birthday.getMonth() + 1 == 12 && birthday.getDate() >=21)) {req.body.sign = "CAPRICÓRNIO";}
    if ((birthday.getMonth() + 1 == 1 && birthday.getDate() >=20) || (birthday.getMonth() + 1 == 2 && birthday.getDate() <=18)) {req.body.sign = "AQUÁRIO";}
    if ((birthday.getMonth() + 1 == 2 && birthday.getDate() >=19) || (birthday.getMonth() + 1 == 3 && birthday.getDate() <=20)) {req.body.sign = "PEIXES";}
    if ((birthday.getMonth() + 1 == 4 && birthday.getDate() <=20) || (birthday.getMonth() + 1 == 3 && birthday.getDate() >=21)) {req.body.sign = "ÁRIES";}
    if ((birthday.getMonth() + 1 == 5 && birthday.getDate() <=20) || (birthday.getMonth() + 1 == 4 && birthday.getDate() >=21)) {req.body.sign = "TOURO";}
    if ((birthday.getMonth() + 1 == 6 && birthday.getDate() <=20) || (birthday.getMonth() + 1 == 5 && birthday.getDate() >=21)) {req.body.sign = "GÊMEOS";}
    if ((birthday.getMonth() + 1 == 7 && birthday.getDate() <=21) || (birthday.getMonth() + 1 == 6 && birthday.getDate() >=21)) {req.body.sign = "CÂNCER";}
    if ((birthday.getMonth() + 1 == 8 && birthday.getDate() <=21) || (birthday.getMonth() + 1 == 7 && birthday.getDate() >=22)) {req.body.sign = "LEÃO";}
    if ((birthday.getMonth() + 1 == 9 && birthday.getDate() <=21) || (birthday.getMonth() + 1 == 8 && birthday.getDate() >=22)) {req.body.sign = "VIRGEM";}
    if ((birthday.getMonth() + 1 == 10 && birthday.getDate() <=21) || (birthday.getMonth() + 1 == 9 && birthday.getDate() >=22)) {req.body.sign = "LIBRA";}
    if ((birthday.getMonth() + 1 == 11 && birthday.getDate() <=21) || (birthday.getMonth() + 1 == 10 && birthday.getDate() >=22)) {req.body.sign = "ESCORPIÃO";}
    if ((birthday.getMonth() + 1 == 12 && birthday.getDate() <=20) || (birthday.getMonth() + 1 == 11 && birthday.getDate() >=22)) {req.body.sign = "SAGITÁRIO";}
    
    switch (req.body.sign) {
        case "CAPRICÓRNIO":
            req.body.ascendent = verifyAscendent(birthday, 24, 8, 5, 12, 10, 3);
            break;
        case "ÁRIES":
            req.body.ascendent = verifyAscendent(birthday, 21, 2, 8, 9, 3, 8);
            break;
        case "TOURO":
            req.body.ascendent = verifyAscendent(birthday, 21, 3, 9, 10, 4, 10);
            break;
        case "GÊMEOS":
            req.body.ascendent = verifyAscendent(birthday, 22, 4, 7, 11, 5, 8);
            break;
        case "CÂNCER":
            req.body.ascendent = verifyAscendent(birthday, 23, 5, 11, 11, 6, 11);
            break;
        case "LEÃO":
            req.body.ascendent = verifyAscendent(birthday, 23, 6, 0, 11, 7, 1);
            break;
        case "VIRGEM":
            req.body.ascendent = verifyAscendent(birthday, 24, 7, 1, 12, 8, 2);
            break;
        case "LIBRA":
            req.body.ascendent = verifyAscendent(birthday, 24, 8, 2, 12, 9, 3);
            break;
        case "ESCORPIÃO":
            req.body.ascendent = verifyAscendent(birthday, 24, 9, 3, 11, 10, 4);
            break;
        case "SAGITÁRIO":
            req.body.ascendent = verifyAscendent(birthday, 23, 10, 4, 12, 11, 5);
            break;
        case "AQUÁRIO":
            req.body.ascendent = verifyAscendent(birthday, 24, 9, 6, 11, 10, 7);
            break;
        case "PEIXES":
            req.body.ascendent = verifyAscendent(birthday, 23, 10, 7, 12, 11, 8);
            break;
        default:
            break;
    }

    Consult.create({
        userId: req.body.userId,
        sign: req.body.sign,
        ascendent: req.body.ascendent
    });
    res.status(201).send(req.body);
};

exports.get = (req, res, next) => {
    Consult.findAll({ raw: true }).then(function(consults){
        res.status(200).send(consults);
    });
};

exports.findByUser = (req, res, next) => {
    Consult.findAll({ where: { userId: req.params.userId } }).then(function(consults){
        res.status(200).send(consults);
    });
};

exports.delete = (req, res, next) => {
    Consult.destroy({  
        where: { id: req.params.consultId }
    }).then(consults => {
        res.status(200).send();
    })
}

function verifyAscendent(birthday, firstDay, firstMonth, firstIndex, secondDay, secondMonth, secondIndex){

    const signArray = ["TOURO", "GÊMEOS", "CÂNCER", "LEÃO", "VIRGEM", "LIBRA", "ESCORPIÃO", "SAGITÁRIO", "CAPRICÓRNIO", "AQUÁRIO", "PEIXES", "ÁRIES"];
    var ascendent = "";

    if((birthday.getDate() >= firstDay && birthday.getMonth == firstMonth) || (birthday.getDate() >= secondDay && birthday.getMonth == secondMonth)){
        if(birthday.getHours() > 23 || birthday.getHours() <= 1){
            ascendent = signArray[firstIndex];
        } else if (birthday.getHours() > 1 || birthday.getHours() <= 3){
            ascendent = (firstIndex + 2 > signArray.length ? signArray[(firstIndex + 2 - signArray.length) - 1] : signArray[firstIndex + 1]);
        } else if (birthday.getHours() > 3 || birthday.getHours() <= 5){
            ascendent = (firstIndex + 3 > signArray.length ? signArray[(firstIndex + 3 - signArray.length) - 1] : signArray[firstIndex + 2]);
        } else if (birthday.getHours() > 5 || birthday.getHours() <= 7){
            ascendent = (firstIndex + 4 > signArray.length ? signArray[(firstIndex + 4 - signArray.length) - 1] : signArray[firstIndex + 3]);
        } else if (birthday.getHours() > 7 || birthday.getHours() <= 9){
            ascendent = (firstIndex + 5 > signArray.length ? signArray[(firstIndex + 5 - signArray.length) - 1] : signArray[firstIndex + 4]);
        } else if (birthday.getHours() > 9 || birthday.getHours() <= 1){
            ascendent = (firstIndex + 6 > signArray.length ? signArray[(firstIndex + 6 - signArray.length) - 1] : signArray[firstIndex + 5]);
        } else if (birthday.getHours() > 11 || birthday.getHours() <= 13){
            ascendent = (firstIndex + 7 > signArray.length ? signArray[(firstIndex + 7 - signArray.length) - 1] : signArray[firstIndex + 6]);
        } else if (birthday.getHours() > 13 || birthday.getHours() <= 15){
            ascendent = (firstIndex + 8 > signArray.length ? signArray[(firstIndex + 8 - signArray.length) - 1] : signArray[firstIndex + 7]);
        } else if (birthday.getHours() > 15 || birthday.getHours() <= 17){
            ascendent = (firstIndex + 9 > signArray.length ? signArray[(firstIndex + 9 - signArray.length) - 1] : signArray[firstIndex + 8]);
        } else if (birthday.getHours() > 17 || birthday.getHours() <= 19){
            ascendent = (firstIndex + 10 > signArray.length ? signArray[(firstIndex + 10 - signArray.length) - 1] : signArray[firstIndex + 9]);
        } else if (birthday.getHours() > 19 || birthday.getHours() <= 21){
            ascendent = (firstIndex + 11 > signArray.length ? signArray[(firstIndex + 11 - signArray.length) - 1] : signArray[firstIndex + 10]);
        } else if (birthday.getHours() > 21 || birthday.getHours() <= 23){
            ascendent = (firstIndex + 12 > signArray.length ? signArray[(firstIndex + 12 - signArray.length) - 1] : signArray[firstIndex + 11]);
        }
    } else {
        if(birthday.getHours() > 0 || birthday.getHours() <= 2){
            ascendent = signArray[secondIndex];
        } else if (birthday.getHours() > 2 || birthday.getHours() <= 4){
            ascendent = (secondIndex + 2 > signArray.length ? signArray[(secondIndex + 2 - signArray.length) - 1] : signArray[secondIndex + 1]);
        } else if (birthday.getHours() > 4 || birthday.getHours() <= 6){
            ascendent = (secondIndex + 3 > signArray.length ? signArray[(secondIndex + 3 - signArray.length) - 1] : signArray[secondIndex + 2]);
        } else if (birthday.getHours() > 6 || birthday.getHours() <= 8){
            ascendent = (secondIndex + 4 > signArray.length ? signArray[(secondIndex + 4 - signArray.length) - 1] : signArray[secondIndex + 3]);
        } else if (birthday.getHours() > 8 || birthday.getHours() <= 10){
            ascendent = (secondIndex + 5 > signArray.length ? signArray[(secondIndex + 5 - signArray.length) - 1] : signArray[secondIndex + 4]);
        } else if (birthday.getHours() > 10 || birthday.getHours() <= 12){
            ascendent = (secondIndex + 6 > signArray.length ? signArray[(secondIndex + 6 - signArray.length) - 1] : signArray[secondIndex + 5]);
        } else if (birthday.getHours() > 12 || birthday.getHours() <= 14){
            ascendent = (secondIndex + 7 > signArray.length ? signArray[(secondIndex + 7 - signArray.length) - 1] : signArray[secondIndex + 6]);
        } else if (birthday.getHours() > 14 || birthday.getHours() <= 16){
            ascendent = (secondIndex + 8 > signArray.length ? signArray[(secondIndex + 8 - signArray.length) - 1] : signArray[secondIndex + 7]);
        } else if (birthday.getHours() > 16 || birthday.getHours() <= 18){
            ascendent = (secondIndex + 9 > signArray.length ? signArray[(secondIndex + 9 - signArray.length) - 1] : signArray[secondIndex + 8]);
        } else if (birthday.getHours() > 18 || birthday.getHours() <= 20){
            ascendent = (secondIndex + 10 > signArray.length ? signArray[(secondIndex + 10 - signArray.length) - 1] : signArray[secondIndex + 9]);
        } else if (birthday.getHours() > 20 || birthday.getHours() <= 22){
            ascendent = (secondIndex + 11 > signArray.length ? signArray[(secondIndex + 11 - signArray.length) - 1] : signArray[secondIndex + 10]);
        } else if (birthday.getHours() > 22 || birthday.getHours() === 0){
            ascendent = (secondIndex + 12 > signArray.length ? signArray[(secondIndex + 12 - signArray.length) - 1] : signArray[secondIndex + 11]);
        }
    }

    return ascendent;
}