import React, { Component } from 'react'
import { Button } from 'antd-mobile';
import Img from "./assets/images/logo192.png"


export default class App extends Component {
  render() {
    return (
      <div>
        <img src={Img}></img>
        <Button>按钮</Button>
      </div>
    )
  }
}
