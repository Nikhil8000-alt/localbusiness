 document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const businessCards = document.querySelectorAll('.business-card');
  const resultsDiv = document.getElementById('searchResults');

  if (!query) {
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';
    businessCards.forEach(card => card.style.display = 'block');
    return;
  }

  let matches = [];

  businessCards.forEach(card => {
    const name = card.querySelector('.business-name').textContent.toLowerCase();
    const infos = Array.from(card.querySelectorAll('.business-info')).map(el => el.textContent.toLowerCase()).join(" ");
    const isMatch = name.includes(query) || infos.includes(query);

    // Show/hide cards
    card.style.display = isMatch ? 'block' : 'none';

    if (isMatch) {
      matches.push({
        name: card.querySelector('.business-name').textContent,
        info: card.querySelector('.business-info').textContent
      });
    }
  });

  // Show suggestions
  if (matches.length > 0) {
    resultsDiv.innerHTML = matches.map(m => `
      <div class="suggestion-item" onclick="selectSuggestion('${m.name}')">
        <strong>${m.name}</strong><br><small>${m.info}</small>
      </div>
    `).join('');
    resultsDiv.style.display = 'block';
  } else {
    resultsDiv.innerHTML = `<div class="suggestion-item">No matches found.</div>`;
    resultsDiv.style.display = 'block';
  }
});

function selectSuggestion(name) {
  document.getElementById('searchInput').value = name;
  document.getElementById('searchResults').style.display = 'none';
}
