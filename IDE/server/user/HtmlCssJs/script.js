const btn = document.querySelector('#counterBtn');
const clickCountElement = document.getElementById('clickCount');
 const lastClickElement = document.getElementById('lastClick');
const avgIntervalElement = document.getElementById('avgInterval');
const terminal = document.getElementById('terminal');
        
let count = 0;
let lastClickTime = null;
let totalInterval = 0;
let clickTimes = [];

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function addTerminalLine(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}btn.addEventListener("click", () => {
    // Handle counter
    count++;
    btn.textContent = `Count - ${count}`;
            
    // Update stats
    clickCountElement.textContent = count;
            
    const now = new Date();
    lastClickElement.textContent = formatTime(now);
            
    // Calculate timing intervals
    if (lastClickTime) {
        const interval = now - lastClickTime;
        clickTimes.push(interval);
        totalInterval += interval;
                
        const avg = Math.round(totalInterval / clickTimes.length);
        avgIntervalElement.textContent = avg;
                
        addTerminalLine(`// Click ${count}: Interval ${interval}ms`);
    } else {
        addTerminalLine(`// First click registered at ${formatTime(now)}`);
           }
            
    lastClickTime = now;
            
    // Button animation
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 100);
        });

// Initial terminal message
const initDate = new Date();
addTerminalLine(`// Session started: ${formatTime(initDate)}`);