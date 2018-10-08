'use strict';

var mysql = require('mysql');
const connection = createDatabaseConnection();

//Example data from server. data.sensor[0].measurement===17
let data= JSON.parse(`
		{"stationID": 3,
		"sensors":[
			{"sensorID": 6,
				"measurement":7},
				{"sensorID":2,
					"measurement": 13},
					{"sensorId":9,
				"measurement": 0.5}
		]}`);


		function createDatabaseConnection(){
			var connection = mysql.createConnection({
				host: '127.0.0.1',
				user: 'root',
				password: '',
				database:'weatherApp'
			});

			return connection;
		}

		let datenow = new Date(Date.now()).toLocaleString();
		dataPulseReceived(data, datenow);
		//should retrn success and sensor data should show

		function dataPulseReceived(data, timenow){


			connection.connect(function(err){
				if(!err) console.log("sucessfuly connected");
			});
}
			//let sql = "select * From sensor_data";

			let sql=`INSERT INTO sensordata( stationID, sensorID, measurement, measurementTime) VALUE(${data.stationID}, ${data.sensors[0].sensorID}, ${data.sensors[0].measurement}, "${datenow}")`;

			connection.query(sql, function(err, results){
				if(err==true) console.log("Something went Wrong");
				else console.log("Success, here are the results:" + JSON.stringify(results));
			})


		// console.log(selectSpecificSensorData(1));
		// console.log(selectSpecificSensorData(4));
		// console.log(selectSpecificSensorData(3));

		function selectSpecificSensorData(sensorID){
			var connection = createDatabaseConnection();
			connection.connect();

			let sql = `SELECT measurement FROM sensor_data WHERE sensorID=${sensorID}`
			connection.query(sql, function(err, results){
				if(err) console.log("error");
				else{
					var resultsINJSON=JSON.parse((JSON.stringify(results)));
					if(resultsINJSON.length==0) return "no entries yet";
					else return resultsINJSON;
				}
			});



			connection.end();
		}
