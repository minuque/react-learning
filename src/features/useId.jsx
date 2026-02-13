/**
 * useId - 唯一 ID 生成 Hook
 *
 * 【背景知识】（对比 Vue3）
 * Vue3 中可以使用 uuid 包或自定义 ID 生成器
 * useId 是 React 官方提供的用于生成稳定唯一 ID 的 Hook
 *
 * 【核心用途】
 * 1. 生成稳定的跨渲染周期的唯一 ID
 * 2. 解决 SSR/Hydration 时的 ID 不匹配问题
 * 3. 确保客户端和服务端的 HTML 结构一致
 *
 * 【重要】
 * - 同一个组件在服务端和客户端渲染时会产生相同的 ID
 * - 即使组件被卸载重建，ID 也保持稳定（同一会话内）
 *
 * 【Vue3 中的等价】
 * Vue SSR 通常使用 @vueuse/core 的 useId 或自定义实现
 */

import { useId } from 'react'

export default function UseIdDemo() {
  // useId 返回一个唯一的字符串 ID
  // 格式类似于 :r0:, :r1: 的前缀 + 递增数字
  const id = useId()

  // 可以在多个地方使用同一个 ID（关联 label 和 input）
  const nameId = useId()
  const emailId = useId()

  return (
    <div className="feature-card">
      <h2>useId（唯一 ID 生成）</h2>

      <div className="demo-section">
        <div className="generated-id">
          <p>当前组件的 useId 生成值：</p>
          <code className="id-display">{id}</code>
        </div>

        <form className="form-demo">
          <div className="form-group">
            <label htmlFor={nameId}>姓名：</label>
            <input
              id={nameId}
              type="text"
              placeholder="请输入姓名"
            />
          </div>

          <div className="form-group">
            <label htmlFor={emailId}>邮箱：</label>
            <input
              id={emailId}
              type="email"
              placeholder="请输入邮箱"
            />
          </div>

          <p className="tip">
            💡 观察生成的 ID，它们以冒号开头（:r0: 格式）
          </p>
        </form>
      </div>

      <div className="explanation">
        <h4>💡 为什么需要 useId？</h4>

        <div className="problem-solution">
          <div className="problem">
            <h5>问题（React 17 及之前）</h5>
            <pre>{`// SSR 时生成随机 ID
const id = Math.random().toString(36)

// 水合时问题：
// 服务端: id = "abc123"
// 客户端: id = "def456"
// → 水合不匹配！ hydration mismatch!`}</pre>
          </div>

          <div className="solution">
            <h5>解决方案（React 18 useId）</h5>
            <pre>{`const id = useId()

// 服务端渲染: ":r0:"
// 客户端渲染: ":r0:"
// → 完全匹配！`}</pre>
          </div>
        </div>

        <h4>📊 useId vs Vue3</h4>
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>React 18 useId</th>
              <th>Vue3 常用方案</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SSR 兼容</td>
              <td>✅ 原生支持</td>
              <td>需额外处理</td>
            </tr>
            <tr>
              <td>稳定性</td>
              <td>✅ 会话内稳定</td>
              <td>取决于实现</td>
            </tr>
            <tr>
              <td>使用方式</td>
              <td>Hook 方式</td>
              <td>组合式函数</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="key-points">
        <h4>📝 最佳实践</h4>
        <ul>
          <li>用于需要 ID 的表单元素（label/for）</li>
          <li>用于列表中的 key（如果需要稳定 ID）</li>
          <li>不要用于列表渲染的 key（优先用数据 ID）</li>
          <li>可用于 CSS class 或 data-* 属性</li>
        </ul>
      </div>

      <div className="advanced">
        <h4>🔧 进阶用法 - ID 前缀</h4>
        <pre>{`// 为不同模块创建不同前缀的 ID
function FormField({ prefix }) {
  // 可以组合前缀和 useId
  const id = useId()

  return <input id={\`\${prefix}-\${id}\`} />
}

// 使用
&lt;FormField prefix="user" /&gt;
// 生成: user-:r0:
&lt;FormField prefix="order" /&gt;
// 生成: order-:r1:`}</pre>
      </div>
    </div>
  )
}
