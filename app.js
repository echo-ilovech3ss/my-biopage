document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const DISCORD_ID = '1247679900165341322';
  const avatar = document.getElementById('discordAvatar');
  const statusDot = document.getElementById('discordStatusDot');

  const showPresence = data => {
    if (!data) return;
    const { discord_status, discord_user } = data;
    if (avatar && discord_user && discord_user.avatar) {
      const ext = discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
      avatar.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${discord_user.avatar}.${ext}?size=128`;
    }
    if (statusDot) {
      statusDot.className = `status-indicator ${discord_status || 'offline'}`;
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
});
