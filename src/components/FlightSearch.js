import React, {Component} from 'react';
import axios from 'axios';
import _ from 'underscore'

import SearchForm from './SearchForm'
import SearchResult from './SearchResult'
import SelectSeat from './SelectSeat'

const SERVER_URL = 'https://flight-search-server.herokuapp.com/flights.json'
const SERVER_URL_PLANES = 'https://flight-search-server.herokuapp.com/planes.json'

class FlightSearch extends Component {
  constructor() {
    super();
    this.state = {
      flights: [],
      planes: [{code: 1, rows:[1,2], columns:['A','B']}]
    }

    this.fetchFlights = this.fetchFlights.bind(this);

  }

    fetchFlights (date, origin, destination) {
      console.log(date, origin, destination)
      axios.get(SERVER_URL).then((response) => {
        const allFlights = response.data
        const matchingFlights = _.where(allFlights, {date: date, origin: origin, destination: destination})
        this.setState({ flights: matchingFlights})
      });

      axios.get(SERVER_URL_PLANES).then((response) => {
        const allPlanes = response.data
        this.setState({ planes: allPlanes})
      });
    };






  render() {
    return (
      <div>
         <h1>Pam Pacific Airline</h1>
         <h2>Flight Search</h2>
         <SearchForm onSubmit={ this.fetchFlights }/>
         <SearchResult flights={ this.state.flights }/>
         <h2>Select Seat</h2>
         <SelectSeat plane={ this.state.planes[0] }/>


      </div>
    )
  }
}

export default FlightSearch;
