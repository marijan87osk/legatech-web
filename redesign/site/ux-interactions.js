(() => {
  function revealTarget() {
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    if(!id)return;const target=document.getElementById(id);if(!target?.closest('main'))return;
    let opened=false;for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS'&&!parent.open){parent.open=true;opened=true;}
    if(!target.matches('a,button,input,select,textarea,summary,[tabindex]'))target.setAttribute('tabindex','-1');
    target.focus({preventScroll:true});
    if(opened)window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-24,behavior:'instant'});
  }
  addEventListener('hashchange',revealTarget);revealTarget();
  const form=document.querySelector('.ux-blog-search');if(!form)return;
  const search=form.querySelector('input'),filters=[...form.querySelectorAll('[data-blog-filter]')],cards=[...document.querySelectorAll('[data-blog-card]')];
  const count=document.querySelector('#blog-search-count'),empty=document.querySelector('#blog-search-empty');
  const fold=value=>value.toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('đ','d');
  let category='all',announcement;
  function update(){
    const query=fold(search.value.trim());let found=0;
    for(const card of cards){const heading=card.querySelector('h2,h3')?.textContent||'',description=card.querySelector('p')?.textContent||'';const match=(category==='all'||card.dataset.blogCategory===category)&&fold(heading+' '+description).includes(query);card.hidden=!match;if(match)found++;}
    empty.hidden=found!==0;clearTimeout(announcement);announcement=setTimeout(()=>{count.textContent=found+' od '+cards.length+' članaka';},180);
  }
  form.hidden=false;form.addEventListener('submit',event=>event.preventDefault());search.addEventListener('input',update);
  for(const button of filters)button.addEventListener('click',()=>{category=button.dataset.blogFilter;for(const other of filters)other.setAttribute('aria-pressed',String(other===button));update();});
  form.addEventListener('reset',()=>{search.value='';category='all';for(const button of filters)button.setAttribute('aria-pressed',String(button.dataset.blogFilter==='all'));update();});
  update();
})();
