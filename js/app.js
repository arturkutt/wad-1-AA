//const ENDPOINT = "https://my-json-server.typicode.com/arturkutt/json-api/posts"; // <- väljast  for MyJSONServer
const ENDPOINT = "data/posts.json"; // <- lokaalne JSON fail(for local json)

// Dropdown (avatar) avamine-sulgemine
const profile = document.querySelector(".profile");
const avatarBtn = document.getElementById("avatarBtn");
const profileMenu = document.getElementById("profileMenu");
if (avatarBtn && profileMenu) {
  avatarBtn.addEventListener("click", (e) => {
    e.preventDefault();
    profileMenu.classList.toggle("show");
  });
  document.addEventListener("click", (e) => {
    if (!profile.contains(e.target)) profileMenu.classList.remove("show");
  });
}

// Postide laadimine ja renderdamine
const feed = document.getElementById("feed");

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function renderPost(p) {
  const post = document.createElement("div");
  post.className = "post";

  const header = document.createElement("div");
  header.className = "post-header";
  const left = document.createElement("div");
  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = "src/images/userAvatar.png";
  avatar.alt = "avatar";
  left.appendChild(avatar);

  const date = document.createElement("span");
  date.className = "date";
  date.textContent = formatDate(p.createdAt);

  header.append(left, date);

  const content = document.createElement("div");
  content.className = "post-content";
  if (p.image) {
    const img = document.createElement("img");
    img.className = "post-image";
    img.src = p.image;
    img.alt = "post image";
    content.appendChild(img);
  }
  const text = document.createElement("p");
  text.textContent = p.text;
  content.appendChild(text);

  const footer = document.createElement("div");
  footer.className = "post-footer";
  const like = document.createElement("img");
  like.src = "src/images/thumbs-up.png";
  like.alt = "Like";
  like.className = "thumbs-up";
  footer.appendChild(like);

  post.append(header, content, footer);
  return post;
}

async function load() {
  try {
    const res = await fetch(ENDPOINT);
    const data = await res.json();
    // puhasta ja lisa
    feed.innerHTML = "";
    data.posts.forEach(p => feed.appendChild(renderPost(p))); // see käib lokaalse JSON faili jaoks
    //data.forEach(p => feed.appendChild(renderPost(p))); // MyJSONServer -> data on juba array -- see käib MyJSONServer jaoks
  } catch (e) {
    console.error("Postide laadimine ebaõnnestus:", e);
    feed.innerHTML = "<p>Could not load posts. Check endpoint or CORS.</p>";
  }
}



if (feed) load();
