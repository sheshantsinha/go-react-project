import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
          
    axios.get(`https://i5imc6al18.execute-api.us-east-2.amazonaws.com/deplopment/eventFunction`, { 'Access-Control-Allow-Origin' : '*' })
      .then(res => {
        const persons = JSON.parse(res.data.body);
        console.log(persons)
        let data = []
        for (var i = 0; i < persons.length; i++) {
            let temp = {
                ID: persons[i].ID.N,
                User: persons[i].User.S,
                name: persons[i].name.S,
                description: persons[i].description.S,
                User: persons[i].User.S,
                start_time: persons[i].schedule.M.start_time.S,
                stop_time: persons[i].schedule.M.stop_time.S,
                status: persons[i].status.S
            }
            data.push(temp)
        }
        console.log(data)
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        Hello
      </ul>
    )
  }
}