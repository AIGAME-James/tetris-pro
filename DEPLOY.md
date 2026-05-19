# TETRIS PRO - GitHub 部署指南

## 快速部署步骤

### 方式一：使用 GitHub CLI (推荐)

```bash
# 1. 登录 GitHub（如果尚未登录）
gh auth login

# 2. 创建仓库并推送
cd C:\Users\Administrator\WorkBuddy\2026-05-19-task-16
gh repo create tetris-pro --public --source=. --push

# 3. 启用 GitHub Pages
gh repo edit --enable-pages
```

### 方式二：手动部署

```bash
# 1. 在 GitHub 上创建新仓库
# 访问: https://github.com/new
# 仓库名称: tetris-pro
# 选择 Public

# 2. 添加远程仓库并推送
cd C:\Users\Administrator\WorkBuddy\2026-05-19-task-16
git remote add origin https://github.com/AIGAME-James/tetris-pro.git
git push -u origin master

# 3. 启用 GitHub Pages
# - 进入仓库 Settings > Pages
# - Source 选择 "Deploy from a branch"
# - Branch 选择 "master" / "(root)"
# - 点击 Save

# 4. 等待 1-2 分钟，访问
# https://AIGAME-James.github.io/tetris-pro
```

## 功能说明

### 登录系统
- 启动时显示登录页面
- 输入名字或选择游客模式
- 玩家名称保存在 localStorage

### 游戏模式
- 🏃 马拉松 - 经典模式，追求高分
- ⏱️ 竞速 - 40行竞速挑战
- 👾 BOSS战 - 特殊BOSS模式
- ⚔️ 对战 - 双人对战
- 🧘 禅定 - 无道具模式

### 排行榜
- 自动记录每局得分
- 按模式分类显示
- 保存在 localStorage

### 操作说明
- ← → 移动方块
- ↑ 旋转
- ↓ 加速下落
- 空格 硬降（直接落下）
- C 暂存方块
- P 暂停/继续

## 分享方式

游戏部署后，分享链接给朋友：
```
https://AIGAME-James.github.io/tetris-pro
```

或者嵌入到网页：
```html
<iframe src="https://AIGAME-James.github.io/tetris-pro" width="800" height="700"></iframe>
```
