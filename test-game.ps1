$ErrorActionPreference = "Continue"

# 启动HTTP服务器
Write-Host "启动HTTP服务器..."
$serverJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\Administrator\WorkBuddy\2026-05-19-task-16"
    python -m http.server 8898
}

Start-Sleep -Seconds 2

# 使用Edge测试
Write-Host "使用Edge打开游戏..."

try {
    # 创建Edge实例
    $edge = New-Object -ComObject Edge.Application
    $edge.Navigate("http://localhost:8898/tetris-pro.html")

    Start-Sleep -Seconds 3

    # 检查页面标题
    $title = $edge.Document.title
    Write-Host "页面标题: $title"

    # 检查游戏元素是否存在
    $canvas = $edge.Document.getElementById("board")
    if ($canvas) {
        Write-Host "游戏画布已加载"
    } else {
        Write-Host "警告: 游戏画布未找到"
    }

    $menuOverlay = $edge.Document.getElementById("menu-overlay")
    if ($menuOverlay -and $menuOverlay.className -notlike "*hidden*") {
        Write-Host "主菜单已显示"
    }

    Write-Host "测试完成，关闭浏览器..."
    $edge.Quit()

} catch {
    Write-Host "Edge自动化测试出错: $_"
}

# 清理
Stop-Job -Job $serverJob -ErrorAction SilentlyContinue
Remove-Job -Job $serverJob -ErrorAction SilentlyContinue

Write-Host "测试脚本完成"
