// 🔹 Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseConfig = {
    apiKey: "AIzaSyDE1IXTPKSqO55tEgxd-CXG_SY3O7Dhr1Q",
    authDomain: "websitescsmp-an-nisaa.firebaseapp.com",
    projectId: "websitescsmp-an-nisaa",
    storageBucket: "websitescsmp-an-nisaa.firebasestorage.app",
    messagingSenderId: "242743765517",
    appId: "1:242743765517:web:94850a1651df6c8e338344",
    measurementId: "G-Q1R8NTZEZK
};


// 🔹 Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

// 🔹 Upload File ke Firebase
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const descInput = document.getElementById('descInput');
    
    if (fileInput.files.length === 0) {
        alert("Pilih gambar terlebih dahulu!");
        return;
    }

    const file = fileInput.files[0];
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = storage.ref('uploads/' + fileName);
    
    storageRef.put(file).then(snapshot => {
        return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
        return db.collection("uploads").add({
            imageUrl: downloadURL,
            description: descInput.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }).then(() => {
        alert("Gambar berhasil diunggah!");
        fileInput.value = "";
        descInput.value = "";
        loadSavedImages(); // Tampilkan gambar yang sudah diupload
    }).catch(error => console.error("Upload gagal:", error));
}

// 🔹 Ambil Data dari Firebase Firestore
// 🔹 Fungsi untuk menampilkan gambar secara real-time dari Firestore
function loadSavedImages() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = "";

    db.collection("uploads").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        gallery.innerHTML = ""; // Bersihkan sebelum update

        snapshot.forEach(doc => {
            const data = doc.data();
            const uploadItem = document.createElement("div");
            uploadItem.classList.add("upload-item");

            const imgElement = document.createElement("img");
            imgElement.src = data.imageUrl;

            const descElement = document.createElement("p");
            descElement.textContent = data.description;

            uploadItem.appendChild(imgElement);
            uploadItem.appendChild(descElement);
            gallery.appendChild(uploadItem);
        });
    });
}

// 🔹 Jalankan fungsi ini saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadSavedImages);

