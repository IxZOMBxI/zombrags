(function () {
  const q = new URLSearchParams(location.search);
  const slug = q.get('slug');

  const titleEl   = document.getElementById('post-title');
  const dateEl    = document.getElementById('post-date');
  const coverEl   = document.getElementById('post-cover');
  const contentEl = document.getElementById('post-content');

  const renderError = (msg) => {
    titleEl.textContent = "Glitch in the feed";
    contentEl.innerHTML = `<p>${msg}</p>`;
  };

  const loadHTML = () => {
    const path = `posts/${slug}.html`;
    fetch(path)
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(html => { contentEl.innerHTML = html; })
      .catch(() => { renderError("We couldn't load this post. Try again shortly."); });
  };

  if (!slug) {
    titleEl.textContent = "Post not found";
    contentEl.innerHTML = `<p>Missing <code>?slug=</code> parameter.</p>`;
    return;
  }

  const loadFromList = (list) => {
    const post = (list || []).find(p => p.slug === slug);
    if (post) {
      if (post.title) titleEl.textContent = post.title;
      if (post.date) {
        try {
          dateEl.textContent = new Date(post.date)
            .toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        } catch {}
      }
      if (post.cover) {
        coverEl.src = post.cover;
        coverEl.alt = post.title || '';
        coverEl.removeAttribute('aria-hidden');
      } else {
        coverEl.setAttribute('aria-hidden', 'true');
      }
    } else {
      titleEl.textContent = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
  };

  fetch('assets/posts.json', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(list => { loadFromList(list); })
    .catch(() => { loadFromList(window.FALLBACK_POSTS || []); })
    .finally(loadHTML);
})();
