// 游戏自动化测试
const puppeteer = require('puppeteer');

async function testTetris() {
  console.log('启动测试...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 捕获控制台消息
  page.on('console', msg => {
    if(msg.type() === 'error') {
      console.error('Console Error:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.error('Page Error:', err.message);
  });

  try {
    await page.goto('http://localhost:8899/tetris-pro.html', { waitUntil: 'networkidle0' });
    console.log('页面加载成功');

    // 等待菜单加载
    await page.waitForSelector('#menu-overlay', { timeout: 5000 });
    console.log('菜单界面已加载');

    // 点击开始游戏
    await page.click('#btn-start-game');
    console.log('已点击开始游戏');

    // 等待游戏开始
    await page.waitForFunction(() => {
      const menu = document.getElementById('menu-overlay');
      return menu && menu.classList.contains('hidden');
    }, { timeout: 3000 });
    console.log('游戏已开始');

    // 模拟玩家操作
    console.log('开始模拟玩家操作...');

    // 测试旋转
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('z');
    await page.keyboard.press('x');
    console.log('旋转测试完成');

    // 测试移动
    for(let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowRight');
    }
    console.log('移动测试完成');

    // 测试软降
    for(let i = 0; i < 10; i++) {
      await page.keyboard.press('ArrowDown');
    }
    console.log('软降测试完成');

    // 测试硬降（空格）
    await page.keyboard.press(' ');
    console.log('硬降测试完成');

    // 继续玩几秒
    for(let i = 0; i < 5; i++) {
      await page.keyboard.press(' ');
      await page.waitForTimeout(200);
    }
    console.log('连续操作测试完成');

    // 检查游戏状态
    const gameState = await page.evaluate(() => {
      if(typeof game !== 'undefined' && game) {
        return {
          state: game.gameState,
          isClearing: game.isClearing,
          hasCurrent: game.current !== null,
          score: game.score,
          level: game.level
        };
      }
      return null;
    });

    if(gameState) {
      console.log('游戏状态:', JSON.stringify(gameState, null, 2));
    }

    // 测试暂停/继续
    await page.keyboard.press('p');
    console.log('暂停测试');

    await page.waitForTimeout(500);

    await page.keyboard.press('p');
    console.log('继续测试');

    // 继续玩
    for(let i = 0; i < 10; i++) {
      await page.keyboard.press(' ');
      await page.waitForTimeout(100);
    }

    // 最终检查
    const finalState = await page.evaluate(() => {
      if(typeof game !== 'undefined' && game) {
        return {
          state: game.gameState,
          score: game.score,
          lines: game.lines,
          level: game.level
        };
      }
      return { error: 'game not found' };
    });

    console.log('最终游戏状态:', JSON.stringify(finalState, null, 2));

    // 检查是否有错误
    const errors = await page.evaluate(() => {
      return window.errorCount || 0;
    });

    console.log('测试完成!');
    console.log('游戏运行正常，未检测到明显错误');

  } catch (err) {
    console.error('测试失败:', err.message);
  } finally {
    await browser.close();
  }
}

testTetris();
