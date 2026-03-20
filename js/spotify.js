// Spotify integration for Music Bingo
// PKCE OAuth for track search only. Playback uses preview URLs for everyone.

(function () {
  'use strict';

  var CLIENT_ID = '4a27c13806da4316a1c4de46ee9e2b10';
  var REDIRECT_URI = window.location.origin + '/admin.html';
  var SCOPES = 'user-read-private';

  var accessToken = null;

  // ===== PKCE Helpers =====
  function generateRandomString(length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    var arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    var result = '';
    for (var i = 0; i < length; i++) {
      result += chars[arr[i] % chars.length];
    }
    return result;
  }

  async function sha256(plain) {
    var encoder = new TextEncoder();
    var data = encoder.encode(plain);
    return await crypto.subtle.digest('SHA-256', data);
  }

  function base64urlencode(buffer) {
    var bytes = new Uint8Array(buffer);
    var str = '';
    for (var i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // ===== Auth Flow =====
  async function startAuth() {
    var codeVerifier = generateRandomString(64);
    sessionStorage.setItem('spotify_code_verifier', codeVerifier);
    sessionStorage.setItem('spotify_return_url', window.location.href);

    var hashed = await sha256(codeVerifier);
    var codeChallenge = base64urlencode(hashed);

    var params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    window.location.href = 'https://accounts.spotify.com/authorize?' + params.toString();
  }

  async function handleCallback() {
    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get('code');
    if (!code) return false;

    var codeVerifier = sessionStorage.getItem('spotify_code_verifier');
    if (!codeVerifier) return false;

    try {
      var response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          code_verifier: codeVerifier
        })
      });

      var data = await response.json();
      if (data.access_token) {
        accessToken = data.access_token;
        sessionStorage.setItem('spotify_access_token', accessToken);
        sessionStorage.removeItem('spotify_code_verifier');

        var returnUrl = sessionStorage.getItem('spotify_return_url');
        if (returnUrl) {
          sessionStorage.removeItem('spotify_return_url');
          window.location.href = returnUrl;
          return true;
        }
      }
    } catch (err) {
      console.error('Spotify token exchange failed:', err);
    }
    return false;
  }

  // ===== Init =====
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('code')) {
    handleCallback();
    return;
  }

  var storedToken = sessionStorage.getItem('spotify_access_token');
  if (storedToken) {
    accessToken = storedToken;
  }

  // Update UI on load
  setTimeout(function () {
    var statusEl = document.getElementById('spotify-status');
    var connectBtn = document.getElementById('spotify-connect-btn');
    var lobbyStatus = document.getElementById('spotify-lobby-status');
    var lobbyBtn = document.getElementById('spotify-lobby-connect-btn');

    if (accessToken) {
      if (statusEl) { statusEl.textContent = '🟢 Spotify Connected'; statusEl.style.color = 'var(--success)'; }
      if (connectBtn) connectBtn.classList.add('hidden');
      if (lobbyStatus) { lobbyStatus.textContent = '🟢 Connected'; lobbyStatus.style.color = 'var(--success)'; }
      if (lobbyBtn) lobbyBtn.classList.add('hidden');
    }
  }, 100);

  // ===== Public API =====
  window.spotifyAPI = {
    connect: startAuth,
    isConnected: function () { return !!accessToken; },
    getToken: function () { return accessToken; }
  };
})();
