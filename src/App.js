import React, { Component } from 'react';
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import firebase from './firebaseConfig'



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
        firebase.auth().onAuthStateChanged(firebaseUser => {
      firebaseUser ?
        this.setState({
          user: firebaseUser.displayName,
          isAuthenticated: true
        })
        :
        this.setState({
          user: null,
          isAuthenticated: false
        })
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


      handleSubmit = event => {
        event.preventDefault()
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

      handleRemove = todoId => {
            firebase.database().ref(`todos/${todoId}`)
            .remove()
            .then(() => console.log("Data Removed Successfully"))
            .catch(error => { 
                console.log("Something Went Wrong", error)
             })
          }

      handleLogin = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(() => {
              console.log("User Logged In Successfully")
            })
            .catch(error => {
              console.log("Something Went Wrong: ", error.message)
            })
          }


  render(){
        return(
          <div className="App">
          <h1>Welcome to React Fire Todos</h1>
          {
            this.state.isAuthenticated ?
          <Dashboard 
          todos={this.state.todos}
          text={this.state.text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleRemove={this.handleRemove} 
          />
          :
          <Login
            handleLogin={this.handleLogin}
            />
        }
          </div>
       );
    }
}
