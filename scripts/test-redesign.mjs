import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,rm,access,realpath} from 'node:fs/promises';
import path from 'node:path';
import {load} from 'cheerio';
import {createHash} from 'node:crypto';
import {buildRedesign} from './build-redesign.mjs';
import {checkRedesign} from './check-redesign-export.mjs';
import {assertSnapshotFresh} from './wordpress-snapshot-freshness.mjs';
const repo=path.resolve(import.meta.dirname,'..'),fixtures=path.join(repo,'.redesign-tests');
// CI may restore a newer cache before tests; fixtures must remain deterministic.
const posts=JSON.parse(await readFile(path.join(repo,'redesign/blog-seed.json'),'utf8'));
await mkdir(fixtures,{recursive:true});
test('stale CMS snapshots cannot replace newer approved or cached content',()=>{
 const state={post:{modifiedAt:'2026-10-22T10:00:00'}};
 assert.throws(()=>assertSnapshotFresh({generatedAt:'2026-10-13T18:22:48+00:00'},state,null),/stariji/);
 assert.throws(()=>assertSnapshotFresh({generatedAt:'2026-10-24T10:00:00Z'},state,{generatedAt:'2026-10-30T12:00:00Z'}),/stariji/);
 // A fresh unpublish is valid even when the remaining posts have older dates.
 assert.equal(assertSnapshotFresh({generatedAt:'2026-10-31T12:00:00+00:00'},state,{generatedAt:'2026-10-30T12:00:00Z'}),'2026-10-31T12:00:00.000Z');
});
async function fixture(t){
 const dir=await mkdtemp(path.join(fixtures,'release-'));
 t.after(async()=>{if(!dir.startsWith(fixtures+path.sep)||await realpath(dir)!==dir)throw Error('Unsafe fixture cleanup');await rm(dir,{recursive:true,force:true});});
 return path.join(dir,'out');
}
test('the approved 42-post snapshot preserves the design and production defaults',async t=>{
 const out=await fixture(t),result=await buildRedesign({repoRoot:repo,outputRoot:out,posts});
 assert.deepEqual(result.changed,[]);assert.equal(result.cmsPosts,42);assert.equal(result.pages,62);
 const check=await checkRedesign({repoRoot:repo,outputRoot:out});assert.deepEqual(check.errors,[]);
});
test('equivalent REST and snapshot versions retain reviewed pages and repaired links',async t=>{
 const out=await fixture(t),snapshot=posts.map(p=>({...p,publishedAt:p.publishedAt+'+00:00',modifiedAt:p.modifiedAt+'+00:00',excerpt:p.excerpt+' Dulji automatski sažetak iz drugog izvoza.',contentHtml:p.contentHtml.replace(/\s+id="[^"]*"/g,'')}));
 const result=await buildRedesign({repoRoot:repo,outputRoot:out,posts:snapshot,fresh:true});
 assert.deepEqual(result.changed,[]);assert.deepEqual(result.removed,[]);
 assert.equal(await readFile(path.join(out,'blog/core-web-vitals/index.html'),'utf8'),await readFile(path.join(repo,'redesign/site/blog/core-web-vitals/index.html'),'utf8'));
 assert.deepEqual((await checkRedesign({repoRoot:repo,outputRoot:out})).errors,[]);
});
test('an older incomplete cache cannot erase the three October articles',async t=>{
 const out=await fixture(t),old=posts.filter(p=>!['sto-je-keyword-difficulty','kako-pronaci-content-gap','kako-analizirati-seo-konkurenciju'].includes(p.slug));
 const result=await buildRedesign({repoRoot:repo,outputRoot:out,posts:old,fresh:false});
 assert.equal(result.cmsPosts,42);assert.deepEqual(result.removed,[]);
 await access(path.join(out,'blog/sto-je-keyword-difficulty/index.html'));
 assert.deepEqual((await checkRedesign({repoRoot:repo,outputRoot:out})).errors,[]);
});
test('older cached metadata cannot leak into refreshed indexes',async t=>{
 const out=await fixture(t),older={...posts[0],title:'Zastarjeli naslov iz cachea',modifiedAt:'2020-01-01T00:00:00'};
 const update={...posts[1],title:posts[1].title+' — dopuna',modifiedAt:'2026-10-31T12:00:00'};
 await buildRedesign({repoRoot:repo,outputRoot:out,posts:[older,update,...posts.slice(2)],fresh:false});
 const home=await readFile(path.join(out,'index.html'),'utf8');assert.ok(!home.includes(older.title));assert.ok(home.includes(posts[0].title));
 assert.deepEqual((await checkRedesign({repoRoot:repo,outputRoot:out})).errors,[]);
});
test('new WordPress content keeps the template and strips executable markup',async t=>{
 const out=await fixture(t),post={...posts[0],id:999999,slug:'test-launch-fixture',title:'Testni vodič za objavu',excerpt:'Sadržaj služi samo automatiziranom testu.',publishedAt:'2026-10-31T10:00:00',modifiedAt:'2026-10-31T10:00:00',contentHtml:'<h2>Prvi korak</h2><p>Siguran sadržaj.</p><h2>Prvi korak</h2><script>alert(1)</script><p onclick="alert(2)">Provjera.</p><a href="javascript:alert(3)">Tekst</a>'};
 const result=await buildRedesign({repoRoot:repo,outputRoot:out,posts:[post,...posts],fresh:true});
 assert.equal(result.cmsPosts,43);assert.ok(result.changed.includes(post.slug));
 const html=await readFile(path.join(out,'blog',post.slug,'index.html'),'utf8'),$=load(html);
 assert.equal($('h1').text(),post.title);assert.equal($('.blog-prose script,[onclick]').length,0);assert.equal($('a[href^="javascript:"]').length,0);
 assert.equal($('.blog-prose h2').eq(0).attr('id'),'prvi-korak');assert.equal($('.blog-prose h2').eq(1).attr('id'),'prvi-korak-2');
 assert.ok((await readFile(path.join(out,'index.html'),'utf8')).includes(post.title));
 assert.deepEqual((await checkRedesign({repoRoot:repo,outputRoot:out})).errors,[]);
});
test('a title-only CMS update is not mistaken for unchanged content',async t=>{
 const out=await fixture(t),updated={...posts[0],title:posts[0].title+' — dopuna',modifiedAt:'2026-10-31T10:01:00'};
 const result=await buildRedesign({repoRoot:repo,outputRoot:out,posts:[updated,...posts.slice(1)],fresh:true});
 assert.ok(result.changed.includes(updated.slug));
 const $=load(await readFile(path.join(out,'blog',updated.slug,'index.html'),'utf8'));assert.equal($('h1').text(),updated.title);
 assert.deepEqual((await checkRedesign({repoRoot:repo,outputRoot:out})).errors,[]);
});
test('a fresh WordPress unpublish removes its page and dangling links',async t=>{
 const out=await fixture(t),withdrawn=posts.at(-1),remaining=posts.filter(p=>p.slug!==withdrawn.slug);
 const result=await buildRedesign({repoRoot:repo,outputRoot:out,posts:remaining,fresh:true});
 assert.ok(result.removed.includes(withdrawn.slug));
 await assert.rejects(access(path.join(out,'blog',withdrawn.slug,'index.html')));
 assert.deepEqual((await checkRedesign({repoRoot:repo,outputRoot:out})).errors,[]);
});
test('a verified cached unpublish survives later code builds',async t=>{
 const out=await fixture(t),remaining=posts.slice(0,-1),metadata={generatedAt:'2026-10-31T12:00:00Z',postsHash:createHash('sha256').update(JSON.stringify(remaining)).digest('hex')};
 const result=await buildRedesign({repoRoot:repo,outputRoot:out,posts:remaining,fresh:false,cachedSyncMetadata:metadata});
 assert.ok(result.removed.includes(posts.at(-1).slug));assert.equal(result.wordpressSyncFresh,false);assert.equal(result.wordpressSnapshotAuthoritative,true);
 assert.deepEqual((await checkRedesign({repoRoot:repo,outputRoot:out})).errors,[]);
});
test('unmatched cache metadata cannot remove an approved article',async t=>{
 const out=await fixture(t),result=await buildRedesign({repoRoot:repo,outputRoot:out,posts:posts.slice(0,-1),fresh:false,cachedSyncMetadata:{generatedAt:'2026-10-31T12:00:00Z',postsHash:'invalid'}});
 assert.deepEqual(result.removed,[]);assert.equal(result.cmsPosts,42);
});
