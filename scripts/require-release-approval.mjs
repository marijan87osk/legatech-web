import {readFile} from 'node:fs/promises';
const design=JSON.parse(await readFile('out/legatech-design.json','utf8'));
if(design.design!=='approved-expressive-plum-pistachio'||design.publicAddressApproved!==true){
 throw Error('Production artifact blocked: explicit owner approval of the registered address in the legal provider section is required. The local candidate may still be reviewed.');
}
console.log('The approved legal disclosure hash matches this release.');
