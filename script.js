/* === BLOQUEO Y CARGA === */
const lockScreen = document.getElementById("lockScreen");
const loadingScreen = document.getElementById("loadingScreen");
const gallery = document.querySelector(".gallery-container");
const tickets = document.querySelector(".ticket-machine");
const passwordDisplay = document.getElementById("passwordDisplay");
const keypadButtons = document.querySelectorAll(".keypad button");
const bgMusic = document.getElementById("bgMusic");

let enteredPassword = "";
const correctPassword = "26022004";

/* === Mostrar/Ocultar Contraseña === */
const toggleBtn = document.getElementById("togglePasswordBtn");
toggleBtn.addEventListener("click", () => {
    if (passwordDisplay.textContent.includes("•")) {
        passwordDisplay.textContent = enteredPassword || "";
        toggleBtn.textContent = "Ocultar Contraseña";
    } else {
        passwordDisplay.textContent = "•".repeat(enteredPassword.length || 8);
        toggleBtn.textContent = "Mostrar Contraseña";
    }
});

/* Mensaje dinámico y cambio de imagen */
const dynamicMessage = document.getElementById("dynamicMessage");
const lockImage = document.getElementById("lockImage");

/* Comprobar contraseña */
function checkPassword() {
    if (enteredPassword === correctPassword) {
        bgMusic.currentTime = 0;
        bgMusic.play();

        lockScreen.style.display = "none";
        loadingScreen.style.display = "flex";
        document.querySelector(".progress-fill").style.width = "100%";

        setTimeout(() => {
            loadingScreen.style.display = "none";
            gallery.style.display = "block";
            tickets.style.display = "flex";
        }, 3000);
    } else {
        lockImage.src = "intentalo de nuevo.gif";
        dynamicMessage.style.display = "block";
        dynamicMessage.textContent = "¡Inténtalo otra vez! 💖🌸✨";

        passwordDisplay.textContent = "❌ Error";
        enteredPassword = "";

        setTimeout(() => {
            passwordDisplay.textContent = "••••••••";
            dynamicMessage.style.display = "none";
            lockImage.src = "portada.gif";
        }, 1500);
    }
}

/* Botones virtuales del keypad */
keypadButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const val = btn.textContent;
        if (!isNaN(val)) {
            if (enteredPassword.length < 8) {
                enteredPassword += val;
                passwordDisplay.textContent = "•".repeat(enteredPassword.length);
            }
        } else if (val === "Borrar") {
            enteredPassword = enteredPassword.slice(0, -1);
            passwordDisplay.textContent = enteredPassword ? "•".repeat(enteredPassword.length) : "••••••••";
        } else if (val === "Enter") {
            checkPassword();
        }
    });
});

/* Teclado físico */
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) && e.key !== " ") {
        if (enteredPassword.length < 8) {
            enteredPassword += e.key;
            passwordDisplay.textContent = "•".repeat(enteredPassword.length);
        }
    } else if (e.key === "Backspace") {
        enteredPassword = enteredPassword.slice(0, -1);
        passwordDisplay.textContent = enteredPassword ? "•".repeat(enteredPassword.length) : "••••••••";
    } else if (e.key === "Enter") {
        // Solo ejecutar si estamos en la pantalla de bloqueo
        if (lockScreen.style.display !== "none") {
            checkPassword();
        }
    }
});


/* === TICKETS === */
const loveReasons = [
    "TONTA YO NUNCA TE VOY A DEJAR DE AMAAAAR.....💖💖",
    "De todas las historias que he vivido, la nuestra es mi favorita",
    "No sé cómo lo haces, pero me conviertes en una mejor versión de mí mismo✨.",
    "No importa a dónde vaya, mi hogar siempre estará donde estés tú✨.",
    "!No necesito buscar la felicidad en otro lugar, porque la encuentro cada vez que te miro.💖👀",
    "Gracias por amarme tal y como soy, con mis locuras y mis rarezas. Eres mi persona favorita para ser yo mismo.✨",
    "Te amo 💖 Y nunca voy a dejar de hacerlo✨.",
    "Te amo como los patos patodalavida 🦆.",
    "Contigo quiero todo… excepto la cuenta del restaurante✨.",
    "Eres la única persona con la que quiero ser un desastre y, aún así, sentirme perfecto.💖."
];

const cuteEmojis = ["🌸","🐻","🐰","💖","✨","🐥","🦊","🌼","🐶","🐱"];
let ticketCount = 0;
let lastTicket = null;
let pulledTicket = null;

