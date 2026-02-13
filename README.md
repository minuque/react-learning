# React 18 学习项目

> 基于 Vue3 经验迁移到 React 18 的学习笔记

## 项目结构

```
src/
├── App.jsx           # 主应用入口
├── App.css           # 样式
├── main.jsx          # React 18 root API 入口
└── features/          # React 18 特性示例
    ├── AutomaticBatching.jsx   # 自动批处理
    ├── useTransition.jsx        # useTransition 过渡更新
    ├── useDeferredValue.jsx     # useDeferredValue 延迟值
    └── useId.jsx                # useId 唯一ID生成
```

## React 18 新特性概览

### 1. Automatic Batching（自动批处理）
- React 18 之前：只在 React 事件中批量更新
- React 18：所有更新都会批量处理，包括 Promise、setTimeout 等

### 2. useTransition（过渡更新）
- 标记非紧急更新，允许紧急更新优先渲染
- 类似 Vue 的 `watch` + `nextTick` 组合效果

### 3. useDeferredValue（延迟值）
- 创建值的延迟版本，优化渲染性能
- 用于减少频繁更新的性能开销

### 4. useId（唯一 ID）
- 生成稳定的唯一 ID
- 解决 SSR 水合 mismatch 问题

### 5. useSyncExternalStore（外部状态订阅）
- 订阅外部数据源的推荐方式
- React 内部也使用此 Hook

## 启动项目

```bash
cd react-learning
npm install
npm run dev
```
