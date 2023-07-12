let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let deletAllItems = document.getElementById("deletAllItems");
let searchinput = document.getElementById("searchinput");
let temp;
let mood = "Create"
//get total 

function getTotal() {
    if (price.value) {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(50, 172, 68)";
    }
}

// add products
let products = [];
if (localStorage.products != null) {
    products = JSON.parse(localStorage.products)
    displayDate();
}

//add prouct
submit.onclick = function () {
    let product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (title.value != '' && price.value != '' && category.value != "" && count.value <= 100) {
        if (mood == "Create") {
            if (product.count > 1) {
                for (let i = 0; i < product.count; i++) {
                    products.push(product);
                }
            } else {
                products.push(product);
            }
        }
        else {
            products[temp] = product;
            submit.innerHTML = "Create"
            total.innerHTML = ''
            total.style.background = " rgb(50, 172, 68)"
        }

        localStorage.setItem("products", JSON.stringify(products))
        cearInputs();
        displayDate()
    }
}

function cearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML - '';
    count.value = '';
    category.value = '';

}

function displayDate() {
    let cartona = '';
    for (let i = 0; i < products.length; i++) {
        cartona += `
     <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick=updatedata(${i})>update</button></td>
        <td><button onclick=deleteItem(${i})>delete</button></td>
    </tr>
        `
    }
    tbody.innerHTML = cartona;

    if (products.length > 0) {
        deletAllItems.innerHTML = `
        <button id="btndeleteAll" onclick="deletAll()">Delet All (${products.length})</button>
        `

    }
    else {
        deletAllItems.innerHTML = "";
    }


}
function deleteItem(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products))
    displayDate()

}


function deletAll() {
    const confirmDelete = confirm("Are you sure you want to delete this data?");

    if (confirmDelete) {
        localStorage.clear();
        products.splice(0)
    } else {
        return;
    }

    displayDate()

}


function updatedata(i) {
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    getTotal()
    // total.innerHTML = products[i].total;
    count.style.display = "none"
    submit.innerHTML = "update"
    temp = i;
    mood = "update"

    scroll({ top: 0, behavior: "smooth" })


}

let mode = "title"
function searchmode(id) {
    if (id == "searchtitle") {
        mode = "title"
    }
    else {
        mode = "categoery"
    }
    searchinput.placeholder = `search by ${mode} `
    searchinput.value = ''
    searchinput.focus()
    displayDate()



}
function search() {
    let cartona = '';
    for (let i = 0; i < products.length; i++) {
        if (mode == "title") {

            if (products[i].title.toLowerCase().includes(searchinput.value.toLowerCase()))
                cartona += `
     <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick=updatedata(${i})>update</button></td>
        <td><button onclick=deleteItem(${i})>delete</button></td>
    </tr>
        `


        }
        else {

            if (products[i].category.toLowerCase().includes(searchinput.value.toLowerCase()))
                cartona += `
     <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick=updatedata(${i})>update</button></td>
        <td><button onclick=deleteItem(${i})>delete</button></td>
    </tr>
        `
        }

    }


    tbody.innerHTML = cartona;



}