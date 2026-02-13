/**
 * useDeferredValue - 延迟值 Hook
 *
 * 【背景知识】（对比 Vue3）
 * Vue3 中可以使用 computed 或 watchEffect 来派生值
 * useDeferredValue 用于创建一个值的"延迟副本"，当原值快速变化时减少渲染频率
 *
 * 【核心用途】
 * 1. 优化频繁更新的值导致的性能问题
 * 2. 类似于防抖，但由 React 内部调度控制
 * 3. 保持 UI 响应性的同时显示最新数据
 *
 * 【与 useTransition 的区别】
 * useTransition: 标记某个操作为非紧急
 * useDeferredValue: 获取值的延迟版本
 *
 * Vue3 中类似场景：
 * - 使用 computed 派生计算值
 * - 使用 watch + debounce 延迟响应
 */

import { useState, useDeferredValue, useMemo } from 'react'

// 模拟一个耗时的计算函数
function expensiveCompute(value) {
  // 模拟 CPU 密集型任务
  const start = performance.now()
  while (performance.now() - start < 5) {
    // 阻塞 5ms 模拟复杂计算
  }
  return `${value.toUpperCase()} - processed`
}

export default function UseDeferredValueDemo() {
  const [query, setQuery] = useState('')

  /**
   * useDeferredValue(react18)
   * - 返回 query 的延迟版本
   * - 当 query 快速变化时，deferredQuery 不会立即更新
   * - React 会优先处理用户输入等紧急更新
   *
   * 效果：输入框保持响应，结果列表延迟更新
   */
  const deferredQuery = useDeferredValue(query)

  // 使用 useMemo 缓存计算结果
  const computedResult = useMemo(() => {
    return expensiveCompute(deferredQuery)
  }, [deferredQuery])

  return (
    <div className="feature-card">
      <h2>useDeferredValue（延迟值）</h2>

      <div className="demo-section">
        <div className="input-group">
          <label>输入查询内容：</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type something..."
          />
        </div>

        <div className="results">
          <div className="result-item original">
            <span className="label">原始值 (query):</span>
            <span className="value">{query}</span>
          </div>

          <div className="result-item deferred">
            <span className="label">延迟值 (deferredQuery):</span>
            <span className="value">{deferredQuery}</span>
          </div>

          <div className="result-item computed">
            <span className="label">计算结果:</span>
            <span className="value">{computedResult}</span>
          </div>
        </div>

        <p className="tip">
          💡 快速输入，观察原始值和延迟值的更新时机差异
        </p>
      </div>

      <div className="explanation">
        <h4>💡 工作原理</h4>
        <ol>
          <li>用户输入 → 更新 <code>query</code>（紧急更新，立即渲染）</li>
          <li>
            <code>useDeferredValue</code> 创建 <code>deferredQuery</code>
            <ul>
              <li>如果 UI 不繁忙，deferredQuery 几乎同时更新</li>
              <li>如果 UI 繁忙，React 会延迟更新 deferredQuery</li>
            </ul>
          </li>
          <li>依赖 deferredQuery 的计算（如 computedResult）也会延迟</li>
        </ol>

        <h4>📊 useDeferredValue vs Vue3</h4>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>React 18</th>
              <th>Vue3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>派生值</td>
              <td>useDeferredValue</td>
              <td>computed</td>
            </tr>
            <tr>
              <td>延迟更新</td>
              <td>React 自动调度</td>
              <td>watch + debounce</td>
            </tr>
            <tr>
              <td>性能优化</td>
              <td>减少渲染频率</td>
              <td>减少计算频率</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="key-points">
        <h4>📝 使用建议</h4>
        <ul>
          <li>适用于：搜索建议、实时过滤、大型列表渲染</li>
          <li>注意：延迟值可能导致 UI 显示不一致</li>
          <li>建议：保持延迟值和原始值的显示方式一致</li>
        </ul>
      </div>
    </div>
  )
}
