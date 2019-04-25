import React, { Component } from 'react';
import './App.css'
import Dashboard from './components/Dashboard'
import firebase from './firebaseConfig'

// First let's save a piece of data to a variable we can reference later
const todo = { text: "Clean my room" }

firebase.database().ref('todos')
.set(todo)
.then(() => console.log("Todo Written Successfully"))
.catch(error => {
    console.log("Something Went Wrong: ", error.message)
})

const todoText = "Clean my room"

firebase.database().ref('todos')
.push({text: todoText})
.then(() => console.log("Todo Written Successfully"))
.catch(error => {
    console.log("Something went wrong: ", error.messge)
})



export default class App extends Component {
    componentDidMount(){
    firebase.database().ref('todos')
    .on('value', snapshot => {
      const newStateArray = []
      snapshot.forEach(childSnapshot => {
        newStateArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      this.setState({ todos: newStateArray })
    })
}
        state = {
        text: "",
        todos: [],
        user: null,
        isAuthenticated: false
    }
      //handle change
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }


      handleSubmit = e => {
        e.preventDefault()
        firebase.database().ref('todos')
        .push({ text: this.state.text })
        .then(() => {
          this.setState({ text: "" })
          console.log("Data Created Successfully")
        })
        .catch(error => {
            console.log("Something Went Wrong: ", error)
         })
      }


  render(){
        return(
          <div className="App">
          <h1>Welcome to React Fire Todos</h1>
          <Dashboard 
          todos={this.state.todos}
          text={this.state.text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} 
          />
          </div>

       )
    }
}