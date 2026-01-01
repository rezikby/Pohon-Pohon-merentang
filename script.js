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
   DATA SOAL (100 SOAL BERVARIASI)
================================= */
const soalList = [
  {
    soal: "Graf yang terhubung dan tidak memiliki siklus disebut?",
    pilihan: ["Graf lengkap", "Pohon", "Graf berarah", "Graf berbobot"],
    benar: 1,
    alasan: "Pohon adalah graf terhubung tanpa siklus."
  },
  {
    soal: "Jumlah sisi pada pohon dengan n simpul adalah?",
    pilihan: ["n", "n + 1", "n - 1", "2n"],
    benar: 2,
    alasan: "Ciri utama pohon adalah memiliki n − 1 sisi."
  },
  {
    soal: "Graf tanpa siklus disebut?",
    pilihan: ["Siklik", "Asiklik", "Lengkap", "Planar"],
    benar: 1,
    alasan: "Graf tanpa siklus disebut graf asiklik."
  },
  {
    soal: "Syarat utama graf disebut pohon adalah?",
    pilihan: [
      "Berarah dan lengkap",
      "Terhubung dan tanpa siklus",
      "Memiliki bobot",
      "Derajat sama"
    ],
    benar: 1,
    alasan: "Pohon harus terhubung dan tidak mengandung siklus."
  },
  {
    soal: "Jika sebuah pohon memiliki 8 simpul, maka jumlah sisinya adalah?",
    pilihan: ["6", "7", "8", "9"],
    benar: 1,
    alasan: "Jumlah sisi pohon = n − 1."
  },
  {
    soal: "Pohon merentang adalah?",
    pilihan: [
      "Graf lengkap",
      "Subgraf yang mencakup semua simpul tanpa siklus",
      "Graf berarah",
      "Graf berbobot"
    ],
    benar: 1,
    alasan: "Pohon merentang mencakup semua simpul graf asal."
  },
  {
    soal: "Apakah pohon boleh memiliki loop?",
    pilihan: ["Boleh", "Tidak boleh", "Kadang-kadang", "Tergantung simpul"],
    benar: 1,
    alasan: "Loop membentuk siklus sehingga tidak boleh."
  },
  {
    soal: "Graf dengan satu simpul dan tanpa sisi disebut?",
    pilihan: ["Graf kosong", "Graf trivial", "Graf lengkap", "Graf siklik"],
    benar: 1,
    alasan: "Graf trivial terdiri dari satu simpul."
  },
  {
    soal: "Simpul dengan derajat 1 pada pohon disebut?",
    pilihan: ["Akar", "Cabang", "Daun", "Induk"],
    benar: 2,
    alasan: "Simpul berderajat satu disebut daun."
  },
  {
    soal: "Graf terhubung dengan n simpul dan n − 1 sisi pasti?",
    pilihan: ["Graf siklik", "Pohon", "Graf lengkap", "Graf planar"],
    benar: 1,
    alasan: "Itu adalah definisi pohon."
  },

  // ===== SOAL LOGIKA & KONSEP =====
  {
    soal: "Jika sebuah graf memiliki lebih dari n − 1 sisi, maka graf tersebut?",
    pilihan: [
      "Pohon",
      "Tidak terhubung",
      "Memiliki siklus",
      "Graf trivial"
    ],
    benar: 2,
    alasan: "Lebih dari n − 1 sisi berarti ada siklus."
  },
  {
    soal: "Apakah setiap graf terhubung memiliki pohon merentang?",
    pilihan: ["Ya", "Tidak", "Hanya graf lengkap", "Hanya graf kecil"],
    benar: 0,
    alasan: "Setiap graf terhubung pasti memiliki pohon merentang."
  },
  {
    soal: "Pohon merupakan graf?",
    pilihan: ["Berarah", "Tak berarah", "Lengkap", "Berbobot"],
    benar: 1,
    alasan: "Pohon adalah graf tak berarah."
  },
  {
    soal: "Jika sebuah graf tidak terhubung, maka?",
    pilihan: [
      "Memiliki pohon merentang",
      "Tidak memiliki pohon merentang",
      "Pasti pohon",
      "Graf lengkap"
    ],
    benar: 1,
    alasan: "Graf tidak terhubung tidak punya pohon merentang."
  },
  {
    soal: "Derajat minimum simpul pada pohon (n > 1) adalah?",
    pilihan: ["0", "1", "2", "3"],
    benar: 1,
    alasan: "Selalu ada simpul daun dengan derajat 1."
  },
  {
    soal: "Pohon dengan semua simpul berderajat ≤ 2 disebut?",
    pilihan: ["Pohon biner", "Lintasan", "Graf lengkap", "Graf siklik"],
    benar: 1,
    alasan: "Pohon tersebut membentuk lintasan."
  },
  {
    soal: "Apakah pohon bisa berbentuk graf lengkap?",
    pilihan: ["Bisa", "Tidak bisa", "Kadang-kadang", "Tergantung simpul"],
    benar: 1,
    alasan: "Graf lengkap memiliki banyak siklus."
  },
  {
    soal: "Jika sebuah pohon memiliki 1 simpul, maka jumlah sisinya?",
    pilihan: ["0", "1", "2", "Tidak terdefinisi"],
    benar: 0,
    alasan: "Graf trivial memiliki 0 sisi."
  },
  {
    soal: "Pohon merentang memiliki jumlah sisi?",
    pilihan: [
      "Sama dengan graf asal",
      "Lebih banyak",
      "Lebih sedikit atau sama",
      "Selalu n − 1"
    ],
    benar: 3,
    alasan: "Pohon merentang selalu memiliki n − 1 sisi."
  },
  {
    soal: "Menghapus satu sisi dari pohon akan membuat graf?",
    pilihan: ["Siklik", "Tidak terhubung", "Lengkap", "Planar"],
    benar: 1,
    alasan: "Pohon sangat minimal, satu sisi hilang jadi terputus."
  }
];



/* ================================
   VARIABEL GLOBAL
================================= */
let soalTampil = [];

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
   ACAK & TAMPIL 3 SOAL SAJA
================================= */
function acakSoal() {
  const soalAcak = [...soalList];
  soalAcak.sort(() => Math.random() - 0.5);

  soalTampil = soalAcak.slice(0, 3);
  tampilSoal(soalTampil);
}

/* ================================
   CEK JAWABAN
================================= */
function cekJawaban(index) {
  const jawaban = document.querySelector(
    `input[name="soal${index}"]:checked`
  );
  const hasil = document.getElementById(`hasil${index}`);

  if (!jawaban) {
    hasil.innerHTML = "Pilih jawaban dulu";
    return;
  }

  const data = soalTampil[index];

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
