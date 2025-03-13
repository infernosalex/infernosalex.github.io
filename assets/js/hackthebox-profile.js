document.addEventListener('DOMContentLoaded', function() {
  fetchHackTheBoxProfile();
});

function fetchHackTheBoxProfile() {
  const profileElement = document.getElementById('hackthebox-profile');
  
  if (!profileElement) return;
  
  // Show loading state
  profileElement.innerHTML = '<p>Loading HackTheBox profile...</p>';
  
  // Fetch basic profile data
  fetch('https://www.hackthebox.com/api/v4/profile/453678', { 
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
    .then(profileData => {
      // After getting profile data, fetch challenge data
      fetch('https://www.hackthebox.com/api/v4/profile/progress/challenges/453678', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Challenge data fetch failed');
          }
          return response.json();
        })
        .then(challengeData => {
          // Combine the data and display
          displayHackTheBoxProfile(profileData, challengeData, profileElement);
        })
        .catch(error => {
          console.warn('Challenge data fetch failed:', error);
          // Display profile without challenge data
          displayHackTheBoxProfile(profileData, null, profileElement);
        });
    })
    .catch(error => {
      console.warn('Direct fetch failed, using static data instead:', error);
      
      // Use static data if API fetch fails
      const staticData = {
        "profile": {
          "id": 453678,
          "sso_id": true,
          "name": "infernosalex",
          "system_owns": 39,
          "user_owns": 43,
          "user_bloods": 0,
          "system_bloods": 0,
          "team": {
            "id": 6248,
            "name": "DOMBUSTERS",
            "ranking": 20,
            "avatar": "/storage/teams/e6a4f65e7355bb8b7671c3a18003b146.jpg"
          },
          "respects": 2,
          "rank": "Pro Hacker",
          "rank_id": 4,
          "current_rank_progress": 0,
          "next_rank": "Elite Hacker",
          "next_rank_points": 20.713,
          "rank_ownership": 29.59,
          "rank_requirement": 45,
          "ranking": 781,
          "avatar": "/storage/avatars/64014b2ff45c691fd2b0d7764d982775.png",
          "timezone": "Europe/Bucharest",
          "points": 107,
          "country_name": "Romania",
          "country_code": "RO",
          "university_name": null,
          "github": "https://github.com/infernosalex",
          "linkedin": "https://www.linkedin.com/in/alexandru-scanteie/",
          "twitter": "https://x.com/infernosalex"
        }
      };

      const staticChallengeData = {
        "profile": {
          "solved_tasks": 0,
          "challenge_owns": {
            "solved": 164,
            "total": 708,
            "percentage": 23
          },
          "challenge_categories": [
            {
              "name": "Reversing",
              "owned_flags": 21,
              "total_flags": 89,
              "completion_percentage": 24,
              "avg_user_solved": 3.01
            },
            {
              "name": "Crypto",
              "owned_flags": 25,
              "total_flags": 117,
              "completion_percentage": 21,
              "avg_user_solved": 2.21
            },
            {
              "name": "Pwn",
              "owned_flags": 23,
              "total_flags": 119,
              "completion_percentage": 19,
              "avg_user_solved": 2.65
            },
            {
              "name": "Web",
              "owned_flags": 31,
              "total_flags": 145,
              "completion_percentage": 21,
              "avg_user_solved": 2.9
            },
            {
              "name": "Misc",
              "owned_flags": 24,
              "total_flags": 56,
              "completion_percentage": 43,
              "avg_user_solved": 4.64
            },
            {
              "name": "Forensics",
              "owned_flags": 17,
              "total_flags": 76,
              "completion_percentage": 22,
              "avg_user_solved": 3.93
            },
            {
              "name": "Mobile",
              "owned_flags": 4,
              "total_flags": 18,
              "completion_percentage": 22,
              "avg_user_solved": 11.84
            },
            {
              "name": "OSINT",
              "owned_flags": 3,
              "total_flags": 5,
              "completion_percentage": 60,
              "avg_user_solved": 42.18
            },
            {
              "name": "Hardware",
              "owned_flags": 6,
              "total_flags": 46,
              "completion_percentage": 13,
              "avg_user_solved": 4.99
            },
            {
              "name": "GamePwn",
              "owned_flags": 2,
              "total_flags": 11,
              "completion_percentage": 18,
              "avg_user_solved": 16.13
            },
            {
              "name": "Blockchain",
              "owned_flags": 0,
              "total_flags": 16,
              "completion_percentage": 0,
              "avg_user_solved": 16.72
            },
            {
              "name": "AI - ML",
              "owned_flags": 8,
              "total_flags": 10,
              "completion_percentage": 80,
              "avg_user_solved": 22.1
            },
            {
              "name": "Coding",
              "owned_flags": 0,
              "total_flags": 0,
              "completion_percentage": 0,
              "avg_user_solved": 0
            }
          ],
          "challenge_difficulties": [
            {
              "name": "Very Easy",
              "owned_challenges": 48,
              "total_challenges": 82,
              "completion_percentage": 59
            },
            {
              "name": "Easy",
              "owned_challenges": 101,
              "total_challenges": 294,
              "completion_percentage": 34
            },
            {
              "name": "easy",
              "owned_challenges": 1,
              "total_challenges": 1,
              "completion_percentage": 100
            },
            {
              "name": "Medium",
              "owned_challenges": 12,
              "total_challenges": 233,
              "completion_percentage": 5
            },
            {
              "name": "Hard",
              "owned_challenges": 2,
              "total_challenges": 82,
              "completion_percentage": 2
            },
            {
              "name": "hard",
              "owned_challenges": 0,
              "total_challenges": 1,
              "completion_percentage": 0
            },
            {
              "name": "Insane",
              "owned_challenges": 0,
              "total_challenges": 15,
              "completion_percentage": 0
            }
          ]
        }
      };
      
      displayHackTheBoxProfile(staticData, staticChallengeData, profileElement);
    });
}

