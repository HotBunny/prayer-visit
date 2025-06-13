const PIXABAY_API_KEY = '50523608-0aa0f3eeb8413887c814677ba';

async function fetchImageForEvent(eventName) {
  const query = encodeURIComponent(eventName || 'family prayer');
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&per_page=3`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
      return data.hits[0].webformatURL;
    }
  } catch (error) {
    console.error('Error fetching image from Pixabay:', error);
  }

  // Fallback image
  return 'https://via.placeholder.com/300x150?text=No+Image';
}

async function renderFamilies(families) {
  const container = document.getElementById('families-container');
  container.innerHTML = '';

  for (const family of families) {
    const card = document.createElement('div');
    card.className = 'family-card';

    // Fetch image using event name
    const imageUrl = await fetchImageForEvent(family.event);

    // Image
    const img = document.createElement('img');
    img.className = 'family-image';
    img.src = imageUrl;
    img.alt = `Photo for ${family.event}`;
    card.appendChild(img);

    // Content
    const content = document.createElement('div');
    content.className = 'family-content';

    const name = document.createElement('h2');
    name.className = 'family-name';
    name.textContent = family.name;
    content.appendChild(name);

    const address = document.createElement('a');
    address.className = 'family-address';
    address.textContent = family.address;
    address.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(family.address)}`;
    address.target = '_blank';
    address.rel = 'noopener noreferrer';
    content.appendChild(address);

    const prayer = document.createElement('p');
    prayer.className = 'family-prayer';
    prayer.textContent = family.notes || 'No notes provided.';
    content.appendChild(prayer);

    const date = document.createElement('p');
    date.className = 'family-date';
    const [year, month, day] = family.date.split('-');
    date.textContent = `Event Date: ${month}/${day}/${year}`;
    content.appendChild(date);

    card.appendChild(content);
    container.appendChild(card);
  }
}

// Load families.json and display the cards
async function loadFamilies() {
  try {
    const response = await fetch('families.json');
    if (!response.ok) throw new Error('Failed to load families.json');
    const families = await response.json();
    await renderFamilies(families);
  } catch (error) {
    console.error('Error loading family data:', error);
    const container = document.getElementById('families-container');
    container.innerHTML = '<p>Failed to load family data. Please try again later.</p>';
  }
}

// Initialize
loadFamilies();
