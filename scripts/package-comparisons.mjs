// Comparison cells quote existing package items/facts; prices are always read
// from the source cards. No new entitlements or exclusions are inferred.
const norm=value=>value.replace(/\s+/g,' ').trim();
const item=(...patterns)=>({patterns});
const fact=name=>({fact:name});
const profiles={
 web:[
  ['Broj podstranica',item(/^Do \d+ jedinstvenih/)],
  ['Dizajn',item(/^Responzivan dizajn/,/^Individualno dizajnirana/,/^Potpuno prilagođen/)],
  ['Obrasci',item(/^Kontakt obrazac,/,/^Do dva kontaktna/,/^Napredni i višekoračni/)],
  ['SEO optimizacija',item(/^Osnovna optimizacija brzine/,/^SEO optimizacija svih/,/^Napredna on-page/)],
  ['Edukacija',item(/edukacije$/)],
  ['Rok izrade',fact('Rok')],
  ['Korekcije',fact('Korekcije')],
  ['Podrška nakon objave',fact('Podrška')],
 ],
 shop:[
  ['Proizvodi i katalog',item(/^Do 20 jednostavnih/,/^Do 75 proizvoda/,/^Do 250 proizvoda/)],
  ['Iskustvo kupnje',item(/^Košarica, blagajna/,/^Varijacije, napredni/,/^Optimizirana košarica/)],
  ['Istaknute funkcionalnosti',item(/^Pouzeće, bankovna/,/^Do dva sustava/,/^Jedna vanjska integracija/)],
  ['Mjerenje i SEO',item(/^Analytics i osnovno/,/^Google Merchant Center/,/^Napredna analitika, CRO/)],
  ['Edukacija',item(/edukacije$/)],
  ['Korekcije',fact('Korekcije')],
  ['Podrška nakon objave',fact('Podrška')],
 ],
 seo:[
  ['Početna priprema',fact('Početna priprema')],
  ['Ključne riječi',item(/^Praćenje \d/)],
  ['Optimizacija stranica',item(/^Optimizacija jedne stranice/,/^Optimizacija do dvije/,/^Optimizacija do tri/)],
  ['Sadržaj',item(/^Jedna Google Business objava/,/^Jedan SEO sadržaj/,/^Dva nova SEO sadržaja/)],
  ['Tehnički SEO',item(/^Meta podaci, interno/,/^Jedan sat tehničkih/,/^Do tri sata tehničkih/)],
  ['Izvještavanje i sastanak',item(/^Mjesečni izvještaj i sastanak/,/^CRO preporuke i strateški/)],
 ],
 care:[
  ['Godišnja cijena',fact('Godišnje')],
  ['Ažuriranja',item(/^Mjesečno ažuriranje/,/^Ažuriranja dva puta/,/^Tjedna provjera ažuriranja/,/^Tjedna ažuriranja i dnevne/)],
  ['Sigurnosne kopije',item(/^Vanjska sigurnosna kopija/,/^Sigurnosni backup najmanje/,/^Dnevne sigurnosne kopije/,/^Tjedna ažuriranja i dnevne/)],
  ['Provjere',item(/^Provjera dostupnosti i kontakt/,/^Provjera poveznica, obrazaca/,/^Provjera performansi, analitike/,/^Testna narudžba i provjera/)],
  ['Podrška i izmjene',item(/^Podrška putem e-maila/,/^30 minuta sadržajnih/,/^60 minuta sadržajnih/,/^90 minuta tehničkih/)],
  ['Vrijeme reakcije',fact('Reakcija')],
 ],
};

function quote($,card,selector){
 const values=selector.fact
  ?card.find('.ep-package-facts>div').filter((_,n)=>norm($(n).find('dt').text())===selector.fact).find('dd').map((_,n)=>norm($(n).text())).get()
  :card.find('li').map((_,n)=>norm($(n).text())).get().filter(value=>selector.patterns.some(pattern=>pattern.test(value)));
 if(values.length!==1)throw Error('Package comparison needs one source for '+card.attr('data-package-id')+': '+(selector.fact||selector.patterns.join(', ')));
 return values[0];
}

export function improvePricingComparisons($,packages,serviceLabels){
 $('.ep-package-grid').each((_,node)=>{
  const grid=$(node),cards=grid.children('.ep-package').toArray().map(n=>$(n));
  const definitions=cards.map(card=>packages.find(p=>p.id===card.attr('data-package-id')));
  const service=definitions[0]?.service;
  if(!profiles[service]||definitions.some(p=>p?.service!==service))throw Error('Mixed or unknown comparison group');
  const old=grid.prev('.ux-package-comparison');
  const region=$('<details class="ux-package-comparison" data-comparison-version="2">').attr('data-package-count',cards.length);
  if(old.is('[open]'))region.attr('open','');
  region.append('<summary>Usporedite pakete na jednom mjestu</summary>');
  region.append('<p class="ux-comparison-intro">Ključne razlike prema postojećem opsegu paketa. Puni opisi ostaju u karticama ispod.</p><p class="ux-table-hint">Na manjem zaslonu pomaknite tablicu vodoravno. Naziv kriterija ostaje vidljiv.</p>');
  const wrapper=$('<div class="ux-comparison-scroll" tabindex="0" role="region">').attr('aria-label','Usporedba paketa: '+serviceLabels[service]);
  const table=$('<table class="ux-package-matrix">');
  table.append($('<caption class="ux-comparison-caption">').text('Usporedba paketa: '+serviceLabels[service]));
  table.append($('<colgroup>').append('<col class="ux-matrix-label-col">',$('<col>').attr('span',cards.length)));
  const header=$('<tr>').append('<th scope="col">Kriterij</th>');
  cards.forEach((card,i)=>header.append($('<th scope="col">').append($('<a>').attr('href','#'+card.attr('id')).text(definitions[i].label))));
  table.append($('<thead>').append(header));
  const body=$('<tbody>');
  const addRow=(label,values,className)=>{
   const row=$('<tr>').append($('<th scope="row">').text(label));if(className)row.addClass(className);
   values.forEach(value=>row.append($('<td>').text(value)));body.append(row);
  };
  addRow('Početna cijena',cards.map(card=>norm(card.find('.ep-package-head strong').first().text())),'ux-matrix-price');
  for(const [label,selector]of profiles[service])addRow(label,cards.map(card=>quote($,card,selector)));
  table.append(body);
  const actions=$('<tr>').append('<th scope="row">Sljedeći korak</th>');
  definitions.forEach(p=>actions.append($('<td>').append($('<a>').attr('href','/kontakt/?paket='+p.id+'#contact-form').text('Upit za '+p.label))));
  table.append($('<tfoot>').append(actions));
  wrapper.append(table);region.append(wrapper);
  if(old.length)old.replaceWith(region);else grid.before(region);
 });
}
