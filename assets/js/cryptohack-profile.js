document.addEventListener('DOMContentLoaded', function() {
  fetchCryptoHackProfile();
});

function fetchCryptoHackProfile() {
  const profileElement = document.getElementById('cryptohack-profile');
  
  if (!profileElement) return;
  
  // Show loading state
  profileElement.innerHTML = '<p>Loading CryptoHack profile...</p>';
  
  // Try direct fetch first
  fetch('https://cryptohack.org/api/user/infernosalex/', { 
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayCryptoHackProfile(data, profileElement);
    })
    .catch(error => {
      console.warn('Direct fetch failed, using static data instead:', error);
      
      // Use the static JSON data if API fetch fails
      const staticData = {"country":"ro","first_bloods":0,"joined":"23 Feb 2024","level":23,"rank":271,"score":10360,"user_count":92938,"username":"infernosalex","website":"https://scant.ro/"};
      displayCryptoHackProfile(staticData, profileElement);
    });
}

// Fallback function to display static profile data if API fetch fails
function displayFallbackProfile(element) {
  element.innerHTML = `
    <div class="cardCrypto">
      <div class="horizontalContainer">
        <div class="verticalContainer">
          <div class="horizontalContainer">
            <div class="name">InfernoSAlex</div>
            <div class="rank">Crypto Hacker</div>
          </div>
          <div class="horizontalContainer details">
            <p>Visit my profile on CryptoHack for up-to-date information!</p>
          </div>
          <p class="hackLink">
            <a href="https://cryptohack.org/user/infernosalex/" target="_blank">cryptohack.org</a>
          </p>
        </div>
      </div>
    </div>
    <p class="profile-note">Note: Due to CORS restrictions, live data cannot be displayed. Visit the link above for full profile information.</p>
  `;
}

function displayCryptoHackProfile(data, element) {
  // Extract the specific data from the API response
  const { 
    username, 
    level, 
    rank, 
    score, 
    user_count, 
    country 
  } = data;
  
  // Calculate top percentage
  const topPercentage = (rank / user_count * 100).toFixed(2);
  
  // Count solved challenges by category
  const challengesByCategory = {};
  if (data.solved_challenges) {
    data.solved_challenges.forEach(challenge => {
      if (!challengesByCategory[challenge.category]) {
        challengesByCategory[challenge.category] = 0;
      }
      challengesByCategory[challenge.category]++;
    });
  }
  
  // Get top 7 categories
  const topCategories = Object.entries(challengesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);
  
  // Create HTML for the profile card
  const html = `
    <div class="cardCrypto">
      <div class="horizontalContainer">
        <div class="verticalContainer">
          <div class="horizontalContainer" style="">
             <a href="https://cryptohack.org/user/infernosalex/" target="_blank" class="name">${username}</a>
            <div class="level-badge" style="margin-left:6em">Level ${level}</div>
          </div>
          <div class="horizontalContainer details">
            <p>Rank: ${rank}</p>
            <p>Score: ${score}</p>
            <p>Top ${topPercentage}%</p>
          </div>
          <div class="categories">
            ${topCategories.map(([category, count]) => 
              `<span class="category-badge">${category}: ${count}</span>`
            ).join('')}
          </div>
          <p class="hackLink">
            <a href="https://cryptohack.org/" target="_blank">cryptohack.org</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Update the element with the profile card
  element.innerHTML = html;
} 