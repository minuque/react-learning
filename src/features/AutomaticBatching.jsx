/**
 * AutomaticBatching - 自动批处理示例
 *
 * 【背景知识】（对比 Vue3）
 * Vue3 中可以使用 flush: 'sync' 来同步更新，或者利用 Vue 的响应式系统自动批处理
 * React 18 之前：Promise、setTimeout、native event 中的更新不会批量处理
 * React 18：所有更新都会自动批量处理，减少不必要的重渲染
 *
 * 【核心变化】
 * React 18 之前：
 *   setTimeout(() => { setCount(1); setFlag(true); }, 0)
 *   // 会触发 2 次重渲染
 *
 * React 18：
 *   setTimeout(() => { setCount(1); setFlag(true); }, 0)
 *   // 只触发 1 次重渲染
 */

import { useState, useEffect } from 'react'

export default function AutomaticBatching() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const [renderCount, setRenderCount] = useState(0)

  // 记录渲染次数（只在开发环境显示）
  useEffect(() => {
    if (import.meta.env.DEV) {
      setRenderCount(prev => prev + 1)
    }
  }, [])

  const handleClick = () => {
    /**
     * 模拟原生事件中的批量更新
     * 在 Vue 中通常需要使用 flushSync 或 computed 来处理
     */
    setCount(c => c + 1)
    setFlag(f => !f)
  }

  const handleTimeout = () => {
    /**
     * setTimeout 中的批量更新 - React 18 新特性
     * React 17 及之前：这里会产生 2 次重渲染
     * React 18：只会产生 1 次重渲染
     */
    setCount(c => c + 1)
    setFlag(f => !f)
  }

  const handlePromise = () => {
    /**
     * Promise resolve 后的批量更新 - React 18 新特性
     * 类似于 Vue 的 Promise 回调处理，但 React 自动完成批处理
     */
    Promise.resolve().then(() => {
      setCount(c => c + 1)
      setFlag(f => !f)
    })
  }

  return (
    <div className="feature-card">
      <h2>Automatic Batching（自动批处理）</h2>
      <p className="render-count">渲染次数: {renderCount}</p>

      <div className="demo-section">
        <p>当前状态: count={count}, flag={flag.toString()}</p>

        {/* React 事件 - 原本就支持批处理 */}
        <button onClick={handleClick}>
          React 事件点击（原生支持）
        </button>

        {/* setTimeout - React 18 起支持批处理 */}
        <button onClick={handleTimeout}>
          setTimeout 点击（React 18 新特性）
        </button>

        {/* Promise - React 18 起支持批处理 */}
        <button onClick={handlePromise}>
          Promise 点击（React 18 新特性）
        </button>
      </div>

      <div className="explanation">
        <h4>💡 说明</h4>
        <ul>
          <li>React 18 之前：只有在 React 事件处理器中的更新才会批量处理</li>
          <li>React 18：所有更新（包括 setTimeout、Promise、addEventListener）都会自动批处理</li>
          <li>这减少了不必要的重渲染，提升性能</li>
        </ul>
      </div>
    </div>
  )
}
