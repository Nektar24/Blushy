const { GoogleSpreadsheet } = require("google-spreadsheet");
const { promisify } = require("util");

const days = require("./data/days.json");
const standards = require("./data/variables.json");
const companies = require("./data/companies.json");

const creds = require("./client_secret.json");

// this is just an id of a spreadsheet, it's not a password or a token.
const doc = new GoogleSpreadsheet("1H1ThzWlbz9B9ZpKGe8-SOyQ2u2lcxWbc_jrL6FiQLCM");

module.exports.resetSpreadsheet = async function (){
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    if (days.days < 2) {return;}
    //let header = sheet.headerValues;
    await sheet.clear();
    let header = ['Day'];
    for (company in companies){
        header.push(company);
    }
    header.push("Taxation");
    header.push("Taxation_Ammount");
    header.push("Goodwill");
    for (company in companies){
        header.push("G_"+company);
    }
    header.push("Date");
    sheet.setHeaderRow(header);
}

module.exports.accessSpreadsheet = async function (exelnumbers){
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });
    await doc.loadInfo();
    //console.log("------------------");
    //console.log(doc.title);

    
    let today = new Date().toISOString().slice(0, 10)

    const sheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id]

    //console.log("------------------");
    //console.log(`Title : ${sheet.title} , Number of Rows : ${sheet.rowCount}`);
    //let rows = await sheet.getRows();


    let row = {};
    row["Day"] = days.days;
    row["Date"] = today;
    for (company in exelnumbers.companies){
        row[company] = exelnumbers.companies[company].changedby;
    }

    if (!isEmptyObject(exelnumbers.goodwill)){
        row["Goodwill"] = 1;
        for (company in exelnumbers.companies){
            row["G_"+company] = companies[company].goodwill;
        }
    } else {
        row["Goodwill"] = 0;
    }
    if (exelnumbers.peopletaxed){
        row["Taxation"] = 1;
        row["Taxation_Ammount"] = standards.TAX;
    } else {
        row["Taxation"] = 0;
    }
    await sheet.addRow(row);
}

function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
}

// uncoment this to test it :
//this.accessSpreadsheet({day : 0, companies : {"NOODL":{company:"NOODL",changedby:2,people_affected:1}}, goodwill : {ammount :1 , logs:{}},peopletaxed : 1});