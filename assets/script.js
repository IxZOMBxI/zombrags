document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.blog-grid');

  fetch('assets/posts.json')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(posts => {
      if (!Array.isArray(posts)) {
        throw new Error("Invalid posts format");
      }

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
    })
    .catch(err => {
      console.error("Failed to load posts:", err);
      grid.innerHTML = `
        <article class="card">
          <h2>⚠️ Error Loading Posts</h2>
          <p>Something went wrong. Please try again later.</p>
        </article>
      `;
    });
});