document.getElementById('generateTicketBtn').addEventListener('click', () => {
    const ticketList = document.getElementById('ticket-list');
    const randomReason = loveReasons[Math.floor(Math.random() * loveReasons.length)];
    const randomEmoji = cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];
    ticketCount++;

    const newTicket = document.createElement('div');
    newTicket.classList.add('love-ticket');

    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });

    newTicket.innerHTML = `
        <div class="emoji">${randomEmoji}</div>
        <h3>Recibo de Amor</h3>
        <p><strong>Razón #${ticketCount}</strong></p>
        <p>"${randomReason}"</p>
        <div class="emoji">${randomEmoji}</div>
        <div class="date">Emitido el ${formattedDate}</div>
    `;

    ticketList.prepend(newTicket);

    // Eliminar ticket anterior si existe
    if (pulledTicket) pulledTicket.remove();

    // Permitir "jalar" ticket
    newTicket.onmousedown = function(e) {
        e.preventDefault();
        newTicket.style.maxHeight = '320px';
        newTicket.style.position = 'relative';
        newTicket.style.zIndex = 1000;
        const pulledArea = document.getElementById('pulled-ticket-area');
        pulledArea.appendChild(newTicket);
        pulledTicket = newTicket;
        lastTicket = null;
    };

    newTicket.ondragstart = function() { return false; };
});

/* === MÚSICA === */
const musicBtn = document.getElementById("musicControlBtn");
const volumeSlider = document.getElementById("volumeSlider");

let isPlaying = false;
musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
        bgMusic.play();
        musicBtn.textContent = "🔊";
    } else {
        bgMusic.pause();
        musicBtn.textContent = "🔈";
    }
    isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", (e) => {
    bgMusic.volume = e.target.value / 100;
});

/* Cursor personalizado */
document.addEventListener("mousedown", () => {
    document.body.style.cursor = "url('click mouse.png') 16 16, auto";
});

document.addEventListener("mouseup", () => {
    document.body.style.cursor = "url('mouse.png') 16 16, auto";
});

/* === POPUPS, CARTAS Y VIDEOS === */
document.addEventListener('DOMContentLoaded', () => {

    // Popup carta
    const trigger = document.getElementById("batmanSpiderman");
    const popup = document.getElementById("popupCarta");
    const closeBtnCarta = document.getElementById("closeCartaBtn");

    if (trigger) {
        trigger.style.cursor = "pointer";
        trigger.addEventListener("click", () => {
            popup.style.display = "flex";
            popup.setAttribute("aria-hidden", "false");
        });
    }

    if (closeBtnCarta) {
        closeBtnCarta.addEventListener("click", () => {
            popup.style.display = "none";
            popup.setAttribute("aria-hidden", "true");
        });
    }

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
            popup.setAttribute("aria-hidden", "true");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && popup.style.display === "flex") {
            popup.style.display = "none";
            popup.setAttribute("aria-hidden", "true");
        }
    });

    // Zoom carta
    const zoomBtn = document.getElementById("zoomCartaBtn");
    const cartaImagen = document.getElementById("cartaImagen");
    let zoomed = false;

    zoomBtn.addEventListener("click", () => {
        if (!zoomed) {
            cartaImagen.style.transform = "scale(1.5)";
            cartaImagen.style.transition = "transform 0.3s ease";
            zoomed = true;
        } else {
            cartaImagen.style.transform = "scale(1)";
            cartaImagen.style.transition = "transform 0.3s ease";
            zoomed = false;
        }
    });
        });

    

  // Modal videos
const modalVideo = document.getElementById('modal-video');
const videoPlayer = document.getElementById('video-player');
const closeVideoBtn = document.getElementById('closeVideoBtn');

const imgDoraemon = document.getElementById('img-doraemon');
const imgChimuelo = document.getElementById('img-chimuelo');
const imgHarry = document.querySelector("img[alt='Harry Potter Chibi']");
const imgSnoopy = document.querySelector("img[alt='Snoopy y Woodstock']");

function abrirVideo(src) {
    if (imgDoraemon) imgDoraemon.style.visibility = 'hidden';
    if (imgChimuelo) imgChimuelo.style.visibility = 'hidden';
    if (imgHarry) imgHarry.style.visibility = 'hidden';
    if (imgSnoopy) imgSnoopy.style.visibility = 'hidden';

    bgMusic.pause();

    videoPlayer.src = src;
    videoPlayer.currentTime = 0;
    modalVideo.style.display = "flex";

    videoPlayer.play().catch(() => {
        videoPlayer.muted = true;
        videoPlayer.play();
    });

    videoPlayer.onended = () => cerrarVideo();
}

