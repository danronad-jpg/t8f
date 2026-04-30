const colorButtons = document.querySelectorAll('.color-btn');
const modelViewer = document.querySelector('#t8f-model');

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Убираем класс active у всех кнопок
        colorButtons.forEach(btn => btn.classList.remove('active'));
        // 2. Добавляем active только той, на которую нажали
        button.classList.add('active');

        // 3. Красим раму 
        const colorString = button.dataset.color;
        const materials = modelViewer.model.materials;
        if (materials) {
            materials[0].pbrMetallicRoughness.setBaseColorFactor(colorString);
        }
    });
});

const music = document.getElementById('bg-music');
const vinyl = document.getElementById('vinyl-record');

// Твой список треков в папке assets
const playlist = [
    'assets/main_theme_1.mp3',
    'assets/montagem_estilo_livre.mp3',
    'assets/main_theme_3.mp3',
    'assets/main_theme_2.mp3'
];

let currentTrack = 0;

// Функция загрузки и запуска трека
function loadTrack(index) {
    music.src = playlist[index];
    music.play();
    vinyl.classList.add('playing');
    console.log("Сейчас играет: " + playlist[index]);
}

// Клик по пластинке (Старт/Пауза)
vinyl.addEventListener('click', () => {
    if (music.paused) {
        if (!music.src) { 
            loadTrack(currentTrack); // Если еще ничего не загружено
        } else {
            music.play();
            vinyl.classList.add('playing');
        }
    } else {
        music.pause();
        vinyl.classList.remove('playing');
    }
});

// МАГИЯ: Когда трек закончился, включаем следующий
music.onended = () => {
    currentTrack++;
    if (currentTrack >= playlist.length) {
        currentTrack = 0; // Возвращаемся к первому
    }
    loadTrack(currentTrack);
};

// Инициализация палитры (она у тебя уже работает, просто обновим связь)
var colorPicker = new iro.ColorPicker("#picker", {
    width: 150,
    color: "#ff0055",
    layout: [
        { component: iro.ui.Wheel },
        { component: iro.ui.Slider }
    ]
});

// ГЛАВНЫЙ УЗЕЛ: Связь палитры с рамой
colorPicker.on('color:change', function(color) {
    const modelViewer = document.querySelector('#t8f-model');
    const model = modelViewer.model;
    if (!model) return;

    // Перебираем все материалы в модели
    model.materials.forEach(material => {
        // Красим только тот, что называется Body_Paint
        console.log("Вижу материал:", material.name); if (material.name ==='Body_Paint') {
            material.pbrMetallicRoughness.setBaseColorFactor(color.hexString);
        }
        // Fork_Gold и Black_Rubber скрипт просто проигнорирует
    });
    
    // Снимаем подсветку с кнопок-кружков
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => btn.classList.remove('active'));
});

const mediaModal = document.getElementById('media-modal');
const mediaBtn = document.querySelector('nav span:nth-child(3)'); // Твоя кнопка МЕДИА
const closeBtn = document.querySelector('.close-modal');


// Открыть окно
mediaBtn.onclick = () => { 
    mediaModal.style.display = "block";
    document.body.style.overflow = "hidden"; // БЛОКИРУЕМ скролл фона
}

// Закрыть окно (через крестик)
closeBtn.onclick = () => { 
    mediaModal.style.display = "none";
    document.body.style.overflow = "auto";   // ВОЗВРАЩАЕМ скролл
}

// Закрыть при клике вне окна
window.onclick = (event) => {
    if (event.target == mediaModal) { 
        mediaModal.style.display = "none";
        document.body.style.overflow = "auto"; // ВОЗВРАЩАЕМ скролл
    }
}
