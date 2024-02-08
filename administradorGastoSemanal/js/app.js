// variables 
// aqui se generan los gastos que se tienen
const gastos = document.querySelector('#gastos');

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

// form agregar gasto
const agregarGasto = document.querySelector('#agregar-gasto')




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

    errorGastoVacio(){
        inputGasto.style.border = 'solid red 1px'
    }

    errorCantidadVacio(){
        inputCantidad.style.border = 'solid red 1px'
    }

    agregarGasto(nombre, cantidad){
        console.log(`${nombre}, ${cantidad}`)
        const div = document.createElement('li')
        div.classList.add('inline-block')
        div.innerHTML = `<p>${nombre}</p> 
                        <p>${cantidad}</p>  
                        <button> BORRAR</button>
                        `
        gastos.appendChild(div)
    }
}

// Segunda clase para manejar el presupuesto

class Presupuesto{


}


// llamando a las instancias 
const ui = new UI();






//eventos 
window.addEventListener('DOMContentLoaded', () =>{

    //const montoPresupuesto = ui.pedirPresupuesto();
    //const presupuestoValido = ui.validarPresupuesto(montoPresupuesto);
    //ui.agregandoPresupuestoTotal(presupuestoValido);
    //ui.errorGastoVacio();
    //ui.errorCantidadVacio();

    agregarBtn.addEventListener('click', agregarAlListado);

})


//funciones

function agregarAlListado(e){
    e.preventDefault();
    

    // mostrando el presupuesto en la vista 
    ui.agregarGasto(inputGasto.value, inputCantidad.value)
    
    
    

    



}