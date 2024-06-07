// all phone data load
const loadPhoneData = async(phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    allPhones = data.data;
    displayPhones(allPhones, false);
}

// all phone data show
const displayPhones = (phones, isShow) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    const ShowAllButtonSection = document.getElementById('Show-all-button-section');
    
    if (!isShow && phones.length > 6) {
        ShowAllButtonSection.classList.remove('hidden');
        phones = phones.slice(0, 6);
    } else {
        ShowAllButtonSection.classList.add('hidden');
    }

    for (const phone of phones) {
        const div = document.createElement('div');
        div.classList = "card w-80 bg-blue-50 shadow-xl shadow-blue-500/50 mx-auto";
        div.innerHTML = `
            <figure class="px-5 pt-5">
                <img src="${phone.image}" alt="Phone Image" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                    <button class="btn bg-blue-500 text-white hover:bg-blue-400">Buy Now</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(div);
    }
    
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.add('hidden');
}

// search phone
document.getElementById('search-button').addEventListener('click', function() {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.remove('hidden');
    loadPhoneData(searchFieldValue);
    searchField.value = '';
});

const showAll = () => {
    displayPhones(allPhones, true);
}