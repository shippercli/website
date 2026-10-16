// Optional browser regression: provide Playwright and a running production build.
// SHIPPER_BROWSER_URL selects the server; SHIPPER_BROWSER_EXECUTABLE selects Chrome.
const {chromium}=require(process.env.SHIPPER_PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.SHIPPER_BROWSER_EXECUTABLE ? {executablePath:process.env.SHIPPER_BROWSER_EXECUTABLE} : {})});
 try{
  const context=await browser.newContext({viewport:{width:Number(process.env.SHIPPER_BROWSER_WIDTH || 390),height:844},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.SHIPPER_BROWSER_URL || 'http://127.0.0.1:3000/',{waitUntil:'networkidle'});
  const menu=page.getByRole('button',{name:'Toggle menu',exact:true});
  await menu.focus();await page.keyboard.press('Enter');
  if(await menu.getAttribute('aria-expanded')!=='true')throw Error('Keyboard opening failed');
  const id=await menu.getAttribute('aria-controls');if(!await page.locator(`[id="${id}"]`).isVisible())throw Error('Controlled region missing');
  await page.keyboard.press('Tab');
  if(await page.evaluate(()=>document.activeElement?.textContent)!=='Providers')throw Error('First mobile destination not keyboard reachable');
  await page.keyboard.press('Escape');
  if(await menu.getAttribute('aria-expanded')!=='false'||!await menu.evaluate(e=>e===document.activeElement))throw Error('Escape did not close and return focus');
  const titles=[];const paths=['/providers','/specs','/docs'];
  for(const path of paths){
   await menu.click();
   const nav=page.getByRole('navigation',{name:'Main navigation'});
   const label={'/providers':'Providers','/specs':'Specs','/docs':'Documentation'}[path];
   await nav.getByRole('link',{name:label,exact:true}).click();
   await page.waitForURL('**'+path);await page.getByRole('heading',{level:1}).waitFor();
   if(await menu.getAttribute('aria-expanded')!=='false')throw Error('Menu stayed open after navigation');
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile horizontal overflow: '+path);
   titles.push(await page.title());
  }
  if(new Set(titles).size!==titles.length)throw Error('Page titles not distinct');
  if(errors.length)throw Error(JSON.stringify(errors));
  const result={viewport:`${process.env.SHIPPER_BROWSER_WIDTH || 390}x844`,checks:['Keyboard opens menu; aria-controls resolves','Tab reaches Providers; Escape closes and returns focus','Providers, Specs and Documentation links navigate and close menu','Three destinations have distinct titles and no horizontal overflow'],titles,pageErrors:errors,scope:'Locally served production build, headless Chromium/Chrome'};
  if(process.env.SHIPPER_BROWSER_EVIDENCE) fs.writeFileSync(process.env.SHIPPER_BROWSER_EVIDENCE,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
