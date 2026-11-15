(() => {
  const analytics=window.LegatechAnalytics;
  const runtime=window.LegatechRuntime;
  if(!analytics||!window.LegatechContact||!runtime)return;
  let configured=false,pageViewed=false;
  function enableAnalytics(){
    if(analytics.readStoredConsent()?.analytics!=='granted')return;
    if(!configured){analytics.initializeGoogleAnalytics();configured=true;}
    else analytics.enableGoogleAnalytics();
    const existing=[...document.scripts].find(script=>{
      try{const url=new URL(script.src);return url.hostname==='www.googletagmanager.com'&&url.pathname==='/gtag/js';}catch{return false;}
    });
    if(!existing){
      const script=document.createElement('script');script.id='legatech-google-analytics';script.async=true;
      script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(analytics.analyticsMeasurementId);
      document.head.append(script);
    }
    if(!pageViewed){
      // Never include query strings, fragments or contact fields in Analytics.
      analytics.trackAnalyticsEvent('page_view',{page_location:location.origin+location.pathname,page_path:location.pathname,page_title:document.title});pageViewed=true;
    }
  }
  const dialog=document.querySelector('#cookie-preview');
  dialog?.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>{
    const choice=button.dataset.consent;
    if(!['granted','denied'].includes(choice))return;
    analytics.storeConsent(choice);
    if(choice==='granted')enableAnalytics();else analytics.disableGoogleAnalytics();
    dialog.close();
  }));
  if(analytics.readStoredConsent()?.analytics==='granted')enableAnalytics();
  else if(!analytics.readStoredConsent()&&dialog&&!dialog.open)dialog.showModal();

  const form=document.querySelector('#contact-form'),status=document.querySelector('#form-status');
  if(!form||!status)return;
  const packageSelect=form.querySelector('#contact-package'),packageSummary=form.querySelector('#package-selection');
  const serviceField=form.querySelector('[name="service"]'),descriptionField=form.querySelector('[name="description"]');
  const descriptionHint=form.querySelector('#description-hint');
  const serviceCodes={web:'Izrada web stranica',shop:'Izrada web trgovina',seo:'SEO optimizacija',care:'Održavanje web stranica'};
  function packageChoice(){const option=packageSelect?.selectedOptions[0];return option?.value&&option.dataset.service?{label:option.textContent,service:option.dataset.service}:null;}
  function packagePrefix(){const choice=packageChoice();return choice?'Odabrani paket: '+choice.label+'\n\n':'';}
  function updatePackage(){
    const choice=packageChoice();
    if(packageSummary){packageSummary.hidden=!choice;packageSummary.textContent=choice?'Upit za '+choice.label+' · '+choice.service:'';}
    const limit=4000-packagePrefix().length;if(descriptionField)descriptionField.maxLength=limit;
    if(descriptionHint)descriptionHint.textContent='Napišite barem 20 znakova: čime se bavite, što trebate i koji rezultat želite. Najviše '+limit.toLocaleString('hr-HR')+' znakova.';
  }
  if(packageSelect){
    const params=new URLSearchParams(location.search),requested=params.get('paket');
    if([...packageSelect.options].some(option=>option.value===requested&&option.dataset.service)){packageSelect.value=requested;serviceField.value=packageChoice().service;}
    else if(serviceCodes[params.get('usluga')])serviceField.value=serviceCodes[params.get('usluga')];
    packageSelect.addEventListener('change',()=>{const choice=packageChoice();if(choice)serviceField.value=choice.service;updatePackage();});
    serviceField.addEventListener('change',()=>{if(packageChoice()?.service!==serviceField.value)packageSelect.value='';updatePackage();});
    form.addEventListener('reset',()=>queueMicrotask(updatePackage));updatePackage();
  }
  const submission=window.LegatechContact.createContactSubmission();
  const submit=form.querySelector('button[type="submit"]');
  const fields=[...form.querySelectorAll('input,select,textarea')];
  const textFields=fields.filter(field=>['name','description'].includes(field.name));
  const submitContent=[...submit.childNodes].map(node=>node.cloneNode(true));
  const restoreSubmit=()=>submit.replaceChildren(...submitContent.map(node=>node.cloneNode(true)));
  let startedAt=Date.now(),completed=false;
  const notice=runtime.mailMode==='mailpit'?'Upit se šalje u lokalni testni sandučić.':'Upit se šalje putem kontaktnog servisa.';
  function show(message,error=false){status.setAttribute('role',error?'alert':'status');status.setAttribute('aria-live',error?'assertive':'polite');status.textContent=message;}
  function validate(field){
    const min=field.minLength>0?field.minLength:1;
    field.setCustomValidity(field.value.trim().length<min?`${field.name==='name'?'Ime i prezime':'Opis projekta'}: unesite najmanje ${min} znakova, bez početnih i završnih razmaka.`:'');
  }
  show(notice);
  form.addEventListener('input',event=>{
    if(!fields.includes(event.target))return;
    event.target.setCustomValidity('');
    event.target.removeAttribute('aria-invalid');
    if(textFields.includes(event.target))validate(event.target);
    if(!submission.locked)show(notice);
  });
  submit.addEventListener('click',event=>{
    if(!completed)return;
    event.preventDefault();
    submission.reset();completed=false;startedAt=Date.now();form.reset();fields.forEach(field=>{field.disabled=false;field.setCustomValidity('');field.removeAttribute('aria-invalid');});
    submit.type='submit';restoreSubmit();show(notice);
    // This activation resets the form; the next one submits the new enquiry.
  });
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(submission.locked)return;
    textFields.forEach(validate);if(!form.reportValidity())return;
    const payload=Object.fromEntries(new FormData(form).entries());
    form.setAttribute('aria-busy','true');submit.disabled=true;submit.textContent='Šaljemo…';
    // The existing API receives the visible choice as part of the message only.
    // Never include the selection or any form fields in Analytics parameters.
    const result=await submission.submit({...payload,description:packagePrefix()+payload.description,formStartedAt:startedAt});
    form.setAttribute('aria-busy','false');submit.disabled=false;
    if(result.status==='success'){
      completed=true;form.reset();fields.forEach(field=>field.disabled=true);
      submit.type='button';submit.textContent='Pošaljite novi upit';
      show(runtime.mailMode==='mailpit'?'Poruka je poslana u lokalni testni sandučić.':'Upit je poslan. Javit ćemo vam se u jednom radnom danu.');
    }else if(result.status==='error'){
      restoreSubmit();show(result.message,true);
      for(const [name,message] of Object.entries(result.errors)){const field=fields.find(f=>f.name===name);if(field){field.setCustomValidity(message);field.setAttribute('aria-invalid','true');}}
      const invalid=fields.find(field=>!field.validity.valid);if(invalid){invalid.focus();invalid.reportValidity();}
    }
  });
})();
