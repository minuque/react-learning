/**
 * React Router 基础示例
 *
 * 【Vue3 用户快速上手】
 * - Vue3 使用 vue-router，配置 routes 数组
 * - React 使用 react-router-dom，配置类似
 * - Vue3 的 <router-link> 对应 React 的 <Link> 或 <NavLink>
 * - Vue3 的 useRoute() 对应 React 的 useParams()/useLocation()
 * - Vue3 的 useRouter() 对应 React 的 useNavigate()
 */

import { useState } from 'react'
import { Routes, Route, Link, NavLink, useParams, useLocation, useNavigate, Outlet } from 'react-router-dom'

// 首页组件
function Home() {
  return (
    <div className="demo-box">
      <h2>首页</h2>
      <p>欢迎来到 React Router 示例！</p>
      <div className="code-block">
        <pre>{`// Vue3
const router = useRouter()
router.push('/about')

// React
const navigate = useNavigate()
navigate('/about')`}</pre>
      </div>
    </div>
  )
}

// 关于页面组件
function About() {
  return (
    <div className="demo-box">
      <h2>关于页面</h2>
      <p>这是一个关于页面的示例。</p>
      <div className="code-block">
        <pre>{`// Vue3
<router-link to="/user/1">用户1</router-link>

// React
<Link to="/user/1">用户1</Link>`}</pre>
      </div>
    </div>
  )
}

// 用户列表页面
function UserList() {
  const users = [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 28 },
  ]

  return (
    <div className="demo-box">
      <h2>用户列表</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id}>
            {/* Vue3: <router-link :to="'/user/' + user.id"> */}
            <Link to={`/user/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="code-block">
        <pre>{`// 使用 Link 组件进行导航
<Link to={"/user/" + user.id}>
  {user.name}
</Link>`}</pre>
      </div>
    </div>
  )
}

// 用户详情页面 - 演示 useParams
function UserDetail() {
  // Vue3: const route = useRoute(); const id = route.params.id
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="demo-box">
      <h2>用户详情</h2>
      <p>用户 ID: {id}</p>
      <p>当前路径: {location.pathname}</p>

      <button onClick={() => navigate(-1)}>返回上一页</button>

      <div className="code-block">
        <pre>{`// 获取动态路由参数
const { id } = useParams()

// 获取当前位置信息
const location = useLocation()

// 编程式导航
const navigate = useNavigate()
navigate('/user-list')  // 跳转到指定路径
navigate(-1)            // 返回上一页`}</pre>
      </div>
    </div>
  )
}

// 嵌套路由父组件
function UserLayout() {
  return (
    <div className="demo-box">
      <h2>用户中心</h2>
      <nav className="sub-nav">
        {/* NavLink 会在当前路径匹配时添加 active class */}
        <NavLink to="/user-center/profile" className={({ isActive }) => isActive ? 'active' : ''}>
          个人资料
        </NavLink>
        <NavLink to="/user-center/settings" className={({ isActive }) => isActive ? 'active' : ''}>
          设置
        </NavLink>
      </nav>

      {/* 嵌套路由出口 - 类似于 Vue 的 <router-view /> */}
      <Outlet />
    </div>
  )
}

// 用户资料子页面
function UserProfile() {
  return (
    <div className="sub-page">
      <h3>个人资料</h3>
      <p>姓名: 张三</p>
      <p>邮箱: zhangsan@example.com</p>
    </div>
  )
}

// 用户设置子页面
function UserSettings() {
  return (
    <div className="sub-page">
      <h3>设置</h3>
      <p>主题: 深色模式</p>
      <p>语言: 中文</p>
    </div>
  )
}

// 404 页面
function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="demo-box">
      <h2>404 - 页面未找到</h2>
      <p>您访问的页面不存在。</p>
      <button onClick={() => navigate('/')}>返回首页</button>
    </div>
  )
}

// 主路由示例组件
export default function RouterDemo() {
  const [activeTab, setActiveTab] = useState('intro')

  return (
    <div className="feature-demo">
      <h2>React Router 示例</h2>

      <div className="tabs">
        <button
          className={activeTab === 'intro' ? 'active' : ''}
          onClick={() => setActiveTab('intro')}
        >
          路由配置
        </button>
        <button
          className={activeTab === 'demo' ? 'active' : ''}
          onClick={() => setActiveTab('demo')}
        >
          路由演示
        </button>
      </div>

      {activeTab === 'intro' && (
        <div className="demo-box">
          <h3>Vue3 vs React Router 对比</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>功能</th>
                <th>Vue 3 (vue-router)</th>
                <th>React (react-router-dom)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>路由容器</td>
                <td>&lt;router-view /&gt;</td>
                <td>&lt;Routes&gt; + &lt;Route&gt;</td>
              </tr>
              <tr>
                <td>导航链接</td>
                <td>&lt;router-link&gt;</td>
                <td>&lt;Link&gt; / &lt;NavLink&gt;</td>
              </tr>
              <tr>
                <td>动态路由</td>
                <td>/user/:id</td>
                <td>/user/:id</td>
              </tr>
              <tr>
                <td>获取参数</td>
                <td>route.params.id</td>
                <td>useParams()</td>
              </tr>
              <tr>
                <td>编程导航</td>
                <td>router.push()</td>
                <td>navigate()</td>
              </tr>
              <tr>
                <td>嵌套路由</td>
                <td>children</td>
                <td>Outlet 组件</td>
              </tr>
            </tbody>
          </table>

          <h3>基本路由配置</h3>
          <div className="code-block">
            <pre>{`import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}`}</pre>
          </div>
        </div>
      )}

      {activeTab === 'demo' && (
        <div className="demo-box">
          <h3>路由演示</h3>
          <p>点击下方链接体验路由导航：</p>

          <nav className="demo-nav">
            <Link to="/router-demo">首页</Link>
            <Link to="/router-demo/about">关于</Link>
            <Link to="/router-demo/user-list">用户列表</Link>
            <Link to="/router-demo/user-center">用户中心</Link>
          </nav>

          {/* 演示路由出口 */}
          <div className="route-demo">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="user-list" element={<UserList />} />
              <Route path="user/:id" element={<UserDetail />} />
              <Route path="user-center" element={<UserLayout />}>
                <Route index element={<UserProfile />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="settings" element={<UserSettings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  )
}
