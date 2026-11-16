// Shared by the approved static source and future WordPress-driven builds.
import {improvePricingComparisons} from './package-comparisons.mjs';
export const serviceLabels={web:'Izrada web stranica',shop:'Izrada web trgovina',seo:'SEO optimizacija',care:'Održavanje web stranica'};
export const packages=[
 ['web-basic','Web Basic','web'],['web-business','Web Business','web'],['web-premium','Web Premium','web'],
 ['shop-start','Shop Start','shop'],['shop-business','Shop Business','shop'],['shop-advanced','Shop Advanced','shop'],
 ['seo-local','SEO Local','seo'],['seo-growth','SEO Growth','seo'],['seo-authority','SEO Authority','seo'],
 ['care-basic','Care Basic','care'],['care-plus','Care Plus','care'],['care-business','Care Business','care'],['care-shop','Održavanje web shopa','care'],
].map(([id,label,service])=>({id,label,service}));
const norm=s=>s.replace(/\s+/g,' ').trim();
const serviceRoutes={'/izrada-web-stranica-cijena/':'web','/izrada-web-trgovina/':'shop','/seo-optimizacija-cijena/':'seo','/odrzavanje-web-stranica/':'care'};
const serviceDetails='.service-formats,.service-technical,.seo-audit,.seo-local,.ecommerce-catalogue-section,.ecommerce-journey-section,.ecommerce-integrations-section,.maintenance-backup-section,.maintenance-cadence-section,.maintenance-changes-section';

