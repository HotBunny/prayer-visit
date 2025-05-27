// Load families.json and display the family cards
async function loadFamilies() {
  try {
    const response = await fetch('families.json');
    if (!response.ok) {
      throw new Error('Failed to load families.json');
    }
    const families = await response.json();
    renderFamilies(families);
  } catch (error) {
    console.error('Error loading family data:', error);
    const container = document.getElementById('families-container');
    container.innerHTML = '<p>Failed to load family data. Please try again later.</p>';
  }
}

function renderFamilies(families) {
  const container = document.getElementById('families-container');
  container.innerHTML = ''; // Clear any existing content

  families.forEach(family => {
    const card = document.createElement('div');
    card.className = 'family-card';

    // Image
    const img = document.createElement('img');
    img.className = 'family-image';
    img.src = family.imageUrl || 'https://via.placeholder.com/150?text=No+Image';
    img.alt = `Photo of ${family.name}`;
    card.appendChild(img);

    // Content container
    const content = document.createElement('div');
    content.className = 'family-content';

    // Name
    const name = document.createElement('h2');
    name.className = 'family-name';
    name.textContent = family.name;
    content.appendChild(name);

    // Address (clickable)
    const address = document.createElement('a');
    address.className = 'family-address';
    address.textContent = family.address;
    address.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(family.address)}`;
    address.target = '_blank';
    address.rel = 'noopener noreferrer';
    content.appendChild(address);

    // Prayer Request
    const prayer = document.createElement('p');
    prayer.className = 'family-prayer';
    prayer.textContent = family.prayerRequest;
    content.appendChild(prayer);

    // Event Date
    const date = document.createElement('p');
    date.className ='family-date';
    
    // Format the date as MM/DD/YYYY
    const [year, month, day] = family.date.split('-');
    const formattedDate = `${month}/${day}/${year}`;
    date.textContent = `Event Date: ${formattedDate}`;

    content.appendChild(date);

    card.appendChild(content);
    container.appendChild(card);
  });
}

// Initialize the page
loadFamilies();
