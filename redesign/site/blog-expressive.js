// Keep the article contents available through the native, keyboard-friendly disclosure.
const articleContents = document.querySelector('.blog-contents-disclosure');
if (articleContents && matchMedia('(max-width: 940px)').matches) articleContents.open = false;
