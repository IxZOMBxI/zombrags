document.addEventListener('DOMContentLoaded', () => {
  console.log("Zomb Rags script loaded");

  const grid = document.querySelector('.blog-grid');
  if (!grid) {
    console.error("❌ blog-grid container not found");
    return;
  }

  fetch('assets/posts.json')
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      return res.json();
    })
    .then(posts => {
      if (!Array.isArray(posts)) throw new Error("Invalid JSON structure");

      posts.forEach(post => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.desc}</p>
          <a href="${post.link}" target="_blank" rel="noopener">Read More</a>
        `;
        grid.appendChild(card);
      });

      console.log("✅ Posts loaded successfully");
    })
    .catch(err => {
      console.error("❌ Error loading posts:", err);
      grid.innerHTML = `
        <article class="card">
          <h2>Error Loading Posts</h2>
          <p>Something glitched. Try again later.</p>
        </article>
      `;
    });
});
