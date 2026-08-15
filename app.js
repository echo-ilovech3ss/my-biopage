document.addEventListener('DOMContentLoaded', () => {
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
