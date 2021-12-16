// leemos los favoritos del localStorage
var favoritos = localStorage.getItem("favoritos") || "[]";
favoritos = JSON.parse(favoritos);

// creamos una lista
var ul = document.createElement("ul");
// para cada producto en favoritos
for (var x = 0; x < favoritos.length; x++) {
  // creamos un elemento de lista
  var li = document.createElement("li");
  // con un enlace al producto
  var a = document.createElement("a");
  a.href = favoritos[x].url;
  a.textContent = favoritos[x].nombre;
  li.appendChild(a);
  ul.appendChild(li);
}
// agregamos el producto donde correspona
document.querySelector("#favoritos").appendChild(ul);