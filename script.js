const API = 'https://rpg-creature-api.freecodecamp.rocks/api/creature';

document.getElementById('search-button').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  try {
    const res = await fetch(`${API}/${query}`);
    if (!res.ok) {
      alert('Creature not found');
      return;
    }

    const data = await res.json();
    if (!data || data.error) {
      alert('Creature not found');
      return;
    }

    document.getElementById('creature-name').textContent = data.name.toUpperCase();
    document.getElementById('creature-id').textContent = `#${data.id}`;
    document.getElementById('weight').textContent = `Weight: ${data.weight}`;
    document.getElementById('height').textContent = `Height: ${data.height}`;

    const stats = data.stats;
    document.getElementById('hp').textContent = stats.find(s => s.name === 'hp')?.base_stat ?? '';
    document.getElementById('attack').textContent = stats.find(s => s.name === 'attack')?.base_stat ?? '';
    document.getElementById('defense').textContent = stats.find(s => s.name === 'defense')?.base_stat ?? '';
    document.getElementById('special-attack').textContent = stats.find(s => s.name === 'special-attack')?.base_stat ?? '';
    document.getElementById('special-defense').textContent = stats.find(s => s.name === 'special-defense')?.base_stat ?? '';
    document.getElementById('speed').textContent = stats.find(s => s.name === 'speed')?.base_stat ?? '';

    const typesEl = document.getElementById('types');
    typesEl.innerHTML = '';
    data.types.forEach(t => {
      const span = document.createElement('span');
      span.textContent = t.name.toUpperCase();
      typesEl.appendChild(span);
    });

    const img = document.getElementById('creature-img');
    img.src = data.image?.src ?? '';
    img.alt = data.name;

    document.getElementById('creature-card').classList.add('visible');
  } catch (e) {
    alert('Creature not found');
  }
});