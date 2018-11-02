//This is the class file to create database connection
'use strict';

const mysql=require('mysql');

module.exports=class Database{
	constructor(options, debug=false){
		//collects the data for the database connection
		this.options=options;
		this.debug=debug;
	}
	doQuery (sql,...parameters){
		// creates callback to wait for all parameters to be retrieved
		return new Promise((resolve, reject)=>{
			//create connection
			let connection=mysql.createConnection(this.options);

			//make query to database using the createConnection
			let sqlStatement=connection.query(sql, [...parameters], (err, result)=>{
				if(err){
					reject(new Error('SQL Error:'+err));
				}
				if(this.debug){
					/*eslint-disable no-console*/
					console.log(sqlStatement.sql);
				}
				resolve(result);
			});
			connection.end();
		});
	}
};
