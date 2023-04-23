let content_block = document.querySelector('.content') as HTMLElement;
let main_content_block = content_block.querySelector('.row') as HTMLElement


let productInputToSearch = document.querySelector('#product_input') as HTMLInputElement;
let ProductGrid = (document.querySelector('.content') as HTMLInputElement).childNodes[1].childNodes[1] as HTMLElement;
let valExp = /^[a-zA-Z]+$/;


fetch('https://api.npoint.io/b12c4862f71d966e5b09')
    .then(res => res.json())
    .then(json => {
        let start_size = 0;

        let product_counter = 0;
        let search_mass:object[] = [];

        let end_search_counter = 5;

        GenProducts(start_size, json, false)



        productInputToSearch.addEventListener('keyup', ()=>{
            search_mass = [];

            product_counter = 0;
            end_search_counter = 0; 

            ProductGrid.innerText = ''

            let filterValue = productInputToSearch.value;


            for (let i = 0; i < json['products'].length; i++){
                if(json['products'][i]['product'].toUpperCase().startsWith(filterValue.toUpperCase()) && !/^[a-zA-Z]*$/g.test(filterValue)){
                    if(product_counter < 6){
                        CardCreation(json['products'][i]['img'], json['products'][i]['product'], json['products'][i]['price'])
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
                    console.log('work');
                    end_search_counter += 5;
                    GenProducts(end_search_counter, search_mass, true);
                }
            }

            if(filterValue === ''){
                start_size = 0;
                ProductGrid.innerText = ''
                GenProducts(start_size, json, false);
                AddingProduct(start_size, json, json['products'].length);
            }
        })

        AddingProduct(start_size, json, json['products'].length);
    })


function GenProducts(products_to_gen:number, json:object, reloader:boolean){
    if(reloader){
        for (let i = products_to_gen; i < products_to_gen + 5; i++)
            CardCreation(json[i as keyof typeof json]['img'], json[i as keyof typeof json]['product'], json[i as keyof typeof json]['price'])
    }
    else{
        for (let i = products_to_gen; i < products_to_gen + 5; i++)
            CardCreation(json['products' as keyof typeof json][i]['img'], json['products' as keyof typeof json][i]['product'], json['products' as keyof typeof json][i]['price'])
    }
}


function AddingProduct(start_size:number, json:object, json_length:number){
    window.onscroll = ()=>{
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && start_size < json_length) {
            console.log('main worked')
            start_size += 5;
            GenProducts(start_size, json, false);
        }
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