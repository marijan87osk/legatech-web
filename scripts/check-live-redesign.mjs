// Read-only HTTP checks. No form submission, email, or Analytics events.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {load} from 'cheerio';
const repo=path.resolve(import.meta.dirname,'..');
const origin=new URL(process.argv.find(x=>x.startsWith('--origin='))?.slice(9)||'https://legatech.hr').origin;
const preview=process.argv.includes('--preview');
if(preview&&!['127.0.0.1','localhost'].includes(new URL(origin).hostname))throw Error('Preview mode is loopback only');
const approved=JSON.parse(await readFile(path.join(repo,'redesign/approved-pages.json'),'utf8'));
const errors=[];let checked=0;
async function get(route){const response=await fetch(origin+route,{redirect:'manual',signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});return {response,body:await response.text()};}
const marker=await get('/legatech-design.json');
let design;try{design=JSON.parse(marker.body);}catch{throw Error('The approved redesign marker is not available');}
if(marker.response.status!==200||design.design!=='approved-expressive-plum-pistachio'||design.debugMode!==false||design.publicAddressApproved!==true)throw Error('Unexpected release marker');
for(let i=0;i<approved.length;i+=4)await Promise.all(approved.slice(i,i+4).map(async page=>{
 try{
  const {response,body}=await get(page.route),$=load(body),robots=response.headers.get('x-robots-tag')||'';
  if(response.status!==200)errors.push(page.route+' HTTP '+response.status);
  if(preview?!/noindex/i.test(robots):/noindex/i.test(robots))errors.push(page.route+' X-Robots-Tag');
  if($('meta[name=robots]').attr('content')?.includes('noindex'))errors.push(page.route+' meta robots');
  if($('main h1').length!==1)errors.push(page.route+' H1');
  if(!page.route.startsWith('/blog/')&&$('title').text()!==page.title)errors.push(page.route+' title');
  if(!$('link[rel=canonical]').attr('href')?.startsWith('https://legatech.hr/'))errors.push(page.route+' canonical');
  checked++;
 }catch(error){errors.push(page.route+' '+error.message);}
}));
const missing=await get('/legatech-release-check-missing-page/');if(missing.response.status!==404||!missing.body.includes('Stranica nije'))errors.push('Custom 404');
const api=await get('/api/contact.php');if(api.response.status!==(preview?503:405))errors.push('Contact API GET status');
console.log(JSON.stringify({origin,preview,pages:checked,noMessagesSent:true,errors},null,2));if(errors.length)process.exitCode=1;
