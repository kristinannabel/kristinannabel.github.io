// Spotify integration for Music Bingo admin
// Uses PKCE OAuth flow (no backend needed) + Web Playback SDK

(function () {
  'use strict';

  var CLIENT_ID = '4a27c13806da4316a1c4de46ee9e2b10';
  var REDIRECT_URI = window.location.origin + '/admin.html';
  var SCOPES = 'streaming user-read-email user-read-private user-modify-playback-state';

  var accessToken = null;
  var player = null;
  var deviceId = null;
  var isReady = false;

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

    // Save current URL params so we can restore after redirect
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

        // Restore the original URL (with room param)
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

  // ===== Web Playback SDK =====
  function initPlayer() {
    if (!accessToken) return;

    player = new Spotify.Player({
      name: 'Music Bingo DJ',
      getOAuthToken: function (cb) { cb(accessToken); },
      volume: 0.8
    });

    player.addListener('ready', function (data) {
      deviceId = data.device_id;
      isReady = true;
      console.log('Spotify player ready, device:', deviceId);
      updateSpotifyUI();
    });

    player.addListener('not_ready', function () {
      isReady = false;
      updateSpotifyUI();
    });

    player.addListener('initialization_error', function (e) {
      console.error('Spotify init error:', e.message);
    });

    player.addListener('authentication_error', function (e) {
      console.error('Spotify auth error:', e.message);
      accessToken = null;
      sessionStorage.removeItem('spotify_access_token');
      updateSpotifyUI();
    });

    player.addListener('player_state_changed', function (state) {
      if (state) {
        updatePlaybackUI(state);
      }
    });

    player.connect();
  }

  // ===== Playback Control =====
  async function playSong(spotifyUri) {
    if (!isReady || !deviceId || !accessToken) return false;

    try {
      await fetch('https://api.spotify.com/v1/me/player/play?device_id=' + deviceId, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: [spotifyUri] })
      });
      return true;
    } catch (err) {
      console.error('Spotify play failed:', err);
      return false;
    }
  }

  function togglePlay() {
    if (player) player.togglePlay();
  }

  function setVolume(vol) {
    if (player) player.setVolume(vol);
  }

  // ===== UI Updates =====
  function updateSpotifyUI() {
    var statusEl = document.getElementById('spotify-status');
    var connectBtn = document.getElementById('spotify-connect-btn');
    var controlsEl = document.getElementById('spotify-controls');

    if (!statusEl) return;

    if (isReady) {
      statusEl.textContent = '🟢 Spotify Connected';
      statusEl.style.color = 'var(--success)';
      if (connectBtn) connectBtn.classList.add('hidden');
      if (controlsEl) controlsEl.classList.remove('hidden');
    } else if (accessToken) {
      statusEl.textContent = '🟡 Connecting to Spotify...';
      statusEl.style.color = 'var(--warning)';
      if (connectBtn) connectBtn.classList.add('hidden');
    } else {
      statusEl.textContent = '🔴 Spotify not connected';
      statusEl.style.color = 'var(--text-muted)';
      if (connectBtn) connectBtn.classList.remove('hidden');
      if (controlsEl) controlsEl.classList.add('hidden');
    }
  }

  function updatePlaybackUI(state) {
    var playPauseBtn = document.getElementById('spotify-play-pause');
    if (playPauseBtn) {
      playPauseBtn.textContent = state.paused ? '▶ Play' : '⏸ Pause';
    }
  }

  // ===== Init =====
  // Check if we're returning from Spotify auth
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('code')) {
    handleCallback();
    return; // Will redirect
  }

  // Check for stored token
  var storedToken = sessionStorage.getItem('spotify_access_token');
  if (storedToken) {
    accessToken = storedToken;
  }

  // Wait for Spotify SDK to load
  window.onSpotifyWebPlaybackSDKReady = function () {
    if (accessToken) {
      initPlayer();
    }
  };

  // If SDK already loaded
  if (window.Spotify && accessToken) {
    initPlayer();
  }

  // ===== Public API =====
  window.spotifyAPI = {
    connect: startAuth,
    play: playSong,
    togglePlay: togglePlay,
    setVolume: setVolume,
    isConnected: function () { return isReady; },
    getToken: function () { return accessToken; }
  };

  // Initial UI update
  setTimeout(updateSpotifyUI, 100);
})();
