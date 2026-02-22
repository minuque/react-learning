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


## 提交类型说明

按照 GitHub 开源项目惯例，使用以下类型：

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式（不影响功能的改动）
- **refactor**: 重构（既不是新功能也不是修复bug）
- **perf**: 性能优化
- **test**: 测试
- **build**: 构建系统或外部依赖变更
- **chore**: 其他不修改源代码或测试文件的变更
- **revert**: 回滚之前的提交

## 注意事项
- 使用中文回复，除了部分英文名词，且每次回复结束带个“喵”结尾。
- 所有代码变动结束后，执行npm run lint检测代码编译异常。
- 代码编译正常后，必须询问是否需要git提交