function addPackageChoices($){
 $('.ep-package').each((_,node)=>{
  const card=$(node),name=norm(card.find('h3').first().text()),p=packages.find(p=>p.label===name);
  if(!p)throw Error('Unknown package: '+name);
  card.attr('data-package-id',p.id);if(!card.attr('id'))card.attr('id','paket-'+p.id);
  if(!card.find('.ux-package-quick-cta').length)card.children('.ep-package-head').after($('<a class="ux-package-quick-cta">').attr('href','/kontakt/?paket='+p.id+'#contact-form').text('Upit za '+p.label+' ↗'));
  if(card.find('.ux-package-cta').length)return;
  const details=$('<details class="ux-package-details">').append('<summary>Sve što paket uključuje</summary>');
  const heading=card.children('h4').first();
  if(heading.length){const content=heading.nextAll().addBack();details.append(content);card.append(details);}
  card.append($('<a class="button ux-package-cta">').attr('href','/kontakt/?paket='+p.id+'#contact-form').text('Upit za '+p.label+' ↗'));
 });
 $('.ep-package-grid').each((_,node)=>{
  const grid=$(node);if(grid.prev().hasClass('ux-package-comparison'))return;
  const region=$('<details class="ux-package-comparison">').append('<summary>Usporedite pakete na jednom mjestu</summary>');
  const wrapper=$('<div class="ux-comparison-scroll" tabindex="0" role="region" aria-label="Usporedba paketa">');
  const table=$('<table><thead><tr><th scope="col">Paket</th><th scope="col">Početna cijena</th><th scope="col">Osnovni opseg</th><th scope="col">Sljedeći korak</th></tr></thead><tbody></tbody></table>');
  grid.children('.ep-package').each((_,c)=>{const card=$(c),id=card.attr('data-package-id'),p=packages.find(p=>p.id===id);const row=$('<tr>');
   row.append($('<th scope="row">').append($('<a>').attr('href','#'+card.attr('id')).text(p.label)),
    $('<td>').text(norm(card.find('.ep-package-head strong').first().text())),
    $('<td>').text(norm(card.find('ul>li').first().text())),
    $('<td>').append($('<a>').attr('href','/kontakt/?paket='+p.id+'#contact-form').text('Upit za '+p.label)));
   table.find('tbody').append(row);
  });
  wrapper.append(table);region.append('<p class="ux-table-hint">Na manjem zaslonu tablicu možete pomaknuti vodoravno.</p>',wrapper);grid.before(region);
 });
}
function improveForm($){
 const form=$('#contact-form');if(!form.length)return;
 form.attr('tabindex','-1');
 if(!form.find('.ux-form-instructions').length)form.children('.form-honeypot').after('<p class="ux-form-instructions" id="contact-instructions">Polja označena s „obavezno” trebate ispuniti. Ako još ne znate uslugu ili budžet, odaberite „Nisam siguran”.</p>');
 form.attr('aria-describedby','contact-instructions');
 form.find('.field').each((_,node)=>{const field=$(node),input=field.find('input,select,textarea').first(),label=field.find('label').first();
  if(!input.length||label.find('.ux-field-status').length)return;
  label.append($('<span class="ux-field-status">').text(input.is('[required]')?' (obavezno)':' (nije obavezno)'));
 });
 const description=form.find('[name=description]');
 if(!$('#description-hint').length)description.after('<p class="ux-field-hint" id="description-hint">Napišite barem 20 znakova: čime se bavite, što trebate i koji rezultat želite. Najviše 4.000 znakova.</p>');
 description.attr('aria-describedby',[...new Set((description.attr('aria-describedby')||'').split(/\s+/).filter(Boolean).concat('description-hint'))].join(' '));
 if(!$('#contact-package').length){
  const picker=$('<details class="ux-package-picker">').append('<summary>Odaberite ili promijenite paket (nije obavezno)</summary><label for="contact-package">Paket</label>');
  const select=$('<select id="contact-package" aria-describedby="package-help">').append('<option value="">Želim preporuku paketa</option>');
  for(const [key,label] of Object.entries(serviceLabels)){const group=$('<optgroup>').attr('label',label);for(const p of packages.filter(p=>p.service===key))group.append($('<option>').attr({value:p.id,'data-service':serviceLabels[key]}).text(p.label));select.append(group);}
  picker.append(select,'<p class="ux-field-hint" id="package-help">Paket je početni okvir. Konačan opseg dogovaramo prema vašim potrebama.</p>');
  form.children('.form-grid').before('<p class="ux-package-selection" id="package-selection" role="status" hidden></p>',picker);
 }
}
function improveService($,route){
 const service=serviceRoutes[route];if(!service)return;
 const hero=$('.service-hero').first();if(!hero.length)return;
 if(!$('.ux-service-index').length){
  const nav=$('<nav class="ux-service-index" aria-label="Na ovoj stranici"><div class="container"></div></nav>');
  const audience=$('.service-symptoms,.ecommerce-audience-section,.maintenance-audience-section').first();
  const scope=$('.service-system,.seo-scope,.ecommerce-deliverables-section,.maintenance-coverage-section').first();
  const pricing=$('.ep-service').first(),faq=$('main .faq').first();
  for(const [node,label,id] of [[audience,'Za koga je usluga','ux-za-koga'],[scope,'Što dobivate','ux-opseg'],[pricing,'Paketi i cijene','ux-paketi'],[faq,'Česta pitanja','ux-pitanja']]){if(!node.length)continue;if(!node.attr('id'))node.attr('id',id);nav.find('.container').append($('<a>').attr('href','#'+node.attr('id')).text(label+' ↓'));}
  hero.after(nav);
 }
 $(serviceDetails).each((_,node)=>{const section=$(node);if(section.find('.ux-service-disclosure').length)return;const container=section.children('.container').first(),heading=container.find('h2').first();if(!container.length||!heading.length)return;
  const details=$('<details class="ux-service-disclosure">'),summary=$('<summary>');summary.append(heading);
  const content=$('<div class="ux-service-disclosure-body">').append(container.contents());details.append(summary,content);container.append(details);section.addClass('ux-secondary-section');
 });
 $('main a[href="/kontakt/"],main a[href="/kontakt/#contact-form"]').attr('href','/kontakt/?usluga='+service+'#contact-form');
}
function improveArticle($){
 const prose=$('.blog-prose');if(!prose.length)return;
 // Preserve every word, link, heading, ID and code/table; group only adjacent
 // short root paragraphs. An ID is a public deep-link contract, so do not merge it.
 if(!prose.is('[data-ux-grouped]')){
  const paragraphs=prose.children('p'),lengths=paragraphs.map((_,e)=>norm($(e).text()).split(/\s+/).length).get().sort((a,b)=>a-b);
  if(paragraphs.length>50&&lengths[Math.floor(lengths.length/2)]<12){
   paragraphs.each((_,node)=>{const p=$(node);if(!p.parent().is('.blog-prose')||p.is('[id]')||p.find('img,br,code').length)return;
    while(p.next().is('p:not([id])')&&!p.next().find('img,br,code').length){const next=p.next();if(norm(p.text()).length>280||norm(p.text()+' '+next.text()).length>360)break;p.append(' ',next.contents());next.remove();}
   });
  }
  prose.attr('data-ux-grouped','true');
 }
 const nav=$('.blog-contents nav').empty().attr('aria-label','Sadržaj članka');let i=0;
 const used=new Set($('[id]').map((_,e)=>$(e).attr('id')).get());
 prose.find('h2,h3').each((_,node)=>{const h=$(node);let id=h.attr('id');if(!id){do{id='ux-odjeljak-'+(++i);}while(used.has(id));h.attr('id',id);used.add(id);}nav.append($('<a>').attr({href:'#'+id,'data-level':node.tagName==='h3'?'3':'2'}).text(h.text()));});
 $('.blog-post-hero .blog-meta>span').each((_,e)=>{if(norm($(e).text())==='marijan')$(e).text('Marijan Malčić');});
 const schema=$('script[type="application/ld+json"]');if(schema.length){const data=JSON.parse(schema.text());for(const s of data)if(s['@type']==='Article'&&s.author?.name==='marijan')s.author.name='Marijan Malčić';schema.text(JSON.stringify(data).replaceAll('<','\\u003c'));}
}
function improveListing($){
 if(!$('body').hasClass('blog-listing'))return;
 const rows=$('.blog-rows');if(!rows.length)return;
 rows.attr('id','blog-results');
 if(!$('.ux-blog-search').length){
  const form=$('<form class="ux-blog-search" role="search" hidden><label for="blog-search">Pronađite članak</label><div class="ux-search-line"><input id="blog-search" type="search" placeholder="Upišite naslov ili temu" autocomplete="off" aria-controls="blog-results"><button type="reset">Očisti pretragu</button></div><div class="ux-blog-filters" role="group" aria-label="Filtrirajte po usluzi"></div><p id="blog-search-count" role="status" aria-live="polite"></p></form>');
  const feature=$('.blog-feature');
  if(feature.length){form.addClass('container');feature.before(form);}else rows.before(form);
  rows.after('<p id="blog-search-empty" hidden>Nema članaka za taj odabir. Pokušajte drugi pojam ili odaberite „Sve teme”.</p>');
 }
 // The featured article also participates in search without duplicating its card.
 $('.blog-feature').attr('data-blog-card','featured');rows.children('a').attr('data-blog-card','row');
 $('[data-blog-card]').each((_,node)=>{const card=$(node),category=norm(card.find('.blog-meta>span').first().text()).toLowerCase();
  const key=category.includes('trgovin')?'shop':category.includes('održavan')?'care':category.includes('seo')?'seo':category.includes('izrada')?'web':'other';
  card.attr('data-blog-category',key);
 });
 // Rebuild from the published cards on every export, including the featured
 // article exactly once. Counts describe the full category, not a search query.
 const cards=$('[data-blog-card]'),counts=new Map();
 cards.each((_,node)=>{const key=$(node).attr('data-blog-category');counts.set(key,(counts.get(key)||0)+1);});
 const filters=$('.ux-blog-filters').empty();
 const addFilter=(key,label,count)=>filters.append($('<button type="button">').attr({'data-blog-filter':key,'aria-pressed':String(key==='all')}).text(label+' ('+count+')'));
 addFilter('all','Sve teme',cards.length);
 for(const [key,label]of Object.entries(serviceLabels)){const count=counts.get(key)||0;if(count>0)addFilter(key,label,count);}
}
export function applyUiUx($,{route}={}){
 if(!$('head link[href="/ux-refinements.css"]').length)$('head').append('<link rel="stylesheet" href="/ux-refinements.css">');
 if(!$('head script[src="/ux-interactions.js"]').length)$('head').append('<script src="/ux-interactions.js" defer></script>');
 // Only the destination of contact actions changes; Projects navigation is untouched.
 $('a[href="/kontakt/"]').attr('href','/kontakt/#contact-form');
 addPackageChoices($);improveForm($);improveService($,route);improveArticle($);improveListing($);
 if(route==='/cjenik/')improvePricingComparisons($,packages,serviceLabels);
 if(route==='/o-nama/'&&!$('.ux-personal-intro').length){
  $('.ea-hero-grid>div').last().prepend('<div class="ux-personal-intro"><p class="eyebrow">Osoba iza Legatecha</p><p class="ux-person-name">Marijan Malčić</p><p>Legatech je moj obrt iz Osijeka. Samostalno izrađujem web stranice i trgovine, radim SEO optimizaciju i održavanje. Sa mnom izravno dogovarate opseg, prolazite kroz izradu i dobivate podršku nakon objave.</p></div>');
  const swaps=[['Web ne promatramo','Web ne promatram'],['Kako želimo','Kako želim'],['svaku uslugu planiramo','svaku uslugu planiram']];
  $('main p,main h2').each((_,e)=>{const node=$(e);if(node.children().length)return;let value=node.text();for(const [a,b]of swaps)value=value.replace(a,b);node.text(value);});
 }
 if(route==='/kontakt/'){
  const voice=[['Recite nam','Recite mi'],['Odgovorit ćemo','Odgovorit ću'],['Odgovaramo','Odgovaram'],['Podatke koristimo','Podatke koristim'],['Pregledamo upit','Pregledam upit'],['Provjeravamo cilj','Provjeravam cilj'],['Javljamo se s pitanjima','Javljam se s pitanjima'],['razgovorom pojašnjavamo','razgovorom pojašnjavam'],['Šaljemo preporučeni','Šaljem preporučeni']];
  const replaceVoice=node=>{for(const child of node.children||[]){if(child.type==='text'){for(const [a,b]of voice)child.data=child.data.replace(a,b);}else replaceVoice(child);}};
  $('main').each((_,node)=>replaceVoice(node));
 }
}
