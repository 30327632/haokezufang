import React, { Component, Fragment } from 'react'
// import axios from "axios"
import axios from "../../utils/request.js"
import { Carousel } from 'antd-mobile';
import { API_URL } from "../../utils/url"
import pic1 from "../../assets/images/nav-1.png"
import pic2 from "../../assets/images/nav-2.png"
import pic3 from "../../assets/images/nav-3.png"
import pic4 from "../../assets/images/nav-4.png"
import "./index.scss"
export default class Index extends Component {
  state = {
    banner: [],
    imgHeight: 212,
    pics: [
      { id: 1, title: "整租", src: pic1 },
      { id: 2, title: "合租", src: pic2 },
      { id: 3, title: "地图找房", src: pic3 },
      { id: 4, title: "去出租", src: pic4 }
    ],
    group: [],
    newsList: []
  }
    toCity=(props)=>{
      this.props.history.push("/citylist")
      //  console.log(this);
    }
  
  componentDidMount() {
    // 获取轮播图的数据
    axios.get("/home/swiper").then((res) => {
      this.setState({
        banner: res.body
      })
    })

    // 获取租房小组的数据
    axios.get(`/home/groups?area=AREA|88cff55c-aaa4-e2e0`).then(res => {
      this.setState({
        group: res.body
      })
    })

    // 获取最新资讯
    axios.get("/home/news?area=AREA%7C88cff55c-aaa4-e2e0").then(res=>{
      this.setState({
        newsList:res.body
      })
    })

  }
  render() {
    return (
      <Fragment>
        {/* 头部搜索 */}
        <div className="header">
          <div className="search">
            <div className="position" onClick={this.toCity}>
    <span style={{fontSize:"16px"}}>{localStorage.getItem("cityName")||"广州"}</span>
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
          style={{ height: "212px" }}
        >
          {this.state.banner.map(val => (
            <a
              key={val}
              href=""
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={API_URL + val.imgSrc}
                alt=""
                style={{ width: '100%', verticalAlign: 'top', height: this.state.imgHeight }}
                onLoad={() => {
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
            this.state.pics.map(v => <div key={v.id} className="pics-item">
              <img src={v.src}></img>
              <p>{v.title}</p>
            </div>
            )
          }
        </div>
        {/* 租房小组 */}
        <div className="group clearfix">
          <div className='title'>
            <h2>租房小组</h2>
            <p>更多</p>
          </div>
          <div className="content">
            {
              //遍历返回的数据  
              this.state.group.map(v => <div className="item" key={v.id}>
                <div className="item-content">
                  <p className="item-title">{v.title}</p>
                  <p className="item-desc">{v.desc}</p>
                </div>
                <div className="img"><img src={API_URL + v.imgSrc}></img></div>
              </div>
              )
            }
          </div>

        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h2>最新资讯</h2>
          <div className="content">
            {
              this.state.newsList.map(v => <div key={v.id} className="news-item">
                <div className="img"><img src={API_URL+v.imgSrc}></img></div>
                <div className="title">
                     <h3>{v.title}</h3>
                  <div className="text">
                   <span className="from">{v.from}</span>
                   <span className="date">{v.date}</span>
                  </div>
                </div>
              </div>)
            }
          </div>
        </div>
      </Fragment>


    )
  }
}

