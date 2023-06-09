
const BASE_URL_PIZZAS = 'http://localhost:3000/api/pizzas/';

  function CargarPizzas() {
    console.log("Estoy en CargarPizzas");
    axios
      .get("http://localhost:3000/api/pizzas/")
      
      .then((result) => {
        const pizza = result.data;
        var index= 0;
  
        pizza.map((pizza, index) => {
          const {Nombre , Importe, Descripcion} = pizza;
  
          document.querySelector("#listado").innerHTML += `
          <div class="col-4 pt-5">
          <div class="card" style="width:18rem;">
          <div class="card-body">
          <div class="alert alert-success" role="alert">
          <center><h5 class="card-title nombre">${Nombre}</h5></center>
          <center><p >$${Importe}</p></center><br>
          <center><p >${Descripcion}</p></center>
          <p class="card-text"></p>
          </div>
          </div>
          </div>
          </div>
         `;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function CargarIngredientes() {
    console.log("Estoy en CargarIngredientes");
    axios
      .get("http://localhost:3000/api/ingredientes/")
      
      .then((result) => {
        const ingrediente = result.data;
        var index= 0;
  
        pizza.map((Ingrediente, index) => {
          const {Nombre} = Ingrediente;
  
          document.querySelector("#listado").innerHTML += `
          <div class="col-4 pt-5">
          <div class="card" style="width:18rem;">
          <div class="card-body">
          <div class="alert alert-success" role="alert">
          <center><h5 class="card-title nombre">${Nombre}</h5></center>
          <p class="card-text"></p>
          </div>
          </div>
          </div>
          </div>
         `;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getById(){
    let id = document.getElementById('txtId').value;
    //let url =(BASE_URL_PIZZAS + id);
    console.log('getById: ', id);
    axios
      .get("http://localhost:3000/api/pizzas/" + id)
      .then((result) => {
        
        //console.log(response.data);
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response.headers);
        //console.log(response.config);
        displayUnaPizza(result.data, false);
      })
      .catch(error => {
        displayUnaPizza({}, true);
      });
  }

  function getByIdIngrediente(){
    let id = document.getElementById('IdIngrediente').value;

    console.log('getByIdIngrediente: ', id);
    axios
      .get("http://localhost:3000/api/ingredientes/" + id)
      .then((result) => {
        displayUnIngrediente(result.data, false);
      })
      .catch(error => {
        displayUnIngrediente({}, true);
      });
  }

  function displayUnaPizza(unaPizza, huboError){
    let estilo = 'table-dark';
    if (huboError){
      estilo = 'table-danger';
    }
    let table = '<table class="table table-striped table-hover">';
    table += `<thead class="${estilo}"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th><th class="col-5">Descripcion</th><th class="col-2 text-center">Importe</th><th class="col-1 text-center">Libre Gluten</th></tr></thead>`;
      table += `<tr>`;
      table += `<td scope="col" class="text-center">${unaPizza.Id}</td>`;
      table += `<td scope="col">${unaPizza.Nombre}</td>`;
      table += `<td scope="col">${unaPizza.Descripcion}</td>`;
      table += `<td scope="col" class="text-center">${unaPizza.Importe}</td>`;
      table += `<td scope="col" class="text-center">${unaPizza.LibreGluten}</td>`;
      table += `</tr>`;
      table += "</table>";
    document.getElementById("listado").innerHTML = table;
  }

  function displayUnIngrediente(unIngrediente, huboError){
    let estilo = 'table-dark';
    if (huboError){
      estilo = 'table-danger';
    }
    let table = '<table class="table table-striped table-hover">';
    table += `<thead class="${estilo}"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th><th class="col-5">Descripcion</th><th class="col-2 text-center">Importe</th><th class="col-1 text-center">Libre Gluten</th></tr></thead>`;
      table += `<tr>`;
      table += `<td scope="col" class="text-center">${unIngrediente.Id}</td>`;
      table += `<td scope="col">${unIngrediente.Nombre}</td>`;
      table += `</tr>`;
      table += "</table>";
    document.getElementById("listado").innerHTML = table;
  }


  function Insert(){
  
    let url = "http://localhost:3000/api/pizzas/"

    const parametros = {
      Nombre: document.getElementById('InputNombre').value,
      LibreGluten: document.getElementById('CheckInputLibredeGluten').checked,
      Importe: document.getElementById('InputImporte').value,
      Descripcion: document.getElementById('InputDescripcion').value
    }

    console.log(parametros);
    /*
      document.getElementById('InputNombre').value='';
      document.getElementById('CheckInputLibredeGluten').value='';
      document.getElementById('InputImporte').value='';
      document.getElementById('InputDescripcion').value='';
    */
    axios
      .post (url, parametros)
      .then(() => {

        document.querySelector("#listado").innerHTML += ""
        document.querySelector("#listado").innerHTML += `<p> La pizza ha sido creada</p>`
      
      })
      .catch(error => {
        console.log(error);
      });
      return false;
  }

  function Update(){
  
    let url = "http://localhost:3000/api/pizzas/"

    const parametros = {

      Id: document.getElementById('upadteId').value,
      Nombre: document.getElementById('upadteNombre').value,
      LibreGluten: document.getElementById('upadteLibredeGluten').value,
      Importe: document.getElementById('upadteImporte').value,
      Descripcion: document.getElementById('upadteDescripcion').value
    }

    console.log(parametros);

      document.getElementById('upadteId').value = '';
      document.getElementById('upadteNombre').value='';
      document.getElementById('upadteLibredeGluten').value='';
      document.getElementById('upadteImporte').value='';
      document.getElementById('upadteDescripcion').value='';
    
    axios
      .put (url, parametros)
      .then(() => {

        document.querySelector("#listado").innerHTML += ""
        document.querySelector("#listado").innerHTML += `<p> La pizza ha sido actualizada</p>`
      
      })
      .catch(error => {
        console.log(error);
      });
      return false;
  }

  function Delete(){

   let borrar =  document.getElementById('deleteId');
  
    let url = "http://localhost:3000/api/pizzas/" + borrar.value

   

    axios
      .delete (url)
      .then(() => {

        document.querySelector("#listado").innerHTML += ""
        document.querySelector("#listado").innerHTML += `<p> La pizza ha sido eliminada</p>`
      
      })
      .catch(error => {
        console.log(error);
        document.querySelector("#listado").innerHTML += ""
        document.querySelector("#listado").innerHTML += `<p> La pizza no existe</p>`
      });
      return false;
  }


