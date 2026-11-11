/**
 * Fresh live-platform screenshots and a single 2-row × 3-column README image.
 * Requires Playwright/Chromium and an explicitly supplied demo-account session
 * for the Overview panel. Does not create tasks, fetch note bodies, start paid
 * downloads, or replace any server response with demonstration fixtures.
 *
 * PLAYWRIGHT_MODULE=/path/to/playwright \
 * PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chromium \
 * SCREENSHOT_DEMO_STATE=/private/path/demo-session.json \
 * node scripts/capture-platform-previews.cjs
 */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'assets/screenshots');
const base = process.env.SCREENSHOT_SITE || 'https://galaxysapi.com';
const panels = [
  { file: '01-workbench.png', title: '采集工作台', description: '按平台与场景选择采集工具', route: '/platform' },
  { file: '02-collection.png', title: '笔记搜索', description: '批量关键词与采集参数配置', route: '/platform/search' },
  { file: '03-data-center.png', title: '数据中心', description: '集中管理、筛选与导出采集结果', route: '/data?date=all' },
  { file: '04-data-preview.png', title: '笔记预览', description: '左图右文，查看正文与互动数据', route: '/data?taskId=sample_detail' },
  { file: '05-comment-report.png', title: '评论分析', description: '从评论中发现用户关注点与购买信号', route: '/api/reports/sample#s0' },
  { file: '06-overview.png', title: '概览', description: '查看使用概况、热门接口与活跃度', route: '/console/dashboard' },
];
const waitForImages = async page => {
  await page.evaluate(async () => {
    await Promise.all([...document.images].filter(img => {
      const r = img.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    }).map(img => img.complete ? Promise.resolve() : Promise.race([
      new Promise(resolve => { img.addEventListener('load', resolve, {once:true}); img.addEventListener('error', resolve, {once:true}); }),
      new Promise(resolve => setTimeout(resolve, 8000)),
    ])));
  });
};
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}),
    args: ['--no-sandbox'],
  });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce' });
    await context.addInitScript(() => localStorage.setItem('galaxy.preferences.v1', JSON.stringify({ theme: 'blue', locale: 'zh-CN' })));
    const blocked = new Set();
    await context.route('**/api/**', request => {
      if (!['GET', 'HEAD', 'OPTIONS'].includes(request.request().method())) {
        blocked.add(new URL(request.request().url()).pathname);
        return request.abort();
      }
      return request.continue();
    });
    let page = await context.newPage();
    const captures = [];
    const only = process.env.SCREENSHOT_ONLY ? new Set(process.env.SCREENSHOT_ONLY.split(',').map(Number)) : null;
    const previous = fs.existsSync(path.join(output,'capture-manifest.json')) ? JSON.parse(fs.readFileSync(path.join(output,'capture-manifest.json'),'utf8')) : null;
    for (const [index, panel] of panels.entries()) {
      if (only && !only.has(index + 1)) {
        const old = previous?.panels?.find(item => item.file === panel.file);
        if (!old || !fs.existsSync(path.join(output,panel.file))) throw new Error('Partial capture needs an existing '+panel.file);
        captures.push({...old,capturedAt:old.capturedAt||previous.capturedAt});
        continue;
      }
      if (index === 5) {
        if (!process.env.SCREENSHOT_DEMO_STATE) throw new Error("Overview capture requires SCREENSHOT_DEMO_STATE from the explicitly designated demo account");
        const demo = await browser.newContext({
          viewport: {width:1440,height:900}, deviceScaleFactor:1, colorScheme:'light', reducedMotion:'reduce',
          storageState:process.env.SCREENSHOT_DEMO_STATE,
        });
        await demo.addInitScript(() => localStorage.setItem('galaxy.preferences.v1',JSON.stringify({theme:'blue',locale:'zh-CN'})));
        await demo.route('**/api/**', request => {
          if (!['GET','HEAD','OPTIONS'].includes(request.request().method())) {
            blocked.add(new URL(request.request().url()).pathname);
            return request.abort();
          }
          return request.continue();
        });
        page = await demo.newPage();
      }
      await page.goto(base + panel.route, { waitUntil: 'networkidle', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      if (index === 0) await page.locator('.market-card').first().waitFor();
      if (index === 1) {
        await page.locator('textarea').first().fill('护肤\n面霜\n精华');
        await page.locator('textarea').first().blur();
      }
      if (index === 2) await page.getByText('红薯搜索示例数据', {exact:true}).waitFor();
      if (index === 3) {
        await page.locator('.note-cell-preview').first().waitFor();
        const candidates = await page.locator('.note-cell-preview').evaluateAll(buttons => buttons.map((button, index) => {
          const row = button.closest('tr');
          const text = label => row?.querySelector(`[data-label="${label}"]`)?.textContent?.trim() || '';
          return {index, type:text('笔记类型'), title:row?.querySelector('.note-title-action')?.textContent || '',
            length:(row?.querySelector('.note-content-action')?.textContent || '').length, images:Number(text('图片数量'))};
        }));
        const selected = candidates.filter(item => !/video|视频/i.test(item.type) && item.images >= 2 && item.length >= 120)
          .sort((a,b) => ((/双十一换机攻略/.test(b.title)?10000:0)+b.length)-((/双十一换机攻略/.test(a.title)?10000:0)+a.length))[0];
        if (!selected) throw new Error('No suitable multi-image text note in the public sample');
        await page.locator('.note-cell-preview').nth(selected.index).click();
        await page.locator('.note-detail-dialog').waitFor();
        if (await page.locator('.note-detail-dialog .note-video-open').count()) throw new Error('Selected note is a video');
        if (await page.locator('.note-gallery-dots button').count() < 2) throw new Error('Image-text note has no gallery');
        await page.waitForFunction(() => {
          const img = document.querySelector('.note-detail-dialog .note-detail-image');
          return img && img.complete && img.naturalWidth > 0;
        }, undefined, { timeout: 20000 });
      }
      if (panel.route.includes('#')) {
        const hash = new URL(base + panel.route).hash;
        await page.locator(`a[href="${hash}"]`).first().click();
      }
      if (index === 5) {
        await page.locator('.profile-overview .profile-summary-grid').waitFor({timeout:30000});
        if (await page.locator('.profile-overview [role="alert"]').count()) throw new Error('Overview has a load error');
      }
      await waitForImages(page);
      await page.waitForTimeout(800);
      const image = path.join(output, panel.file);
      await page.screenshot({path:image, animations:'disabled'});
      const {route, ...publicPanel} = panel;
      captures.push({...publicPanel, url:page.url(), pageTitle:await page.title(), capturedAt:new Date().toISOString()});
      console.log('Captured', panel.file, panel.title);
    }
    // Build the image with browser layout; the six original screenshots remain intact.
    const collage = await browser.newPage({viewport:{width:3200,height:2000},deviceScaleFactor:1});
    const cards = panels.map((panel, index) => `<figure><div class="screen"><img src="data:image/png;base64,${fs.readFileSync(path.join(output,panel.file)).toString('base64')}" alt="${escape(panel.title)}"></div><figcaption><span class="number">0${index+1}</span><div><h2>${escape(panel.title)}</h2><p>${escape(panel.description)}</p></div></figcaption></figure>`).join('');
    await collage.setContent(`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><style>
      *{box-sizing:border-box}body{margin:0;color:#14141a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans CJK SC",sans-serif}
      #preview{width:3200px;padding:64px;background:#faf9fd}header{display:flex;align-items:center;justify-content:space-between;margin-bottom:42px}
      h1{font-size:64px;letter-spacing:-2px;margin:0;font-weight:700}.brand{font-size:32px;color:#7c3aed;letter-spacing:5px;font-weight:600}
      .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}figure{margin:0;border:2px solid #e6e3ed;border-radius:20px;overflow:hidden;background:white}
      .screen{padding:18px;background:#f3f1f8;border-bottom:2px solid #eeeaf4}.screen img{display:block;width:100%;height:auto;border-radius:10px;box-shadow:0 4px 16px #25134510}
      figcaption{padding:26px 28px 30px;display:flex;align-items:flex-start;gap:18px}.number{font-size:27px;line-height:1.6;color:#9c82bf;font-weight:500}
      h2{margin:0;font-size:42px;line-height:1.3;font-weight:650}p{margin:10px 0 0;font-size:27px;line-height:1.4;color:#75717e}
    </style><main id="preview"><header><h1>功能预览</h1><span class="brand">GALAXY</span></header><section class="grid">${cards}</section></main></html>`,{waitUntil:'load'});
    await collage.evaluate(() => document.fonts.ready);
    await collage.locator('#preview').screenshot({path:path.join(output,'platform-overview.png'),animations:'disabled'});
    fs.writeFileSync(path.join(output,'capture-manifest.json'), JSON.stringify({
      capturedAt:new Date().toISOString(),source:base,theme:'light',viewport:{width:1440,height:900},layout:{rows:2,columns:3},image:'platform-overview.png',
      sourceData:'Platform public examples and the explicitly designated real demo account for Overview; no mocked business responses.',panels:captures,blockedMutationPaths:[...new Set([...(only ? previous?.blockedMutationPaths || [] : []),...blocked])],
    },null,2)+'\n');
    console.log('Created platform-overview.png (2 rows × 3 columns)');
  } finally { await browser.close(); }
})().catch(error => { console.error(error.message);process.exitCode=1; });
