async function login() {
  const provider = new firebase.auth.GithubAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  const token = result.credential.accessToken;
  const user = result.user;
  const profileEl = document.querySelector('.profile');
  const repoListEl = document.querySelector('.repo-list')
  profileEl.classList.add('profile--authed');
  document.querySelector('.profile__photo').src = user.photoURL;
  document.querySelector('.profile__display-name').textContent = user.displayName;
  document.querySelector('.profile__email').textContent = user.email;
  const res = await fetch(`https://api.github.com/user/repos?access_token=${token}`);
  const repos = await res.json();
  repos.forEach(repo => {
    const repoEl = document.createElement('li');
    const repoLinkEl = document.createElement('a');
    repoLinkEl.textContent = repo.full_name;
    repoLinkEl.href = repo.html_url;
    repoEl.appendChild(repoLinkEl);
    repoListEl.appendChild(repoEl);
  });
}

document.querySelector('.login').addEventListener('click', e => {
  login();
});
