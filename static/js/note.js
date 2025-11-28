document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.note-container');
  const outlineList = document.getElementById('outlineList');
  const headings = container.querySelectorAll('h1, h2, h3');

  // 生成大纲列表
  headings.forEach((h, index) => {
    if(!h.id) h.id = `heading-${index}`;
    const li = document.createElement('li');
    li.style.marginLeft = (parseInt(h.tagName.substring(1))-1) * 10 + 'px';
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.classList.add('d-block', 'text-decoration-none');
    li.appendChild(a);
    outlineList.appendChild(li);
  });

  const outlineLinks = outlineList.querySelectorAll('a');

  // 高亮当前标题
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        outlineLinks.forEach(link => link.classList.remove('active'));
        const activeLink = outlineList.querySelector(`a[href="#${entry.target.id}"]`);
        if(activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  headings.forEach(h => observer.observe(h));
});
