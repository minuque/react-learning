/**
 * React 18 学习项目 - 主应用入口
 *
 * 【Vue3 用户快速上手】
 * - Vue3 使用 template + script setup
 * - React 使用 JSX + function components
 * - Vue3 的 v-if/v-for 对应 React 的 {condition && JSX} / {list.map()}
 *
 * 【React 18 特性】
 * 本项目演示 React 18 的主要新特性，与 Vue3 进行对比学习
 */

import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// 导入 React 18 特性演示组件
import AutomaticBatching from './features/AutomaticBatching'
import UseTransitionDemo from './features/useTransition'
import UseDeferredValueDemo from './features/useDeferredValue'
import UseIdDemo from './features/useId'
import RouterDemo from './features/RouterDemo'

function App() {
  // Vue3 中使用 ref 或 reactive
  // React 中使用 useState（单值）或 useReducer（复杂状态）
  const [activeFeature, setActiveFeature] = useState('batching')

  const features = [
    { id: 'batching', name: '自动批处理', component: AutomaticBatching },
    { id: 'transition', name: 'useTransition', component: UseTransitionDemo },
    { id: 'deferred', name: 'useDeferredValue', component: UseDeferredValueDemo },
    { id: 'useId', name: 'useId', component: UseIdDemo },
    { id: 'router', name: 'React Router', component: RouterDemo },
  ]

  // Vue3 中使用 &lt;component :is="currentComponent" /&gt;
  // React 中使用条件渲染或状态控制
  const ActiveComponent = features.find(f => f.id === activeFeature)?.component

  return (
    <div className="app">
      <header className="header">
        <h1>React 18 新特性学习</h1>
        <p className="subtitle">基于 Vue3 经验，对比学习 React 18</p>
      </header>

      <nav className="nav">
        {features.map(feature => (
          <button
            key={feature.id}
            className={`nav-btn ${activeFeature === feature.id ? 'active' : ''}`}
            onClick={() => setActiveFeature(feature.id)}
          >
            {feature.name}
          </button>
        ))}
      </nav>

      <main className="main">
        {/* React 的条件渲染 - 类似于 Vue 的 v-if */}
        {ActiveComponent && <ActiveComponent />}
      </main>

      <footer className="footer">
        <h3>快速对比：Vue3 vs React 18</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>功能</th>
              <th>Vue 3</th>
              <th>React 18</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>状态管理</td>
              <td>ref / reactive</td>
              <td>useState / useReducer</td>
            </tr>
            <tr>
              <td>计算属性</td>
              <td>computed</td>
              <td>useMemo</td>
            </tr>
            <tr>
              <td>监听器</td>
              <td>watch / watchEffect</td>
              <td>useEffect</td>
            </tr>
            <tr>
              <td>模板渲染</td>
              <td>template syntax</td>
              <td>JSX</td>
            </tr>
            <tr>
              <td>条件渲染</td>
              <td>v-if / v-show</td>
              <td>condition &amp;&amp; JSX</td>
            </tr>
            <tr>
              <td>列表渲染</td>
              <td>v-for</td>
              <td>arr.map()</td>
            </tr>
            <tr>
              <td>路由管理</td>
              <td>vue-router</td>
              <td>react-router-dom</td>
            </tr>
          </tbody>
        </table>
      </footer>
    </div>
  )
}

export default App
// test
