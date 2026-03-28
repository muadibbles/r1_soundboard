// ── State ──────────────────────────────────────────────────
const board = document.getElementById("soundboard");
let activeAudio = null;   // currently playing Audio object
let selectedIndex = 0;    // which button is highlighted by scroll wheel
let buttons = [];         // all button DOM elements

// ── Build buttons ──────────────────────────────────────────
SOUNDS.forEach(({ label, file }, i) => {
  const btn = document.createElement("button");
  btn.className = "sound-btn";
  btn.textContent = label;
  btn.dataset.file = file;

  // Tap / click to play
  btn.addEventListener("click", () => {
    selectedIndex = i;
    updateSelection();
    playSound(file, btn);
  });

  board.appendChild(btn);
  buttons.push(btn);
});

// Highlight the first button on load
updateSelection();

// ── Play a sound ───────────────────────────────────────────
function playSound(file, btn) {
  // Stop whatever is currently playing
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }

  // Clear all playing states
  buttons.forEach(b => b.classList.remove("playing"));

  const audio = new Audio(file);
  activeAudio = audio;

  audio.play().catch(() => {
    btn.classList.add("error");
    btn.title = "Audio file not found";
  });

  btn.classList.add("playing");
  audio.addEventListener("ended", () => btn.classList.remove("playing"));
}

// ── Selection highlight ─────────────────────────────────────
function updateSelection() {
  buttons.forEach((b, i) => {
    b.classList.toggle("selected", i === selectedIndex);
  });

  // Scroll the selected button into view
  buttons[selectedIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

// ── R1 Hardware: scroll wheel navigates the list ───────────
window.addEventListener("scrollUp", () => {
  // Scroll up = move selection UP (lower index)
  if (selectedIndex > 0) {
    selectedIndex--;
    updateSelection();
  }
});

window.addEventListener("scrollDown", () => {
  // Scroll down = move selection DOWN (higher index)
  if (selectedIndex < buttons.length - 1) {
    selectedIndex++;
    updateSelection();
  }
});

// ── R1 Hardware: side button (PTT) plays selected sound ────
window.addEventListener("sideClick", () => {
  const btn = buttons[selectedIndex];
  if (btn) {
    playSound(btn.dataset.file, btn);
  }
});

// ── R1 Hardware: long press stops playback ─────────────────
window.addEventListener("longPressStart", () => {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    buttons.forEach(b => b.classList.remove("playing"));
    activeAudio = null;
  }
});
