document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const DISCORD_ID = '1247679900165341322';
  const LASTFM_USER = 'Echo_Blade';
  const LASTFM_KEY = 'c42a50b9531624233a23f8caa2eaf788';
  const avatar = document.getElementById('discordAvatar');
  const statusDot = document.getElementById('discordStatusDot');
  const trackName = document.getElementById('lastfmTrack');
  const trackLabel = document.getElementById('lastfmLabel');
  const trackArt = document.getElementById('lastfmArt');
  const lastfmLogo = document.getElementById('lastfmLogo');
  const equalizer = document.getElementById('lastfmEq');
  const activityCard = document.getElementById('lastfmCard');

  const updateAge = () => {
    const ageEl = document.getElementById('shreyasAge');
    if (!ageEl) return;
    const birth = new Date(2011, 4, 20);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    ageEl.textContent = age;
  };
  updateAge();

  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.min(120, Math.floor(window.innerWidth / 9)) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.3,
        a: Math.random() * 0.5 + 0.15
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.fillStyle = `rgba(235, 229, 220, ${star.a})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    resize();
    draw();
    window.addEventListener('resize', () => { resize(); draw(); });
  }

  const setArtwork = url => {
    if (!trackArt || !lastfmLogo) return;
    trackArt.style.display = url ? 'block' : 'none';
    lastfmLogo.style.display = url ? 'none' : 'block';
    if (url) trackArt.src = url;
  };

  const fetchLastfm = async () => {
    try {
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_KEY}&format=json&limit=1`;
      const response = await fetch(url);
      const data = await response.json();
      const track = data.recenttracks.track[0];
      const playing = track['@attr']?.nowplaying === 'true';
      const artist = typeof track.artist === 'object' ? track.artist['#text'] : track.artist;
      const art = [...track.image].reverse().find(image => image['#text'])?.['#text'];
      trackName.textContent = `${track.name} — ${artist}`;
      trackLabel.textContent = playing ? 'Listening Now' : 'Last Seen Listening To';
      equalizer?.classList.toggle('active', playing);
      activityCard?.classList.toggle('playing', playing);
      setArtwork(art);
    } catch {}
  };

  const showPresence = data => {
    if (!data) return;
    const user = data.discord_user;
    if (user?.avatar && avatar) avatar.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${user.avatar}.png?size=128`;
    if (statusDot) {
      statusDot.className = `status-indicator ${data.discord_status || 'offline'}`;
      statusDot.title = `Discord status: ${data.discord_status || 'offline'}`;
    }
    if (data.listening_to_spotify && data.spotify) {
      trackName.textContent = `${data.spotify.song} — ${data.spotify.artist}`;
      trackLabel.textContent = 'Listening Now (Spotify)';
      equalizer?.classList.add('active');
      activityCard?.classList.add('playing');
      setArtwork(data.spotify.album_art_url);
    }
  };

  const connectLanyard = () => {
    const socket = new WebSocket('wss://api.lanyard.rest/socket');
    let heartbeat;
    socket.addEventListener('message', event => {
      const packet = JSON.parse(event.data);
      if (packet.op === 1) {
        socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
        heartbeat = setInterval(() => socket.send(JSON.stringify({ op: 3 })), packet.d.heartbeat_interval);
      }
      if (packet.op === 0) showPresence(packet.d);
    });
    socket.addEventListener('close', () => {
      clearInterval(heartbeat);
      setTimeout(connectLanyard, 8000);
    });
  };

  fetchLastfm();
  setInterval(fetchLastfm, 30000);
  connectLanyard();

  const localTime = document.getElementById('localTime');
  const updateClock = () => {
    if (localTime) {
      localTime.textContent = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit'
      }).format(new Date()) + ' IST';
    }
  };
  updateClock();
  setInterval(updateClock, 1000);

  const skinCanvas = document.getElementById('skinCanvas');
  let skinViewer;
  if (skinCanvas && window.skinview3d) {
    const box = skinCanvas.parentElement.getBoundingClientRect();
    skinViewer = new skinview3d.SkinViewer({
      canvas: skinCanvas,
      width: Math.floor(box.width),
      height: Math.floor(box.height),
      skin: 'https://mineskin.eu/skin/Echo_Blade'
    });
    skinViewer.autoRotate = true;
    skinViewer.animation = new skinview3d.WalkingAnimation();
  }
  document.getElementById('btn3dRotate')?.addEventListener('click', event => {
    if (skinViewer) skinViewer.autoRotate = !skinViewer.autoRotate;
    event.currentTarget.classList.toggle('active');
  });
  document.getElementById('btn3dAnim')?.addEventListener('click', event => {
    if (skinViewer) skinViewer.animation = skinViewer.animation ? null : new skinview3d.WalkingAnimation();
    event.currentTarget.classList.toggle('active');
  });
  document.getElementById('btn3dReset')?.addEventListener('click', () => {
    if (skinViewer) skinViewer.camera.position.set(0, 5, 42);
  });

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  });
