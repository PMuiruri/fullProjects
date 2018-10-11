
var mysql = require('mysql');
const connection = createDatabaseConnection();
testFunction();

function testFunction(){
	connection.connect();
	selectSpecificSensorData(1).then(results =>{
		console.log(results);
	});
	selectSpecificSensorData(4).then(results =>{
		console.log(results);
	});
	selectSpecificSensorData(7).then(results =>{
		console.log(results);
		connection.end();
	});
	getAllSensorData().then(results =>{
		console.log(results);
	});
	getSensorDataByLocation("60.17, 24.94").then(results =>{
		 console.log(results);
	});
	changeStationStatus(1, 1).then(results =>{
		console.log(results);
	});
	console.log("Hello");
}

function selectSpecificSensorData(sensorID){
	let sql= `SELECT measurement FROM sensordata WHERE sensorID = ${sensorID}`

	return new Promise((resolve, reject) =>{
		connection.query(sql, (error, results) =>{
			if(error) reject(error);
			else if (results.length ===0) resolve("No records found");
			else {
				resolve(JSON.stringify(results));
			}
		});
	});
}

function createDatabaseConnection(){
	var connection = mysql.createConnection({
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database:'weatherApp'
	});

	return connection;
}

function getAllSensorData(){
	let sql= `SELECT * FROM sensordata`

	return new Promise((resolve, reject) =>{
		connection.query(sql, (error, results) =>{
			if(error) reject(error);
			else if (results.length ===0) resolve("No records found");
			else {
				resolve(JSON.stringify(results));
			}
		});
	});
}

function getSensorDataByLocation(g){
	let sql= `SELECT sensordata.sensorID, sensordata.sensorName, sensordata.StationID, sensordata.measurement, sensordata.measurementTime FROM sensordata, station, location WHERE sensordata.StationID = station.stationID AND location.gps ="${g}" `

	return new Promise((resolve, reject) =>{
		connection.query(sql, (error, results) =>{
			if(error) reject(error);
			else if (results.length ===0) resolve("No records found");
			else {
				resolve(JSON.stringify(results));
			}
		});
	});
}

function changeStationStatus(id, status){
	//station status is a number 1 On or 0 off 2 "Error"
	let sql = `UPDATE station SET state = ${status} WHERE station.stationID = ${id}`
	return new Promise((resolve, reject) =>{
		connection.query(sql, (error, results) =>{
			if(error) reject(error);
			else if (results.length ===0) resolve("No records found");
			else {
				resolve(JSON.stringify(results));
			}
		});
	});
}
