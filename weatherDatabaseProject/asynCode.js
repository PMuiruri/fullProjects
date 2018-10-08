
var mysql = require('mysql');
const connection = createDatabaseConnection();
//testFunction();

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

getAllSensorData().then(results =>{
	// console.log(results);
});

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

getSensorDataByLocation("60.17, 24.94").then(results =>{
	 console.log(results);
});


// let gps = '60.17, 24.94';
// getSensorDataByLocation(gps).then(results =>{
// 	console.log(results);
// });
// //

function changeStationStatus(id, status){
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

// changeStationStatus(1, 1);