function cerrarVideo() {
    videoPlayer.pause();
    videoPlayer.src = "";
    modalVideo.style.display = "none";

    if (imgDoraemon) imgDoraemon.style.visibility = 'visible';
    if (imgChimuelo) imgChimuelo.style.visibility = 'visible';
    if (imgHarry) imgHarry.style.visibility = 'visible';
    if (imgSnoopy) imgSnoopy.style.visibility = 'visible';

    bgMusic.play().catch(() => {});
}

closeVideoBtn.addEventListener('click', cerrarVideo);
modalVideo.addEventListener('click', (e) => { if (e.target === modalVideo) cerrarVideo(); });
document.addEventListener('keydown', (e) => { if (e.key === "Escape" && modalVideo.style.display === "flex") cerrarVideo(); });

if (imgDoraemon) imgDoraemon.addEventListener('click', () => abrirVideo("videomanga.mp4"));
if (imgChimuelo) imgChimuelo.addEventListener('click', () => abrirVideo("videoflores.mp4"));
if (imgHarry) imgHarry.addEventListener('click', () => abrirVideo("cafe.mp4"));
if (imgSnoopy) imgSnoopy.addEventListener('click', () => abrirVideo("Snowman.mp4"));

/* === ROMPECABEZAS === */
document.addEventListener('DOMContentLoaded', () => {
    const stichGalleryImg = document.querySelector(".image-frame img[src='stich.jpeg']") || document.querySelector(".image-frame img[alt='Stich']") || document.querySelector("img[alt='Stich']");

    const puzzleModal = document.getElementById('puzzleModal');
    const closePuzzleBtn = document.getElementById('closePuzzle');
    const puzzleBoard = document.getElementById('puzzleBoard');
    const playVideoBtn = document.getElementById('playVideoBtn');
    const puzzleVideo = document.getElementById('puzzleVideo');

    const ROWS = 4, COLS = 4, PIECE_SIZE = 100, BOARD_SIZE = PIECE_SIZE * COLS;
    let draggedPiece = null;

    if (stichGalleryImg) {
        stichGalleryImg.style.cursor = 'pointer';
        stichGalleryImg.addEventListener('click', () => {
            puzzleModal.style.display = 'flex';
            createPuzzle();
        });
    }

    closePuzzleBtn.addEventListener('click', closeModal);
    puzzleModal.addEventListener('click', (e) => { if (e.target === puzzleModal) closeModal(); });

    function closeModal() {
        puzzleModal.style.display = 'none';
        puzzleBoard.innerHTML = '';
        playVideoBtn.style.display = 'none';
        puzzleVideo.pause();
        puzzleVideo.currentTime = 0;
        puzzleVideo.style.display = 'none';
        puzzleBoard.style.display = 'grid';
    }

    function createPuzzle() {
        puzzleBoard.innerHTML = '';
        puzzleVideo.style.display = 'none';
        playVideoBtn.style.display = 'none';
        puzzleBoard.style.display = 'grid';
        puzzleBoard.style.width = BOARD_SIZE + 'px';
        puzzleBoard.style.height = BOARD_SIZE + 'px';

        const pieces = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece';
                piece.style.backgroundPosition = `-${c * PIECE_SIZE}px -${r * PIECE_SIZE}px`;
                piece.dataset.correctIndex = (r * COLS + c).toString();
                piece.draggable = true;

                piece.addEventListener('dragstart', dragStart);
                piece.addEventListener('dragover', dragOver);
                piece.addEventListener('drop', drop);
                piece.addEventListener('dragend', () => { draggedPiece = null; });

                pieces.push(piece);
            }
        }

        shuffleArray(pieces);
        pieces.forEach(p => puzzleBoard.appendChild(p));
    }

    function dragStart(e) {
        draggedPiece = e.target;
        try { e.dataTransfer.setData('text/plain', ''); } catch (err) {}
    }

    function dragOver(e) { e.preventDefault(); }

    function drop(e) {
        e.preventDefault();
        const target = e.target;
        if (!target || target === draggedPiece || !target.classList.contains('puzzle-piece')) return;
        swapNodes(draggedPiece, target);
        checkPuzzleSolved();
    }

    function swapNodes(a, b) {
        const parent = a.parentNode;
        const aNext = a.nextSibling === b ? a : a.nextSibling;
        parent.insertBefore(a, b);
        parent.insertBefore(b, aNext);
    }

    function checkPuzzleSolved() {
        const children = Array.from(puzzleBoard.children);
        const solved = children.every((child, idx) => Number(child.dataset.correctIndex) === idx);
        if (solved) playVideoBtn.style.display = 'inline-block';
    }

    playVideoBtn.addEventListener('click', () => {
        puzzleBoard.style.display = 'none';
        playVideoBtn.style.display = 'none';
        puzzleVideo.style.display = 'block';
        puzzleVideo.currentTime = 0;
        puzzleVideo.play().catch(() => {});
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
const chatModal = document.getElementById("chatModal");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chatVideo = document.getElementById("chatVideo");
const closeChatBtn = document.getElementById("closeChatBtn");
const gatoImg = document.getElementById("gatoImg");

let step = 0;
let userName = "";
let userNumber = "";

// Añadir mensaje
function addMessage(content, sender="bot", isImage=false){
  const msg = document.createElement("div");
  msg.className = `chat-msg ${sender}`;
  if(isImage){
    const img = document.createElement("img");
    img.src = content;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "10px";
    img.style.marginTop = "5px";
    msg.appendChild(img);
  } else {
    msg.textContent = content;
  }
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Botón siguiente bonito
function addNextButton(step){
  const btn = document.createElement("button");
  btn.className = "next-btn";
  btn.textContent = "Siguiente ➜";
  btn.setAttribute("data-step", step);
  chatMessages.appendChild(btn);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Estrellas
function lanzarEstrellas(){
  for(let i=0;i<50;i++){
    const estrella = document.createElement("img");
    estrella.src="estrella.png";
    estrella.className="estrella";
    estrella.style.left=Math.random()*window.innerWidth+"px";
    estrella.style.top=Math.random()*window.innerHeight/2+"px";
    estrella.style.animationDuration=(2+Math.random()*3)+"s";
    estrella.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(estrella);
    setTimeout(()=>estrella.remove(),4000);
  }
}

// Abrir chat sin cambiar el gato
gatoImg.addEventListener("click", ()=>{
  chatModal.style.display = "flex";
  step = 0;
  chatMessages.innerHTML = "";
  chatVideo.style.display = "none";
  addMessage("¿Hola, cuál es tu nombre?");
});

// Función enviar
function sendMessage(){
  const text = chatInput.value.trim();
  if(!text) return;
  addMessage(text,"user");
  chatInput.value = "";

  switch(step){
    case 0:
      userName = text;
      setTimeout(()=>addMessage("¿Piensa un número?"),500);
      step=1;
      break;
    case 1:
      userNumber = text;
      setTimeout(()=>addMessage("Felicidades, ahora tienes un virus 😈"),500);
      setTimeout(()=>addMessage("mago.jpg","bot",true),800);
      setTimeout(()=>addMessage("¿Quieres eliminarlo? Escribe 'XD' en mayúsculas para que el consejo decida"),1000);
      step=2;
      break;
    case 2:
      if(text==="XD"){
        chatVideo.src="michis.gram.mp4";
        chatVideo.style.display="block";
        chatVideo.play();
        chatVideo.onended = ()=>{
          chatVideo.style.display="none";
          addMessage("El consejo ha decidido que des un beso en la pantalla para eliminar el virus");
          addNextButton("virus");
        };
        step=3;
      }
      break;
  }
}

// Flujo botones siguiente
document.addEventListener("click", function(e){
  if(e.target.classList.contains("next-btn")){
    let stepBtn = e.target.getAttribute("data-step");

    if(stepBtn === "virus"){
      addMessage("Ya lo diste, no me mientas, dalo otra vez");
      addMessage("gato ceja.jpeg","bot",true);
      e.target.remove();
      addNextButton("reveal");
    }

    else if(stepBtn === "reveal"){
      addMessage(`${userName}, tu número es ${userNumber}`);
      addMessage("mago magia.jpg","bot",true);
      lanzarEstrellas();
      e.target.remove();
    }
  }
});

sendBtn.addEventListener("click",sendMessage);
chatInput.addEventListener("keydown",(e)=>{ if(e.key==="Enter") sendMessage(); });
closeChatBtn.addEventListener("click",()=> chatModal.style.display="none");
