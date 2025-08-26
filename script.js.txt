// 🌿 Base real strain names
const realStrains = [
  "Blue Dream", "Wedding Cake", "Gorilla Glue", "Pineapple Express", "Zkittlez",
  "Sour Diesel", "Lemon Haze", "Granddaddy Purple", "Mac 1", "Alien OG"
];

// 🎭 Weird mutation endings
const weirdEndings = [
  "Explosion", "Meme", "Funk", "Snake", "Quake",
  "Slap", "Zone", "Soup", "Gasoline", "Yeti"
];

// 💬 Fake strain descriptions
const fakeDescriptions = [
  "Tastes like fruit roll-ups and regret.",
  "Delivers giggles, munchies, and sudden life clarity.",
  "Like a nap in a neon beanbag chair.",
  "The kind of high that makes grass fascinating.",
  "Packs a smooth punch to your pineal gland.",
  "Perfect for deep thoughts and deep couch lock.",
  "Mild paranoia meets mint chocolate vibes.",
  "Melts your bones but not your mood.",
  "Designed for watching clouds, not answering texts.",
  "Screams ‘Saturday morning cartoons at 2 AM’."
];

// 🔥 Generate a new strain and description
function generateStrain() {
  const base = realStrains[Math.floor(Math.random() * realStrains.length)];
  const part1 = base.split(" ")[0];
  const part2 = weirdEndings[Math.floor(Math.random() * weirdEndings.length)];
  const newName = `${part1} ${part2}`;

  const desc = fakeDescriptions[Math.floor(Math.random() * fakeDescriptions.length)];

  document.getElementById("strain-box").innerText = `🔥 ${newName}`;
  document.getElementById("strain-desc").innerText = desc;
}

// 🚬 Share the strain (mobile-friendly)
function shareStrain() {
  const strain = document.getElementById("strain-box").innerText;
  const desc = document.getElementById("strain-desc").innerText;

  if (navigator.share) {
    navigator
      .share({
        title: "StrainName Generator",
        text: `${strain}\n${desc} 💨`,
        url: window.location.href,
      })
      .catch((err) => console.error("Share failed:", err));
  } else {
    alert("Sharing not supported on this device.");
  }
}

// 🔊 Music Track List
const tracks = [
  "music/8 Sanctuary (Mastered).mp3",
  "music/Hit It Baby (Final).mp3"
];

let currentTrack = 0;

// ⏭️ Rotate to the next track on end
function playNextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  const audio = document.getElementById("bg-audio");
  const source = document.getElementById("audio-source");
  source.src = tracks[currentTrack];
  audio.load();
  audio.play();
}

// 🔁 Attach event listener to auto-switch tracks
document.getElementById("bg-audio").addEventListener("ended", playNextTrack);
