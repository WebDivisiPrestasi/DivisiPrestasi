let BIN_ID = "67df82da8960c979a576a970"; // ID JSONBin.io
const API_KEY = "$2a$10$oKTpO0s3JULZFRJ9bWypM.p5ZGRGB9XG9ruyLUikjMkA0HDw0L0Re";
const MAX_BIN_SIZE = 1; // Maksimal jumlah file dalam satu bin

// Simpan ID Bin ke localStorage
function saveBinId(newBinId) {
    let binList = JSON.parse(localStorage.getItem("binList")) || [];
    if (!binList.includes(newBinId)) {
        binList.push(newBinId);
        localStorage.setItem("binList", JSON.stringify(binList));
    }
}
function filterImages() {
    const filterBidang = document.getElementById("filterBidang").value;
    document.querySelectorAll(".card").forEach(card => {
        card.style.display = filterBidang === "" || card.dataset.bidang === filterBidang ? "block" : "none";
    });
}
// Cek apakah bin sudah penuh
async function isBinFull() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { "X-Master-Key": API_KEY }
        });
        if (response.ok) {
            const result = await response.json();
            return result.record.files.length >= MAX_BIN_SIZE;
        }
    } catch (error) {
        console.error("Gagal mengecek kapasitas bin:", error);
    }
    return false;
}

// Ambil daftar Bin dari localStorage
function getBinList() {
    return JSON.parse(localStorage.getItem("binList")) || [];
}

// Buat Bin baru jika penuh
async function createNewBin() {
    try {
        const response = await fetch("https://api.jsonbin.io/v3/b", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY,
                "X-Bin-Private": "false"
            },
            body: JSON.stringify({ files: [] })
        });

        if (response.ok) {
            const result = await response.json();
            BIN_ID = result.metadata.id;
            saveBinId(BIN_ID);
            alert("Bin baru berhasil dibuat!");
        } else {
            alert("Gagal membuat bin baru.");
        }
    } catch (error) {
        console.error("Error saat membuat bin baru:", error);
    }
}

