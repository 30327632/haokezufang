import React, { Component,Fragment } from 'react'
// import axios from "axios"
import axios from "../../utils/request.js"
import { Carousel} from 'antd-mobile';
import {API_URL} from "../../utils/url"
import pic1 from "../../assets/images/nav-1.png"
import pic2 from "../../assets/images/nav-2.png"
import pic3 from "../../assets/images/nav-3.png"
import pic4 from "../../assets/images/nav-4.png"
import "./index.scss"
export default class Index extends Component {
    state={
        banner:[],
        imgHeight: 176,
        pics:[
          {id:1,title:"整租",src:pic1},
          {id:2,title:"合租",src:pic2},
          {id:3,title:"地图找房",src:pic3},
          {id:4,title:"去出租",src:pic4}
        ]
    }
    componentDidMount(){

      axios.get("/home/swiper").then((res)=>{
          // console.log(res);
          this.setState({
            banner:res.body
          })
    })
    }
    render() {
        return (
            <Fragment>
               {/* 头部搜索 */}
             <div className="header">
                <div className="search">
                    <div className="position">
                        <span>上海</span>
                        <i className="iconfont icon-arrow"></i>
                    </div>
                    <div className="input" ><i className="iconfont icon-seach"></i></div>
                </div>
                <div className="map"><i className="iconfont icon-map"></i></div>
            </div>
           
              {/*轮播图 */}
            <Carousel
              autoplay={true}
              infinite
              style={{height:"212px"}}
            >
            


              {this.state.banner.map(val => (
                 val.imgSrc=API_URL+val.imgSrc,
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
            {/* 租房例子 */}
            <div className="pics">
              {
                this.state.pics.map(v=><div key={v.id} className="pics-item">
                     <img src={v.src}></img>
                     <p>{v.title}</p>
                  </div>
                )
              }
            </div>
            
   
     </Fragment>
             
             
        )
    }
}

