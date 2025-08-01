const container = document.querySelector('.container');
const search = document.getElementById('search');
const select = document.getElementById('select');
const loader = document.getElementById('loader');

let allUsers = []; // Barcha userlar uchun global massiv

// Loaderni ko‘rsatish
loader.style.display = "block";

// API orqali ma’lumotni olish
fetch("https://randomuser.me/api/?results=100")
    .then(res => res.json())
    .then(data => {
        allUsers = data.results; // Barchasini saqlab qo‘yamiz
        displayData(allUsers);   // Ekranga chiqaramiz
        loader.style.display = "none"; // Loaderni yashirish
    });

// Qidiruv funksiyasi
search.addEventListener('input', () => {
    const searchTerm = search.value.toLowerCase();
    const filteredData = allUsers.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm)
    );
    displayData(filteredData);
});

// Saralash funksiyasi
select.addEventListener('change', () => {
    const selectedOption = select.value;
    let sortedData = [...allUsers]; // Nusxa olish (aslini o‘zgartirmaslik uchun)

    if (selectedOption === 'Ism bo\'yicha saralash') {
        sortedData.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (selectedOption === 'Yoshi bo\'yicha saralash') {
        sortedData.sort((a, b) => a.dob.age - b.dob.age);
    }

    displayData(sortedData);
});

// Ma'lumotlarni ekranga chiqarish
function displayData(users) {
    container.innerHTML = '';
    users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
            <h2>${user.name.first} ${user.name.last}</h2>
            <h3>Yosh: ${user.dob.age}</h3>
            <h3>Telefon: ${user.phone}</h3>
            <p>Email: ${user.email}</p>
            <p class="address">Manzil: ${user.location.city}</p>
        `;
        container.appendChild(card);
    });
}
