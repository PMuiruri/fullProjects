'use strict';

const routes=require('express').Router();

const initRoutes = function(storage, sendErrorPage){
	let dataStorage=storage;

	routes.get('/all', (req,res)=>{
		dataStorage.getAll()
			.then(result=>res.render('allPersons', {result:result}))
			.catch(err=>sendErrorPage(res, err.message));
	});

	routes.get('/getPerson', (req,res)=>
		res.render('getPerson', {
			title:'Get',
			header:'Get',
			action:'/getPerson'}
		)
	);

	routes.post('/getPerson', (req,res)=>{
		if(!req.body){
			res.sendStatus(401);
		} else{
			let personId=req.body.personId;
			dataStorage.get(personId)
				.then(person=>res.render('personPage', {person}))
				.catch(err=>sendErrorPage(res,err.message,'PersonError','Oops!'));
		}
	});

	return routes;
};

module.exports=initRoutes;
