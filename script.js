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
    alasan: "Pohon adalah graf terhubung tanpa siklus."
  },
  {
    soal: "Jumlah sisi pada pohon dengan n simpul adalah?",
    pilihan: ["n", "n + 1", "n - 1", "2n"],
    benar: 2,
    alasan: "Pohon selalu memiliki n − 1 sisi."
  },
  {
    soal: "Graf tanpa siklus disebut?",
    pilihan: ["Graf siklik", "Graf asiklik", "Graf lengkap", "Graf planar"],
    benar: 1,
    alasan: "Graf tanpa siklus disebut graf asiklik."
  },
  {
    soal: "Pohon selalu bersifat?",
    pilihan: ["Terputus", "Terhubung", "Berarah", "Berbobot"],
    benar: 1,
    alasan: "Pohon harus terhubung."
  },
  {
    soal: "Jika graf memiliki 6 simpul, berapa jumlah sisi pada pohon?",
    pilihan: ["4", "5", "6", "7"],
    benar: 1,
    alasan: "n − 1 = 6 − 1 = 5."
  },
  {
    soal: "Pohon merentang harus mencakup?",
    pilihan: ["Sebagian simpul", "Semua simpul", "Satu simpul", "Tidak ada simpul"],
    benar: 1,
    alasan: "Pohon merentang mencakup semua simpul graf."
  },
  {
    soal: "Pohon merupakan graf?",
    pilihan: ["Berarah", "Tak berarah", "Lengkap", "Berbobot"],
    benar: 1,
    alasan: "Pohon adalah graf tak berarah."
  },
  {
    soal: "Apakah pohon boleh memiliki siklus?",
    pilihan: ["Boleh", "Tidak boleh", "Kadang-kadang", "Tergantung sisi"],
    benar: 1,
    alasan: "Pohon tidak boleh memiliki siklus."
  },
  {
    soal: "Graf dengan satu simpul dan tanpa sisi disebut?",
    pilihan: ["Graf kosong", "Graf trivial", "Graf lengkap", "Graf siklik"],
    benar: 1,
    alasan: "Graf trivial merupakan pohon."
  },
  {
    soal: "Pohon merentang merupakan subgraf dari graf?",
    pilihan: ["Tak berarah", "Berarah", "Lengkap", "Berbobot"],
    benar: 0,
    alasan: "Pohon merentang adalah subgraf tak berarah."
  },

  // ====== 11 – 100 ======
  {
    soal: "Jika sebuah pohon memiliki 10 simpul, maka jumlah sisinya adalah?",
    pilihan: ["8", "9", "10", "11"],
    benar: 1,
    alasan: "Jumlah sisi pohon = n − 1."
  },
  {
    soal: "Graf yang memiliki siklus pasti?",
    pilihan: ["Pohon", "Bukan pohon", "Pohon merentang", "Graf trivial"],
    benar: 1,
    alasan: "Pohon tidak boleh memiliki siklus."
  },
  {
    soal: "Pohon merentang tidak boleh memiliki?",
    pilihan: ["Simpul", "Sisi", "Siklus", "Derajat"],
    benar: 2,
    alasan: "Pohon merentang bersifat asiklik."
  },
  {
    soal: "Jika graf memiliki 7 simpul dan 6 sisi serta terhubung, maka graf tersebut?",
    pilihan: ["Pohon", "Graf lengkap", "Graf siklik", "Graf berarah"],
    benar: 0,
    alasan: "Syarat pohon: terhubung dan sisi = n − 1."
  },
  {
    soal: "Graf terhubung dengan n simpul dan lebih dari n−1 sisi pasti?",
    pilihan: ["Pohon", "Tidak terhubung", "Memiliki siklus", "Graf trivial"],
    benar: 2,
    alasan: "Lebih dari n−1 sisi berarti ada siklus."
  },
  {
    soal: "Pohon merentang diambil dari graf?",
    pilihan: ["Tak terhubung", "Terhubung", "Kosong", "Berarah"],
    benar: 1,
    alasan: "Pohon merentang berasal dari graf terhubung."
  },
  {
    soal: "Apakah setiap graf memiliki pohon merentang?",
    pilihan: ["Ya", "Tidak", "Hanya graf terhubung", "Hanya graf lengkap"],
    benar: 2,
    alasan: "Hanya graf terhubung yang memiliki pohon merentang."
  },
  {
    soal: "Pohon memiliki derajat minimum simpul?",
    pilihan: ["0", "1", "2", "3"],
    benar: 1,
    alasan: "Daun pohon memiliki derajat 1."
  },
  {
    soal: "Simpul dengan derajat 1 pada pohon disebut?",
    pilihan: ["Akar", "Cabang", "Daun", "Induk"],
    benar: 2,
    alasan: "Simpul berderajat 1 disebut daun."
  },
  {
    soal: "Graf yang hanya memiliki satu simpul disebut?",
    pilihan: ["Graf lengkap", "Graf trivial", "Graf siklik", "Graf planar"],
    benar: 1,
    alasan: "Graf trivial terdiri dari satu simpul."
  },

  // Soal 21–100 pola konsep (dipastikan valid)
];

for (let i = soalList.length + 1; i <= 100; i++) {
  soalList.push({
    soal: `Jika sebuah pohon memiliki ${i} simpul, berapakah jumlah sisinya?`,
    pilihan: [`${i - 2}`, `${i - 1}`, `${i}`, `${i + 1}`],
    benar: 1,
    alasan: "Jumlah sisi pohon selalu n − 1."
  });
}


/* ================================
   VARIABEL GLOBAL
   (MENYIMPAN 3 SOAL YANG DITAMPILKAN)
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

  // SIMPAN 3 SOAL YANG DITAMPILKAN
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
    hasil.innerHTML = "Pilih jawaban dulu ji 😅";
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
