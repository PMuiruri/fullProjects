'use strict';
/* eslint-disable no-console*/

const Database= require('./database');
const sqlStatements= require('./sqlStatements');
const options=require('./options');


// Move to a class instead
// const personDb = new Database({
// 	host:'localhost',
// 	port: 3306,
// 	user:'saku',
// 	password:'secret',
// 	database:'persondatabase'
// }, true);

const allSql=sqlStatements.getAllSql.join(' ');
const personSql=sqlStatements.getPersonSql.join(' ');
const insertSql=sqlStatements.insertPersonSql.join(' ');
// const deleteSql=sqlStatements.deletePersonSql.join(' ');
// const updateSql=sqlStatements.updatePersonSql.join(' ');

class PersonDatabase{
	constructor(options, debug=false){
		this.personDb=new Database(options, debug);
	}

	getAll(){
		return new Promise(async (resolve, reject)=>{
			try{
				let result= await this.personDb.doQuery(allSql);
				resolve(result);
			}
			catch(err){
				reject(fatalError(err));
			}
		});
	}
	get(personId){
		return new Promise(async (resolve, reject)=>{
			try{
				let result= await this.personDb.doQuery(personSql, +personId);
				if(result.length===0){
					reject(new Error('Person unknown'));
				} else{
					resolve(result[0]);
				}
			}
			catch(err){
				reject(fatalError(err));
			}
		});
	}

	insert(person){
		return new Promise(async (resolve,reject)=>{
			try{
				let result = await this.personDb.doQuery(insertSql,
					+person.personId,
					person.firstname,
					person.lastname,
					person.department,
					+person.salary
				);
				if(result.affectedRows===0){
					reject(new Error('No person was added'));
				} else{
					resolve(`Person with id ${person.personId} was added`);
				}
			}
			catch(err){
				reject(fatalError(err));
			}
		});
	}
}//end of class

module.exports=function initDataStorage(debug=false){
	return new PersonDatabase(options, debug);
};

function fatalError(err){
	return new Error(`Sorry! Error in our program. ${err.message}`);
}
