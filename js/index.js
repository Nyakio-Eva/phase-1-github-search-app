document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('github-form');
  const userList = document.getElementById('user-list');
  const reposList = document.getElementById('repos-list');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the value from the search input
    const searchTerm = document.getElementById('search').value;

    // Perform GitHub user search
    searchGitHubUsers(searchTerm);
  });

  async function searchGitHubUsers(searchTerm) {
    try {
      // Include the custom headers
      const headers = {
        'Accept': 'application/vnd.github.v3+json'
      };

      const userSearchUrl = `https://api.github.com/search/users?q=${searchTerm}`;

      const response = await fetch(userSearchUrl, { headers });
      const data = await response.json();

      // Handle the search results
      displayUserResults(data.items);
    } catch (error) {
      console.error('Error searching GitHub users:', error);
    }
  }

  function displayUserResults(users) {
    // Clear previous results
    userList.innerHTML = '';
    reposList.innerHTML = '';

    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
        <a href="#" data-username="${user.login}">${user.login}</a>
      `;

      // Add click event to each user for fetching repositories
      listItem.querySelector('a').addEventListener('click', function (event) {
        event.preventDefault();
        const username = event.target.getAttribute('data-username');
        getUserRepos(username);
      });

      userList.appendChild(listItem);
    });
  }

  async function getUserRepos(username) {
    try {
      // Include the custom headers
      const headers = {
        'Accept': 'application/vnd.github.v3+json'
      };

      const reposUrl = `https://api.github.com/users/${username}/repos`;

      const response = await fetch(reposUrl, { headers });
      const repos = await response.json();

      // Display repositories
      displayRepos(repos);
    } catch (error) {
      console.error('Error fetching user repositories:', error);
    }
  }

  function displayRepos(repos) {
    reposList.innerHTML = '';

    if (repos.length === 0) {
      reposList.innerHTML = '<li>No repositories found for this user.</li>';
    } else {
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.textContent = repo.name;
        reposList.appendChild(listItem);
      });
    }
  }
});