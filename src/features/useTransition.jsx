/**
 * useTransition - 过渡更新 Hook
 *
 * 【背景知识】（对比 Vue3）
 * Vue3 中可以使用 watch + watchEffect 来处理副作用，或者使用 loading 状态
 * useTransition 提供了一种声明式的方式来标记"紧急"和"非紧急"更新
 *
 * 【核心用途】
 * 1. 标记非紧急更新，让紧急更新优先渲染
 * 2. 在大量数据更新时保持 UI 响应性
 * 3. 提供 isPending 状态显示加载效果
 *
 * 【适用场景】
 * - 搜索/过滤大量列表
 * - 复杂表单输入
 * - 需要保持交互响应的大数据量渲染
 */

import { useState, useTransition } from 'react'

// 模拟大量数据
const ITEMS = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  label: `Item ${i}`,
  // 添加一些随机数据模拟真实场景
  description: `这是第 ${i} 项的详细描述信息`
}))

export default function UseTransitionDemo() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [selectedId, setSelectedId] = useState(null)

  /**
   * useTransition 返回值：
   * - isPending: 是否有过渡更新正在进行（类似 Vue 的 loading 状态）
   * - startTransition: 用于标记非紧急更新的函数
   */
  const filteredItems = ITEMS.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleChange = (e) => {
    const value = e.target.value

    /**
     * startTransition 的作用：
     * - 将其回调中的更新标记为"非紧急"
     * - React 会优先处理其他紧急更新（如用户输入）
     * - 这使得搜索框输入时不会卡顿
     *
     * 在 Vue3 中的等价思路：
     * 使用 watch + debounce 或 computed 属性来优化
     */
    startTransition(() => {
      setQuery(value)
    })
  }

  const handleSelect = (id) => {
    // 这个更新是紧急的，立即执行
    setSelectedId(id)
  }

  return (
    <div className="feature-card">
      <h2>useTransition（过渡更新）</h2>

      <div className="demo-section">
        <div className="input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="搜索项目..."
            className={isPending ? 'pending' : ''}
          />
          {/* isPending 类似于 Vue 中的 v-loading 状态 */}
          {isPending && <span className="loading-badge">渲染中...</span>}
        </div>

        <div className="item-list">
          {/* 限制显示数量避免DOM过多 */}
          {filteredItems.slice(0, 100).map(item => (
            <div
              key={item.id}
              className={`item ${selectedId === item.id ? 'selected' : ''}`}
              onClick={() => handleSelect(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>

        <p className="info">
          过滤后显示: {filteredItems.length} / {ITEMS.length} 项
        </p>
      </div>

      <div className="explanation">
        <h4>💡 useTransition vs Vue3</h4>
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>React 18 useTransition</th>
              <th>Vue3 等价方案</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>标记非紧急更新</td>
              <td><code>startTransition(() =&#62;&#123;...&#125;)</code></td>
              <td>watch + debounce / computed</td>
            </tr>
            <tr>
              <td>加载状态</td>
              <td>isPending</td>
              <td>ref + watchEffect</td>
            </tr>
            <tr>
              <td>优先级控制</td>
              <td>自动优先级调度</td>
              <td>需要手动处理</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="key-points">
        <h4>📝 关键点</h4>
        <ul>
          <li>startTransition 中的更新会被标记为非紧急</li>
          <li>React 会在空闲时间处理非紧急更新</li>
          <li>isPending 可以用来显示加载状态</li>
          <li>不要过度使用，只用于确实需要优先级的场景</li>
        </ul>
      </div>
    </div>
  )
}
