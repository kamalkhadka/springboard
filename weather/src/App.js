import React, { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "./App.css";

function App() {
  const WEATHER_ID = process.env.REACT_APP_WEATHER_ID;
  const CONSUMER_KEY = process.env.REACT_APP_WEATHER_CONSUMER_KEY;
  const CLIENT_SECRET = process.env.REACT_APP_WEATHER_CLIENT_SECRET;

  const [city, setCity] = useState("");

  var OAuth = require("oauth");
  var header = {
    "X-Yahoo-App-Id": WEATHER_ID,
  };
  var request = new OAuth.OAuth(
    null,
    null,
    CONSUMER_KEY,
    CLIENT_SECRET,
    "1.0",
    null,
    "HMAC-SHA1",
    null,
    header
  );
  request.get(
    "https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sunnyvale,ca&format=json",
    null,
    null,
    function (err, data, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );

  // handleChange(function (event) {
  //   setCity(event.target.value);
  // });

  return (
    <div className="App">
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>
            Get the weather for your favorite city?
          </InputGroup.Text>
          <br />
          <InputGroup.Text>What city?</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          aria-describedby="basic-addon1"
          placeholder="What city?"
        />
      </InputGroup>
    </div>
  );
}

export default App;
