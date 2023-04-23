"use strict";
let content_block = document.querySelector('.content');
let main_content_block = content_block.querySelector('.row');
let productInputToSearch = document.querySelector('#product_input');
let ProductGrid = document.querySelector('.content').childNodes[1].childNodes[1];
let valExp = /^[a-zA-Z]+$/;
fetch('https://api.npoint.io/b12c4862f71d966e5b09')
    .then(res => res.json())
    .then(json => {
    let start_size = 0;
    let product_counter = 0;
    let search_mass = [];
    let end_search_counter = 5;
    GenProducts(start_size, json, false);
    productInputToSearch.addEventListener('keyup', () => {
        search_mass = [];
        product_counter = 0;
        end_search_counter = 0;
        ProductGrid.innerText = '';
        let filterValue = productInputToSearch.value;
        for (let i = 0; i < json['products'].length; i++) {
            if (json['products'][i]['product'].toUpperCase().startsWith(filterValue.toUpperCase()) && !/^[a-zA-Z]*$/g.test(filterValue)) {
                if (product_counter < 6) {
                    CardCreation(json['products'][i]['img'], json['products'][i]['product'], json['products'][i]['price']);
                    product_counter += 1;
                }
                else {
                    search_mass.push(json['products'][i]);
                }
            }
        }
        console.log(search_mass);
        window.onscroll = () => {
            if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && search_mass.length !== 0 && search_mass.length >= end_search_counter) {
                console.log('work');
                end_search_counter += 5;
                GenProducts(end_search_counter, search_mass, true);
            }
        };
        if (filterValue === '') {
            start_size = 0;
            ProductGrid.innerText = '';
            GenProducts(start_size, json, false);
            AddingProduct(start_size, json, json['products'].length);
        }
    });
    AddingProduct(start_size, json, json['products'].length);
});
function GenProducts(products_to_gen, json, reloader) {
    if (reloader) {
        for (let i = products_to_gen; i < products_to_gen + 5; i++)
            CardCreation(json[i]['img'], json[i]['product'], json[i]['price']);
    }
    else {
        for (let i = products_to_gen; i < products_to_gen + 5; i++)
            CardCreation(json['products'][i]['img'], json['products'][i]['product'], json['products'][i]['price']);
    }
}
function AddingProduct(start_size, json, json_length) {
    window.onscroll = () => {
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && start_size < json_length) {
            console.log('main worked');
            start_size += 5;
            GenProducts(start_size, json, false);
        }
    };
}
function CardCreation(img, product_name, price) {
    main_content_block.innerHTML +=
        `
    <div class = 'col-sm-12 col-md-6 col-lg-4 col-xl-3 card_wrapper'>
        <div class="card">
            <div class = 'picture_wrapper'>
                <img src="${img}" class="card-img-top" alt="13">
            </div>

            <div class="card-body">
            <h5 class="card-title">${product_name}</h5>
            <p class="card-text">${price}</p>
            <a href="#" class="btn btn-primary">Add to stock</a>
            </div>
        </div>
    </div>
    `;
}
