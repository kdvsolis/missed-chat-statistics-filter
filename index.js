//Loading configuration files. 
//Needs to have config.json alongside.
//You may need to have a copy of config.json.example to config.json on the very same directory
require('./config');

//Modules used
const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
const request = require('request')
const datetime = require('node-datetime');
const jsonQuery = require('json-query');

//Allow UTF-8 encoding and proper string JSON formatting
restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

//Path that accepts 'start' datetime and 'end' datetime for filtering
restService.get('/get_missed_chats', function(req, res) {
    //Sends request to URL_SOURCE to retrieve JSON data listing
    request.get(process.env.URL_SOURCE, {
        json: {
        }
      }, (error, resp, body) => { //Handling for non 200 response code.
        if (error) {
          console.error(error)
          return
        }

        //Querying process starts here
        var start = "";
        var end = "";

        if(typeof req.query.start === 'undefined') {
          start = datetime.create(body[0].date).getTime()
        } else {
          start = datetime.create(req.query.start).getTime();
        }
        if(typeof req.query.end === 'undefined') {
          end = datetime.create(body[body.length - 1].date).getTime()
        } else {
          end = datetime.create(req.query.end).getTime();
        }
        var result = jsonQuery('body[*:missedChatArray & missedChats != 0]', {
          data: { body : body },
          locals: {
            missedChatArray: function (item) {
              var queriedDate = datetime.create(item.date).getTime();
              return queriedDate >= start && queriedDate <= end;
            }
          }
        }).value
        //Querying process ends here then send the result as response
        res.send(result);
    })

});

//Starts the HTTP server
restService.listen((process.env.PORT || 8000), () => console.log('Express server is listening on port 8000'));