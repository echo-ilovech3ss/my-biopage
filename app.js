/**
 * SHREYAS — COSMIC BIO PAGE CONTROLLER (v3.0)
 * Clean, Warning-Free Architecture
 * Features:
 * 1. Multi-Alias Cyber Glitch Hero Name & Dynamic Age (DOB: 2011-05-20)
 * 2. Lanyard Real-Time WebSocket Gateway with OP 3 Heartbeats
 * 3. Live Last Seen Listening To / Spotify Persistent Tracker
 * 4. Autonomous Playable Chess AI with "Hint" mode & 2000 ELO Shreyas.weights
 * 5. Rock-Solid CSS Grid Chessboard (No Glitches or Layout Shifts)
 * 6. Interactive Hacker Terminal CLI (Ctrl+K)
 * 7. Real-Time Moon Phase & Celestial Stargazer Telemetry
 * 8. Cosmic Starfield Canvas with Mouse Parallax & Hyperspace Warp
 * 9. Lazy AudioContext Synthesis & Micro-sound FX
 * 10. QR Code Modal & Toast Notification
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  /* ==========================================================================
     1. DYNAMIC AGE & MULTI-ALIAS GLITCH ENGINE
     ========================================================================== */
  function calcAge() {
    const dob = new Date('2011-05-20');
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    const ageEl = document.getElementById('shreyasAge');
    if (ageEl) ageEl.innerText = age;
  }
  calcAge();

  const heroNameEl = document.getElementById('heroName');
  const aliasTag = document.getElementById('aliasTag');
  const ALTS = ['Shreyas', 'SANU134yt', 'Pixel_Haven', 'Echo_Blade', 'shreyasloveschesssomuch', 'shreyasloveschess'];
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

  let currentAltIdx = 0;

  function glitchToWord(targetWord) {
    if (!heroNameEl) return;
    let iteration = 0;
    if (heroNameEl._glitchInterval) clearInterval(heroNameEl._glitchInterval);

    heroNameEl._glitchInterval = setInterval(() => {
      heroNameEl.innerText = targetWord
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return targetWord[index];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      if (iteration >= targetWord.length) {
        clearInterval(heroNameEl._glitchInterval);
      }
      iteration += 1 / 3;
    }, 32);
  }

  glitchToWord('Shreyas');

  // Cycle through aliases every 6 seconds
  setInterval(() => {
    currentAltIdx = (currentAltIdx + 1) % ALTS.length;
    const nextAlias = ALTS[currentAltIdx];
    glitchToWord(nextAlias);
    if (aliasTag) aliasTag.innerText = `@${nextAlias.toLowerCase()}`;
  }, 6000);

  if (heroNameEl) {
    heroNameEl.addEventListener('click', () => {
      currentAltIdx = (currentAltIdx + 1) % ALTS.length;
      glitchToWord(ALTS[currentAltIdx]);
    });
  }

  /* ==========================================================================
     2. COSMIC AMBIENT STARFIELD
     ========================================================================== */
  const canvas = document.getElementById('starfield');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const starCount = 180;
    const stars = [];
    let mouseX = width / 2;
    let mouseY = height / 2;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      });
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderStarfield() {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        const dx = (mouseX - width / 2) * 0.0003;
        const dy = (mouseY - height / 2) * 0.0003;

        star.x += star.vx + dx;
        star.y += star.vy + dy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${star.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(124, 109, 250, 0.6)';
        ctx.fill();
      });

      requestAnimationFrame(renderStarfield);
    }
    renderStarfield();
  }

  /* ==========================================================================
     3. REACTBITS SPOTLIGHT CURSOR TRACKER
     ========================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     4. LAST.FM LIVE SCROBBLER & DISCORD (LANYARD) GATEWAY
     ========================================================================== */
  const DISCORD_USER_ID = '1247679900165341322';
  const LFM_KEY = 'c42a50b9531624233a23f8caa2eaf788';
  const LFM_USER = 'Echo_Blade';

  const discordAvatar = document.getElementById('discordAvatar');
  const discordStatusDot = document.getElementById('discordStatusDot');
  const lastfmCard = document.getElementById('lastfmCard');
  const lastfmTrack = document.getElementById('lastfmTrack');
  const lastfmLabel = document.getElementById('lastfmLabel');
  const lastfmArt = document.getElementById('lastfmArt');
  const lastfmLogo = document.getElementById('lastfmLogo');
  const lastfmEq = document.getElementById('lastfmEq');

  let ws = null;
  let heartbeatInterval = null;

  function setActivityArtwork(artUrl) {
    if (!lastfmArt || !lastfmLogo) return;
    if (artUrl) {
      lastfmArt.src = artUrl;
      lastfmArt.style.display = 'block';
      lastfmLogo.style.display = 'none';
      lastfmArt.onerror = () => {
        lastfmArt.style.display = 'none';
        lastfmLogo.style.display = 'block';
      };
    } else {
      lastfmArt.style.display = 'none';
      lastfmLogo.style.display = 'block';
    }
  }

  async function resolveAlbumArt(artist, title, lastfmImgUrl) {
    if (lastfmImgUrl && !lastfmImgUrl.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
      return lastfmImgUrl;
    }
    try {
      const cleanArtist = artist ? artist.replace(/[^\w\s]/gi, ' ').trim() : '';
      const cleanTitle = title ? title.replace(/[^\w\s]/gi, ' ').replace(/\b(slowed|reverb|remix|intro|version)\b/gi, '').trim() : '';
      const query = encodeURIComponent(`${cleanArtist} ${cleanTitle}`.trim() || artist);
      const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
      if (!res.ok) throw new Error('iTunes API error');
      const data = await res.json();
      if (data && data.results && data.results[0] && data.results[0].artworkUrl100) {
        return data.results[0].artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg');
      }
    } catch (e) {
      console.warn('Album artwork lookup notice:', e);
    }
    return null;
  }

  async function fetchLastfm() {
    try {
      const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LFM_USER}&api_key=${LFM_KEY}&format=json&limit=1`);
      if (!res.ok) throw new Error('Lastfm error');
      const data = await res.json();
      const track = data.recenttracks?.track?.[0];
      if (!track) throw new Error('No track');

      const isPlaying = track['@attr']?.nowplaying === 'true';
      const title = track.name;
      const artist = typeof track.artist === 'object' ? track.artist['#text'] : track.artist;
      const rawArtUrl = track.image?.find((i) => i.size === 'extralarge')?.['#text'] || track.image?.find((i) => i.size === 'large')?.['#text'];

      if (lastfmLabel) lastfmLabel.innerText = isPlaying ? 'Listening Now' : 'Last Seen Listening To';
      if (lastfmTrack) lastfmTrack.innerText = `${title} — ${artist}`;

      if (lastfmEq) lastfmEq.classList.toggle('active', isPlaying);
      if (lastfmCard) lastfmCard.classList.toggle('playing', isPlaying);

      const resolvedArt = await resolveAlbumArt(artist, title, rawArtUrl);
      setActivityArtwork(resolvedArt);

      try {
        localStorage.setItem('shreyas_last_track', `${title} — ${artist}`);
        if (resolvedArt) localStorage.setItem('shreyas_last_art', resolvedArt);
      } catch (e) {}
    } catch (err) {
      let savedTrack = '180db_ [130] - Intro Slowed — Akuran';
      let savedArt = null;
      try {
        savedTrack = localStorage.getItem('shreyas_last_track') || savedTrack;
        savedArt = localStorage.getItem('shreyas_last_art');
      } catch (e) {}
      if (lastfmTrack) lastfmTrack.innerText = savedTrack;
      if (savedArt) {
        setActivityArtwork(savedArt);
      } else {
        // Fetch fallback art for default saved track
        resolveAlbumArt('Akuran', '180db_').then(art => {
          if (art) setActivityArtwork(art);
        });
      }
    }
  }

  function connectLanyardGateway() {
    try {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          const { op, d } = payload;

          if (op === 1) {
            const interval = d.heartbeat_interval;
            if (heartbeatInterval) clearInterval(heartbeatInterval);

            heartbeatInterval = setInterval(() => {
              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, interval);

            ws.send(
              JSON.stringify({
                op: 2,
                d: { subscribe_to_id: DISCORD_USER_ID },
              })
            );
          } else if (op === 0 && d) {
            applyDiscordPresence(d);
          }
        } catch (err) {}
      };

      ws.onerror = () => fallbackHttpPresence();
      ws.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        setTimeout(connectLanyardGateway, 8000);
      };
    } catch (e) {
      fallbackHttpPresence();
    }
  }

  /* ==========================================================================
     DYNAMIC DISCORD STATUS FAVICON
     ========================================================================== */
  const dynamicFavicon = document.getElementById('dynamicFavicon');
  function updateFaviconStatus(status = 'offline') {
    if (!dynamicFavicon) return;
    try {
      const favCanvas = document.createElement('canvas');
      favCanvas.width = 32;
      favCanvas.height = 32;
      const ctx = favCanvas.getContext('2d');

      // Outer Background Circle
      ctx.fillStyle = '#080816';
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, Math.PI * 2);
      ctx.fill();

      // Border Glow Ring
      ctx.strokeStyle = '#7C6DFA';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Inner Cosmic Core
      ctx.fillStyle = '#C084FC';
      ctx.beginPath();
      ctx.arc(16, 16, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Status Color Map
      const statusColors = {
        online: '#43B581',
        idle: '#FAA61A',
        dnd: '#F04747',
        offline: '#747F8D',
        spotify: '#1DB954'
      };

      const dotColor = statusColors[status] || '#747F8D';

      // Status Dot
      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(24, 24, 5.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#080816';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      dynamicFavicon.href = favCanvas.toDataURL('image/png');
    } catch (e) {}
  }

  function applyDiscordPresence(user) {
    if (!user) return;

    if (user.discord_user && user.discord_user.avatar && discordAvatar) {
      discordAvatar.src = `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${user.discord_user.avatar}.png?size=128`;
    }

    const rawStatus = user.discord_status || 'offline';
    const status = user.listening_to_spotify ? 'spotify' : rawStatus;

    if (discordStatusDot) {
      discordStatusDot.className = `status-indicator ${status}`;
      const statusTitle = user.listening_to_spotify ? 'Listening to Spotify 🎵' : rawStatus.toUpperCase();
      discordStatusDot.title = `Discord Status: ${statusTitle}`;
    }

    updateFaviconStatus(status);

    // If active Spotify playing on Discord, prioritize it
    if (user.listening_to_spotify && user.spotify) {
      const trackString = `${user.spotify.song} — ${user.spotify.artist}`;
      if (lastfmTrack) lastfmTrack.innerText = trackString;
      if (lastfmLabel) lastfmLabel.innerText = 'Listening Now (Spotify)';
      if (lastfmCard) {
        lastfmCard.style.borderColor = 'rgba(29, 185, 84, 0.4)';
        lastfmCard.classList.add('playing');
      }
      if (lastfmEq) lastfmEq.classList.add('active');
      if (user.spotify.album_art_url) {
        setActivityArtwork(user.spotify.album_art_url);
      }
    } else {
      fetchLastfm();
    }
  }

  async function fallbackHttpPresence() {
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
      const json = await res.json();
      if (json && json.success && json.data) {
        applyDiscordPresence(json.data);
      }
    } catch (err) {}
  }

  fetchLastfm();
  setInterval(fetchLastfm, 15000);
  connectLanyardGateway();

  /* ==========================================================================
     5. PLAYABLE CHESS AI ROBOT ENGINE ("SHREYAS.WEIGHTS")
     ========================================================================== */
  const WHITE_PIECES = new Set(['♙', '♘', '♗', '♖', '♕', '♔']);
  const BLACK_PIECES = new Set(['♟', '♞', '♝', '♜', '♛', '♚']);

  const PIECE_VALUES = {
    '♙': 100, '♘': 320, '♗': 330, '♖': 500, '♕': 900, '♔': 20000,
    '♟': -100, '♞': -320, '♝': -330, '♜': -500, '♛': -900, '♚': -20000
  };

  const PAWN_PST = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ];

  const KNIGHT_PST = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ];

  const INITIAL_CHESS_BOARD = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
  ];

  let chessBoard = JSON.parse(JSON.stringify(INITIAL_CHESS_BOARD));
  let chessTurn = 'w';
  let castlingRights = { wK: true, wQ: true, bK: true, bQ: true };
  let selectedSq = null;
  let validMoves = [];
  let moveHistory = [];
  let capturedByWhite = [];
  let capturedByBlack = [];
  let lastMove = null;
  let hintMove = null;
  let botThinking = false;

  const chessBoardContainer = document.getElementById('chessBoard');
  const botStatusText = document.getElementById('botStatusText');
  const botPulse = document.getElementById('botPulse');
  const botEloTag = document.getElementById('botEloTag');
  const botNameDisplay = document.getElementById('botNameDisplay');
  const chessArenaTitle = document.getElementById('chessArenaTitle');
  const chessArenaSub = document.getElementById('chessArenaSub');
  const chessDifficulty = document.getElementById('chessDifficulty');
  const whiteCapturedEl = document.getElementById('whiteCaptured');
  const blackCapturedEl = document.getElementById('blackCaptured');
  const materialAdvantageEl = document.getElementById('materialAdvantage');
  const resetChessBtn = document.getElementById('resetChessBtn');
  const undoChessBtn = document.getElementById('undoChessBtn');
  const hintChessBtn = document.getElementById('hintChessBtn');
  const shuffleChessMoveBtn = document.getElementById('shuffleChessMoveBtn');

  function isWhite(piece) { return WHITE_PIECES.has(piece); }
  function isBlack(piece) { return BLACK_PIECES.has(piece); }

  function coordsToAlgebraic(r, c) {
    const file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][c];
    const rank = 8 - r;
    return `${file}${rank}`;
  }

  function getRawMoves(board, r, c) {
    const piece = board[r][c];
    if (!piece) return [];
    const moves = [];
    const color = isWhite(piece) ? 'w' : 'b';

    // Pawns
    if (piece === '♙') {
      if (r > 0 && !board[r - 1][c]) {
        moves.push({ r: r - 1, c });
        if (r === 6 && !board[r - 2][c]) moves.push({ r: r - 2, c });
      }
      if (r > 0 && c > 0 && isBlack(board[r - 1][c - 1])) moves.push({ r: r - 1, c: c - 1, capture: true });
      if (r > 0 && c < 7 && isBlack(board[r - 1][c + 1])) moves.push({ r: r - 1, c: c + 1, capture: true });
    } else if (piece === '♟') {
      if (r < 7 && !board[r + 1][c]) {
        moves.push({ r: r + 1, c });
        if (r === 1 && !board[r + 2][c]) moves.push({ r: r + 2, c });
      }
      if (r < 7 && c > 0 && isWhite(board[r + 1][c - 1])) moves.push({ r: r + 1, c: c - 1, capture: true });
      if (r < 7 && c < 7 && isWhite(board[r + 1][c + 1])) moves.push({ r: r + 1, c: c + 1, capture: true });
    }

    // Knights
    else if (piece === '♘' || piece === '♞') {
      const deltas = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
      deltas.forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = board[nr][nc];
          if (!target || (color === 'w' ? isBlack(target) : isWhite(target))) {
            moves.push({ r: nr, c: nc, capture: !!target });
          }
        }
      });
    }

    // Bishops & Rooks & Queens
    else if (piece === '♗' || piece === '♝' || piece === '♖' || piece === '♜' || piece === '♕' || piece === '♛') {
      const dirs = [];
      if (piece === '♗' || piece === '♝' || piece === '♕' || piece === '♛') {
        dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
      }
      if (piece === '♖' || piece === '♜' || piece === '♕' || piece === '♛') {
        dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);
      }
      dirs.forEach(([dr, dc]) => {
        let nr = r + dr, nc = c + dc;
        while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = board[nr][nc];
          if (!target) {
            moves.push({ r: nr, c: nc });
          } else {
            if (color === 'w' ? isBlack(target) : isWhite(target)) {
              moves.push({ r: nr, c: nc, capture: true });
            }
            break;
          }
          nr += dr;
          nc += dc;
        }
      });
    }

    // Kings & Castling
    else if (piece === '♔' || piece === '♚') {
      const deltas = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      deltas.forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = board[nr][nc];
          if (!target || (color === 'w' ? isBlack(target) : isWhite(target))) {
            moves.push({ r: nr, c: nc, capture: !!target });
          }
        }
      });

      // White Castling
      if (piece === '♔' && r === 7 && c === 4) {
        // Kingside (O-O)
        if (castlingRights.wK && board[7][7] === '♖' && !board[7][5] && !board[7][6]) {
          moves.push({ r: 7, c: 6, isCastle: true, side: 'k' });
        }
        // Queenside (O-O-O)
        if (castlingRights.wQ && board[7][0] === '♖' && !board[7][1] && !board[7][2] && !board[7][3]) {
          moves.push({ r: 7, c: 2, isCastle: true, side: 'q' });
        }
      }

      // Black Castling
      if (piece === '♚' && r === 0 && c === 4) {
        // Kingside (O-O)
        if (castlingRights.bK && board[0][7] === '♜' && !board[0][5] && !board[0][6]) {
          moves.push({ r: 0, c: 6, isCastle: true, side: 'k' });
        }
        // Queenside (O-O-O)
        if (castlingRights.bQ && board[0][0] === '♜' && !board[0][1] && !board[0][2] && !board[0][3]) {
          moves.push({ r: 0, c: 2, isCastle: true, side: 'q' });
        }
      }
    }

    return moves;
  }

  function getAllMoves(board, turn) {
    const all = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && (turn === 'w' ? isWhite(p) : isBlack(p))) {
          const raw = getRawMoves(board, r, c);
          raw.forEach((m) => all.push({ from: { r, c }, to: { r: m.r, c: m.c }, capture: m.capture, isCastle: m.isCastle, side: m.side }));
        }
      }
    }
    return all;
  }

  function evaluateBoard(board) {
    let score = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (!p) continue;
        const val = PIECE_VALUES[p] || 0;
        score += val;

        if (p === '♙') score += PAWN_PST[r][c];
        else if (p === '♟') score -= PAWN_PST[7 - r][c];
        else if (p === '♘') score += KNIGHT_PST[r][c];
        else if (p === '♞') score -= KNIGHT_PST[7 - r][c];
      }
    }
    return score;
  }

  function makeSimulatedMove(board, move) {
    const next = board.map((row) => [...row]);
    const p = next[move.from.r][move.from.c];
    next[move.from.r][move.from.c] = '';

    // Handle Castling Relocation in Simulation
    if (p === '♔' && move.from.c === 4) {
      if (move.to.c === 6) { next[7][7] = ''; next[7][5] = '♖'; }
      else if (move.to.c === 2) { next[7][0] = ''; next[7][3] = '♖'; }
    } else if (p === '♚' && move.from.c === 4) {
      if (move.to.c === 6) { next[0][7] = ''; next[0][5] = '♜'; }
      else if (move.to.c === 2) { next[0][0] = ''; next[0][3] = '♜'; }
    }

    if (p === '♙' && move.to.r === 0) next[move.to.r][move.to.c] = '♕';
    else if (p === '♟' && move.to.r === 7) next[move.to.r][move.to.c] = '♛';
    else next[move.to.r][move.to.c] = p;
    return next;
  }

  function minimax(board, depth, alpha, beta, isMax) {
    if (depth === 0) return { score: evaluateBoard(board) };

    const moves = getAllMoves(board, isMax ? 'w' : 'b');
    if (moves.length === 0) return { score: isMax ? -10000 : 10000 };

    let bestMove = null;

    if (isMax) {
      let maxEval = -Infinity;
      for (const m of moves) {
        const nextB = makeSimulatedMove(board, m);
        const evalRes = minimax(nextB, depth - 1, alpha, beta, false);
        if (evalRes.score > maxEval) {
          maxEval = evalRes.score;
          bestMove = m;
        }
        alpha = Math.max(alpha, evalRes.score);
        if (beta <= alpha) break;
      }
      return { score: maxEval, move: bestMove };
    } else {
      let minEval = Infinity;
      for (const m of moves) {
        const nextB = makeSimulatedMove(board, m);
        const evalRes = minimax(nextB, depth - 1, alpha, beta, true);
        if (evalRes.score < minEval) {
          minEval = evalRes.score;
          bestMove = m;
        }
        beta = Math.min(beta, evalRes.score);
        if (beta <= alpha) break;
      }
      return { score: minEval, move: bestMove };
    }
  }

  function updateMaterialScore() {
    let wScore = 0;
    let bScore = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = chessBoard[r][c];
        if (!p) continue;
        if (isWhite(p)) wScore += Math.abs(PIECE_VALUES[p] || 0);
        else bScore += Math.abs(PIECE_VALUES[p] || 0);
      }
    }
    const diff = wScore - bScore;
    if (materialAdvantageEl) {
      materialAdvantageEl.innerText = diff >= 0 ? `+${diff / 100}` : `-${Math.abs(diff) / 100}`;
    }

    if (whiteCapturedEl) whiteCapturedEl.innerHTML = capturedByWhite.join(' ');
    if (blackCapturedEl) blackCapturedEl.innerHTML = capturedByBlack.join(' ');
  }

  /* Rock-Solid 64-Square CSS Grid Renderer */
  function renderChessBoard() {
    if (!chessBoardContainer) return;
    chessBoardContainer.innerHTML = '';

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = chessBoard[r][c];
        const sq = document.createElement('span');
        sq.className = `sq ${(r + c) % 2 === 0 ? 'light' : 'dark'}`;
        sq.setAttribute('data-r', r);
        sq.setAttribute('data-c', c);

        if (selectedSq && selectedSq.r === r && selectedSq.c === c) {
          sq.classList.add('selected');
        }

        if (lastMove && ((lastMove.from.r === r && lastMove.from.c === c) || (lastMove.to.r === r && lastMove.to.c === c))) {
          sq.classList.add('last-move');
        }

        if (hintMove) {
          if (hintMove.from.r === r && hintMove.from.c === c) sq.classList.add('hint-from');
          if (hintMove.to.r === r && hintMove.to.c === c) sq.classList.add('hint-to');
        }

        const isValid = validMoves.some((m) => m.r === r && m.c === c);
        if (isValid) {
          if (piece) sq.classList.add('valid-capture');
          else sq.classList.add('valid-move');
        }

        sq.innerText = piece;
        sq.addEventListener('click', () => handleSquareClick(r, c));
        chessBoardContainer.appendChild(sq);
      }
    }
    updateMaterialScore();
  }

  function handleSquareClick(r, c) {
    if (botThinking || chessTurn !== 'w') return;

    hintMove = null;
    const piece = chessBoard[r][c];

    // Select friendly piece
    if (piece && isWhite(piece)) {
      selectedSq = { r, c };
      validMoves = getRawMoves(chessBoard, r, c);
      renderChessBoard();
      playClickSound(600, 0.04);
      return;
    }

    // Execute Move
    if (selectedSq) {
      const move = validMoves.find((m) => m.r === r && m.c === c);
      if (move) {
        executeMove({ from: selectedSq, to: { r, c }, isCastle: move.isCastle, side: move.side });
        selectedSq = null;
        validMoves = [];
      } else {
        selectedSq = null;
        validMoves = [];
        renderChessBoard();
      }
    }
  }

  function executeMove(move) {
    const fromP = chessBoard[move.from.r][move.from.c];
    const targetP = chessBoard[move.to.r][move.to.c];

    moveHistory.push({
      board: JSON.parse(JSON.stringify(chessBoard)),
      castlingRights: { ...castlingRights },
      capturedByWhite: [...capturedByWhite],
      capturedByBlack: [...capturedByBlack],
      lastMove,
      turn: chessTurn
    });

    if (targetP) {
      if (isWhite(fromP)) capturedByWhite.push(targetP);
      else capturedByBlack.push(targetP);
      playClickSound(780, 0.08);
    } else {
      playClickSound(520, 0.05);
    }

    chessBoard[move.from.r][move.from.c] = '';

    // Execute Castling Rook Moves & Invalidate Rights
    if (fromP === '♔') {
      castlingRights.wK = false;
      castlingRights.wQ = false;
      if (move.from.c === 4 && move.to.c === 6) {
        // White O-O
        chessBoard[7][7] = '';
        chessBoard[7][5] = '♖';
      } else if (move.from.c === 4 && move.to.c === 2) {
        // White O-O-O
        chessBoard[7][0] = '';
        chessBoard[7][3] = '♖';
      }
    } else if (fromP === '♚') {
      castlingRights.bK = false;
      castlingRights.bQ = false;
      if (move.from.c === 4 && move.to.c === 6) {
        // Black O-O
        chessBoard[0][7] = '';
        chessBoard[0][5] = '♜';
      } else if (move.from.c === 4 && move.to.c === 2) {
        // Black O-O-O
        chessBoard[0][0] = '';
        chessBoard[0][3] = '♜';
      }
    }

    // Rook moved from home square
    if (move.from.r === 7 && move.from.c === 7) castlingRights.wK = false;
    if (move.from.r === 7 && move.from.c === 0) castlingRights.wQ = false;
    if (move.from.r === 0 && move.from.c === 7) castlingRights.bK = false;
    if (move.from.r === 0 && move.from.c === 0) castlingRights.bQ = false;

    // Pawn Promotion
    if (fromP === '♙' && move.to.r === 0) chessBoard[move.to.r][move.to.c] = '♕';
    else if (fromP === '♟' && move.to.r === 7) chessBoard[move.to.r][move.to.c] = '♛';
    else chessBoard[move.to.r][move.to.c] = fromP;

    lastMove = move;
    hintMove = null;
    chessTurn = chessTurn === 'w' ? 'b' : 'w';
    renderChessBoard();

    // Trigger AI Bot response if Black's turn
    if (chessTurn === 'b') {
      botThinking = true;
      const botName = chessDifficulty && chessDifficulty.value === '3' ? 'Shreyas.weights' : 'Cosmic Bot';
      if (botStatusText) botStatusText.innerText = `${botName} is calculating deep...`;
      if (botPulse) botPulse.classList.add('thinking');

      const depth = Number(chessDifficulty ? chessDifficulty.value : 3);
      setTimeout(() => {
        const best = minimax(chessBoard, depth, -Infinity, Infinity, false);
        if (best.move) {
          executeMove(best.move);
        } else {
          if (botStatusText) botStatusText.innerText = 'Checkmate! You win! 🏆';
        }
        botThinking = false;
        if (botPulse) botPulse.classList.remove('thinking');
        if (botStatusText && chessTurn === 'w') botStatusText.innerText = 'Your turn • Play as White';
      }, 350);
    }
  }

  function resetGame() {
    chessBoard = JSON.parse(JSON.stringify(INITIAL_CHESS_BOARD));
    chessTurn = 'w';
    castlingRights = { wK: true, wQ: true, bK: true, bQ: true };
    selectedSq = null;
    validMoves = [];
    hintMove = null;
    moveHistory = [];
    capturedByWhite = [];
    capturedByBlack = [];
    lastMove = null;
    botThinking = false;
    if (botStatusText) botStatusText.innerText = 'Your turn • Play as White';
    if (botPulse) botPulse.classList.remove('thinking');
    renderChessBoard();
    playClickSound(440, 0.06);
  }

  function undoMove() {
    if (botThinking || moveHistory.length === 0) return;
    const prevUser = moveHistory.length >= 2 ? moveHistory[moveHistory.length - 2] : moveHistory[0];
    moveHistory = moveHistory.slice(0, Math.max(0, moveHistory.length - 2));

    chessBoard = JSON.parse(JSON.stringify(prevUser.board));
    castlingRights = { ...(prevUser.castlingRights || { wK: true, wQ: true, bK: true, bQ: true }) };
    capturedByWhite = [...prevUser.capturedByWhite];
    capturedByBlack = [...prevUser.capturedByBlack];
    lastMove = prevUser.lastMove;
    chessTurn = 'w';
    selectedSq = null;
    validMoves = [];
    hintMove = null;
    if (botStatusText) botStatusText.innerText = 'Your turn • Move undone';
    renderChessBoard();
    playClickSound(360, 0.08);
  }

  function provideHint() {
    if (botThinking || chessTurn !== 'w') return;

    const best = minimax(chessBoard, 2, -Infinity, Infinity, true);
    if (best.move) {
      hintMove = best.move;
      const piece = chessBoard[hintMove.from.r][hintMove.from.c];
      const fromAlg = coordsToAlgebraic(hintMove.from.r, hintMove.from.c);
      const toAlg = coordsToAlgebraic(hintMove.to.r, hintMove.to.c);
      if (botStatusText) {
        botStatusText.innerHTML = `💡 <strong style="color:var(--accent-cyan)">Hint:</strong> Move <strong>${piece}</strong> (${fromAlg} &rarr; ${toAlg})`;
      }
      renderChessBoard();
      playClickSound(880, 0.08);
    }
  }

  if (hintChessBtn) hintChessBtn.addEventListener('click', provideHint);
  if (resetChessBtn) resetChessBtn.addEventListener('click', resetGame);
  if (undoChessBtn) undoChessBtn.addEventListener('click', undoMove);

  function applyDifficultyProfile() {
    const diff = chessDifficulty ? chessDifficulty.value : '3';
    if (diff === '1') {
      if (botEloTag) botEloTag.innerText = '(1100 ELO)';
      if (botNameDisplay) botNameDisplay.innerHTML = `Cosmic Bot <small id="botEloTag">(1100 ELO)</small>`;
      if (chessArenaTitle) chessArenaTitle.innerText = 'Play Chess vs Cosmic Bot';
      if (chessArenaSub) chessArenaSub.innerText = 'Casual tactical sparring (1100 ELO)';
    } else if (diff === '2') {
      if (botEloTag) botEloTag.innerText = '(1550 ELO)';
      if (botNameDisplay) botNameDisplay.innerHTML = `Cosmic Bot <small id="botEloTag">(1550 ELO)</small>`;
      if (chessArenaTitle) chessArenaTitle.innerText = 'Play Chess vs Cosmic Bot';
      if (chessArenaSub) chessArenaSub.innerText = 'Positional & tactical sparring (1550 ELO)';
    } else {
      if (botEloTag) botEloTag.innerText = '(2000 ELO)';
      if (botNameDisplay) botNameDisplay.innerHTML = `Shreyas.weights <small id="botEloTag">(2000 ELO)</small>`;
      if (chessArenaTitle) chessArenaTitle.innerText = 'Play Chess vs Shreyas.weights';
      if (chessArenaSub) chessArenaSub.innerText = 'Shreyas, but in neural weights that play chess (2000 ELO)';
    }
  }

  if (chessDifficulty) {
    chessDifficulty.addEventListener('change', applyDifficultyProfile);
    applyDifficultyProfile();
  }

  if (shuffleChessMoveBtn) {
    shuffleChessMoveBtn.addEventListener('click', () => {
      const openings = [
        { name: "Sicilian Defense (Najdorf)", quote: "1.e4 c5 2.Nf3 d6 — Sharp tactical counter-attack." },
        { name: "King's Indian Defense", quote: "1.d4 Nf6 2.c4 g6 — Kingside dynamic pawn storms." },
        { name: "Queen's Gambit Accepted", quote: "1.d4 d5 2.c4 dxc4 — Center control and quick piece development." },
        { name: "Ruy Lopez (Spanish Opening)", quote: "1.e4 e5 2.Nf3 Nc6 3.Bb5 — Classical positional harmony." }
      ];
      const randOpening = openings[Math.floor(Math.random() * openings.length)];
      const quoteEl = document.getElementById('chessOpeningQuote');
      if (quoteEl) quoteEl.innerText = `“${randOpening.name}: ${randOpening.quote}”`;
      playClickSound(700, 0.05);
    });
  }

  renderChessBoard();

  /* ==========================================================================
     6. INTERACTIVE WEB TERMINAL CLI (Ctrl+K or Button)
     ========================================================================== */
  const cliToggleBtn = document.getElementById('cliToggleBtn');
  const openCliFooterBtn = document.getElementById('openCliFooterBtn');
  const closeCliBtn = document.getElementById('closeCliBtn');
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  const cmdHistory = [];
  let historyIdx = -1;

  const VFS = {
    'about.txt': `Shreyas | Systems & AI Developer\n- Focus: High-performance compute, CUDA acceleration, LLM fine-tuning, Linux systems.\n- Passion: Chess, astrophysics, 3D rendering (Blender), gaming.\n- Location: India (IST / UTC+5:30)`,
    'skills.json': `{\n  "languages": ["C++", "Python", "CUDA C", "JavaScript (ES2024)", "Rust", "SQL"],\n  "systems_ai": ["Linux Kernel", "ARM", "PyTorch", "TensorRT", "LoRA / QLoRA", "HuggingFace"],\n  "tools": ["Git", "Blender 3D", "Docker", "Vim/Neovim", "skinview3d"]\n}`,
    'projects.md': `# Featured Open Source Projects
1. [lite-wa] - Fast single-session WhatsApp automation REST API with live dark QR dashboard & Docker
2. [Fetchr] - Modern high-performance media downloading & GPU transcoding desktop app (Rust + Tauri)
3. [predictor] - AlphaPredict: Quantitative market prediction & paper-trading bot with ML ensembles
4. [conjunction] - Custom Arch Linux ISO distribution builder & system sync toolsuite with Rust core`,
    'specs.txt': `SHREYAS HARDWARE FLEET & EVOLUTION:
1. Patient Zero (The Spark Starter) [DECOMMISSIONED - Water Damage]
   - Chassis : Old Dell Desktop (~2008-2010)
   - CPU     : Intel Core 2 Duo
   - RAM     : 4 GB RAM
   - Storage : Mechanical Spinny HDD
   - OS      : Windows 7
   - Memory  : "The spark that started it all. First Java Minecraft experiments."

2. Laptop 1 (Dell Inspiron 15) [HANDED DOWN]
   - Chassis : Dell Inspiron Workstation (~2017-2018)
   - CPU     : Intel Core i5 U-Series
   - RAM     : 16 GB RAM
   - Storage : 512 GB NVMe SSD
   - GPU     : Radeon RX 570 4GB GPU
   - Display : Shitty screen
   - OS      : Windows 10

3. Computer 1 (iMac 27" Retina 5K - Late 2019) [ACTIVE STUDIO RIG]
   - CPU     : Intel Core i5-8500 (6-Core, 4.1GHz)
   - RAM     : 48 GB Expanded RAM
   - Storage : 1 TB SATA SSD
   - GPU     : Radeon Pro 570X 4GB VRAM
   - OS      : macOS 15 (Sequoia)

4. Laptop 2 (MacBook Pro 14" - Late 2021) [ACTIVE DAILY DRIVER]
   - SoC     : Apple Silicon M1 Pro
   - RAM     : 16 GB Unified Memory
   - Storage : 512 GB High-Speed NVMe
   - OS      : macOS 15 (Sequoia)

5. Computer 2 (The Battleship Flagship) [ACTIVE FLAGSHIP]
   - CPU     : AMD Ryzen 5 7600X (5.3GHz Boost)
   - RAM     : 32 GB DDR5 RAM
   - Storage : 1 TB Gen 4 NVMe SSD (7,000MB/s)
   - GPU     : NVIDIA GeForce RTX 5060 Ti 16GB VRAM
   - OS      : Windows 11 & Conjunction OS (Dual-Boot)`,
    'contact.txt': `Discord   : @echo_blade (ID: 1247679900165341322)\nGitHub    : https://github.com/echo-ilovech3ss\nInstagram : @untitled.chess.player\nChess.com : @shreyasloveschesssomuch (https://www.chess.com/member/shreyasloveschesssomuch)\nNameMC    : https://namemc.com/profile/Echo_Blade`,
    'interests.txt': `LIKES:\n- Space, NASA & James Webb Deep Fields\n- Hardstyle, Phonk, Synthwave, Lofi\n- Fast low-level code & CUDA\n- War Thunder, Minecraft, Chess\n\nDISLIKES:\n- Unnecessary boilerplate & over-engineering\n- Slow unoptimized software\n- Lack of dark mode`,
    'cosmos.txt': `COSMOS, FERMI PARADOX & STARDUST THOUGHTS:

1. Observable Universe & Beyond
   A horizon of worlds we can only look at, but never reach. It's wild to think our cosmic neighbors might be peering right back through a telescope at this exact moment—and yet, neither of us will ever find out. It’s frustrating. If life took root here so naturally, how is the rest of the cosmos this quiet? Why haven't we heard a single whisper?

2. The Fermi Paradox
   If the universe is practically built for life, where is everybody? That deep cosmic silence hits differently depending on the night—some days it feels peaceful, like having the whole house to ourselves; other nights it feels terrifyingly lonely.

3. We Are Stardust
   Every atom in our bones was forged inside an exploding star. But sometimes I look at the world and feel like those ancient stars would be heartbroken—seeing consciousness finally emerge, only for us to fight over petty borders and hoard what could easily be shared.`
  };

  const COMMAND_LIST = [
    'help', 'neofetch', 'fastfetch', 'about', 'whoami', 'skills', 'stack',
    'projects', 'repos', 'specs', 'hardware', 'rigs', 'fleet', 'music', 'np', 'nowplaying', 'chess', 'socials',
    'contact', 'time', 'date', 'space', 'astro', 'synth', 'minecraft',
    'bench', 'gpu', 'cuda', 'ls', 'dir', 'cat', 'echo', 'matrix', 'history', 'sudo', 'clear', 'cls', 'exit', 'quit'
  ];

  function openCli() {
    if (!cliModal) return;
    cliModal.classList.add('active');
    cliModal.setAttribute('aria-hidden', 'false');
    playClickSound(640, 0.05);
    setTimeout(() => { if (terminalInput) terminalInput.focus(); }, 100);
  }

  function closeCli() {
    if (!cliModal) return;
    cliModal.classList.remove('active');
    cliModal.setAttribute('aria-hidden', 'true');
    playClickSound(440, 0.04);
  }

  if (cliToggleBtn) cliToggleBtn.addEventListener('click', openCli);
  if (openCliFooterBtn) openCliFooterBtn.addEventListener('click', openCli);
  if (closeCliBtn) closeCliBtn.addEventListener('click', closeCli);

  if (cliModal) {
    cliModal.addEventListener('click', (e) => {
      if (e.target === cliModal) closeCli();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (cliModal && cliModal.classList.contains('active')) closeCli();
      else openCli();
    }
  });

  // Terminal Auto-complete and History Navigation (Up/Down)
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length > 0) {
          if (historyIdx === -1) historyIdx = cmdHistory.length - 1;
          else if (historyIdx > 0) historyIdx--;
          terminalInput.value = cmdHistory[historyIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (cmdHistory.length > 0) {
          if (historyIdx < cmdHistory.length - 1 && historyIdx !== -1) {
            historyIdx++;
            terminalInput.value = cmdHistory[historyIdx] || '';
          } else {
            historyIdx = -1;
            terminalInput.value = '';
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = terminalInput.value.trim();
        if (!current) return;
        const parts = current.split(' ');
        if (parts.length === 1) {
          const match = COMMAND_LIST.find((c) => c.startsWith(parts[0].toLowerCase()));
          if (match) terminalInput.value = match + ' ';
        } else if (parts[0] === 'cat' && parts.length === 2) {
          const fileMatch = Object.keys(VFS).find((f) => f.startsWith(parts[1].toLowerCase()));
          if (fileMatch) terminalInput.value = `cat ${fileMatch}`;
        }
      }
    });
  }

  function handleTerminalCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    cmdHistory.push(trimmed);
    historyIdx = -1;

    const userLine = document.createElement('p');
    userLine.innerHTML = `<span class="term-prompt-sym">shreyas@cosmic-os:~$</span> ${trimmed}`;
    terminalOutput.appendChild(userLine);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const resLine = document.createElement('div');
    resLine.className = 'term-res';

    switch (cmd) {
      case 'help':
      case '?':
      case 'man':
        resLine.innerHTML = `
<span class="term-hl">COSMIC-OS COMMAND MANUAL</span>
<div class="term-table">
  <div class="term-table-key"><span class="term-cmd">about</span> / <span class="term-cmd">whoami</span></div><div class="term-table-val">Developer identity, systems & AI focus</div>
  <div class="term-table-key"><span class="term-cmd">skills</span> / <span class="term-cmd">stack</span></div><div class="term-table-val">Core programming languages & tech stack</div>
  <div class="term-table-key"><span class="term-cmd">projects</span> / <span class="term-cmd">repos</span></div><div class="term-table-val">Featured repositories & interactive tools</div>
  <div class="term-table-key"><span class="term-cmd">specs</span> / <span class="term-cmd">rigs</span></div><div class="term-table-val">Hardware evolution & battlestation fleet</div>
  <div class="term-table-key"><span class="term-cmd">music</span> / <span class="term-cmd">np</span></div><div class="term-table-val">Real-time Last.fm / Spotify telemetry</div>
  <div class="term-table-key"><span class="term-cmd">chess</span> [hint|reset|fen]</div><div class="term-table-val">Control embedded chess tactical robot</div>
  <div class="term-table-key"><span class="term-cmd">neofetch</span> / <span class="term-cmd">fetch</span></div><div class="term-table-val">System specs & ASCII banner</div>
  <div class="term-table-key"><span class="term-cmd">socials</span> / <span class="term-cmd">contact</span></div><div class="term-table-val">Direct contact links & handles</div>
  <div class="term-table-key"><span class="term-cmd">minecraft</span></div><div class="term-table-val">3D Java skin model telemetry (Echo_Blade)</div>
  <div class="term-table-key"><span class="term-cmd">space</span> / <span class="term-cmd">astro</span></div><div class="term-table-val">Deep space telescope active target info</div>
  <div class="term-table-key"><span class="term-cmd">synth</span> [on|off|toggle]</div><div class="term-table-val">Toggle 432Hz ambient cosmic space audio</div>
  <div class="term-table-key"><span class="term-cmd">bench</span> / <span class="term-cmd">gpu</span></div><div class="term-table-val">Benchmark client CPU/GPU math throughput</div>
  <div class="term-table-key"><span class="term-cmd">ls</span> / <span class="term-cmd">cat &lt;file&gt;</span></div><div class="term-table-val">Explore virtual files in ~ (e.g. cat specs.txt)</div>
  <div class="term-table-key"><span class="term-cmd">time</span> / <span class="term-cmd">date</span></div><div class="term-table-val">Live IST timestamp & moon phase telemetry</div>
  <div class="term-table-key"><span class="term-cmd">matrix</span></div><div class="term-table-val">Stream digital green rain cascade</div>
  <div class="term-table-key"><span class="term-cmd">history</span></div><div class="term-table-val">List previous session commands</div>
  <div class="term-table-key"><span class="term-cmd">clear</span> / <span class="term-cmd">cls</span></div><div class="term-table-val">Clear terminal output buffer</div>
  <div class="term-table-key"><span class="term-cmd">exit</span> / <span class="term-cmd">quit</span></div><div class="term-table-val">Close this terminal modal</div>
</div>`;
        break;

      case 'neofetch':
      case 'fastfetch':
      case 'fetch':
        resLine.innerHTML = `
<pre class="term-ascii">
    /\\_/\\        <span class="term-hl">shreyas</span>@<span class="term-cmd">cosmic-os</span>
   ( o.o )       ------------------
    &gt; ^ &lt;        <span class="term-tag">OS</span> Cosmic Linux x86_64
                 <span class="term-tag">Host</span> Bio-Core Quantum v2.6
                 <span class="term-tag">Kernel</span> 6.12.0-custom-ai
                 <span class="term-tag">Uptime</span> Live in India (IST)
                 <span class="term-tag">Shell</span> zsh 5.9 / web-cli
                 <span class="term-tag">Stack</span> C++, Python, CUDA, PyTorch, Linux
                 <span class="term-tag">Chess</span> 2000+ Tactical Bot
                 <span class="term-tag">Theme</span> Deep Cosmic Space (Pure Dark)
</pre>`;
        break;

      case 'about':
      case 'whoami':
      case 'bio':
        resLine.innerHTML = `
<span class="term-hl">SHREYAS (@Echo_Blade / @ilovech3ss)</span><br>
Passionate systems & AI developer building high-performance low-level architectures, CUDA acceleration pipelines, and AI engines.<br>
Deeply inspired by space science, astrophysics (JWST/Hubble), chess tactical masteries, and fast software without bloat.`;
        break;

      case 'skills':
      case 'stack':
      case 'tech':
        resLine.innerHTML = `
<span class="term-hl">CORE TECHNICAL STACK:</span><br>
&bull; <b>Languages:</b> <span class="term-cmd">C++</span>, <span class="term-cmd">Python</span>, <span class="term-cmd">CUDA C</span>, <span class="term-cmd">JavaScript (ES2024)</span>, <span class="term-cmd">Rust</span>, <span class="term-cmd">SQL</span><br>
&bull; <b>Systems & AI:</b> <span class="term-cmd">Linux Kernel</span>, <span class="term-cmd">ARM</span>, <span class="term-cmd">PyTorch</span>, <span class="term-cmd">TensorRT</span>, <span class="term-cmd">LLM Fine-tuning</span><br>
&bull; <b>Creative & 3D:</b> <span class="term-cmd">Blender 3D</span> (Black hole & space renders), <span class="term-cmd">WebGL/Three.js</span>`;
        break;

      case 'projects':
      case 'repos':
      case 'work':
        resLine.innerHTML = `
<span class="term-hl">FEATURED CODEBASES & PROJECTS:</span><br>
1. <b>my-biopage</b> &mdash; Interactive cosmic bio with 3D skinview3d WebGL, Last.fm scrobbler, and embedded AI chess.<br>
   <a href="https://github.com/echo-ilovech3ss" target="_blank" class="term-link">https://github.com/echo-ilovech3ss</a><br>
2. <b>Chess AI Tactical Bot</b> &mdash; Minimax engine with alpha-beta pruning, piece-square tables, and move hints.<br>
3. <b>LLM LoRA Training Pipeline</b> &mdash; Multi-GPU parameter-efficient fine-tuning workflows.<br>
4. <b>Deep Space Simulation</b> &mdash; Volumetric black hole gravitational lensing & accretion disk visualizer in Blender.`;
        break;

      case 'music':
      case 'np':
      case 'nowplaying':
        const curTrack = lastfmTrack ? lastfmTrack.innerText : '180db_ [130] - Intro Slowed — Akuran';
        const curLabel = lastfmLabel ? lastfmLabel.innerText : 'Last Seen Listening To';
        resLine.innerHTML = `
<span class="term-hl">[AUDIO SCROBBLER TELEMETRY]</span><br>
Status: <span class="term-cmd">${curLabel}</span><br>
Track : <b>${curTrack}</b><br>
Source: <a href="https://www.last.fm/user/Echo_Blade" target="_blank" class="term-link">Last.fm @Echo_Blade</a> / Discord Spotify`;
        break;

      case 'chess':
        if (args === 'hint') {
          provideHint();
          resLine.innerHTML = `<span class="term-hl">[CHESS ENGINE]:</span> Calculated optimal tactical move and highlighted board square.`;
        } else if (args === 'reset') {
          if (resetChessBtn) resetChessBtn.click();
          resLine.innerHTML = `<span class="term-hl">[CHESS ENGINE]:</span> Reset board to starting position.`;
        } else if (args === 'flip' || args === 'shuffle') {
          if (shuffleChessMoveBtn) shuffleChessMoveBtn.click();
          resLine.innerHTML = `<span class="term-hl">[CHESS ENGINE]:</span> Loaded next tactical master opening.`;
        } else {
          resLine.innerHTML = `
<span class="term-hl">[CHESS AI ROBOT ARENA]</span><br>
Subcommands: <span class="term-cmd">chess hint</span> | <span class="term-cmd">chess reset</span> | <span class="term-cmd">chess shuffle</span><br>
Current Evaluation: <span class="term-hl">+0.2 (Balanced)</span> &bull; Bot: <span class="term-cmd">shreyas.weights</span> (2000+ ELO)`;
        }
        break;

      case 'socials':
      case 'contact':
      case 'links':
        resLine.innerHTML = `
<div class="term-table">
  <div class="term-table-key">Discord:</div><div class="term-table-val"><b>@echo_blade</b> (ID: 1247679900165341322)</div>
  <div class="term-table-key">GitHub:</div><div class="term-table-val"><a href="https://github.com/echo-ilovech3ss" target="_blank" class="term-link">echo-ilovech3ss</a></div>
  <div class="term-table-key">Chess.com:</div><div class="term-table-val"><a href="https://www.chess.com/member/shreyasloveschesssomuch" target="_blank" class="term-link">@shreyasloveschesssomuch</a></div>
  <div class="term-table-key">Instagram:</div><div class="term-table-val"><a href="https://instagram.com/untitled.chess.player" target="_blank" class="term-link">@untitled.chess.player</a></div>
  <div class="term-table-key">NameMC:</div><div class="term-table-val"><a href="https://namemc.com/profile/Echo_Blade" target="_blank" class="term-link">Echo_Blade (Minecraft)</a></div>
  <div class="term-table-key">Roblox:</div><div class="term-table-val"><a href="https://www.roblox.com/users/1888970219/profile" target="_blank" class="term-link">SANU134yt (ID: 1888970219)</a></div>
</div>`;
        break;

      case 'minecraft':
      case 'skin':
        resLine.innerHTML = `
<span class="term-hl">[MINECRAFT JAVA TELEMETRY]</span><br>
Username: <span class="term-cmd">Echo_Blade</span><br>
Renderer: <b>skinview3d WebGL Canvas</b> with 360&deg; Orbit & Walking gait.<br>
Profile : <a href="https://namemc.com/profile/Echo_Blade" target="_blank" class="term-link">View Skin on NameMC</a>`;
        break;

      case 'space':
      case 'astro':
      case 'telescope':
        resLine.innerHTML = `
<span class="term-hl">[CELESTIAL TELESCOPE TELEMETRY]</span><br>
Active Target: <b>Pillars of Creation (M16) / Deep Sky</b><br>
Observatory  : James Webb Space Telescope (NIRCam/MIRI) & Hubble<br>
Distance     : ~6,500 light-years &bull; Constellation: Serpens<br>
Status       : High-resolution infrared synthesis active`;
        break;

      case 'synth':
      case 'audio':
        const synthToggleBtn = document.getElementById('synthToggleBtn');
        if (args === 'on' || args === 'play') {
          if (!synthPlaying && synthToggleBtn) synthToggleBtn.click();
          resLine.innerHTML = `<span class="term-hl">[AUDIO]:</span> 432Hz ambient cosmic space synthesizer started. 🎵`;
        } else if (args === 'off' || args === 'stop') {
          if (synthPlaying && synthToggleBtn) synthToggleBtn.click();
          resLine.innerHTML = `<span class="term-hl">[AUDIO]:</span> Synthesizer muted.`;
        } else {
          if (synthToggleBtn) synthToggleBtn.click();
          resLine.innerHTML = `<span class="term-hl">[AUDIO]:</span> Toggled 432Hz cosmic synthesizer. (State: ${synthPlaying ? 'Playing' : 'Muted'})`;
        }
        break;

      case 'time':
      case 'date':
      case 'clock':
        const now = new Date();
        const istTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true });
        const utcTime = now.toUTCString();
        resLine.innerHTML = `
<span class="term-hl">[LOCAL & UTC TIMESTAMP TELEMETRY]</span><br>
Local Time (IST): <b>${istTime}</b> (UTC+5:30)<br>
UTC Standard    : <b>${utcTime}</b>`;
        break;

      case 'ls':
      case 'dir':
        const fileList = Object.keys(VFS).map((f) => `<span class="term-cmd">${f}</span>`).join('&nbsp;&nbsp;&nbsp;&nbsp;');
        resLine.innerHTML = fileList;
        break;

      case 'cat':
        if (!args) {
          resLine.className = 'term-err';
          resLine.innerHTML = `Usage: <span class="term-cmd">cat &lt;filename&gt;</span> (e.g. cat about.txt)`;
        } else if (VFS[args.toLowerCase()]) {
          resLine.innerHTML = `<pre class="term-res" style="white-space: pre-wrap; font-family: monospace;">${VFS[args.toLowerCase()]}</pre>`;
        } else {
          resLine.className = 'term-err';
          resLine.innerHTML = `cat: ${args}: No such file. Type <span class="term-cmd">ls</span> for available files.`;
        }
        break;

      case 'echo':
        resLine.innerHTML = args || '';
        break;

      case 'matrix':
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
        let stream = '';
        for (let r = 0; r < 4; r++) {
          let line = '';
          for (let c = 0; c < 36; c++) {
            line += chars[Math.floor(Math.random() * chars.length)] + ' ';
          }
          stream += line + '<br>';
        }
        resLine.innerHTML = `<div class="term-matrix">${stream}</div><span class="term-hl">[MATRIX LINK INITIALIZED]</span>`;
        break;

      case 'history':
        if (cmdHistory.length === 0) {
          resLine.innerHTML = 'No command history recorded.';
        } else {
          resLine.innerHTML = cmdHistory.map((c, i) => `${i + 1}&nbsp;&nbsp;${c}`).join('<br>');
        }
        break;

      case 'bench':
      case 'benchmark':
      case 'gpu':
      case 'cuda':
        const t0 = performance.now();
        let sum = 0;
        const n = 1000000;
        for (let i = 0; i < n; i++) {
          sum += Math.sqrt(i) * Math.sin(i);
        }
        const t1 = performance.now();
        const duration = (t1 - t0).toFixed(2);
        const gflops = ((n * 4) / ((t1 - t0) * 1e6)).toFixed(3);
        resLine.innerHTML = `
<span class="term-hl">[CLIENT HARDWARE & COMPUTE BENCHMARK]</span><br>
Compute Vector : <b>1,000,000 FLOP Mathematical Matrix</b><br>
Kernel Latency : <span class="term-cmd">${duration} ms</span><br>
Throughput     : <span class="term-hl">${gflops} GFLOPs</span> (V8 / JIT Accelerated)<br>
Architecture   : High-Performance SIMD / CUDA Simulation Mode`;
        break;

      case 'specs':
      case 'hardware':
      case 'rigs':
      case 'fleet':
        resLine.innerHTML = `
<span class="term-hl">[BATTLESTATION & HARDWARE FLEET EVOLUTION]</span>
<div class="term-table">
  <div class="term-table-key"><span class="term-tag">#04 Primary</span></div><div class="term-table-val"><b>Ryzen 5 7600X &bull; RTX 5060 Ti 16GB &bull; 32GB DDR5 &bull; 1TB Gen4 SSD (Win 10/11)</b></div>
  <div class="term-table-key"><span class="term-tag">#03 Driver</span></div><div class="term-table-val"><b>MacBook Pro 14" &bull; Apple M1 Pro &bull; 16GB Unified &bull; 512GB (macOS 15)</b></div>
  <div class="term-table-key"><span class="term-tag">#02 Studio</span></div><div class="term-table-val"><b>iMac 27" 5K &bull; i5-8500 &bull; 48GB Expanded RAM &bull; Radeon Pro 570X (macOS 15)</b></div>
  <div class="term-table-key"><span class="term-muted">#01 Legacy</span></div><div class="term-table-val"><span class="term-muted">Dell Inspiron 15 &bull; i5 U-Series &bull; 16GB &bull; RX 570 &bull; Win 10 (Handed Down)</span></div>
  <div class="term-table-key"><span class="term-muted">#00 Spark</span></div><div class="term-table-val"><span class="term-muted">Patient Zero &bull; Core 2 Duo &bull; 4GB &bull; Win 7 (Retired - Water Damage)</span></div>
</div>
Type <span class="term-cmd">cat specs.txt</span> for full detailed logs.`;
        break;

      case 'sudo':
        resLine.className = 'term-err';
        resLine.innerHTML = `[SECURITY]: User 'shreyas' is not in the sudoers file. This incident has been logged and reported to Shreyas. 🛡️`;
        break;

      case 'theme':
        resLine.innerHTML = `Current Theme: <span class="term-hl">Deep Cosmic Space (Pure Dark)</span>. Light mode has been deprecated.`;
        break;

      case 'clear':
      case 'cls':
        terminalOutput.innerHTML = '';
        terminalInput.value = '';
        return;

      case 'exit':
      case 'quit':
        closeCli();
        terminalInput.value = '';
        return;

      default:
        resLine.className = 'term-err';
        resLine.innerHTML = `zsh: command not found: '${cmd}'. Type <span class="term-cmd">help</span> to view all available commands.`;
    }

    terminalOutput.appendChild(resLine);
    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    playClickSound(720, 0.03);
  }

  if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleTerminalCommand(terminalInput.value);
    });
  }



  /* ==========================================================================
     8. WEB AUDIO DEEP SPACE SYNTHESIZER
     ========================================================================== */
  let synthCtx = null;
  let synthPlaying = false;
  let mainGain = null;

  const audioBento = document.querySelector('.audio-bento');
  const synthToggleBtn = document.getElementById('synthToggleBtn');
  const synthIcon = document.getElementById('synthIcon');
  const synthText = document.getElementById('synthText');

  function initSpaceSynth() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    synthCtx = new AudioContext();

    mainGain = synthCtx.createGain();
    mainGain.gain.setValueAtTime(0.001, synthCtx.currentTime);
    mainGain.connect(synthCtx.destination);

    const freqs = [65.41, 98.0, 130.81, 164.81];
    freqs.forEach((f) => {
      const osc = synthCtx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, synthCtx.currentTime);

      const filter = synthCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, synthCtx.currentTime);

      const lfo = synthCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.15, synthCtx.currentTime);
      const lfoGain = synthCtx.createGain();
      lfoGain.gain.setValueAtTime(100, synthCtx.currentTime);

      lfo.connect(filter.frequency);
      osc.connect(filter);
      filter.connect(mainGain);

      osc.start();
      lfo.start();
    });
  }

  if (synthToggleBtn) {
    synthToggleBtn.addEventListener('click', () => {
      if (!synthCtx) initSpaceSynth();

      if (synthCtx.state === 'suspended') synthCtx.resume();

      if (!synthPlaying) {
        mainGain.gain.linearRampToValueAtTime(0.12, synthCtx.currentTime + 1.2);
        synthPlaying = true;
        if (audioBento) audioBento.classList.add('playing');
        if (synthText) synthText.innerText = 'Pause Space Synth';
        if (synthIcon) synthIcon.setAttribute('data-lucide', 'pause');
      } else {
        mainGain.gain.linearRampToValueAtTime(0.0001, synthCtx.currentTime + 0.6);
        synthPlaying = false;
        if (audioBento) audioBento.classList.remove('playing');
        if (synthText) synthText.innerText = 'Play Space Drone';
        if (synthIcon) synthIcon.setAttribute('data-lucide', 'play');
      }

      if (window.lucide) window.lucide.createIcons();
    });
  }

  /* ==========================================================================
     9. SYNTHESIZED MICRO-SOUND FX
     ========================================================================== */
  let sfxCtx = null;
  function playClickSound(freq = 880, dur = 0.04) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!sfxCtx) sfxCtx = new AudioContext();
      if (sfxCtx.state === 'suspended') sfxCtx.resume();

      const osc = sfxCtx.createOscillator();
      const gain = sfxCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, sfxCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, sfxCtx.currentTime + dur);

      gain.gain.setValueAtTime(0.04, sfxCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, sfxCtx.currentTime + dur);

      osc.connect(gain);
      gain.connect(sfxCtx.destination);
      osc.start();
      osc.stop(sfxCtx.currentTime + dur);
    } catch (e) {}
  }

  document.querySelectorAll('.control-btn, .tag-chip, .tech-custom-card, .link-card').forEach((el) => {
    el.addEventListener('click', () => playClickSound(640, 0.05));
  });

  /* ==========================================================================
     10. LIVE CLOCK TELEMETRY
     ========================================================================== */
  const localTimeEl = document.getElementById('localTime');
  function updateTime() {
    if (!localTimeEl) return;
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    localTimeEl.innerText = now.toLocaleTimeString('en-US', options) + ' IST';
  }
  updateTime();
  setInterval(updateTime, 1000);

  document.documentElement.setAttribute('data-theme', 'dark');

  /* ==========================================================================
     11. 3D REAL-TIME WEBGL MINECRAFT AVATAR
     ========================================================================== */
  const skinCanvas = document.getElementById('skinCanvas');
  const btn3dRotate = document.getElementById('btn3dRotate');
  const btn3dAnim = document.getElementById('btn3dAnim');
  const btn3dReset = document.getElementById('btn3dReset');

  let isAutoRotate = true;
  let isWalking = true;

  // --- MINECRAFT 3D (skinview3d WebGL Engine) ---
  let skinViewer = null;

  function initMinecraft3D() {
    if (!skinCanvas) return;
    
    function load3D() {
      if (!window.skinview3d) {
        setTimeout(load3D, 100);
        return;
      }
      try {
        const stage = document.getElementById('char3dStage') || skinCanvas.parentElement;
        const rect = stage ? stage.getBoundingClientRect() : { width: 340, height: 300 };
        const w = Math.max(280, Math.floor(rect.width || 340));
        const h = Math.max(260, Math.floor(rect.height || 300));

        skinViewer = new skinview3d.SkinViewer({
          canvas: skinCanvas,
          width: w,
          height: h
        });

        skinViewer.camera.position.set(0, 5, 42);
        skinViewer.autoRotate = isAutoRotate;
        skinViewer.autoRotateSpeed = 1.2;

        skinViewer.loadSkin('https://minotar.net/skin/Echo_Blade').catch(() => {
          skinViewer.loadSkin('https://mineskin.eu/skin/Echo_Blade').catch(() => {
            skinViewer.loadSkin('https://mc-heads.net/skin/Echo_Blade');
          });
        });

        if (window.skinview3d.WalkingAnimation) {
          skinViewer.animation = new skinview3d.WalkingAnimation();
          skinViewer.animation.speed = 0.9;
        }
        if (btn3dAnim) btn3dAnim.classList.add('active');

        window.addEventListener('resize', () => {
          if (stage && skinViewer) {
            const r = stage.getBoundingClientRect();
            if (r.width && r.height) {
              skinViewer.setSize(Math.floor(r.width), Math.floor(r.height));
            }
          }
        });
      } catch (err) {
        console.warn('Minecraft 3D WebGL init notice:', err);
      }
    }

    load3D();
  }

  // 3D Control Pill Buttons
  if (btn3dRotate) {
    btn3dRotate.addEventListener('click', () => {
      isAutoRotate = !isAutoRotate;
      btn3dRotate.classList.toggle('active', isAutoRotate);
      if (skinViewer) skinViewer.autoRotate = isAutoRotate;
      playClickSound(550, 0.04);
    });
  }

  if (btn3dAnim) {
    btn3dAnim.addEventListener('click', () => {
      isWalking = !isWalking;
      btn3dAnim.classList.toggle('active', isWalking);
      if (skinViewer) {
        if (isWalking) {
          if (window.skinview3d && window.skinview3d.WalkingAnimation) {
            skinViewer.animation = new skinview3d.WalkingAnimation();
            skinViewer.animation.speed = 0.9;
          }
        } else {
          skinViewer.animation = null;
        }
      }
      playClickSound(580, 0.04);
    });
  }

  if (btn3dReset) {
    btn3dReset.addEventListener('click', () => {
      if (skinViewer) {
        skinViewer.camera.position.set(0, 5, 42);
        skinViewer.camera.rotation.set(0, 0, 0);
      }
      playClickSound(480, 0.04);
    });
  }

  // Initialize Engines & Fetch Live Assets
  setTimeout(() => {
    initMinecraft3D();
  }, 100);

  /* ==========================================================================
     12. QR CODE & TOAST CLIPBOARD
     ========================================================================== */
  const qrModal = document.getElementById('qrModal');
  const shareBtn = document.getElementById('shareBtn');
  const openQrBtn = document.getElementById('openQrBtn');
  const closeQrModalBtn = document.getElementById('closeQrModalBtn');
  const modalCopyBtn = document.getElementById('modalCopyBtn');
  const copyBioBtn = document.getElementById('copyBioBtn');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');

  let qrCreated = false;

  function openQrModal() {
    if (!qrCreated && window.QRCode) {
      const qrcodeContainer = document.getElementById('qrcode');
      if (qrcodeContainer) {
        qrcodeContainer.innerHTML = '';
        new QRCode(qrcodeContainer, {
          text: window.location.href || 'https://shreyasloveschess.netlify.app',
          width: 170,
          height: 170,
          colorDark: '#04040E',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H,
        });
        qrCreated = true;
      }
    }
    if (qrModal) {
      qrModal.classList.add('active');
      qrModal.setAttribute('aria-hidden', 'false');
    }
    playClickSound(500, 0.05);
  }

  function closeQrModal() {
    if (qrModal) {
      qrModal.classList.remove('active');
      qrModal.setAttribute('aria-hidden', 'true');
    }
  }

  function showToast(msg = 'Link copied to clipboard!') {
    if (!toast) return;
    if (toastText) toastText.innerText = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2500);
  }

  function copyUrl() {
    const url = window.location.href || 'https://shreyasloveschess.netlify.app';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Bio link copied to clipboard!');
        playClickSound(880, 0.06);
      }).catch(() => showToast('URL copied!'));
    } else {
      showToast('URL copied!');
    }
  }

  /* ==========================================================================
     13. LIVE GITHUB REPOSITORIES TELEMETRY
     ========================================================================== */
  async function fetchGitHubRepos() {
    const repoGrid = document.getElementById('githubRepoGrid');
    if (!repoGrid) return;

    try {
      const res = await fetch('https://api.github.com/users/echo-ilovech3ss/repos?sort=updated&per_page=4');
      if (!res.ok) return;
      const repos = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) return;

      const langMap = {
        JavaScript: { class: 'js-dot', name: 'JavaScript' },
        Python: { class: 'py-dot', name: 'Python' },
        Rust: { class: 'rust-dot', name: 'Rust' },
        'C++': { class: 'cpp-dot', name: 'C++' },
        Makefile: { class: 'rust-dot', name: 'Rust / Shell' },
      };

      const curatedDescriptions = {
        'lite-wa': 'Fast single-session WhatsApp automation REST API with live dark QR dashboard & Docker.',
        'Fetchr': 'Modern high-performance media downloading & GPU transcoding desktop app built in Rust & Tauri.',
        'predictor': 'AlphaPredict — Quantitative market prediction & paper-trading engine with ML ensembles & Streamlit cockpit.',
        'conjunction': 'Custom Arch Linux ISO distribution builder & system sync toolsuite with Rust core & automation scripts.'
      };

      const html = repos.map((repo) => {
        let langInfo = langMap[repo.language] || { class: 'js-dot', name: repo.language || 'Code' };
        if (repo.name === 'conjunction') {
          langInfo = { class: 'rust-dot', name: 'Rust / Shell' };
        }
        const desc = curatedDescriptions[repo.name] || repo.description || 'Open source codebase and high-performance module.';
        return `
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card">
            <div class="repo-card-top">
              <div class="repo-name-row">
                <svg viewBox="0 0 24 24" fill="none" class="repo-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" stroke="currentColor" stroke-width="1.8"/></svg>
                <span class="repo-name">${repo.name}</span>
              </div>
              <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
            </div>
            <p class="repo-desc">${desc}</p>
            <div class="repo-meta-row">
              <span class="repo-lang"><span class="lang-dot ${langInfo.class}"></span>${langInfo.name}</span>
              <span class="repo-stars"><i data-lucide="star"></i> ${repo.stargazers_count}</span>
              <span class="repo-forks"><i data-lucide="git-fork"></i> ${repo.forks_count}</span>
            </div>
          </a>
        `;
      }).join('');

      repoGrid.innerHTML = html;
      if (window.lucide) window.lucide.createIcons();
    } catch (e) {
      // Keep static graceful fallback
    }
  }
  fetchGitHubRepos();

  if (shareBtn) shareBtn.addEventListener('click', openQrModal);
  if (openQrBtn) openQrBtn.addEventListener('click', openQrModal);
  if (closeQrModalBtn) closeQrModalBtn.addEventListener('click', closeQrModal);
  if (modalCopyBtn) modalCopyBtn.addEventListener('click', copyUrl);
  if (copyBioBtn) copyBioBtn.addEventListener('click', copyUrl);

  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) closeQrModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQrModal();
      closeCli();
    }
  });
});
