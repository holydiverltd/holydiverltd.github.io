// Fetch top 10 stories from Hacker News and render them in the news-list
fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  .then(response => response.json())
  .then(ids => Promise.all(ids.slice(0, 10).map(id =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
  )))
  .then(stories => {
    const list = document.getElementById('news-list');
    stories.forEach(story => {
      const li = document.createElement('li');
      li.className = 'news-item';
        // Use title as main link, and show a short description below (author and score)
        const desc = story.text ? story.text.replace(/<[^>]+>/g, '').slice(0, 120) + (story.text.length > 120 ? '...' : '') : `By ${story.by} | ${story.score} points`;
        li.innerHTML = `
          <a href="${story.url || 'https://news.ycombinator.com/item?id=' + story.id}" target="_blank" rel="noopener">${story.title}</a>
          <div class="news-desc">${desc}</div>
        `;
      list.appendChild(li);
    });
  });
