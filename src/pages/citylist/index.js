import React, { Component, Fragment } from 'react'
import "./index.scss"
import axios from "../../utils/request"
import { NavBar, Icon } from 'antd-mobile';
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
export default class index extends Component {
    state = {
        all_city: [],
        hotCityList: [],
        cityList: [],
        key_list: [],
        selected:0
    }

    getRowHeight = ({ index }) => { //一行的高度  获取那个索引的那项的高度
        var item = this.state.all_city[index]
        return (Object.values(item)[0].length + 1) * 60
    }

    rowRenderer = ({ key, index, style }) => {
        let list = Object.values(this.state.all_city[index])[0] //获取当前城市列表  
        let title = Object.keys(this.state.all_city[index])[0]   //获取当前标题
        return (
            <div className="city" key={key} style={style}>
                <div className="city_title">{title}</div>
                {//渲染文本
                    list.map((v, i) => <div className="city_item" key={i}>
                        {v}
                    </div>)
                }

            </div>
        );
    }

    getAllCity = async () => {
        let hotCityList = (await axios.get("/area/hot")).body  // 获取热门城市列表
        let cityList = (await axios.get("/area/city?level=1")).body //获取一级城市列表
        //创建一个数据结构 对象数组  索引为A-Z或热门城市
        let all_city = [
            { "当前定位": ["上海"] },
            { "热门城市": hotCityList.map(v => v.label) },
        ]

        //对城市列表进行排序
        cityList.sort(function (a, b) {
            return a.short.localeCompare(b.short) //以a.short  去比较b.short
        })

        //遍历城市列表  看索引是否存在  如果并不存在  就添加一个新的对象，否则在当前对象的索引值(数组)之后追加一个新的数据
        cityList.map(v => {
            var firstLetter = v.short[0].toUpperCase() //获取数组中的每一项的short第一个字母  转成大写  
            var index = all_city.findIndex(v => {   //在所有城市中查找 有没有这个索引
                if (v[firstLetter]) {   //v[firstLetter]  类比如 v.A  有值 就说明已经存在  存在就继续在原来的后面追加  不然的话 就在所有城市列表中追加一个新的键值
                    return true
                }
            })
            if (index == -1) {  //如果不存在  就在本来基础上追加一个键值
                all_city.push({ [firstLetter]: [v.label] })
            } else {      //如果能找到  就在本来的索引值后面追加一个新的label
                all_city[index][firstLetter].push(v.label)
            }
        })

        //获取关键字
        let key_list = all_city.map(v => Object.keys(v)[0])  //获取键
        key_list[0] = "#"
        key_list[1] = "热"

        this.setState({
            all_city,
            key_list
        })
    }

    componentDidMount = () => {
        this.getAllCity()
    }

    render() {
        return (
            <Fragment>
                {/*城市列表标题 */}
                <NavBar
                    style={{ backgroundColor: "#f6f5f6" }}
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>
                {/* 关键字渲染 */}
                <div className="keyList">
                    {
                        this.state.key_list.map((v, i) => <div className={this.state.selected===i?"key_item active":"key_item"} key={i}>{v}</div>)
                    }
                </div>
                <AutoSizer className="city">
                    {({ height, width }) => (
                        <List
                            height={height}
                            rowCount={this.state.all_city.length}  //有多少行
                            rowHeight={this.getRowHeight}
                            rowRenderer={this.rowRenderer}
                            width={width}
                        />
                    )}
                </AutoSizer>

            </Fragment>
        )
    }
}
