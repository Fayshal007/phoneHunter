// all phone data load
const loadPhoneData = async (searchText = '13', phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    phones = data.data;

    displayPhones(phones, false);
}


// all phone data show
const displayPhones = (phones, isShow) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    const ShowAllButtonSection = document.getElementById('Show-all-button-section');
    if (phones.length > 12) {
        ShowAllButtonSection.classList.remove('hidden')
    } else {
        ShowAllButtonSection.classList.add('hidden')
    }
    let phonesToDisplay = phones.slice(0, 6);
    if (isShow) {
        phonesToDisplay = phones;
        ShowAllButtonSection.classList.add('hidden')
    }
    for (const phone of phonesToDisplay) {
        const div = document.createElement('div');
        div.classList = "card w-80 bg-blue-50 shadow-xl shadow-blue-500/50 mx-auto";
        div.innerHTML = `
            <figure class="px-5 pt-5">
                <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                <button onclick="showDetails('${phone.slug}'); my_modal_5.showModal()" class="btn bg-blue-500 text-white hover:bg-blue-400">Show Details</button>
                </div>
            </div>
        `
        phonesContainer.appendChild(div)
    }
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.add('hidden');
}


//search phone
document.getElementById('search-button').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.remove('hidden');
    loadPhoneData(searchFieldValue);

    searchField.value = ''
})


const showAll = () => {
    const isShow = true;
    displayPhones(phones, isShow);
}

const showDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data.data);
    const showDetailsConatiner = document.getElementById("show-details-container");
    showDetailsConatiner.innerHTML = `
        <img class="mx-auto" src="${data.data.image}">
        <h3 id="phone-name" class="font-bold text-lg">${data.data.name}</h3>
        <p class="py-4"><b>Storage : </b>${data.data.mainFeatures.storage}</p>
        <p class="py-4"><b>Display Size :</b> ${data.data.mainFeatures.displaySize}</p>
        <p class="py-4"><b>Chipset :</b> ${data.data.mainFeatures.chipSet}</p>
        <p class="py-4"><b>Memory :</b> ${data.data.mainFeatures.memory}</p>
        <p class="py-4"><b>Release data : </b>${data.data.releaseDate}</p>
        <p class="py-4"><b>Brand : </b> ${data.data.brand}</p>
        <p class="py-4"><b>GPS : </b> ${data.data.others.GPS}</p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn bg-blue-500 text-white hover:bg-blue-400">Close</button>
            </form>
        </div>
    `
}

loadPhoneData()

// https://openapi.programming-hero.com/api/phone/${id}