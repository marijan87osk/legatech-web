import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdir,mkdtemp,writeFile,rm,realpath,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const repo=path.resolve(import.meta.dirname,'..'),fixtures=path.join(repo,'.redesign-tests');
await mkdir(fixtures,{recursive:true});
let php=process.env.PHP_BINARY;
if(!php){const portable=path.resolve(repo,'../legatech redizajn2/.local/php/php.exe');try{await access(portable);php=portable;}catch{php='php';}}
const script=await readFile(path.join(repo,'scripts/deploy-siteground.sh'),'utf8');
const code=script.match(/php -r '\n([\s\S]+?)\n' "\$release_dir\/legatech-design.json"/)[1];
const valid={design:'approved-expressive-plum-pistachio',publicAddressApproved:true,debugMode:false,mailMode:'smtp'};
async function run(t,{design=valid,missing=false,recipient='inbox@fixture.example'}={}){
 const dir=await mkdtemp(path.join(fixtures,'preflight-'));
 t.after(async()=>{if(!dir.startsWith(fixtures+path.sep)||await realpath(dir)!==dir)throw Error('Unsafe cleanup');await rm(dir,{recursive:true,force:true});});
 await mkdir(path.join(dir,'private'));await mkdir(path.join(dir,'public_html'));
 await writeFile(path.join(dir,'design.json'),JSON.stringify(design));
 if(!missing)await writeFile(path.join(dir,'private/legatech-contact.php'),`<?php return ['smtp_host'=>'smtp.fixture.example','smtp_port'=>465,'smtp_encryption'=>'ssl','smtp_username'=>'fixture','smtp_password'=>'synthetic-no-transport','from_email'=>'web@fixture.example','recipient_email'=>'${recipient}','rate_limit_salt'=>'synthetic-fixture-salt-longer-than-24','allowed_origins'=>['https://legatech.hr']];`);
 return spawnSync(php,['-r',code,path.join(dir,'design.json').replaceAll('\\','/'),path.join(dir,'public_html').replaceAll('\\','/')],{encoding:'utf8',windowsHide:true});
}
test('production preflight accepts configured fixtures without opening SMTP',async t=>{const r=await run(t);assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/No email was sent/);});
test('production preflight blocks missing private SMTP configuration',async t=>{const r=await run(t,{missing:true});assert.equal(r.status,1);assert.match(r.stderr,/unavailable/);});
test('production preflight rejects a local test mailbox',async t=>{const r=await run(t,{recipient:'inbox@legatech.test'});assert.equal(r.status,1);assert.match(r.stderr,/test placeholders/);});
test('production preflight blocks an unapproved legal disclosure',async t=>{const r=await run(t,{design:{...valid,publicAddressApproved:false}});assert.equal(r.status,1);});
test('production preflight blocks debug artifacts',async t=>{const r=await run(t,{design:{...valid,debugMode:true}});assert.equal(r.status,1);});
