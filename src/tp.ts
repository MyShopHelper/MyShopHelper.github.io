let getShopVariants = Array.from(document.getElementsByClassName('dropdown-item') as HTMLCollectionOf<HTMLDivElement>);



for (let i = 0; i < getShopVariants.length; i++) {
    getShopVariants[i].addEventListener('click', ()=>{
        console.log(i)
        switch(i){
            case 0:
                GeneratingShopInf('https://api.npoint.io/b12c4862f71d966e5b09');
                SetCurrentShopIcon(0);
                break;
            case 1:
                GeneratingShopInf('https://api.npoint.io/81672ce55f2217a984dd');
                SetCurrentShopIcon(1)
                break;
            case 2:
                GeneratingShopInf('https://api.npoint.io/ea1bfa229843efc695ef');
                SetCurrentShopIcon(2);
                break
        }
    });
}


function LoadingScreen(){
    let getLoaderBlock = document.querySelector('.loader') as HTMLElement;
    getLoaderBlock.classList.remove('hide');

    setTimeout(()=>{
        getLoaderBlock.classList.remove('loader_display_set');
        getLoaderBlock.classList.add('hide');
    }, 1500);

    getLoaderBlock.classList.add('loader_display_set');
}


function SetCurrentShopIcon(shop_index:number){
    let shopPersonChooseBlock = document.querySelector('.shop_user_choose') as HTMLElement;
    shopPersonChooseBlock.innerHTML = '';
    let img = document.createElement('img');
    switch(shop_index){
        case 0:
            img.src = 'shop icons/header-Green_logo_color.png';
            break;
        case 1:
            img.src = 'shop icons/e-dostavka_new.png';
            break;
        case 2:
            img.src = 'shop icons/santa-logo.png';
            break;
    }
    shopPersonChooseBlock.appendChild(img);

    LoadingScreen();
}




function GeneratingShopInf(shopDataAPI:string){
    let content_block = document.querySelector('.content') as HTMLElement;
    let main_content_block = content_block.querySelector('.row') as HTMLElement

    let productInputToSearch = document.querySelector('#product_input') as HTMLInputElement;
    let ProductGrid = (document.querySelector('.content') as HTMLInputElement).childNodes[1].childNodes[1] as HTMLElement;

    fetch(shopDataAPI)
    .then(res => res.json())
    .then(json => {
        let [start_size, jsonToMass, product_counter, end_search_counter] = [0, json['products'], 0, 5]

        let search_mass:object[] = [];

        main_content_block.innerHTML = '';

        GenProducts(start_size, jsonToMass)


        productInputToSearch.addEventListener('keyup', ()=>{
            [search_mass, product_counter, end_search_counter, ProductGrid.innerText] = [[], 0, 0, ''];

            let filterValue = productInputToSearch.value;

            for (let i = 0; i < json['products'].length; i++){
                if(json['products'][i]['product'].toUpperCase().startsWith(filterValue.toUpperCase()) && !/^[a-zA-Z]*$/g.test(filterValue)){
                    if(product_counter < 6){
                        CardCreation(json['products'][i]['img'], json['products'][i]['product'], json['products'][i]['price']);
                        product_counter += 1;
                    }
                    else{
                        search_mass.push(json['products'][i]);
                    }
                }
            }


            console.log(search_mass);


            window.onscroll = ()=>{
                if(((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && search_mass.length !== 0 && search_mass.length >= end_search_counter){
                    GenProducts(end_search_counter += 5, search_mass);
                }
            }


            if(filterValue === ''){
                [start_size, ProductGrid.innerText] = [0 , ''];
                GenProducts(start_size, jsonToMass);
                AddingProduct(start_size, jsonToMass);
            }
        })

        AddingProduct(start_size, jsonToMass);
    })


    function GenProducts(products_to_gen:number, json:object[]){
        
        if(products_to_gen + 5 > json.length && json.length > products_to_gen){
            for (let i = products_to_gen; i < json.length; i++){
                let getObj = json[i];
                CardCreation(getObj['img' as keyof typeof getObj], getObj['product' as keyof typeof getObj], getObj['price' as keyof typeof getObj])
            }
        }
        else if(products_to_gen + 5 > json.length && json.length < products_to_gen){
            for (let i = 0; i < json.length; i++){
                let getObj = json[i];
                CardCreation(getObj['img' as keyof typeof getObj], getObj['product' as keyof typeof getObj], getObj['price' as keyof typeof getObj])
            }
        }
        else{
            for (let i = products_to_gen; i < products_to_gen + 5; i++){
                let getObj = json[i];
                CardCreation(getObj['img' as keyof typeof getObj], getObj['product' as keyof typeof getObj], getObj['price' as keyof typeof getObj])
            }
        }

    }



    function AddingProduct(start_size:number, json:object[]){
        window.onscroll = ()=>{
            if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight))
                GenProducts(start_size += 5, json);
        };
    }




    function CardCreation(img:string, product_name:string, price:string){
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
}