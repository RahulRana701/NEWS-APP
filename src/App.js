import './App.css';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar'
// made class based component, in function we directly return , in class we first render then return.
// render is used to display our jsx on screen it renders jsx, jsx first get compiled to html then renders


import React, { Component } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
   apikey=process.env.REACT_APP_API_KEY
// initally progress will be zero
  state = {
    progress: 0
  }
  setprogress=(progress)=> {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        {/* but when I am trying to go to here and there in links it is not opening , if we reload it opens once */}
        {/* after that it doesn't , this means our component is not remounting, it is because , the react
        thinks that component is already mounted why should I remount again.., to do this we have to give a
        unique key to it*/}
        <Router>
          <Navbar />
          {/* now loading bar will be added after navbar */}
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          {/* we passed set progress function to news because we want to set our progress through news */}
          <Routes>
            <Route exact path="/"
              element={<News setProgress={this.setprogress}  apikey={this.apikey}  key={'general'} country='us' category='general' />}>
            </Route>
            <Route exact path="/science"
              element={<News setProgress={this.setprogress}  apikey={this.apikey} key={'science'} country='us' category='science' />}>
            </Route>
            <Route exact path="/technology"
              element={<News setProgress={this.setprogress} apikey={this.apikey}  key={'technology'} country='us' category='technology' />}>
            </Route>
            <Route exact path="/sports"
              element={<News setProgress={this.setprogress}  apikey={this.apikey} key={'sports'} country='us' category='sports' />}>
            </Route>
            <Route exact path="/general"
              element={<News setProgress={this.setprogress} apikey={this.apikey}  key={'general'} country='us' category='general' />}>
            </Route>
            <Route exact path="/entertainment"
              element={<News setProgress={this.setprogress} apikey={this.apikey}  key={'entertainment'} country='us' category='entertainment' />}>
            </Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

