document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
  
    const movieInfo = {
      1: "Описание фильма 1...",
      2: "Описание фильма 2...",
      3: "Описание фильма 3...",
      4: "Описание фильма 4...",
      5: "Описание фильма 5..."
    };
  
    document.getElementById('movie-info').innerHTML = `<h1>Фильм ${movieId}</h1><p>${movieInfo[movieId]}</p>`;
  
    loadReviews(movieId);
  
    document.getElementById('review-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const text = document.getElementById('text').value;
  
      fetch('server/save_review.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({movie_id: movieId, name: name, text: text})
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          loadReviews(movieId);
          document.getElementById('review-form').reset();
        } else {
          alert('Ошибка при сохранении отзыва');
        }
      });
    });
  });
  
  function loadReviews(movieId) {
  fetch(`server/get_review.php?movie_id=${movieId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки отзывов: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const reviewsDiv = document.getElementById('reviews');
      reviewsDiv.innerHTML = '';
      data.forEach(review => {
        const div = document.createElement('div');
        div.classList.add('review');
        div.innerHTML = `<strong>${review.name}</strong><p>${review.text}</p>`;
        reviewsDiv.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Ошибка при получении отзывов:', error);
      // Можно ещё красиво показать ошибку пользователю:
      const reviewsDiv = document.getElementById('reviews');
      reviewsDiv.innerHTML = '<p>Не удалось загрузить отзывы. Попробуйте позже.</p>';
    });
}

  