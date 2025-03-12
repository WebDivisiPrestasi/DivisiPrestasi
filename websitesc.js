document.addEventListener("DOMContentLoaded", loadSavedImages);

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const descInput = document.getElementById('descInput');
    const gallery = document.getElementById('gallery');
    
    if (fileInput.files.length === 0) {
        alert("Pilih gambar terlebih dahulu!");
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        const description = descInput.value || "Tidak ada deskripsi.";
        
        const uploadItem = document.createElement("div");
        uploadItem.classList.add("upload-item");
        
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        
        const descElement = document.createElement("p");
        descElement.textContent = description;
        
        uploadItem.appendChild(imgElement);
        uploadItem.appendChild(descElement);
        gallery.appendChild(uploadItem);

        // Simpan ke LocalStorage
        saveImage(imageUrl, description);
        
        // Bersihkan input
        fileInput.value = "";
        descInput.value = "";
    };
    
    reader.readAsDataURL(file);
}

// Simpan gambar ke LocalStorage
function saveImage(imageUrl, description) {
    let images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    images.push({ imageUrl, description });
    localStorage.setItem("uploadedImages", JSON.stringify(images));
}

// Muat gambar yang tersimpan saat halaman dibuka
function loadSavedImages() {
    const gallery = document.getElementById('gallery');
    let images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    
    images.forEach(({ imageUrl, description }) => {
        const uploadItem = document.createElement("div");
        uploadItem.classList.add("upload-item");

        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;

        const descElement = document.createElement("p");
        descElement.textContent = description;

        uploadItem.appendChild(imgElement);
        uploadItem.appendChild(descElement);
        gallery.appendChild(uploadItem);
    });
}

// Fungsi untuk mereset data
function resetData() {
    localStorage.removeItem("uploadedImages");
    document.getElementById('gallery').innerHTML = ""; // Bersihkan tampilan
    alert("Semua data telah dihapus!");
}