// Kompres gambar sebelum upload
async function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                let width = img.width;
                let height = img.height;
                const maxSize = 800;
                if (width > maxSize || height > maxSize) {
                    if (width > height) {
                        height *= maxSize / width;
                        width = maxSize;
                    } else {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", 0.7));
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

// Daftar nama berdasarkan bidang
const namaByBidang = {
    "BPH SC": [
            "Raqilla Almero Radhiza",
            "Fikri Zhafran Arsha",
            "Ladeya Kalin Aruna",
            "Alif Muhammad Edwar",
          ]
          ,
        "prestasi": [
            "Muhammad Elhakeem Yahya Barnas",
            "Ganendra Narya Ghalib",
            "Akheza Al Giffari",
            "Safaraz Vito Perdana",
            "Rakanda Wisanggeni Bastiawan",
            "Ayesha Kamila",
            "Athatertia Alyanisa Maharani Kurniawan",
            "Milana Saphira Nurfajar",
            "Abdian Oktaviano Alhaq",
            "Haikal Zidan Al Ghiffari",
            "Danish Ahza Irmawan",
            "Daffina Laudya Rusdian",
            "Muhammad Rayhan Sayyid Hatadji",
            "Akila Martiza Pribadi",
            "Nasser Irfan Falih",
            "Keenan Syahrizal Nasution",
            "Keandra Bima Perdana",
            "Mavi Hafiz Herlambang",
            "Keeva Edwina Shaquire Putri",
            "Farelino Abdillah Saputra",
            "Raihan Vadel Athaya",
            "Milana Saphira Nurfajar",
            "Raden Roro Anisha Widya Tri Lestari"
          ]
          ,
        "protokoler": [
            "Annasya Saila Kusuma",
            "Diallo Akmal Jada Sagir",
            "Innara Kinanti Roebadi",
            "Avrileta Nayaka Zhafirah",
            "Salvia Natha Raihanah",
            "Rizky Amaliyah",
            "Nadya Aisya Ramadhani",
            "Aliya Rahimah",
            "Almayka Nayyara Arie",
            "Farradisyah Adistian Zhesha",
            "Namira Nurush Shafa",
            "Aaisyah Misykah Saafia Maritz",
            "Syarifah Sayyidati Aisyah",
            "Rajendra Panjinata Kingwijati",
            "Bumi Nusantara Djatmiko",
            "Altafgani Morathi Gunawan",
            "Arkha Dias Praditya",
            "Muhammad Yuro Pramaditya Solechan",
            "Syaqif Nararya Kahfi"
          ] 
          ,
        "humas": [
            "Aisyah Dinara Arifin",
            "Fathia Alya Katili",
            "Dhayanalla Khansabira Pangayoman",
            "Fayza Latifah Hanania",
            "Maleeqa Rayasha Atmadibrata",
            "Raisha Danesh",
            "Aretha Shula Anandita",
            "Kalisha Nabila",
            "Kirana Sekar Prasetya",
            "Annabelle Ghaniyya Lafatunnisa",
            "Malika Khairana Jasmine",
            "Kai Leta",
            "Aisya Keani Irdithsyah Siregar",
            "Raden Roro Atiqah Syeren Syawali",
            "Sherinka Almahyra Zulkarnaen"
          ]
          ,
        "keagamaan": [
            "Raissa Rahmania",
            "Khayyira Fikriyani",
            "Alifya Nadhira Salsabila",
            "Quinsha Inayah",
            "Razihtha Aleesya Sumarno",
            "Naura Ariana Syakira Wibawa",
            "Muhammad Fikri Nursetiadi",
            "Giandra Adeffa Ramadhan",
            "Azraf Al Ehsan Izdihara",
            "Hasan Ibad Pohan",
            "Farras Hammam Rasendria",
            "Fathan Mubina Pradana Putra",
            "Keanu Al Atha Juan Azzuri"
          ]
          ,
        "Bidang Student Library":[
            "Sabrina Azizah",
            "Aliya Khalisha Mardia",
            "Aditri Mallick",
            "Janeeta Aliah",
            "Raiqa Salsabila Putrizani",
            "Gina Adinda Salmaulida",
            "Alif Ramadhan Excell",
            "Abiy Ghani Fawwaz Alfarizi"
          ]
          ,
        "pramuka":[
            "Radya Prazna Ardhana",
            "Abyaz Sakti Hasibuan",
            "Arkan Rafif Harahap",
            "Devan Elhaq Azharuddia",
            "Muhammad Ghifari Altha Permana",
            "Raden Baswara Mika Wibowo",
            "Ahmad Farsya Alfath Afdal",
            "Arkhan Abhipraya Sumito",
            "Faiz Ahmadinejad Irawan",
            "Febryan Hanif Maulana",
            "Kean Farzan Noegrahadi",
            "Kei Kienan Wardana",
            "Muhammad Al Kahfi Jabbar Malik Putra Prayoga",
            "Muhammad Arfa Danadyaksa",
            "Euro Mudjiyanto",
            "Myiesha Nafeeza Ayu",
            "Queensa Safana",
            "Zara Barcelona Balques",
            "Alisha Batrisyia Mazaya",
            "Azkiya Inshira Mazaya",
            "Khalisha Izzaty Kailani",
            "Khansa Faizah Kurnida",
            "Shantika Ghita Alfatin"
          ]
};

// Perbarui opsi nama berdasarkan bidang yang dipilih
function updateNamaOptions() {
    const bidang = document.getElementById("bidangInput").value;
    const nameInput = document.getElementById("nameInput");
    nameInput.innerHTML = "<option value='' disabled selected>Pilih Nama</option>";
    if (namaByBidang[bidang]) {
        nameInput.innerHTML += namaByBidang[bidang].map(nama => `<option value='${nama}'>${nama}</option>`).join("");
    }
    nameInput.disabled = !namaByBidang[bidang];
}

// Ambil semua file dari JSONBin.io
async function getAllFiles() {
    let allFiles = [];
    for (let binId of getBinList()) {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
                headers: { "X-Master-Key": API_KEY }
            });
            if (response.ok) {
                const result = await response.json();
                if (result.record.files) {
                    allFiles = allFiles.concat(result.record.files);
                }
            }
        } catch (error) {
            console.error(`Gagal mengambil data dari bin ${binId}:`, error);
        }
    }
    return allFiles;
}

// Upload file ke JSONBin.io
async function uploadFile() {
    const fileInput = document.getElementById("fileInput").files[0];
    const bidang = document.getElementById("bidangInput").value;
    const nama = document.getElementById("nameInput").value;
    const tanggal = document.getElementById("dateInput").value;
    const deskripsi = document.getElementById("descInput").value;
     if (!fileInput || !bidang || !nama || !tanggal || !deskripsi) {
        alert("Semua field harus diisi!");
        return;
    }
    const compressedImage = await compressImage(fileInput);
    let dataList = await getAllFiles();
    if (await isBinFull()) {
        await createNewBin();
        dataList = [];
    }
    dataList.push({ bidang, nama, tanggal, deskripsi, fileName: fileInput.name, file: compressedImage });
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
        body: JSON.stringify({ files: dataList })
    });
    alert("File berhasil di-upload!");
    fetchFile();
}

// Ambil dan tampilkan file
async function fetchFile() {
    let allFiles = await getAllFiles();
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    allFiles.forEach(fileData => {
        const listItem = document.createElement("li");
        listItem.innerHTML = 
            <p><strong>Bidang:</strong> ${fileData.bidang}</p>
            <p><strong>Nama:</strong> ${fileData.nama}</p>
            <p><strong>Tanggal:</strong> ${fileData.tanggal}</p>
            <p><strong>Deskripsi:</strong> ${fileData.deskripsi}</p>
            <img src="${fileData.file}" alt="Uploaded Image" style="max-width: 200px;">
            <hr>
        ;
        fileList.appendChild(listItem);
    });
}
async function resetData() {
    await fetch(https://api.jsonbin.io/v3/b/${BIN_ID}, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
        },
        body: JSON.stringify({ files: [] }) // Kosongkan bin
    });

    alert("Data berhasil direset!");
    fetchFile();
}
fetchFile();
