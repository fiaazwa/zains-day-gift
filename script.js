// ===================
// 🎯 PUZZLE SETUP
// ===================

const puzzleContainer = document.getElementById("gift-puzzle-container");
const puzzleImageSrc = "assets/puzzle1.jpg"; // jangan pakai spasi
const nextBtn = document.getElementById("gift-next-btn");

let tileSize = 100;
let gridSize = 3;
let tiles = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initPuzzle() {
    puzzleContainer.innerHTML = "";
    tiles = [];
    const positions = shuffle([...Array(gridSize * gridSize).keys()]);

    for (let i = 0; i < gridSize * gridSize; i++) {
        const tile = document.createElement("div");
        tile.classList.add("puzzle-tile");

        const row = Math.floor(i / gridSize);
        const col = i % gridSize;

        tile.style.backgroundImage = `url(${puzzleImageSrc})`;
        tile.style.backgroundSize = `${tileSize * gridSize}px`;
        tile.style.backgroundPosition = `-${(positions[i] % gridSize) * tileSize}px -${Math.floor(positions[i] / gridSize) * tileSize}px`;

        tile.setAttribute("draggable", true);
        tile.dataset.correctIndex = i;
        tile.dataset.currentIndex = positions[i];
        tile.addEventListener("dragstart", handleDragStart);
        tile.addEventListener("dragover", (e) => e.preventDefault());
        tile.addEventListener("drop", handleDrop);

        tiles.push(tile);
        puzzleContainer.appendChild(tile);
    }
}

let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
}

function handleDrop(e) {
    if (dragSrcEl !== this) {
        const fromIndex = dragSrcEl.dataset.currentIndex;
        const toIndex = this.dataset.currentIndex;

        const fromBg = dragSrcEl.style.backgroundPosition;
        const toBg = this.style.backgroundPosition;

        dragSrcEl.style.backgroundPosition = toBg;
        this.style.backgroundPosition = fromBg;

        dragSrcEl.dataset.currentIndex = toIndex;
        this.dataset.currentIndex = fromIndex;

        checkPuzzleComplete();
    }
}

function checkPuzzleComplete() {
    let isCorrect = tiles.every(
        (tile) => tile.dataset.correctIndex === tile.dataset.currentIndex
    );
    if (isCorrect) {
        document.getElementById("gift-fireworks").classList.remove("hidden");
        document.getElementById("gift-puzzle-title").classList.add("hidden"); // Tambahkan baris ini

        setTimeout(() => {
            document.getElementById("gift-fireworks").classList.add("hidden");
            nextBtn.classList.remove("hidden");
        }, 2000);
    }

}

// ===================
// 🌼 CHAMOMILE PRESS LOGIC
// ===================
function chamomilePressed() {
    // Tampilkan seluruh wrapper puzzle (bukan hanya kontainernya)
    document.getElementById("gift-puzzle-wrapper").classList.remove("hidden");
    document.getElementById("gift-puzzle-title").classList.remove("hidden");

    // Pastikan tombol 'Next' tetap tersembunyi sampai puzzle selesai
    document.getElementById("gift-next-btn").classList.add("hidden");
    document.getElementById("gift-cards-container").classList.add("hidden");
    document.getElementById("gift-fireworks").classList.add("hidden");
    // Inisialisasi ulang puzzle setiap kali chamomile ditekan
    initPuzzle();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("gift-next-btn").classList.add("hidden");
});

// gift card

// nextBtn.addEventListener("click", () => {
//     const container = document.getElementById("gift-cards-container");
//     container.classList.remove("hidden");
//     container.scrollIntoView({ behavior: "smooth" });

//     // Isi pesan untuk tiap kartu
//     const message1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
//     const message2 = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

//     // Mulai animasi ketikan satu per satu
//     typeWriterEffect("card-text-1", message1, 0, () => {
//         setTimeout(() => {
//             typeWriterEffect("card-text-2", message2, 0);
//         }, 800); // jeda sebelum lanjut ke kartu kedua
//     });
// });


// function typeWriterEffect(elementId, text, i, callback) {
//     const element = document.getElementById(elementId);
//     if (!element) return;
//     if (i < text.length) {
//         element.innerHTML += text.charAt(i);
//         setTimeout(() => typeWriterEffect(elementId, text, i + 1, callback), 30);
//     } else if (callback) {
//         callback();
//     }
// }

// const typingSound = new Audio("assets/type.mp3"); // pastikan file ini ada

// function typeWriterEffect(elementId, text, i, callback) {
//     const element = document.getElementById(elementId);
//     if (!element) return;

//     if (i < text.length) {
//         element.innerHTML += text.charAt(i);

//         // Putar suara ketikan
//         typingSound.currentTime = 0;
//         typingSound.play();

//         setTimeout(() => typeWriterEffect(elementId, text, i + 1, callback), 30);
//     } else if (callback) {
//         callback();
//     }
// }

// ============================
// 📝 TYPEWRITER + FLIP LOGIC
// ============================

// Fungsi animasi ketikan
function typeWriterEffect(elementId, text, i = 0, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriterEffect(elementId, text, i + 1, callback), 30);
    } else if (callback) {
        callback();
    }
}

// Flip kartu saat diklik
function flipCard(cardElement) {
    cardElement.classList.toggle("flipped");
}

// Tampilkan kartu ucapan saat tombol "Next" diklik
nextBtn.addEventListener("click", () => {
    document.getElementById("gift-audio").play(); //BAGIAN AUDIO
    const container = document.getElementById("gift-cards-container");
    container.classList.remove("hidden");
    container.scrollIntoView({ behavior: "smooth" });

    const message1 = `
    Dear زين

    عيد ميلاد سعيد يا زين... شوف مين كبر سنة هههه
بعرفش إذا بتحتفلوا بعيد الميلاد زي هون ولا لأ،
بس شكراً إنك انولدت، شكراً إنك دخلت حياتي وملّيت أيامي بالألوان.
بتمنى يعجبك هديتي، حتى لو صغيرة... بس لعبة بسيطة وكلمات خفيفة،
بس لا تنخدع، أنا عملتها بمحبة كتير 🥰

أحسن دعوات إلك يا زين!
مش لازم أكتبها هون، صح؟
إنت كبير، ادعي لحالك، وأنا رح أقول آمين من بعيد 😅😂
`;
    const message2 = `
بالله عليك، بدك تعرف كيف خلتني أحبك بهاي الطريقة؟

من أكتر من خمس سنين... قلبي كان مسكّر بقفل.
ما كنتش بعرف مين معه المفتاح.
نسيت إحساس الخفقان...
نسيت شو يعني حدا يشتاقلك أو يستناك.

بس إنت...
ما حاولت تفتش ع المفتاح.
ما سألت ليش الباب مسكر.
إنت جيت،
وكسرت القفل بنظرة حنونة.
وهمستلي:
"إهدي... أنا رح أحميك."

وهلّق،
إنت الوحيد اللي معك المفتاح.

(بس بالله ما تحكي لحدا عن هاد...
أنا بخجل إذا حدا غيرك عرف 😣)
`;

    typeWriterEffect("card-text-1", message1, 0, () => {
        setTimeout(() => {
            typeWriterEffect("card-text-2", message2);
        }, 600);
    });
});