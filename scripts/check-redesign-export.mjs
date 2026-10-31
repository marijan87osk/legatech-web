import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {load} from 'cheerio';
const hash=x=>createHash('sha256').update(x).digest('hex');
export async function checkRedesign({repoRoot=process.cwd(),outputRoot=path.resolve(repoRoot,'out')}={}){
 const repo=path.resolve(repoRoot),out=path.resolve(outputRoot),errors=[],htmlFiles=[],inventory=[];
 const config=JSON.parse(await readFile(path.join(repo,'redesign/config.json'),'utf8'));
 const legal=load(await readFile(path.join(repo,'redesign/site/uvjeti-koristenja/index.html'),'utf8'));
 const addressParts=legal('#registrirano-sjediste p').first().contents().filter((_,n)=>n.type==='text').map((_,n)=>n.data.trim()).get().filter(Boolean);
 const privateStreet=addressParts[0],privatePostalCity=addressParts[1]?.split(',')[0];
 if(!privateStreet||!privatePostalCity)throw Error('Registered address section has an unexpected structure');
 const approved=JSON.parse(await readFile(path.join(repo,'redesign/approved-pages.json'),'utf8'));
 const design=JSON.parse(await readFile(path.join(out,'legatech-design.json'),'utf8'));
 async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,e.name);if(e.isSymbolicLink()){errors.push('Symlink: '+file);continue;}if(e.isDirectory())await walk(file);else{
  const relative=path.relative(out,file).replaceAll(path.sep,'/');inventory.push(relative);
  if(e.name.endsWith('.html')&&!relative.startsWith('api/'))htmlFiles.push({file,relative});
  if(/(?:^|\/)(?:\.env|\.local|reviews|graft|design-exploration|private|node_modules)(?:[/.]|$)/.test(relative)||/\.(?:mjs|ps1|sqlite|db|log|zip|tar|gz)$/.test(relative))errors.push('Private/tool file: '+relative);
 }}}
 await walk(out);
 const documents=new Map();for(const row of htmlFiles){row.$=load(await readFile(row.file,'utf8'));row.route='/'+row.relative.replace(/index\.html$/,'');documents.set(row.route,row);}
 for(const {relative,route,$}of htmlFiles){
  const errorPage=relative==='404.html';if($('main h1').length!==1)errors.push(route+' needs one H1');
  if(!errorPage){
   const canonical=$('link[rel=canonical]').attr('href');if(!canonical?.startsWith(config.origin+'/'))errors.push(route+' canonical');
   if($('meta[name=robots]').attr('content')?.includes('noindex'))errors.push(route+' noindex');
   if(!$('title').text()||$('title').text().includes('|'))errors.push(route+' title');
   try{const schemas=JSON.parse($('script[type="application/ld+json"]').text());if(!Array.isArray(schemas))throw Error('Not array');if(schemas.some(n=>n['@type']==='ProfessionalService'))errors.push(route+' obsolete business schema');}catch{errors.push(route+' JSON-LD');}
  }
  const outside=load($.html());outside('#registrirano-sjediste').remove();
  if(outside.html().includes(privateStreet)||outside.html().includes(privatePostalCity)||outside('script[type="application/ld+json"]').text().includes('streetAddress'))errors.push(route+' private address outside approved legal block');
  if(route!=='/uvjeti-koristenja/'&&$('#registrirano-sjediste').length)errors.push(route+' address block');
  if(/(?:127\.0\.0\.1|localhost|staging2\.legatech\.hr|Mailpit|lokalni testni sandučić|Lokalni pregled)/i.test($('body').text()))errors.push(route+' local/staging copy');
  const ids=$('[id]').map((_,n)=>n.attribs.id).get();if(ids.length!==new Set(ids).size)errors.push(route+' duplicate IDs');
  for(const n of $('a[href]').toArray()){
   const href=$(n).attr('href');if(!href||/^(?:mailto:|tel:)/.test(href))continue;
   const u=new URL(href,config.origin+route);if(u.origin!==config.origin)continue;
   const target=documents.get(u.pathname);if(!target){errors.push(route+' missing link '+href);continue;}
   if(u.hash&&!target.$('[id]').toArray().some(e=>e.attribs.id===decodeURIComponent(u.hash.slice(1))))errors.push(route+' broken anchor '+href);
  }
  const refs=[];$('link[rel=stylesheet],link[rel=preload],link[rel=icon],script[src],img[src]').each((_,n)=>refs.push($(n).attr('src')||$(n).attr('href')));
  $('[srcset]').each((_,n)=>refs.push(...$(n).attr('srcset').split(',').map(p=>p.trim().split(/\s+/)[0])));
  for(const ref of refs){if(!ref||ref.startsWith('data:'))continue;const u=new URL(ref,config.origin+route);if(u.origin!==config.origin){errors.push(route+' external initial asset '+ref);continue;}try{await access(path.join(out,decodeURIComponent(u.pathname)));}catch{errors.push(route+' missing asset '+ref);}}
  if($('script[src="/site-runtime.js"]').length!==1||$('script[src*="googletagmanager.com"]').length)errors.push(route+' GA runtime/tag');
  if($('#contact-form').length&&($('#contact-form').attr('action')!=='/api/contact.php'||$('#contact-form').attr('method')!=='post'))errors.push(route+' contact route');
  const protectedPage=approved.find(p=>p.route===route&&!route.startsWith('/blog/'));
  if(protectedPage){
   const main=$('main').clone();main.find('#form-status').remove();
   if(route==='/')main.find('.article-grid').remove();
   if(hash(main.text().replace(/\s+/g,' ').trim())!==protectedPage.stableMainHash)errors.push(route+' approved non-blog content changed');
   if($('title').text()!==protectedPage.title||$('meta[name=description]').attr('content')!==protectedPage.description)errors.push(route+' approved metadata changed');
  }
 }
 const runtime=await readFile(path.join(out,'site-runtime.js'),'utf8'),context=vm.createContext({window:{}});vm.runInContext(runtime,context);
 if(context.window.LegatechRuntime?.gaDebugMode!=='false'||context.window.LegatechRuntime?.mailMode!=='smtp'||context.window.LegatechRuntime?.gaMeasurementId!==config.gaMeasurementId)errors.push('Production runtime settings');
 if(inventory.includes('local-runtime.js')||inventory.includes('server.mjs')||inventory.includes('contact-runtime-config.json'))errors.push('Local runtime/config included');
 const htaccess=await readFile(path.join(out,'.htaccess'),'utf8');if(/Header\s+(?:always\s+)?set\s+X-Robots-Tag.*noindex/i.test(htaccess))errors.push('Production noindex header');
 for(const p of ['naslovna','o-meni','izrada-web-trgovine','izrada-web-stranica','seo-optimizacija','robots-xml-sitemap'])if(!htaccess.includes('^'+p+'/?$'))errors.push('Missing redirect '+p);
 for(const p of ['api/contact.php','api/vendor/autoload.php','404.html'])if(!inventory.includes(p))errors.push('Missing production file '+p);
 const sitemap=load(await readFile(path.join(out,'sitemap.xml'),'utf8'),{xmlMode:true});
 for(const n of sitemap('loc').toArray()){const u=new URL(sitemap(n).text()),p=documents.get(u.pathname);if(u.origin!==config.origin||!p||p.$('link[rel=canonical]').attr('href')!==u.href)errors.push('Sitemap '+u.href);}
 return {pages:htmlFiles.length-1,sitemapUrls:sitemap('loc').length,files:inventory.length,legalApproval:design.publicAddressApproved,errors};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const report=await checkRedesign({repoRoot:path.resolve(import.meta.dirname,'..')});console.log(report);if(report.errors.length)process.exitCode=1;
}
