import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {load} from 'cheerio';
import {buildRedesign} from './build-redesign.mjs';
import {applyUiUx,packages} from './ui-ux-refinements.mjs';
const repo=path.resolve(import.meta.dirname,'..'),norm=s=>s.replace(/\s+/g,' ').trim();
const readable=node=>norm(load(node.html().replace(/<\/(p|h[2-6]|li|pre|td)>/g,'</$1> ')).text());

test('all thirteen package choices retain prices, links and Projects navigation across re-application',async()=>{
 const $=load(await readFile(path.join(repo,'redesign/site/cjenik/index.html'),'utf8'));
 const before=$('.ep-package').map((_,e)=>({name:$(e).find('h3').text(),price:$(e).find('strong').first().text(),items:$(e).find('li').map((_,n)=>$(n).text()).get()})).get();
 applyUiUx($,{route:'/cjenik/'});applyUiUx($,{route:'/cjenik/'});
 assert.equal($('.ux-package-cta').length,13);assert.equal($('.ux-package-quick-cta').length,13);assert.equal($('.ux-package-comparison').length,4);
 for(const p of packages){const card=$('[data-package-id="'+p.id+'"]');assert.equal(card.length,1);assert.equal(card.find('.ux-package-cta').attr('href'),'/kontakt/?paket='+p.id+'#contact-form');}
 assert.deepEqual($('.ep-package').map((_,e)=>({name:$(e).find('h3').text(),price:$(e).find('strong').first().text(),items:$(e).find('li').map((_,n)=>$(n).text()).get()})).get(),before);
 assert.equal($('header nav a[href="/projekti/"],footer nav a[href="/projekti/"]').length,0);
});

test('complete article contents and paragraph grouping preserve every word, deep link and code/table',()=>{
 const html='<html><head></head><body><main><aside class="blog-contents"><nav></nav></aside><article class="blog-prose">'+Array.from({length:60},(_,i)=>`<h2 id="part-${i}">Odjeljak ${i}</h2><p>Kratki odlomak ${i}.</p>\n<p><a href="/kontakt/">Još jedna misao.</a></p>`).join('')+'<p id="protected">Odlomak sa sidrom.</p><pre><code>const x = 1;</code></pre><table><tbody><tr><td>Podatak</td></tr></tbody></table></article></main></body></html>';
 const $=load(html),text=readable($('.blog-prose')),code=$('pre').html(),table=$('table').html();
 applyUiUx($,{route:'/blog/primjer/'});const first=$.html();applyUiUx($,{route:'/blog/primjer/'});
 assert.equal($.html(),first);assert.equal(readable($('.blog-prose')),text);assert.equal($('.blog-contents nav a').length,60);assert.equal($('#protected').length,1);assert.equal($('pre').html(),code);assert.equal($('table').html(),table);
});

test('future CMS articles and rebuilt listings retain search, full contents and author metadata',async()=>{
 const seed=JSON.parse(await readFile(path.join(repo,'redesign/blog-seed.json'),'utf8'));
 const post={...seed[0],id:999999,slug:'ux-cms-regression-fixture',title:'Novi vodič za test predloška',authorName:'Marijan Malčić',categoryLabels:['SEO optimizacija'],featuredImage:null,publishedAt:'2026-11-15T08:00:00',modifiedAt:'2026-11-15T08:00:00',excerpt:'Izolirani test budućeg CMS članka.',contentHtml:Array.from({length:14},(_,i)=>`<h2>Tema ${i}</h2><p>Sačuvani sadržaj ${i}.</p>`).join('')};
 const out=path.join(repo,'.redesign-tests/ui-ux-cms/out');
 await buildRedesign({repoRoot:repo,outputRoot:out,posts:[post,...seed],fresh:true});
 const article=load(await readFile(path.join(out,'blog',post.slug,'index.html'),'utf8'));
 assert.equal(article('.blog-contents nav a').length,14);assert.equal(norm(article('.blog-prose').text()),norm(load(post.contentHtml).text()));
 assert.ok(article('head script[src*="ux-interactions."]').length);assert.ok(article('.blog-post-hero .blog-meta').text().includes('Marijan Malčić'));
 const listing=load(await readFile(path.join(out,'blog/index.html'),'utf8'));
 assert.equal(listing('.ux-blog-search').length,1);assert.equal(listing('.blog-rows [data-blog-card]').length,42);
 assert.equal(listing('a[href="/blog/'+post.slug+'/"][data-blog-card]').attr('data-blog-category'),'seo');
});
