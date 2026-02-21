# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 提供在此代码库中工作的指导。

## 项目概述

这是一个 React 18 学习项目，演示 React 18 的新特性，并与 Vue3 进行对比学习。使用 Vite 作为构建工具，React 版本为 19。

## 常用命令

```bash
# 开发
npm run dev          # 启动 Vite 开发服务器

# 构建
npm run build        # 生产构建
npm run preview      # 预览生产构建

# 代码检查
npm run lint         # 运行 ESLint
```

## 项目架构

- **入口文件**: `src/main.jsx` - 使用 React StrictMode 挂载 App
- **主组件**: `src/App.jsx` - 在各功能演示之间切换，包含 Vue3 与 React 18 的对比表格
- **功能演示**: `src/features/` - 演示 React 18 特性的独立组件：
  - `AutomaticBatching.jsx` - React 18 自动批处理行为
  - `useTransition.jsx` - 并发渲染与过渡
  - `useDeferredValue.jsx` - 延迟值更新
  - `useId.jsx` - 稳定 ID 生成

## 技术栈

- React 19 + Vite
- ESLint flat config (ESLint 9)
- `App.css` 中包含所有组件样式

## 关键模式

- 主要状态管理使用 React hooks（`useState`、`useEffect`）
- 不使用外部状态管理库（Redux、Zustand 等）
- 组件使用 JSX 语法
- 条件渲染：`{condition && <Component />}`

## 注意事项
- 使用中文回复，除了部分英文名词
- 每次回复结束带个“喵”结尾
- 每次代码变动结束后，需要提示是否使用 /commit 指令
