/**
 * React 状态管理示例 - 使用 Zustand
 *
 * 【Vue3 用户快速上手】
 * - Vue3 使用 Pinia，定义 store 后在组件中使用 useXxxStore()
 * - React 使用 Zustand，定义 store 后在组件中使用 useXxx()
 * - Pinia 的 actions 对应 Zustand 的函数
 * - Pinia 的 getters 对应 Zustand 的派生状态
 */

import { useState } from 'react'
import { create } from 'zustand'

// ============================================
// 定义 Store（类似于 Pinia 的 defineStore）
// ============================================

// 使用 create 函数创建 store（类似 Pinia 的 defineStore）
const useUserStore = create((set, get) => ({
  // === 状态（类似 Pinia 的 state）===
  userInfo: null,
  isLoading: false,
  error: null,
  userList: [],

  // === Actions（类似 Pinia 的 actions）===
  // 同步 action
  setUserInfo: (userInfo) => set({ userInfo }),

  // 异步 action - 模拟登录
  login: async (username, password) => {
    set({ isLoading: true, error: null })
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 简单验证
      if (!password || password.length < 6) {
        set({ error: '密码长度至少6位', isLoading: false })
        return false
      }

      // 模拟登录成功
      const userInfo = { id: 1, username, nickname: 'Demo User' }
      set({ userInfo, isLoading: false })
      return true
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return false
    }
  },

  // 异步 action - 模拟获取用户列表
  fetchUserList: async () => {
    set({ isLoading: true, error: null })
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 800))

      const userList = [
        { id: 1, name: '张三', email: 'zhangsan@example.com' },
        { id: 2, name: '李四', email: 'lisi@example.com' },
        { id: 3, name: '王五', email: 'wangwu@example.com' },
      ]
      set({ userList, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  // 登出
  logout: () => set({ userInfo: null, userList: [] }),

  // === Getters（类似 Pinia 的 getters）===
  // Zustand 中可以通过函数返回派生状态
  getIsLoggedIn: () => !!get().userInfo,
  getUserCount: () => get().userList.length,
}))

// 计数器 Store - 展示更简单的用法
const useCounterStore = create((set, get) => ({
  count: 0,
  doubleCount: () => get().count * 2,  // 派生状态

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))


// ============================================
// 组件部分
// ============================================

// 用户信息组件
function UserInfo() {
  // 从 store 中读取状态（类似 Pinia 的 storeToRefs）
  const { userInfo, isLoading, error, logout, login } = useUserStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!username || !password) return
    await login(username, password)
  }

  if (isLoading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="demo-box">
      <h3>用户状态管理</h3>

      {error && <div className="error">错误: {error}</div>}

      {userInfo ? (
        <div className="user-info">
          <p>欢迎回来，<strong>{userInfo.nickname}</strong>!</p>
          <p>用户名: {userInfo.username}</p>
          <button onClick={logout}>登出</button>
        </div>
      ) : (
        <div className="login-form">
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>登录</button>
        </div>
      )}

      <div className="code-block">
        <pre>{`// Vue3 (Pinia)
const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const login = async (username, password) => {
    userInfo.value = { username, nickname: 'Demo' }
  }
  return { userInfo, login }
})

// React (Zustand)
const useUserStore = create((set) => ({
  userInfo: null,
  login: async (username, password) => {
    set({ userInfo: { username, nickname: 'Demo' } })
  }
}))

// 组件中使用
const { userInfo, login } = useUserStore()`}</pre>
      </div>
    </div>
  )
}

