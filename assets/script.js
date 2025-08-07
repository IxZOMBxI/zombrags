document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.blog-grid');

  fetch('assets/posts.json')
    .then(res => res.json())
    .then(posts => {
      posts.forEach(post => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.desc}</p>
          <a href="${post.link}">Read More</a>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => {
      grid.innerHTML = `<p style="color: red;">Failed to load posts. Try again later.</p>`;
      console.error("Error loading posts:", err);
    });
});
