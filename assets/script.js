(function () {
  const grid = document.querySelector('#blog-grid, .blog-grid');
  if (!grid) return;

  const render = (posts) => {
    if (!Array.isArray(posts) || posts.length === 0) {
      grid.innerHTML = `<p style="opacity:.8">No posts yet.</p>`;
      return;
    }
    grid.innerHTML = posts.map(p => {
      const href = `post.html?slug=${encodeURIComponent(p.slug)}`;
      const date = p.date ? new Date(p.date)
        .toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
      const cover = p.cover ? `<img src="${p.cover}" alt="" class="card-cover">` : '';
      return `
        <article class="card">
          <a class="card-link" href="${href}">
            ${cover}
            <div class="card-body">
              <h2>${p.title || 'Untitled'}</h2>
              ${date ? `<time class="card-date">${date}</time>` : ''}
              ${p.excerpt ? `<p class="card-excerpt">${p.excerpt}</p>` : ''}
            </div>
          </a>
        </article>
      `;
    }).join('');
  };

  fetch('assets/posts.json', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(render)
    .catch(() => render(window.FALLBACK_POSTS || []));
})();