function displayHackTheBoxProfile(data, challengeData, element) {
  // Extract the data from the API response
  const profile = data.profile;
  
  const {
    name,
    avatar,
    points,
    respects,
    system_owns,
    user_owns,
    user_bloods,
    system_bloods,
    rank,
    ranking,
    country_code
  } = profile;
  
  // Challenge data processing
  let challengeHtml = '';
  
  const challenges = challengeData.profile;
  
  // Create a new array to store the top 6 categories
  const topCategories = challenges.challenge_categories.sort((a, b) => b.completion_percentage - a.completion_percentage).slice(0, 6);
  
  // Create HTML for the top 6 categories
  const topCategoriesHtml = topCategories.map(category => `
    <span class="stat-badge">${category.name}: ${category.completion_percentage}%</span>
  `).join('');
  

  // Overall challenge stats
  challengeHtml = `
    <span class="stat-badge">Challenges: ${challenges.challenge_owns.solved}/${challenges.challenge_owns.total}</span>
    <span class="stat-badge">User: ${user_owns}</span>
    <span class="stat-badge">System: ${system_owns}</span>
    <span class="stat-badge">Top Categories: ${topCategoriesHtml}</span>
  `;
    
  // Create HTML for the profile card
  const html = `
    <div class="cardHTB">
      <div class="horizontalContainer">
        <div class="photo" style="background-image: url('https://labs.hackthebox.com${avatar}');">        </div>
        <div class="verticalContainer">
          <div class="horizontalContainer">
            <a href="https://app.hackthebox.com/users/453678" target="_blank" class="name">${name}</a>
            <div class="rank-badge">${rank}</div>
          </div>
          <div class="horizontalContainer details">
            <p><strong>Rank:</strong> ${ranking}</p>
            <p><strong>Points:</strong> ${points}</p>
            <p><strong>Respects:</strong> ${respects}</p>
          </div>
          <div class="machine-stats">
            ${challengeHtml}
          </div>
          <p class="hackLink">
            <a href="https://app.hackthebox.com" target="_blank">hackthebox.com</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Update the element with the profile card
  element.innerHTML = html;
} 