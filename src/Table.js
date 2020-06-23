import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    let userEmail = localStorage.getItem('email');
    if (!userEmail) return null;
    axios.get(`https://i5imc6al18.execute-api.us-east-2.amazonaws.com/api/eventFunction?email=${userEmail}`)
      .then(res => {
        const persons = res.data;
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
        // let elementToRender = []
        // for (var i = 0; i < data.length; i++) {
        //     elementToRender.push(`<td>${data[i].name}</td><td>${data[i].description}</td>`)
        // }
        const listItems = data.map((element) => 
            <tr>
                <td>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.status}</td>
                <td>{element.start_time}</td>
                <td>{element.stop_time}</td>
                <td>{element.User}</td>
            </tr>
        )
        //console.log(elementToRender)
        this.setState({ listItems });
      })
  }

  render() {
    return (
      <table>
          <thead>
          <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>Stop Time</th>
              <th>Email Id</th>
          </tr>
          </thead>
          <tbody>
              {this.state.listItems} 
          </tbody>
      </table>
    )
  }
}