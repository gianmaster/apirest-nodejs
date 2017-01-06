/*jslint node: true */
"use strict"

function api(verb, endpoint, args){
    console.log(`${verb} ${endpoint}`, args);
}

module.exports = {
    api
}
