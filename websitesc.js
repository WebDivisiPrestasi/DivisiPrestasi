const BIN_ID = "67df82da8960c979a576a970";
const API_KEY = "$2a$10$oKTpO0s3JULZFRJ9bWypM.p5ZGRGB9XG9ruyLUikjMkA0HDw0L0Re";
const MAX_BIN_SIZE = 10; // Ganti sesuai kebutuhan
async function createNewBin() {
    try {
        const response = await fetch("https://api.jsonbin.io/v3/b", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY,
                "X-Bin-Private": "false" // Buat bin public
            },
            body: JSON.stringify({ files: [] }) // Bin kosong
        });

        if (response.ok) {
            const result = await response.json();
            BIN_ID = result.metadata.id; // Perbarui ID bin yang digunakan
            alert("Bin baru berhasil dibuat!");
        } else {
            alert("Gagal membuat bin baru.");
        }
    } catch (error) {
        console.error("Error saat membuat bin baru:", error);
    }
}

// 🟢 Fungsi untuk mengisi dropdown nama berdasarkan bidang yang dipilih
function updateNamaOptions() {
    const bidang = document.getElementById("bidangInput").value;
    const nameInput = document.getElementById("nameInput");
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

                // Tentukan ukuran baru
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

                // Kompresi gambar ke kualitas 70%
                resolve(canvas.toDataURL("image/jpeg", 0.7));
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

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

    nameInput.innerHTML = ""; // Kosongkan dropdown
    nameInput.disabled = true;

    if (namaByBidang[bidang]) {
        nameInput.disabled = false;
        nameInput.innerHTML = `<option value="" disabled selected>Pilih Nama</option>`;
        namaByBidang[bidang].forEach(nama => {
            nameInput.innerHTML += `<option value="${nama}">${nama}</option>`;
        });
    }
}

// 🟢 Fungsi untuk mengambil data lama dari JSONBin.io
async function getBinData() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { "X-Master-Key": API_KEY }
        });

        if (response.ok) {
            const result = await response.json();
            return result.record.files || [];
        }
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
    return [];
}


// 🟢 Fungsi untuk mengupload file ke JSONBin.io
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

    // ✅ Cek ekstensi & ukuran file sebelum dikompresi
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(fileInput.type)) {
        alert("Hanya file .jpg, .png, .gif yang diperbolehkan!");
        return;
    }

    try {
        const compressedImage = await compressImage(fileInput);

        let dataList = await getBinData(); // Ambil data lama

        // 🟢 **Cek apakah bin sudah penuh**
        if (dataList.length >= MAX_BIN_SIZE) {
            await createNewBin(); // Buat bin baru jika penuh
            dataList = []; // Kosongkan list
        }

        // Tambahkan file baru
        dataList.push({ bidang, nama, tanggal, deskripsi, file: compressedImage });

        // Simpan kembali ke JSONBin.io
        const saveResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({ files: dataList })
        });

        if (saveResponse.ok) {
            alert("File berhasil di-upload!");
            fetchFile(); // Perbarui tampilan
        } else {
            alert("Gagal upload file.");
        }
    } catch (error) {
        console.error("Gagal mengompresi atau mengupload file:", error);
        alert("Terjadi kesalahan saat mengunggah.");
    }
}


// 🟢 Fungsi untuk menampilkan data dari JSONBin.io
async function fetchFile() {
    const dataList = await getBinData(); // Ambil data dari JSONBin.io

    let galleryHTML = "";
    dataList.forEach(data => {
        galleryHTML += `
            <div class="card" data-bidang="${data.bidang}">
                <p><strong>Bidang:</strong> ${data.bidang}</p>
                <p><strong>Nama:</strong> ${data.nama}</p>
                <p><strong>Tanggal:</strong> ${data.tanggal}</p>
                <p><strong>Deskripsi:</strong> ${data.deskripsi}</p>
                <img src="${data.file}" style="max-width: 100%;">
            </div>
        `;
    });

    document.getElementById("gallery").innerHTML = galleryHTML;
}

// 🟢 Fungsi untuk filter gambar berdasarkan bidang
function filterImages() {
    const filterBidang = document.getElementById("filterBidang").value;
    document.querySelectorAll(".card").forEach(card => {
        card.style.display = filterBidang === "" || card.dataset.bidang === filterBidang ? "block" : "none";
    });
}

// 🟢 Fungsi untuk reset semua data di JSONBin.io
async function resetData() {
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
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

// 🔄 Panggil fetchFile() saat halaman dibuka
fetchFile();
