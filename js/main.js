var nameProd = document.getElementById("nameprod")
var categoryProd = document.getElementById("category")
var priceProd = document.getElementById("price")
var descriptionProd = document.getElementById("description")
var tbody = document.getElementById("tbody")
var search = document.getElementById("search")
var addProdacts = document.getElementById("addProdact")
var currentIndex = 0

if(localStorage.getItem("allProd") === null){
    var proContainer = []
}else{
    proContainer = JSON.parse(localStorage.getItem("allProd"))
    console.log(proContainer)
    dispayProd()
}

function createProduct(){
    var allProducts = {
        pname : nameProd.value,
        category : categoryProd.value,
        price : priceProd.value,
        description : descriptionProd.value
    }
    proContainer.push(allProducts)
    console.log(proContainer)
    localStorage.setItem("allProd" , JSON.stringify(proContainer))

    clearProd()
    dispayProd()
}

addProdacts.onclick = function(){
    if(vildationName() == true && nameProd.value != '' && categoryProd.value != '' && priceProd.value != '' && descriptionProd.value != ''){
        if(addProdacts.innerHTML == "AddProduct"){
            createProduct()
        }else{
            updateProd()
        }
    }
    else{
        alert("enter valid input")
    }
}


function clearProd(){
    nameProd.value = '';
    categoryProd.value = '';
    priceProd.value = '';
    descriptionProd.value = '';
}

function dispayProd(){
    var box = '';
    for(var i=0 ; i < proContainer.length ; i++){
        box += `
        <tr>
                        <th>${i + 1}</th>
                        <td>${proContainer[i].pname}</td>
                        <td>${proContainer[i].category}</td>
                        <td>${proContainer[i].price}</td>
                        <td>${proContainer[i].description}</td>
                        <td><button class="btn btn-warning" onclick=retriveProd(${i})><i class="fa-regular fa-pen-to-square text-light"></i></button></td>
                        <td><button onclick=deleteProd(${i}) class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button></td>
        </tr>
        `
    }
    tbody.innerHTML = box
}

function deleteProd(index){
    proContainer.splice(index, 1)
    localStorage.setItem("allProd" , JSON.stringify(proContainer))
    dispayProd()
}

function searchProd(){
    var box = '';
    for(var i=0 ; i < proContainer.length ; i++){
        if(proContainer[i].pname.toLowerCase().includes(search.value.toLowerCase()) || 
        proContainer[i].category.toLowerCase().includes(search.value.toLowerCase())){
            box += `
            <tr>
                            <th>${i + 1}</th>
                            <td>${proContainer[i].pname}</td>
                            <td>${proContainer[i].category}</td>
                            <td>${proContainer[i].price}</td>
                            <td>${proContainer[i].description}</td>
                            <td><button class="btn btn-warning"><i class="fa-regular fa-pen-to-square text-light"></i></button></td>
                            <td><button onclick=deleteProd(${i}) class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button></td>
            </tr>
            `
        }
        tbody.innerHTML = box

        }
}

function retriveProd(index){
    currentIndex = index
    nameProd.value = proContainer[index].pname;
    categoryProd.value = proContainer[index].category;
    priceProd.value = proContainer[index].price;
    descriptionProd.value = proContainer[index].description;
    addProdacts.innerHTML = "update Prodact"

}
function updateProd(){
    var allProducts = {
        pname : nameProd.value,
        category : categoryProd.value,
        price : priceProd.value,
        description : descriptionProd.value
    }
    proContainer[currentIndex] = allProducts
    addProdacts.innerHTML = "AddProduct"
    clearProd()
    localStorage.setItem("allProd" , JSON.stringify(proContainer))
    dispayProd()

}

function vildationName(){
    var nameRedx = /^[A-Z][a-z]{3,9}$/;
    var prodName = nameProd.value
    if(nameRedx.test(prodName) == true){
        return true
    }else{
        return false
    }
}