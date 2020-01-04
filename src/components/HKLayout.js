import { TabBar } from 'antd-mobile';
import React from "react"
// 让HKLayout 接路由的信息
import {withRouter} from "react-router-dom"
 class HKLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
    };
  }
  render() {
    return (
      <div style={{position: 'fixed', height: '100%', width: '100%', bottom: 0} }>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21B97A"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<i className="iconfont icon-ind"></i>}
            selectedIcon={<i className="iconfont icon-ind"></i>}
            selected={this.props.match.path === '/'}
            onPress={() => {
                this.props.history.push("/")
            }}
          >
            {this.props.match.path === '/'&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={
                <i className="
                iconfont icon-findHouse"></i>
            }
            selectedIcon={
                <i className="
                iconfont icon-findHouse"></i>
            }
            title="找房"
            key="zhaofang"
            selected={this.props.match.path === '/list'}
            onPress={() => {
                this.props.history.push("/list")
            }}
          >
            {this.props.match.path === '/'&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={
                <i className="iconfont icon-infom"></i>
            }
            selectedIcon={
                <i className="iconfont icon-infom"></i>
            }
            title="资讯"
            key="profile"
            selected={this.props.match.path === '/profile'}
            onPress={() => {
                this.props.history.push("/profile")
            }}
          >
            {this.props.match.path === '/'&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="
            iconfont icon-myinfo"></i>}
            selectedIcon={<i className="
            iconfont icon-myinfo"></i>}
            title="我的"
            key="my"
            selected={this.props.match.path === '/info'}
            onPress={() => {
                this.props.history.push("/info")
            }}
          >
            {this.props.match.path === '/'&&this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
//withRouter: 把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
//让这个别人封装的HKLayout  拥有路由的能力
export default withRouter(HKLayout)
