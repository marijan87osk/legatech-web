import {spawn} from 'node:child_process';
import {access} from 'node:fs/promises';
import path from 'node:path';
const repo=path.resolve(import.meta.dirname,'..');
await access(path.join(repo,'out/index.html'));
let php=process.env.PHP_BINARY;
if(!php){
 const portable=path.resolve(repo,'../legatech redizajn2/.local/php/php.exe');
 try{await access(portable);php=portable;}catch{php='php';}
}
const child=spawn(php,['-S','127.0.0.1:8127','-t',path.join(repo,'out'),path.join(repo,'scripts/preview-router.php')],{cwd:repo,stdio:'inherit',windowsHide:true});
child.on('error',()=>{console.error('PHP 8.1+ is required for a safe release preview; set PHP_BINARY. Do not serve the PHP API as a static download.');process.exitCode=1;});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill());
child.on('exit',code=>{process.exitCode=code||0;});
console.log('Local release preview: http://127.0.0.1:8127/ (noindex, external Analytics blocked, mail disabled unless explicitly configured).');
