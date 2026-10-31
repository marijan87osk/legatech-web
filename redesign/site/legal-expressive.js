const legalContents=document.querySelector('.legal-contents-disclosure');
if(legalContents&&matchMedia('(max-width:940px)').matches)legalContents.open=false;
// Reuse the existing local-only cookie preview; no consent or analytics is transmitted.
document.querySelector('.legal-cookie-button')?.addEventListener('click',()=>document.querySelector('#cookie-preview').showModal());
