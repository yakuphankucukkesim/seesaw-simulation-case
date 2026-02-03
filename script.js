const simulationArea = document.querySelector('.seesaw-container');
const plankEl = document.querySelector('.plank');
const lblLeftWeight = document.getElementById('left-total');
const lblRightWeight = document.getElementById('right-total');
const btnReset = document.getElementById('reset-btn');

// ekrandaki kutular
let items = [];

// sayfa yüklendiğinde eski veriyi getirir (local storage)
window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('seesaw_data');
    if (savedData) {
        items = JSON.parse(savedData);
        drawItems();
        calculateBalance();
    }
});

// yeni kutu ekleme
plankEl.addEventListener('click', (e) => {
    // plank'ın genişliğini ve pozisyonunu al
    const plankRect = plankEl.getBoundingClientRect();
    const plankWidth = plankRect.width;

    // tıklanan noktanın sol kenara uzaklığı
    const clickX = e.clientX - plankRect.left;

    // pivot noktası (tam orta)
    const pivotPoint = plankWidth / 2;

    // merkeze olan uzaklık
    const distanceFromPivot = clickX - pivotPoint;

    // 1-10 arası rastgele ağırlık
    const randomWeight = Math.floor(Math.random() * 10) + 1;

    // renk skalası için light-heavy tipi belirleme
    let weightClass = 'box-normal';
    if (randomWeight < 4) weightClass = 'box-light';
    if (randomWeight > 7) weightClass = 'box-heavy';

    // yeni item objesi
    const newItem = {
        id: Date.now(), // unique id
        weight: randomWeight,
        distance: distanceFromPivot,
        leftPercent: (clickX / plankWidth) * 100, // css için % konumu
        cssClass: weightClass
    };

    items.push(newItem);
    playThudSound(); // ses efekti

    // state'i kaydet ve ekranı yenile
    localStorage.setItem('seesaw_data', JSON.stringify(items));
    drawItems();
    calculateBalance();
});

// ekrana kutuları basmak
function drawItems() {
    // önce temizle
    plankEl.innerHTML = '';

    items.forEach(item => {
        const box = document.createElement('div');
        box.className = `weight-box ${item.cssClass}`;
        box.innerText = item.weight;
        box.style.left = `${item.leftPercent}%`; // responsive olması için % kullandım

        // kutuyu plank içine ekle
        plankEl.appendChild(box);
    });
}

// fizik ve denge hesabı
function calculateBalance() {
    // reduce ile toplam ağırlık ve tork hesabı
    // tork = kuvvet * yol

    const result = items.reduce((acc, item) => {
        if (item.distance < 0) {
            // sol taraf
            acc.leftWeight += item.weight;
            acc.leftTorque += item.weight * Math.abs(item.distance);
        } else {
            // sağ taraf
            acc.rightWeight += item.weight;
            acc.rightTorque += item.weight * item.distance;
        }
        return acc;
    }, { leftWeight: 0, rightWeight: 0, leftTorque: 0, rightTorque: 0 });

    // UI güncelleme
    lblLeftWeight.innerText = result.leftWeight;
    lblRightWeight.innerText = result.rightWeight;

    // açı hesabı
    // tork farkını sabit bölerek açıyı buluyoruz.
    // 55 değerini deneme yanılma ile buldum, animasyon en doğal bu hızda duruyor.
    const sensitivity = 55;
    let rotationAngle = (result.rightTorque - result.leftTorque) / sensitivity;

    // maksimum açı kontrolü
    if (rotationAngle > 30) rotationAngle = 30;
    if (rotationAngle < -30) rotationAngle = -30;

    // rotate işlemini uygula
    simulationArea.style.transform = `rotate(${rotationAngle}deg)`;
}

// reset butonu
btnReset.addEventListener('click', () => {
    items = []; // arrayi boşalt
    localStorage.removeItem('seesaw_data'); // storage'ı temizle

    // UI reset
    plankEl.innerHTML = '';
    simulationArea.style.transform = 'rotate(0deg)';
    lblLeftWeight.innerText = '0';
    lblRightWeight.innerText = '0';
});