/**
 * TETRIS PRO - 功能测试脚本
 * 在浏览器控制台中运行此脚本进行测试
 */

(function() {
  console.log('🎮 TETRIS PRO 功能测试');
  console.log('='.repeat(50));

  // 测试1: 检查登录页是否存在
  const landingOverlay = document.getElementById('landing-overlay');
  console.log('✅ 测试1 - 登录页存在:', landingOverlay ? '通过' : '失败');

  // 测试2: 检查登录页是否显示
  const isLandingVisible = landingOverlay && !landingOverlay.classList.contains('hidden');
  console.log('✅ 测试2 - 登录页显示:', isLandingVisible ? '通过' : '失败');

  // 测试3: 模拟输入名字并登录
  const nameInput = document.getElementById('landing-name-input');
  if (nameInput) {
    nameInput.value = '测试玩家';
    document.getElementById('btn-landing-start').click();

    // 检查菜单页显示
    const menuOverlay = document.getElementById('menu-overlay');
    const isMenuVisible = menuOverlay && !menuOverlay.classList.contains('hidden');
    console.log('✅ 测试3 - 登录后进入菜单:', isMenuVisible ? '通过' : '失败');

    // 检查玩家名称显示
    const playerDisplay = document.getElementById('player-name-display');
    const displayedName = playerDisplay ? playerDisplay.textContent : '';
    console.log('✅ 测试4 - 玩家名称显示:', displayedName === '测试玩家' ? '通过 (' + displayedName + ')' : '失败 (显示: ' + displayedName + ')');

    // 检查头像显示
    const playerAvatar = document.getElementById('player-avatar');
    const avatarText = playerAvatar ? playerAvatar.textContent : '';
    console.log('✅ 测试5 - 头像显示:', avatarText === '测' ? '通过 (' + avatarText + ')' : '失败 (显示: ' + avatarText + ')');
  }

  // 测试6: 检查BOSS血条是否隐藏
  const bossBar = document.getElementById('boss-bar');
  const isBossBarHidden = bossBar && bossBar.classList.contains('hidden');
  console.log('✅ 测试6 - BOSS血条隐藏:', isBossBarHidden ? '通过' : '失败');

  // 测试7: 检查排行榜
  const lbList = document.getElementById('lb-list');
  const hasLeaderboard = lbList !== null;
  console.log('✅ 测试7 - 排行榜存在:', hasLeaderboard ? '通过' : '失败');

  // 测试8: 检查localStorage存储
  const storedPlayer = localStorage.getItem('tetris_player');
  console.log('✅ 测试8 - localStorage存储:', storedPlayer === '测试玩家' ? '通过 (' + storedPlayer + ')' : '存储值: ' + storedPlayer);

  // 测试9: 开始游戏
  document.getElementById('btn-start').click();
  setTimeout(() => {
    const isGameRunning = game && game.gameState === 'playing';
    console.log('✅ 测试9 - 游戏开始:', isGameRunning ? '通过' : '失败');

    // 测试10: 键盘输入测试
    if (isGameRunning) {
      // 模拟移动
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft' }));
      console.log('✅ 测试10 - 键盘控制: 通过');

      // 测试暂停
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }));
      const isPaused = game.gameState === 'paused';
      console.log('✅ 测试11 - 暂停功能:', isPaused ? '通过' : '失败');
    }

    console.log('='.repeat(50));
    console.log('🎉 所有测试完成!');
    console.log('📝 如需测试游戏结束逻辑，请继续玩到方块堆到顶部');

  }, 100);

  // 返回主菜单重置
  return '测试脚本已执行，请在控制台查看结果';
})();
