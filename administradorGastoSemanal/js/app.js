// variables 
// aqui se generan los gastos que se tienen
const gastosView = document.querySelector('#gastos ul');

// input de gasto 
const inputGasto = document.querySelector('#gasto');

// input cantidad 
const inputCantidad = document.querySelector('#cantidad')

// btn de agregar 
const agregarBtn = document.querySelector('button[type="submit"]')

// total del presupuesto 
const totalPresupuesto = document.querySelector('#total')

//restante
const restantePresupuesto = document.querySelector('#restante')

const primario = document.querySelector('.primario')
// form agregar gasto

const formulario = document.querySelector('#agregar-gasto')




// clases 

// primera clase para manejear el UI

class UI{

    #flagPresupuesto = true;

    pedirPresupuesto(){
        const presupuesto = Number(prompt('Ingersar presupuesto')) || '';
        return presupuesto;
    }

    validarPresupuesto(presupuesto){
        
        while(this.#flagPresupuesto){

            if (presupuesto <= 0 || typeof(presupuesto) === ''){
                presupuesto =  this.pedirPresupuesto();
            }else{
                this.#flagPresupuesto = false
                return presupuesto
            }
        }
    }

    agregandoPresupuestoTotal(presupuesto){
        totalPresupuesto.textContent = presupuesto;
        restantePresupuesto.textContent = presupuesto;
    }

    MostrarAlerta(mensaje, tipoMensaje){

        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert');

        if (tipoMensaje === 'error'){
            
            divMensaje.classList.add('alert-danger');

            inputGasto.style.border = 'solid red 1px';
            inputCantidad.style.border = 'solid red 1px';

            setTimeout(()=>{
                inputGasto.style.border = '';
                inputCantidad.style.border = '';
                divMensaje.remove()
            },3000)

        }else{
            divMensaje.classList.add('alert-success');

            setTimeout(()=>{
                divMensaje.remove()
            },3000)

        }

        divMensaje.textContent = mensaje;

        primario.insertBefore(divMensaje, formulario)


        
    }


    mostrarGastos(gastos){
        limpiarHMTL()
        gastos.forEach((gasto) =>{
            // quitamos los valores del objeto
            const {nombreGasto, cantidad, id} = gasto;
            

            // creamos un li 
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center' ;
            nuevoGasto.dataset.id = id;

            // Creamos el HTML del gasto
            nuevoGasto.innerHTML = `<p>${nombreGasto}</p> <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>`;

            // Creando el btn para eliminar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'x'
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            

            // funcion para eliminar 
            btnBorrar.onclick = () => {eliminarGasto(id)}

            nuevoGasto.appendChild(btnBorrar)


            // agergamos a la vista
            gastosView.appendChild(nuevoGasto);

        })

        
        
    }

    comprobarPresupuesto(presupuestoObj){
        const { presupuesto, restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');

        // comprobar 25%
        if ((presupuesto/4) >= restante){
            restanteDiv.classList.remove('alert-success', 'alert-warning')
            restanteDiv.classList.add('alert-danger')
        }else if ((presupuesto / 2) >= restante){
            restanteDiv.classList.remove('alert-success')
            restanteDiv.classList.add('alert-warning')
        }else{
            restanteDiv.classList.remove('alert-warning', 'alert-warning')
            restanteDiv.classList.add('alert-success')
        }

        if (restante <= 0){
            ui.MostrarAlerta('Se ha acabado el presupuesto', 'error')
            agregarBtn.disabled = true;
            
        }else{
            agregarBtn.disabled = false;
        }

    }

    
}

// Segunda clase para manejar el presupuesto

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.listaGastos = [];
    }

    agregandoGasto(gasto){
        this.listaGastos = [...this.listaGastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.listaGastos.reduce( (acc, gasto) => acc += gasto.cantidad , 0);
        this.restante = this.presupuesto - gastado;

        restantePresupuesto.textContent = this.restante;
    }

    eliminarGasto(id){
        this.listaGastos = this.listaGastos.filter((gasto) => gasto.id !== id )
        
        this.calcularRestante()
    }



}


// llamando a las instancias 
const ui = new UI();
let budget;



//eventos 
window.addEventListener('DOMContentLoaded', () =>{

    const montoPresupuesto = ui.pedirPresupuesto();
    const presupuesto = ui.validarPresupuesto(montoPresupuesto);
    budget = new Presupuesto(presupuesto);
    ui.agregandoPresupuestoTotal(presupuesto);
    

    agregarBtn.addEventListener('click', agregarAlListado);

})


//funciones

function agregarAlListado(e){
    e.preventDefault();

    const nombreGasto = inputGasto.value;
    const cantidad = Number(inputCantidad.value);


    // validando ambos inputs 

    if ( nombreGasto === '' ||  cantidad === 0 || isNaN(cantidad)){
        ui.MostrarAlerta('Ambos Campos son obligatorios', 'error')
        return;
    }else if (isNaN(cantidad)){
        ui.MostrarAlerta('Cantidad no valida', 'error')
        return;
    }
    // generar un objeto con el gasto 
    const gasto = { nombreGasto, cantidad, id: Date.now()}
    
    //agregando el gasto al presupuesto 
    budget.agregandoGasto(gasto);

    ui.MostrarAlerta('Gasto guardado correctamente', 'success');

    //agregando el gasto a la vista 
    const {listaGastos} = budget;
    ui.mostrarGastos(listaGastos);

    // comprobamos el estado del presupuesto 
    ui.comprobarPresupuesto(budget);

    //resetando el formulario 
    formulario.reset();
    
    
}


function limpiarHMTL(){

    while (gastosView.firstChild ){
        gastosView.removeChild(gastosView.firstChild)
    }
}

function eliminarGasto(id){

    budget.eliminarGasto(id);
    ui.comprobarPresupuesto(budget)
    ui.mostrarGastos(budget.listaGastos)

}