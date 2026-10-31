import {readFile,writeFile,readdir,copyFile,lstat} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';

// Old filenames remain available to previously cached documents. New HTML always
// references content-derived filenames, independent of browser/proxy cache expiry.
export async function versionPublicAssets({outputRoot,htmlFiles,origin}){
 const out=path.resolve(outputRoot),manifest={};
 async function walk(folder){
  for(const entry of await readdir(folder,{withFileTypes:true})){
   const file=path.join(folder,entry.name),relative=path.relative(out,file).replaceAll(path.sep,'/');
   if((await lstat(file)).isSymbolicLink())throw Error('Asset symlink rejected');
   if(relative==='api'||relative.startsWith('api/'))continue;
   if(entry.isDirectory()){await walk(file);continue;}
   if(!/\.(?:css|js)$/.test(entry.name)||/\.[a-f0-9]{12}\.(?:css|js)$/.test(entry.name))continue;
   const digest=createHash('sha256').update(await readFile(file)).digest('hex').slice(0,12);
   const versioned=relative.replace(/\.(css|js)$/,'.'+digest+'.$1');
   await copyFile(file,path.join(out,versioned));manifest['/'+relative]='/'+versioned;
  }
 }
 await walk(out);
 for(const file of htmlFiles){
  if(!path.resolve(file).startsWith(out+path.sep))throw Error('HTML path outside export');
  const $=load(await readFile(file,'utf8'));
  $('[src],[href]').each((_,node)=>{
   const element=$(node);
   for(const attribute of ['src','href']){
    const value=element.attr(attribute);if(!value)continue;
    const url=new URL(value,origin+'/'+path.relative(out,file).replaceAll(path.sep,'/'));
    if(url.origin!==origin||!manifest[url.pathname])continue;
    element.attr(attribute,(value.startsWith(origin)?origin:'')+manifest[url.pathname]+url.search+url.hash);
   }
  });
  await writeFile(file,$.html());
 }
 await writeFile(path.join(out,'asset-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 const htaccess=path.join(out,'.htaccess');
 let rules='';try{rules=await readFile(htaccess,'utf8');}catch(error){if(error.code!=='ENOENT')throw error;}
 rules=rules.replace(/\n?# BEGIN LEGATECH ASSET CACHE[\s\S]*?# END LEGATECH ASSET CACHE\r?\n?/g,'');
 rules+=`\n# BEGIN LEGATECH ASSET CACHE\n<IfModule mod_expires.c>\n  ExpiresActive Off\n</IfModule>\n<IfModule mod_headers.c>\n  <FilesMatch "\\.(?:html|css|js|json|xml|txt)$">\n    Header unset Cache-Control\n    Header always unset Cache-Control\n    Header always set Cache-Control "public, max-age=0, must-revalidate"\n    Header unset Expires\n    Header always unset Expires\n  </FilesMatch>\n  <FilesMatch "\\.[a-f0-9]{12}\\.(?:css|js)$">\n    Header always set Cache-Control "public, max-age=31536000, immutable"\n  </FilesMatch>\n</IfModule>\n# END LEGATECH ASSET CACHE\n`;
 await writeFile(htaccess,rules);
 return manifest;
}
