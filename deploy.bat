@echo off
chcp 65001 >nul
echo ================================================
echo     TETRIS PRO - GitHub 部署脚本
echo ================================================
echo.

:: 检查 gh 是否安装
where gh >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 GitHub CLI
    echo 请访问: https://cli.github.com手动安装
    echo 或使用浏览器在 github.com 创建仓库后手动推送
    pause
    exit /b 1
)

:: 检查是否已登录
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo [提示] 需要登录 GitHub
    echo 将打开浏览器进行授权...
    gh auth login
)

echo.
echo [1/3] 创建 GitHub 仓库...
gh repo create tetris-pro --public --source=. --push --disable-private

echo.
echo [2/3] 启用 GitHub Pages...
gh repo edit tetris-pro --enable-pages

echo.
echo [3/3] 部署完成!
echo.
echo ================================================
echo     部署成功！
echo ================================================
echo.
echo 游戏链接: https://AIGAME-James.github.io/tetris-pro
echo.
echo 注意: GitHub Pages 需要 1-2 分钟激活
echo.
pause
