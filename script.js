/* ================================
   HAMBURGER MENU (Mobile Navbar)
================================= */
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}


// klaku

// ===============================
// PARSE INPUT
// ===============================
function parseVertices() {
    return document.getElementById("vertices").value
        .split(",")
        .map(v => v.trim())
        .filter(v => v !== "");
}

function parseEdges() {
    return document.getElementById("edges").value
        .split(",")
        .map(e => e.trim().split("-"))
        .filter(e => e.length === 2);
}

// ===============================
// CEK POHON (TREE)
// ===============================
function isTree(vertices, edges) {
    // Syarat 1: |E| = |V| - 1
    if (edges.length !== vertices.length - 1) return false;

    // Buat adjacency list
    const adj = {};
    vertices.forEach(v => adj[v] = []);

    for (const [u, v] of edges) {
        if (!adj[u] || !adj[v]) return false;
        adj[u].push(v);
        adj[v].push(u);
    }

    const visited = new Set();

    // DFS untuk cek siklus & keterhubungan
    function dfs(node, parent) {
        visited.add(node);

        for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) {
                if (!dfs(neighbor, node)) return false;
            } else if (neighbor !== parent) {
                return false; // ditemukan siklus
            }
        }
        return true;
    }

    // Mulai DFS dari simpul pertama
    if (!dfs(vertices[0], null)) return false;

    // Syarat 2: graf terhubung
    return visited.size === vertices.length;
}

// ===============================
// BUTTON HANDLER
// ===============================
function cekPohon() {
    const V = parseVertices();
    const E = parseEdges();
    const hasil = document.getElementById("hasil");

    if (V.length === 0) {
        hasil.textContent = "Hasil: Simpul tidak boleh kosong";
        return;
    }

    if (isTree(V, E)) {
        hasil.textContent = "Hasil: Graf adalah POHON 🌳";
    } else {
        hasil.textContent = "Hasil: Graf BUKAN pohon ❌";
    }
}

function cekPohonMerentang() {
    const V = parseVertices();
    const E = parseEdges();
    const hasil = document.getElementById("hasil");

    if (isTree(V, E)) {
        hasil.textContent =
            "Hasil: Graf adalah POHON MERENTANG 🌳";
    } else {
        hasil.textContent =
            "Hasil: BUKAN pohon merentang ❌";
    }
}

/* ================================
   DATA SOAL
================================= */
const soalList = [
  {
    soal: "Graf yang terhubung dan tidak memiliki siklus disebut?",
    pilihan: ["Graf lengkap", "Pohon", "Graf berarah", "Graf berbobot"],
    benar: 1,
    alasan: "Pohon itu graf yang terhubung dan dak ado siklus."
  },
  {
    soal: "Jumlah sisi pada pohon dengan n simpul adalah?",
    pilihan: ["n", "n + 1", "n - 1", "2n"],
    benar: 2,
    alasan: "Ciri utama pohon adalah jumlah sisinya selalu n - 1."
  },
  {
    soal: "Pohon merentang itu artinya?",
    pilihan: [
      "Graf dengan bobot terkecil",
      "Subgraf yang mencakup semua simpul tanpa siklus",
      "Graf lengkap",
      "Graf terputus"
    ],
    benar: 1,
    alasan: "Pohon merentang mencakup semua simpul dan tetap tanpa siklus."
  }
];

/* ================================
   TAMPIL SOAL
================================= */
function tampilSoal(dataSoal) {
  const listSoalDiv = document.getElementById("list-soal");
  listSoalDiv.innerHTML = "";

  dataSoal.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "soal-card";

    let pilihanHTML = "";
    item.pilihan.forEach((p, i) => {
      pilihanHTML += `
        <label>
          <input type="radio" name="soal${index}" value="${i}">
          ${p}
        </label><br>
      `;
    });

    card.innerHTML = `
      <p><b>${index + 1}. ${item.soal}</b></p>
      ${pilihanHTML}
      <button onclick="cekJawaban(${index})">Cek Jawaban</button>
      <p id="hasil${index}"></p>
    `;

    listSoalDiv.appendChild(card);
  });
}

/* ================================
   ACAK SOAL
================================= */
function acakSoal() {
  // salin array biar data asli dak berubah
  const soalAcak = [...soalList];

  // acak urutan soal
  soalAcak.sort(() => Math.random() - 0.5);

  // tampilkan
  tampilSoal(soalAcak);
}

/* ================================
   CEK JAWABAN
================================= */
function cekJawaban(index) {
  const jawaban = document.querySelector(`input[name="soal${index}"]:checked`);
  const hasil = document.getElementById(`hasil${index}`);

  if (!jawaban) {
    hasil.innerHTML = "Pilih jawaban dulu ji 😅";
    return;
  }

  // ambil data soal yang lagi ditampilkan
  const soalSekarang = document
    .querySelectorAll(".soal-card")[index]
    .querySelector("p").innerText;

  // cari soal di data asli
  const data = soalList.find(s => soalSekarang.includes(s.soal));

  if (parseInt(jawaban.value) === data.benar) {
    hasil.innerHTML = "✅ Jawaban benar 👍";
  } else {
    hasil.innerHTML = `
      ❌ Jawaban salah<br>
      <b>Jawaban benar:</b> ${data.pilihan[data.benar]}<br>
      <b>Alasan:</b> ${data.alasan}
    `;
  }
}

/* ================================
   LOAD PERTAMA
================================= */
document.addEventListener("DOMContentLoaded", acakSoal);
