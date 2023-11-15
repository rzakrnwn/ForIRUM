document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("backgroundMusic");

    // Cek apakah elemen audio ditemukan
    if (!music) {
        console.error("Element with ID 'backgroundMusic' not found");
        return;
    }

    // Fungsi untuk memutar audio
    function playAudio() {
        music.play().then(() => {
            console.log("Audio started playing successfully");
        }).catch((error) => {
            console.error("Error playing audio:", error);
        });
    }

    // Pemutaran lagu dimulai saat halaman dimuat
    playAudio();

    // Pemutaran lagu diulang saat mencapai akhir
    music.addEventListener("ended", function() {
        music.currentTime = 0;
        music.play();
    });

    // Logika spesifik untuk Halaman Pertama
    const slide1 = document.getElementById("slide1");
    if (slide1) {
        slide1.addEventListener("click", function() {
            music.pause();
            localStorage.setItem("audioStatus", JSON.stringify({
                paused: true,
                currentTime: music.currentTime
            }));
        });
    }

    // Logika spesifik untuk Halaman Kedua
    const slide2 = document.getElementById("slide2");
    if (slide2) {
        slide2.addEventListener("click", function() {
            // Simpan posisi waktu musik sebelum berpindah halaman
            music.pause();
            localStorage.setItem("audioStatus", JSON.stringify({
                paused: true,
                currentTime: music.currentTime
            }));
            document.body.classList.remove("container");
        });
    }

    // Logika dari file main.js
    onload = () => {
        document.body.classList.remove("container");

        // Cek apakah audio sedang diputar saat berpindah ke halaman kedua
        const audioStatus = localStorage.getItem("audioStatus");
        if (audioStatus) {
            const { paused, currentTime } = JSON.parse(audioStatus);

            if (!paused) {
                // Jika tidak dijeda, atur ulang posisi waktu musik dan mulai memutar lagi
                music.currentTime = currentTime;
                playAudio();
            }
        }
    };
});
