import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// 创建 root 实例
const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// ============================================
// HMR (Hot Module Replacement) 支持
// ============================================
// Vite 自动处理 React 组件的热更新
// 以下代码用于自定义 HMR 行为（如需保留状态）

if (import.meta.hot) {
  // 接受 HMR 更新
  import.meta.hot.accept()

  // 可选：自定义 HMR 更新逻辑
  // 例如：在特定条件下拒绝更新或执行清理
  import.meta.hot.on('vite:beforeUpdate', (data) => {
    console.log('[HMR] 即将更新:', data)
  })

  import.meta.hot.on('vite:afterUpdate', (data) => {
    console.log('[HMR] 更新完成:', data)
  })

  // 处理更新失败（如语法错误）
  import.meta.hot.on('vite:error', (data) => {
    console.error('[HMR] 更新错误:', data)
  })
}
