'use strict';

const routes=require('express').Router();

module.exports=(dataStorage, sendErrorPage, sendStatusPage)=>{
	routes.get('/deletePerson', (req,res)=>
		res.render('getPerson',{title:'Remove', header:'Remove', action:'/deleteperson'})
	);

	routes.post('/deleteperson', (req,res)=>{
		if(!req.body || !req.body.personId) {
			return res.sendStatus(500);
		} else{
			dataStorage.delete(req.body.personId)
				.then(message=>sendStatusPage(res,message))
				.catch(err => sendErrorPage(res,err.message));
		}
	});
	return routes;
};
