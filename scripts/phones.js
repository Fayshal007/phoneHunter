// all phone data load
const loadPhoneData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}


// all phone data show
const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phones-container')
    for (const phone of phones) {
        console.log(phone);
        const div = document.createElement('div');
        div.classList = "card w-80 bg-blue-50 shadow-xl shadow-blue-500/50 mx-auto"
        div.innerHTML = `
            <figure class="px-5 pt-5">
                <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                <button class="btn bg-blue-500 text-white hover:bg-blue-400">Buy Now</button>
                </div>
            </div>
        `
        phonesContainer.appendChild(div)
    }
}

loadPhoneData()