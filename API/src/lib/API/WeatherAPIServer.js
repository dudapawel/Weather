// Name: WeatherAPIServer.js
// Author: Pawel Duda
// Description: class which adds functions to HTTPServer.js 
// there are all functions to response requests to API


const fs = require('fs');

import {Jwt} from   './Jwt.js';
import {UserList} from './UserList';
import {getWeather} from '../weatherServerRequests/getWeather.js'
import {getCityList} from '../weatherServerRequests/getCityList.js'
import {HTTPServer} from './HTTPServer';
import {SERVER_PORT,INDEX_HTML_PATH, MAIN_JS_PATH} from '../constants'




export class WeatherAPIServer{
    constructor(){
        this._lastCityListFromServer=[];
        this.users=new UserList();
        this.jwtToken = new Jwt();

        //binds
        this.returnFile=this.returnFile.bind(this);
        this.getToken=this.getToken.bind(this);
        this.getAvailableCity=this.getAvailableCity.bind(this);
        this.addCityToUser=this.addCityToUser.bind(this);
        this.removeCityFromUser=this.removeCityFromUser.bind(this);
        this.getWeatherList=this.getWeatherList.bind(this);

        this.requestList=[
            {
                pathName:'/',
                numberOfAguments:0,
                requestFunction:this.returnFile(INDEX_HTML_PATH,'text/html' ), 
                checkAutorisation:false
            },
            {
                pathName:'/main.js',
                numberOfAguments:0,
                requestFunction:this.returnFile(MAIN_JS_PATH,'application/javascript' ), 
                checkAutorisation:false
            },
            {
                pathName:'/getToken',
                numberOfAguments:0,
                requestFunction:this.getToken, 
                checkAutorisation:false
            },
            {
                pathName:'/API/city-list',
                numberOfAguments:1,
                requestFunction:this.getAvailableCity, 
                checkAutorisation:false
            },
            {
                pathName:'/API/add-city',
                numberOfAguments:1,
                requestFunction:this.addCityToUser, 
                checkAutorisation:true
            },
            {
                pathName:'/API/remove-city',
                numberOfAguments:1,
                requestFunction:this.removeCityFromUser, 
                checkAutorisation:true
            },
            {
                pathName:'/API/get-weather',
                numberOfAguments:0,
                requestFunction:this.getWeatherList, 
                checkAutorisation:true
            }
        ]

        this.server=HTTPServer(this.requestList, this.jwtToken);
        this.server.listen(SERVER_PORT);
        console.log(`server is listening on ${SERVER_PORT}`)
    }
    
    //API functions

    returnFile(fileDirectory, contentType){
        return function(request, response){
            fs.readFile(fileDirectory, (err, data) => {
                if (err) throw err;
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(data);
            })
        }
    }
    
    getToken(request, response){
        const newUserId=this.users.newUser();
        const token= this.jwtToken.create(newUserId);
        response.writeHead(200, { 'Content-Type':'text/plain' })
        response.end(token);
    }
    
    getAvailableCity(request, response, filterString){ //filtered list of available cities
        return getCityList().then((cityList)=>{
            this._lastCityListFromServer=cityList;
            const filterStringWithOutProcent=filterString.replace(/%20/g,' ')  // %20 exchange ' ' in url
            const filteredCityList = cityList.filter(city=>{
                const cityMatchToFilter=city.name.toLowerCase().startsWith(filterStringWithOutProcent.toLowerCase());
                return cityMatchToFilter;
            });
            const cityListWithoutDoubles=filteredCityList.filter((city, index, list)=>{ //remove cities with the same names and different index
                let noDouble=true;
                for (let i=0; i<index && noDouble; i++){
                    if(city.name===list[i].name){
                        noDouble=false;
                    }
                }
                return noDouble;
            })
            response.writeHead(200, { 'Content-Type':'application/json' });
            response.end(JSON.stringify(cityListWithoutDoubles));
        })
    }
    
    addCityToUser(request, response, userId, cityId){
        const cityIdNumber=Number(cityId);
        const userToModify = this.users.getUser(userId);
        const cityFromCityList=this._lastCityListFromServer.find(element=>{
            return (element.id===cityIdNumber);
        })
        userToModify.addCity(cityFromCityList);
        response.writeHead(200, { 'Content-Type':'application/json' });
        response.end();
    }
    
    removeCityFromUser(request, response, userId, cityId){
        const cityIdNumber=Number(cityId);
        const userToModify = this.users.getUser(userId);
        userToModify.removeCity(cityIdNumber);
        response.writeHead(200, { 'Content-Type':'application/json' });
        response.end();
    }
    
    getWeatherList(request, response, userId){  //list of cities with weather for user's cities
        const userDemanded = this.users.getUser(userId);
        if (userDemanded===undefined){
            return [];
        }
        const citiesToGet = userDemanded.getCities();
        const cityWeathers=[...citiesToGet];
        const cityWeatherPromises=citiesToGet.map((city,index)=>{
            return getWeather(city.id).then((weather)=>{
                cityWeathers[index]={
                    'city':city, 
                    'weather':weather
                };
            })
        })
        Promise.all(cityWeatherPromises).then((resolve, reject)=>{
            response.writeHead(200, { 'Content-Type':'application/json' });
            response.end(JSON.stringify(cityWeathers));
        })
    }

}
