const BIN_ID = "67df6dc88960c979a576a220";
const API_KEY = "$2a$10$oKTpO0s3JULZFRJ9bWypM.p5ZGRGB9XG9ruyLUikjMkA0HDw0L0Re";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

async function saveImage(imageUrl, date, bidang, name, description) {
    let images = await loadFromJSONBin(); // Ambil data lama dulu
    images.push({ imageUrl, date, bidang, name, description }); // Tambahkan data baru
    await saveToJSONBin(images); // Simpan semua data
}
async function fetchLatestData() {
    const binId = "67df6dc88960c979a576a220";
    const apiKey = "$2a$10$oKTpO0s3JULZFRJ9bWypM.p5ZGRGB9XG9ruyLUikjMkA0HDw0L0Re";
    
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
            headers: {
                "X-Master-Key": apiKey
            }
        });
        const result = await response.json();
        console.log("Data terbaru:", result);
        
        // Di sini, kamu bisa update tampilan dengan data baru
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

// Cek data terbaru setiap 5 detik
setInterval(fetchLatestData, 5000);

async function saveToJSONBin(data) {
    try {
        const response = await fetch(BIN_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({ records: data }) // Simpan semua data
        });
        console.log("Data berhasil disimpan ke JSONBin.io");
    } catch (error) {
        console.error("Gagal menyimpan data:", error);
    }
}


document.addEventListener("DOMContentLoaded", loadSavedImages);
function updateNamaOptions() {
    const bidangInput = document.getElementById("bidangInput");
    const nameInput = document.getElementById("nameInput");

    nameInput.innerHTML = '<option value="" disabled selected>Pilih Nama</option>';
    
    const namaBidang = {
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
        "library":[
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

    const bidangTerpilih = bidangInput.value;

    if (bidangTerpilih) {
        namaBidang[bidangTerpilih].forEach(nama => {
            const option = document.createElement("option");
            option.value = nama;
            option.textContent = nama;
            nameInput.appendChild(option);
        });
        nameInput.disabled = false;
    } else {
        nameInput.disabled = true;
    }
}
async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const bidangInput = document.getElementById("bidangInput");
    const namaInput = document.getElementById("namaInput");

    const file = fileInput.files[0];
    if (!file) {
        alert("Pilih file dulu!");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
        const base64String = reader.result; // Konversi ke Base64

        const binId = "BIN_ID_KAMU"; // Ganti dengan ID bin JSONBin.io
        const apiKey = "API_KEY_KAMU"; // Ganti dengan API Key kamu

        // Data yang akan disimpan
        const data = {
            bidang: bidangInput.value,
            nama: namaInput.value,
            tanggal: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
            file: base64String
        };

        // Simpan ke JSONBin.io
        const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": apiKey
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("File berhasil di-upload!");
        } else {
            alert("Gagal upload file.");
        }
    };
}
async function fetchFile() {
    const binId = "BIN_ID_KAMU";
    const apiKey = "API_KEY_KAMU";

    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: { "X-Master-Key": apiKey }
    });

    const result = await response.json();
    const data = result.record; // Ambil data dari JSONBin.io

    // Tampilkan data di halaman
    document.getElementById("output").innerHTML = `
        <p><strong>Bidang:</strong> ${data.bidang}</p>
        <p><strong>Nama:</strong> ${data.nama}</p>
        <p><strong>Tanggal:</strong> ${data.tanggal}</p>
        <img src="${data.file}" style="max-width: 100%;">
    `;
}

async function saveImage(imageUrl, date, bidang, name, description) {
    let images = await loadFromJSONBin(); // Ambil data terbaru
    images.push({ imageUrl, date, bidang, name, description });
    await saveToJSONBin(images); // Simpan ke JSONBin.io
}

async function loadFromJSONBin() {
    try {
        const response = await fetch(BIN_URL, {
            method: "GET",
            headers: {
                "X-Master-Key": API_KEY
            }
        });
        const json = await response.json();
        return json.record.records || [];
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        return [];
    }
}
async function loadSavedImages() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    let images = await loadFromJSONBin();

    if (!images || images.length === 0) {
        gallery.innerHTML = "<p>Belum ada upload.</p>";
        return;
    }

    images.forEach(({ imageUrl, date, bidang, name, description }) => {
        const uploadItem = document.createElement("div");
        uploadItem.classList.add("upload-item");

        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;

        const descElement = document.createElement("p");
        descElement.innerHTML = `<strong>${date} - ${bidang} - ${name}</strong><br>${description}`;

        uploadItem.appendChild(imgElement);
        uploadItem.appendChild(descElement);
        gallery.appendChild(uploadItem);
    });
}
function resetData() {
    localStorage.removeItem("uploadedImages");
    document.getElementById('gallery').innerHTML = ""; 
    alert("Semua data telah dihapus!");
}
function filterImages() {
    const filterBidang = document.getElementById("filterBidang").value;
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    let images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    images.forEach(({ imageUrl, date, bidang, name, description }) => {
        if (filterBidang === "all" || bidang.toLowerCase() === filterBidang.toLowerCase()) {
            const uploadItem = document.createElement("div");
            uploadItem.classList.add("upload-item");

            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;

            const descElement = document.createElement("p");
            descElement.innerHTML = `<strong>${date} - ${bidang} - ${name}</strong><br>${description}`;

            uploadItem.appendChild(imgElement);
            uploadItem.appendChild(descElement);
            gallery.appendChild(uploadItem);
        }
    });
}
function loadSavedImages() {
    filterImages(); 
}
setInterval(loadSavedImages, 5000);
