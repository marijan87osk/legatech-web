import {readFile,writeFile,mkdir,copyFile,readdir,rm,lstat,realpath,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import {assertSnapshotFresh} from './wordpress-snapshot-freshness.mjs';
import {versionPublicAssets} from './version-public-assets.mjs';

const hash=x=>createHash('sha256').update(x).digest('hex');
const text=x=>load(String(x??''),null,false).text().replace(/\s+/g,' ').trim();
const iso=x=>{const d=new Date(/(?:Z|[+-]\d\d:\d\d)$/.test(x)?x:x+'Z');if(!Number.isFinite(d.valueOf()))throw Error('Invalid CMS date');return d.toISOString();};
const date=x=>new Intl.DateTimeFormat('hr-HR',{dateStyle:'long',timeZone:'UTC'}).format(new Date(iso(x)));
const slugId=x=>text(x).toLowerCase().replaceAll('đ','d').normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'odjeljak';
async function exists(p){try{await access(p);return true;}catch{return false;}}
async function copyTree(from,to){
 await mkdir(to,{recursive:true});for(const e of await readdir(from,{withFileTypes:true})){
  if(e.isSymbolicLink())throw Error('Symlink rejected: '+e.name);
  const a=path.join(from,e.name),b=path.join(to,e.name);if(e.isDirectory())await copyTree(a,b);else await copyFile(a,b);
 }
}
export async function buildRedesign({repoRoot=process.cwd(),outputRoot=path.resolve(repoRoot,'out'),posts,fresh=false,cachedSyncMetadata}={}){
 const wordpressSyncFresh=fresh;
 const repo=await realpath(repoRoot),out=path.resolve(outputRoot),base=path.join(repo,'redesign/site');
 if(out!==path.join(repo,'out')&&!(out.startsWith(path.join(repo,'.redesign-tests')+path.sep)&&path.basename(out)==='out'))throw Error('Unsafe output path');
 if(await exists(out)){if((await lstat(out)).isSymbolicLink()||await realpath(out)!==out)throw Error('Unsafe output target');await rm(out,{recursive:true,force:true});}
 const config=JSON.parse(await readFile(path.join(repo,'redesign/config.json'),'utf8'));
 const state=JSON.parse(await readFile(path.join(repo,'redesign/blog-state.json'),'utf8'));
 const seed=JSON.parse(await readFile(path.join(repo,'redesign/blog-seed.json'),'utf8'));
 const inventory=JSON.parse(await readFile(path.join(repo,'redesign/files.json'),'utf8'));
 const approval=JSON.parse(await readFile(path.join(repo,'redesign/legal-approval.json'),'utf8'));
 const terms=load(await readFile(path.join(base,'uvjeti-koristenja/index.html'),'utf8'));
 const addressParts=terms('#registrirano-sjediste p').first().contents().filter((_,n)=>n.type==='text').map((_,n)=>n.data.trim()).get().filter(Boolean);
 const privateStreet=addressParts[0],privatePostalCity=addressParts[1]?.split(',')[0];
 if(!privateStreet||!privatePostalCity)throw Error('Registered address section has an unexpected structure');
 const blockHash=hash(terms('#registrirano-sjediste').toString());
 const legalApproved=approval.approvedForProduction===true&&approval.addressBlockHash===blockHash&&approval.scope==='legal-provider-section-only';
 if(!posts){
  posts=JSON.parse(await readFile(path.join(repo,'src/generated/blog-posts.json'),'utf8'));
  const metadata=path.join(repo,'src/generated/blog-sync.json');
  if(await exists(metadata))cachedSyncMetadata=JSON.parse(await readFile(metadata,'utf8'));
 }
 if(!Array.isArray(posts)||!posts.length)throw Error('Empty or invalid WordPress snapshot');
 // A verified complete cached snapshot also preserves confirmed unpublishes.
 if(!fresh&&cachedSyncMetadata?.postsHash===hash(JSON.stringify(posts))){assertSnapshotFresh(cachedSyncMetadata,state,null);fresh=true;}
 const seen=new Set();
 for(const p of posts){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)||seen.has(p.slug)||typeof p.title!=='string'||typeof p.contentHtml!=='string')throw Error('Invalid/duplicate CMS post');
  iso(p.publishedAt);iso(p.modifiedAt);seen.add(p.slug);
 }
 // REST and snapshot exports format dates, excerpts and generated markup differently.
 // Keep the reviewed page when WordPress still reports the same published version.
 const seedBySlug=new Map(seed.map(p=>[p.slug,p]));
 posts=posts.map(p=>{
  const approved=seedBySlug.get(p.slug);if(!approved)return p;
  const modified=Date.parse(iso(p.modifiedAt)),approvedModified=Date.parse(iso(approved.modifiedAt));
  if(modified<approvedModified)return approved;
  const sameVersion=modified===approvedModified&&iso(p.publishedAt)===iso(approved.publishedAt)
   &&p.title===approved.title&&p.authorName===approved.authorName
   &&JSON.stringify(p.categoryLabels)===JSON.stringify(approved.categoryLabels)
   &&JSON.stringify(p.featuredImage)===JSON.stringify(approved.featuredImage)
   &&text(p.contentHtml)===text(approved.contentHtml);
  return sameVersion?approved:p;
 });
 for(const item of inventory){
  const source=path.resolve(base,item.path),target=path.resolve(out,item.path);
  if(!source.startsWith(base+path.sep)||!target.startsWith(out+path.sep)||(await lstat(source)).isSymbolicLink())throw Error('Unsafe base file');
  const body=await readFile(source);if(hash(body)!==item.sha256)throw Error('Approved base file changed: '+item.path);
  await mkdir(path.dirname(target),{recursive:true});await writeFile(target,body);
 }
 const changed=[],removed=[];
 const current=new Map(posts.map(p=>[p.slug,p]));
 if(fresh)for(const slug of Object.keys(state))if(!current.has(slug)){await rm(path.join(out,'blog',slug),{recursive:true,force:true});removed.push(slug);}
 const template=await readFile(path.join(base,config.articleTemplate),'utf8');
 const origin=config.origin;
 const safeContent=html=>sanitizeHtml(html,{
  allowedTags:['p','br','h2','h3','h4','h5','h6','ul','ol','li','strong','em','b','i','a','blockquote','figure','figcaption','img','table','thead','tbody','tfoot','tr','th','td','pre','code','hr','sup','sub','del','mark','details','summary'],
  allowedAttributes:{'*':['class','id'],a:['href','title','target','rel'],img:['src','alt','title','width','height','loading','decoding'],th:['scope','colspan','rowspan'],td:['colspan','rowspan'],code:['class']},
  allowedSchemes:['http','https','mailto','tel'],allowProtocolRelative:false,
 }).replaceAll(privateStreet,'Osijek').replaceAll(privatePostalCity,'Osijek');
 function meta($,key,value){const selector=`meta[name="${key}"],meta[property="${key}"]`,$node=$(selector);if($node.length)$node.attr('content',value);else $('head').append($('<meta>').attr(key.startsWith('og:')?'property':'name',key).attr('content',value));}
 function populateMeta($,node,p){
  node.empty().append($('<span>').text(p.categoryLabels?.[0]||'Blog')).append($('<time>').attr('datetime',iso(p.publishedAt)).text(date(p.publishedAt))).append($('<span>').text((p.readingMinutes||1)+' min čitanja'));
 }
 for(const p of posts){
  const old=state[p.slug];
  if(old&&(old.postHash===hash(JSON.stringify(p))||Date.parse(iso(p.modifiedAt))<Date.parse(iso(old.modifiedAt))))continue;
  const $=load(template),url=origin+'/blog/'+p.slug+'/',title=p.title.replaceAll('|','-')+' - Legatech',description=text(p.excerpt);
  $('title').text(title);$('link[rel=canonical]').attr('href',url);
  for(const key of ['og:title','twitter:title'])meta($,key,title);
  for(const key of ['description','og:description','twitter:description'])meta($,key,description);
  meta($,'og:url',url);meta($,'og:image',origin+'/assets/social/blog.png');meta($,'twitter:image',origin+'/assets/social/blog.png');
  meta($,'og:image:alt',p.title);meta($,'twitter:image:alt',p.title);
  $('.blog-post-hero h1').text(p.title);$('.blog-post-deck').text(description);
  populateMeta($,$('.blog-post-hero .blog-meta'),p);$('.blog-post-hero .blog-meta').append($('<span>').text(text(p.authorName||'Legatech')));
  $('.blog-prose').html(safeContent(p.contentHtml));
  const used=new Set($('[id]').not('.blog-prose [id]').map((_,e)=>e.attribs.id).get()),toc=$('.blog-contents nav').empty();
  $('.blog-prose h2,.blog-prose h3').each((_,node)=>{
   const h=$(node);let id=h.attr('id')||slugId(h.text()),suffix=1,candidate=id;
   while(used.has(candidate))candidate=id+'-'+(++suffix);id=candidate;used.add(id);h.attr('id',id);
   toc.append($('<a>').attr('href','#'+id).text(h.text()));
  });
  $('.blog-prose figure.wp-block-table').attr({tabindex:'0',role:'region','aria-label':'Tablica u članku'});
  $('.blog-prose pre').attr({tabindex:'0',role:'region','aria-label':'Primjer koda'});
  $('.blog-prose thead th').attr('scope','col');
  $('a[target=_blank]').attr('rel','noopener noreferrer');
  if(p.featuredImage){
   const image=p.featuredImage;if(!image.src?.startsWith('/blog-media/'))throw Error('Unlocalized featured image');
   const figure=$('<figure class="blog-featured-image">').append($('<img>').attr({src:image.src,alt:image.alt||'',loading:'eager',decoding:'async',...(image.width?{width:String(image.width)}:{}),...(image.height?{height:String(image.height)}:{})}));
   $('.blog-post-hero .container').append(figure);
  }
  const schemas=JSON.parse($('script[type="application/ld+json"]').text());
  for(const s of schemas){
   if(s['@type']==='Article')Object.assign(s,{'@id':url+'#article',url,headline:p.title,description,datePublished:iso(p.publishedAt),dateModified:iso(p.modifiedAt),author:{'@type':'Person',name:text(p.authorName||'Legatech'),url:origin+'/o-nama/'},image:origin+'/assets/social/blog.png'});
   if(s['@type']==='WebPage'){
    Object.assign(s,{'@id':url+'#webpage',url,name:title,description,mainEntity:{'@id':url+'#article'},breadcrumb:{'@id':url+'#breadcrumb'}});delete s.primaryImageOfPage;
   }
   if(s['@type']==='BreadcrumbList')Object.assign(s,{'@id':url+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Naslovna',item:origin+'/'},{'@type':'ListItem',position:2,name:'Blog',item:origin+'/blog/'},{'@type':'ListItem',position:3,name:p.title,item:url}]});
  }
  $('script[type="application/ld+json"]').text(JSON.stringify(schemas).replaceAll('<','\\u003c'));
  const file=path.join(out,'blog',p.slug,'index.html');await mkdir(path.dirname(file),{recursive:true});await writeFile(file,$.html());changed.push(p.slug);
 }
 // Preserve newer approved articles when the existing CI cache is older/incomplete.
 const effective=[...posts];
 for(const slug of Object.keys(state))if(!current.has(slug)&&!fresh){
  const $=load(await readFile(path.join(base,'blog',slug,'index.html'),'utf8'));
  effective.push({slug,title:$('h1').text(),excerpt:$('.blog-post-deck').text(),publishedAt:$('.blog-post-hero time').attr('datetime'),modifiedAt:state[slug].modifiedAt,readingMinutes:Number($('.blog-post-hero .blog-meta').text().match(/(\d+)\s*min/)?.[1]||1),categoryLabels:[$('.blog-post-hero .blog-meta>span').first().text()]});
 }
 effective.sort((a,b)=>Date.parse(iso(b.publishedAt))-Date.parse(iso(a.publishedAt)));
 if(changed.length||removed.length){
  const listing=load(await readFile(path.join(out,'blog/index.html'),'utf8'));
  const featured=effective.find(p=>p.slug===config.featuredSlug)||effective[0];
  const feature=listing('.blog-feature>a').attr('href','/blog/'+featured.slug+'/');
  populateMeta(listing,feature.find('.blog-meta'),featured);feature.find('h2').text(featured.title);feature.find('p').text(text(featured.excerpt));
  const rows=listing('.blog-rows').empty();
  effective.filter(p=>p.slug!==featured.slug).forEach((p,i)=>{
   const row=listing('<a class="blog-row">').attr('href','/blog/'+p.slug+'/').append(listing('<span class="blog-row-index">').text(String(i+2).padStart(2,'0')));
   const content=listing('<span>'),m=listing('<span class="blog-meta">');populateMeta(listing,m,p);
   content.append(m,listing('<h3>').text(p.title),listing('<p>').text(text(p.excerpt)));row.append(content,'<span class="blog-row-arrow" aria-hidden="true">↗</span>');rows.append(row);
  });
  const listingSchemas=JSON.parse(listing('script[type="application/ld+json"]').text());
  const collection=listingSchemas.find(n=>n['@type']==='CollectionPage');
  if(collection)collection.mainEntity={'@type':'ItemList',itemListElement:[featured,...effective.filter(p=>p.slug!==featured.slug)].map((p,i)=>({'@type':'ListItem',position:i+1,url:origin+'/blog/'+p.slug+'/'}))};
  listing('script[type="application/ld+json"]').text(JSON.stringify(listingSchemas).replaceAll('<','\\u003c'));
  const home=load(await readFile(path.join(out,'index.html'),'utf8')),cards=home('.article-grid').empty();
  effective.slice(0,3).forEach(p=>{
   const card=home('<a>').attr('href','/blog/'+p.slug+'/');const m=home('<span class="article-meta">').text(p.categoryLabels?.[0]||'Blog').append(' ',home('<time>').attr('datetime',iso(p.publishedAt)).text(date(p.publishedAt)));
   card.append(m,home('<h3>').text(p.title),home('<p>').text(text(p.excerpt)),home('<span class="article-foot">').text((p.readingMinutes||1)+' min čitanja ').append('<span aria-hidden="true">↗</span>'));cards.append(card);
  });
  await writeFile(path.join(out,'index.html'),home.html());await writeFile(path.join(out,'blog/index.html'),listing.html());
  for(const p of effective){
   const file=path.join(out,'blog',p.slug,'index.html'),$=load(await readFile(file,'utf8')),links=$('.blog-related-list').empty();
   for(const related of effective.filter(n=>n.slug!==p.slug).slice(0,2))links.append($('<a>').attr('href','/blog/'+related.slug+'/').append($('<span>').text((related.categoryLabels?.[0]||'Blog')+' · '+(related.readingMinutes||1)+' min čitanja'),$('<h3>').text(related.title),$('<span>').text('Pročitajte članak ↗')));
   await writeFile(file,$.html());
  }
 }
 if(await exists(path.join(repo,'public/blog-media')))await copyTree(path.join(repo,'public/blog-media'),path.join(out,'blog-media'));
 await mkdir(path.join(out,'api'),{recursive:true});await copyFile(path.join(repo,'public/api/contact.php'),path.join(out,'api/contact.php'));
 await copyTree(path.join(repo,'public/api/vendor'),path.join(out,'api/vendor'));
 await writeFile(path.join(out,'api/vendor/.htaccess'),'Require all denied\n');
 const html=[];
 async function walk(folder){for(const e of await readdir(folder,{withFileTypes:true})){if(e.isSymbolicLink())throw Error('Output symlink');const file=path.join(folder,e.name);if(e.isDirectory()){if(file!==path.join(out,'api'))await walk(file);}else if(e.name.endsWith('.html'))html.push(file);}}
 await walk(out);const routes=new Set(html.filter(f=>f.endsWith('index.html')).map(f=>'/'+path.relative(out,f).replaceAll(path.sep,'/').replace(/index\.html$/,'')));
 const sitemap=[];
 for(const file of html){
  const $=load(await readFile(file,'utf8')),route='/'+path.relative(out,file).replaceAll(path.sep,'/').replace(/index\.html$/,'');let touched=false;
  if(removed.length)$('a[href]').each((_,n)=>{const u=new URL($(n).attr('href'),origin+route);if(u.origin===origin&&removed.includes(u.pathname.split('/')[2])&&u.pathname.startsWith('/blog/')){$(n).replaceWith($(n).contents());touched=true;}});
  const canonical=$('link[rel=canonical]').attr('href');
  const alias=config.canonicalAliases?.[route];
  if(alias&&routes.has(alias)){
   const a=route.split('/')[2],b=alias.split('/')[2],signature=slug=>current.has(slug)?hash(current.get(slug).contentHtml):state[slug]?.contentHash;
   const desired=origin+(signature(a)===signature(b)?alias:route);
   if(canonical!==desired){$('link[rel=canonical]').attr('href',desired);meta($,'og:url',desired);touched=true;}
  }
  if(canonical&&canonical.startsWith(origin)&&!routes.has(new URL(canonical).pathname)){$('link[rel=canonical]').attr('href',origin+route);meta($,'og:url',origin+route);touched=true;}
  if($('link[rel=canonical]').attr('href')===origin+route&&!$('meta[name=robots]').attr('content')?.includes('noindex'))sitemap.push(origin+route);
  if(touched)await writeFile(file,$.html());
 }
 await writeFile(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+sitemap.map(u=>'  <url><loc>'+u+'</loc></url>').join('\n')+'\n</urlset>\n');
 const assets=await versionPublicAssets({outputRoot:out,htmlFiles:html,origin});
 const design={version:1,design:'approved-expressive-plum-pistachio',pages:routes.size,cmsPosts:effective.length,changed,removed,wordpressSyncFresh,wordpressSnapshotAuthoritative:fresh,publicAddressApproved:legalApproved,addressBlockHash:blockHash,debugMode:false,mailMode:'smtp',versionedAssets:Object.keys(assets).length};
 await writeFile(path.join(out,'legatech-design.json'),JSON.stringify(design,null,2));return design;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(await buildRedesign({repoRoot:path.resolve(import.meta.dirname,'..'),fresh:process.argv.includes('--fresh')||process.env.LEGATECH_WORDPRESS_SYNC_FRESH==='true'}));