// 用户列表组件
function UserList() {
  const { userList, isLoading, fetchUserList } = useUserStore()

  return (
    <div className="demo-box">
      <h3>用户列表</h3>
      <button onClick={fetchUserList} disabled={isLoading}>
        {isLoading ? '加载中...' : '获取用户列表'}
      </button>

      {userList.length > 0 && (
        <ul className="list">
          {userList.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}

      <div className="code-block">
        <pre>{`// Vue3 (Pinia)
const store = useUserStore()
await store.fetchUserList()

// React (Zustand)
const { fetchUserList, userList } = useUserStore()
fetchUserList()`}</pre>
      </div>
    </div>
  )
}

// 计数器组件
function Counter() {
  const { count, doubleCount, increment, decrement, reset } = useCounterStore()

  return (
    <div className="demo-box">
      <h3>计数器（简单 Store）</h3>
      <p>当前计数: {count}</p>
      <p>双倍计数: {doubleCount()}</p>

      <div className="button-group">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>重置</button>
        <button onClick={increment}>+</button>
      </div>

      <div className="code-block">
        <pre>{`// 创建简单计数器 Store
const useCounterStore = create((set, get) => ({
  count: 0,
  doubleCount: () => get().count * 2,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))

// 组件中使用
const { count, increment } = useCounterStore()`}</pre>
      </div>
    </div>
  )
}


// 主组件
export default function StoreDemo() {
  const [activeTab, setActiveTab] = useState('intro')

  // 获取登录状态
  const isLoggedIn = useUserStore(state => !!state.userInfo)

  return (
    <div className="feature-demo">
      <h2>React 状态管理示例</h2>

      <div className="tabs">
        <button
          className={activeTab === 'intro' ? 'active' : ''}
          onClick={() => setActiveTab('intro')}
        >
          概念对比
        </button>
        <button
          className={activeTab === 'user' ? 'active' : ''}
          onClick={() => setActiveTab('user')}
        >
          用户管理
        </button>
        <button
          className={activeTab === 'counter' ? 'active' : ''}
          onClick={() => setActiveTab('counter')}
        >
          计数器
        </button>
      </div>

      {activeTab === 'intro' && (
        <div className="demo-box">
          <h3>Vue3 Pinia vs React Zustand 对比</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>功能</th>
                <th>Vue 3 (Pinia)</th>
                <th>React (Zustand)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>定义 Store</td>
                <td>defineStore(id, fn)</td>
                <td>create(fn)</td>
              </tr>
              <tr>
                <td>状态</td>
                <td>ref / reactive</td>
                <td>直接返回对象</td>
              </tr>
              <tr>
                <td>Actions</td>
                <td>普通函数</td>
                <td>set() 修改状态</td>
              </tr>
              <tr>
                <td>Getters</td>
                <td>computed</td>
                <td>函数返回派生值</td>
              </tr>
              <tr>
                <td>组件使用</td>
                <td>useXxxStore()</td>
                <td>useXxx()</td>
              </tr>
              <tr>
                <td>状态持久化</td>
                <td>pinia-plugin-persistedstate</td>
                <td>persist 中间件</td>
              </tr>
            </tbody>
          </table>

          <h3>创建 Store</h3>
          <div className="code-block">
            <pre>{`// Pinia (Vue3)
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)

  function login(username, password) {
    userInfo.value = { username }
  }

  return { userInfo, login }
})

// Zustand (React)
import { create } from 'zustand'

const useUserStore = create((set) => ({
  userInfo: null,

  login: async (username, password) => {
    set({ userInfo: { username } })
  }
}))`}</pre>
          </div>

          <div className="info-box">
            <p><strong>Zustand</strong> 是 React 中最流行的轻量级状态管理库，</p>
            <p>它比 Redux 更简单，比 React Context 更灵活，</p>
            <p>API 设计类似于 Pinia，非常适合 Vue3 用户快速上手。</p>
          </div>
        </div>
      )}

      {activeTab === 'user' && (
        <div className="demo-box">
          <h3>用户管理示例</h3>
          <p>当前登录状态: {isLoggedIn ? '已登录' : '未登录'}</p>
          <UserInfo />
          <UserList />
        </div>
      )}

      {activeTab === 'counter' && (
        <Counter />
      )}
    </div>
  )
}
