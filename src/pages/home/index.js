import React, { Component } from 'react'
import axios from "axios"
 import { Carousel, WingBlank } from 'antd-mobile';
export default class Index extends Component {
    state={
        banner:[],
        imgHeight: 176

    }
    componentDidMount(){
      axios.get("http://hkzf.zbztb.cn/home/swiper").then((res)=>{
          console.log(res);
          this.setState({
            banner:res.data.body
          })
    })
    }
    render() {
        return (
            <WingBlank>
            <Carousel
              autoplay
              infinite
            >
              {this.state.banner.map(val => (
                  val.imgSrc="http://hkzf.zbztb.cn"+val.imgSrc,
                <a
                  key={val}
                  href=""
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={val.imgSrc}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                    //   window.dispatchEvent(new Event('resize'));
                    //   this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>
        )
    }
}

