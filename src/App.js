import React, { Component,Fragment } from 'react'
import {HashRouter as Router,Route,Link }from "react-router-dom"
import Home from "./pages/home"
import Info from "./pages/info"
import List from "./pages/list"
import Profile from "./pages/profile"
import HKLayout from "./components/HKLayout"
import CityList from "./pages/citylist"
import Test from "./pages/test"
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          {/* props是接受页面传过去的参数 */}
          <Route path="/profile" exact  render={(props)=><HKLayout><Profile {...props}></Profile></HKLayout>}></Route>
          <Route path="/" exact render={(props) =><HKLayout><Home {...props}></Home></HKLayout>}></Route>
          <Route path="/info" exact render={(props) =><HKLayout><Info {...props}></Info></HKLayout>}></Route>
          <Route path="/list" exact render={(props) =><HKLayout><List {...props}></List></HKLayout>}></Route>
          <Route path="/citylist" exact render={(props) =><CityList {...props}></CityList>}></Route>
          <Route path="/test" exact render={(props) =><Test {...props}></Test>}></Route>
        </Router>
      </Fragment>
    )
  }
}


