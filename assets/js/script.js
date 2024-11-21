// DOM elements

const botonFormularioEl = document.getElementById("botonFormulario");
const nombreGastoEl = document.getElementById("nombreGasto");
const valorGastoEl = document.getElementById("valorGasto");
const listaDeGastosEl = document.getElementById("listaDeGastos");
const totalGastosEl = document.getElementById("totalGastos");

// Global variables

let nombresArr = [];
let gastosArr = [];
let sum = 0;
let precio = 0;
let listado = "";

// Functions

function clickBoton() {
    let nombre = nombreGastoEl.value;
    let gasto = valorGastoEl.value;

    const textPattern = /^[a-zA-Z\s]+$/;

    if (!textPattern.test(nombre)) {
        alert("Please enter a valid product name (letters only).");
        return;
    }

    if (isNaN(gasto) || gasto.trim() === "") {
        alert("Please enter a valid price (numbers only).");
        return;
    }

    nombresArr.push(nombre);
    gastosArr.push(Number(gasto));

    if(gasto > 150) {
        alert("Esta registrando un gasto mayor a 150 USD");
    }

    renderProducts();
}



function eliminar(index) {
    nombresArr.splice(index, 1);
    gastosArr.splice(index, 1);
    renderProducts();
}



function renderProducts() {

    sum = 0;
    listado = "";

    if (nombresArr.length === 0) {
        totalGastosEl.textContent = "0.00";
    } else {
        nombresArr.forEach(function (item, index) {
            let gasto = gastosArr[index];
            sum += gasto;
            listado += `<li>Producto: ${item} - Precio USD: ${gasto.toFixed(2)}
            <button class="editarBtn" onclick="editar(${index});">Editar</button>
            <button  class="eliminarBtn"onclick="eliminar(${index});">Eliminar</button>
            </li>`;
        });

        totalGastosEl.textContent = sum.toFixed(2);
    }

    listaDeGastosEl.innerHTML = listado;
    nombreGastoEl.value = "";
    valorGastoEl.value = "";
}



function editar(index) {
    console.log("Clicked edit button");
    const liElement = listaDeGastosEl.children[index];

    liElement.innerHTML = `
        <input id="product_name" type="text" value="${nombresArr[index]}" />
        <input id="product_price" type="number" value="${gastosArr[index]}" />
        <button class="saveEditBtn" onclick="saveEdit(${index});">Actualizar</button>
        <button class="cancelEditBtn" onclick="cancelEdit(${index});">Cancelar</button>
    `;
}



function saveEdit(index) {

    const newProductName = document.getElementById("product_name").value;
    const newProductPrice = document.getElementById("product_price").value;

    nombresArr[index] = newProductName;
    gastosArr[index] = Number(newProductPrice);

    renderProducts();
}



function cancelEdit(index) {
    renderProducts();
}





