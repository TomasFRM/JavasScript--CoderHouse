//variables

let sueldoBrutoEmpleadoDeFarmacia = 195000
let sueldoBrutoDirectorTecnicaFarmacia = 280000
let sueldoBrutoFueraDeConv = 0
let horasExtrasBruto = 0
let cantidadDeHorasExtras = 0
const aportesJubilacionGen = 0.11
const contribucionJubilacionGen = 0.16
const aportePamiGen = 0.03
const contribucionPamiGen = 0.2
const aporteOOSSGen = 0.03
const contribucionOOSSGen = 0.06
const aporteCuotaSindicalGen = 0.02
const adicionalTituloGen = 0.2
let aportesJubilacion = 0
let contribucionJubilacion = 0
let aportePami = 0
let contribucionPami = 0
let aporteOOSS = 0
let contribucionOOSS = 0
let aporteCuotaSindical = 0
let totalDescuentos = 0
let sueldoNeto = 0
let totalContribuciones = 0
let puesto = 0
let nombreYApellido = "NA"
let adicionalTitulo = 0
let seguir = false
let nuevoLegajos = 0
let numeroDeLegajo = 0
let sueldoBasico = 0
let tablaDeLiquidaciones = ""
let tablaDeConsultaDeEmpleados = ""
let listaLiquidacion = []


//Array y constructor de lista de empleados-------------------------------------------------

class creandoListaEmpleado {
    constructor(Legajo, Puesto, HorasExt, NYA, SueldoBasico){
        this.Legajo = Legajo;
        this.Puesto = Puesto;
        this.HorasExt = HorasExt;
        this.NYA = NYA.toUpperCase();
        this.SueldoBasico = SueldoBasico
    };
}

let listaEmpleado = [
    {Legajo : "1", Puesto: "1", HorasExt: "5", NYA: "Juan Perez" , SueldoBasico: "195000"},
    {Legajo : "2", Puesto: "2", HorasExt: "10", NYA: "Manuel Rodas", SueldoBasico: "280000"},
    {Legajo : "3", Puesto: "3", HorasExt: "5", NYA: "Vaneza Rodriguez",SueldoBasico: "210000"},
    {Legajo : "4", Puesto: "3", HorasExt: "10", NYA: "Luz Algarate",SueldoBasico: "341880"},
    ]



function sumandoEmpleados (){
    let recuperoListaEmpleados = localStorage.getItem('storageListaEmpleados');
    if (recuperoListaEmpleados != null){
        listaEmpleado= JSON.parse(recuperoListaEmpleados)
    }
    nuevoLegajos = (Number(listaEmpleado.length) + 1)
    listaEmpleado.push (new creandoListaEmpleado( nuevoLegajos, puesto, cantidadDeHorasExtras, nombreYApellido, sueldoBasico))
    let listaEmpleadosStringify = JSON.stringify(listaEmpleado)
    localStorage.setItem("storageListaEmpleados", listaEmpleadosStringify)

}

//array para liquidar--------------------------------------------------------------------------

class creandoArrayLiquidacion {
    constructor(NYA,P, SB, HEB, AJ, AP, AOOSS,TD,SN,AT,ACS,L){
        this.NYA = NYA.toUpperCase();
        this.P=P;
        this.SB = SB;
        this.HEB = HEB;
        this.AJ = AJ;
        this.AP = AP;
        this.AOOSS = AOOSS;
        this.TD = TD;
        this.SN = SN;
        this.AT= AT;
        this.ACS= ACS;
        this.L= L
    };
}
    


function sumandoLiquidaciones (){
    
    if (puesto == 3){
        let recuperoListaLiquidaciones = localStorage.getItem('storageListaLiquidaciones')
        if (recuperoListaLiquidaciones != null){
            listaLiquidacion = JSON.parse(recuperoListaLiquidaciones)
        }
        listaLiquidacion.push (new creandoArrayLiquidacion( nombreYApellido, puesto, sueldoBrutoFueraDeConv, horasExtrasBruto, aportesJubilacion,aportePami,aporteOOSS,totalDescuentos,sueldoNeto,))
        //falta sumar legajo
        let listaLiquidacionesStringify = JSON.stringify (listaLiquidacion)
        localStorage.setItem("storageListaLiquidaciones", listaLiquidacionesStringify)
        listaLiquidacion= []
        console.log(listaLiquidacion)

    }
    else if ( puesto == 1){
        let recuperoListaLiquidaciones = localStorage.getItem('storageListaLiquidaciones')
        if (recuperoListaLiquidaciones != null){
            listaLiquidacion = JSON.parse(recuperoListaLiquidaciones)
        }
        listaLiquidacion.push (new creandoArrayLiquidacion( nombreYApellido, puesto, sueldoBrutoEmpleadoDeFarmacia, horasExtrasBruto, aportesJubilacion,aportePami,aporteOOSS,totalDescuentos,sueldoNeto,adicionalTitulo,aporteCuotaSindical))
        //falta sumar legajo 
        let listaLiquidacionesStringify = JSON.stringify (listaLiquidacion)
        localStorage.setItem("storageListaLiquidaciones", listaLiquidacionesStringify)
        listaLiquidacion= []
     
    }
    else if ( puesto == 2){
        let recuperoListaLiquidaciones = localStorage.getItem('storageListaLiquidaciones')
        if (recuperoListaLiquidaciones != null){
            listaLiquidacion = JSON.parse(recuperoListaLiquidaciones)
        }
        listaLiquidacion.push (new creandoArrayLiquidacion( nombreYApellido, puesto, sueldoBrutoDirectorTecnicaFarmacia, horasExtrasBruto, aportesJubilacion,aportePami,aporteOOSS,totalDescuentos,sueldoNeto,adicionalTitulo,aporteCuotaSindical))
        //falta sumar legajo
        let listaLiquidacionesStringify = JSON.stringify (listaLiquidacion)
        localStorage.setItem("storageListaLiquidaciones", listaLiquidacionesStringify)
        listaLiquidacion= []
       
    }

}

//FUNCIONES HORAS EXTRAS---------------------------------------------------------------------------
function ingreseHorasExtras(){
    cantidadDeHorasExtras = Number(prompt("Ingrese la cantidad de horas extras realizadas"))
}
function calculoDeHorasExtras (){
    if (puesto ==1){
        horasExtrasBruto= (sueldoBrutoEmpleadoDeFarmacia/192 * cantidadDeHorasExtras)*2
        horasExtrasBruto = Math.round(horasExtrasBruto)
    }
    else if(puesto ==2){
        horasExtrasBruto= (sueldoBrutoDirectorTecnicaFarmacia/192 * cantidadDeHorasExtras)*2
        horasExtrasBruto = horasExtrasBruto.toFixed();
        horasExtrasBruto = Math.round(horasExtrasBruto) 
    }
    else if(puesto ==3){
        horasExtrasBruto= (sueldoBrutoFueraDeConv/192 * cantidadDeHorasExtras)*2
        horasExtrasBruto = Math.round(horasExtrasBruto)
    }
}


// funcion consulta de empleados registrados--------------------------------------------------------------------
function consultaDeEmpleados (){
    let recuperoListaEmpleados2 = localStorage.getItem('storageListaEmpleados');
    if(recuperoListaEmpleados2 != null){
        listaEmpleado= JSON.parse(recuperoListaEmpleados2)
    }    
    const consultandoBaseDeDatos = listaEmpleado.map ((resu) =>{
        return {
            Legajo : resu.Legajo,
            NYA : resu.NYA,
            Puesto : resu.Puesto,
            SueldoBasico : resu.SueldoBasico
            }
        }
    )
    let container = document.querySelector(".ListEmpReg")
    container.innerHTML = ""
    for (const persona of consultandoBaseDeDatos ){
        container = document.querySelector(".ListEmpReg")
        tablaDeConsultaDeEmpleados = document.createElement("tr");
        tablaDeConsultaDeEmpleados.innerHTML = "<td>" + persona.Legajo + "</td> <td>" + persona.NYA + "</td><td>" + persona.Puesto + "</td><td>" + persona.SueldoBasico + "</td>";
        container.appendChild(tablaDeConsultaDeEmpleados);




    }

}

//funcion liquidacion Masiva con BUCLE FOR------------------------------------------------------------

function liquidacionMasiva(){
  listaLiquidacion = []

    for (let i = 0; i < listaEmpleadosFiltrado.length; i++){
        if (listaEmpleadosFiltrado[i].Puesto == 1){
            cantidadDeHorasExtras = Number(listaEmpleadosFiltrado[i].HorasExt)
            nombreYApellido = listaEmpleadosFiltrado[i].NYA
            numeroDeLegajo = listaEmpleadosFiltrado[i].Legajo
            liquidacionEmpleadoDeFarmaciaMasiva ()
        }
        else if(listaEmpleadosFiltrado[i].Puesto == 2) {
            cantidadDeHorasExtras = Number(listaEmpleadosFiltrado[i].HorasExt)
            nombreYApellido = listaEmpleadosFiltrado[i].NYA
            numeroDeLegajo = listaEmpleadosFiltrado[i].Legajo
            liquidacionDirectorTecnicoMasiva ()
        }
        else if(listaEmpleadosFiltrado[i].Puesto == 3) {
            cantidadDeHorasExtras = Number(listaEmpleadosFiltrado[i].HorasExt)
            nombreYApellido = listaEmpleadosFiltrado[i].NYA
            numeroDeLegajo = listaEmpleadosFiltrado[i].Legajo
            sueldoBrutoFueraDeConv = Number(listaEmpleadosFiltrado[i].SueldoBasico)
            liquidacionFueraDeConvenioMasiva ()
        }
    }

}

//Funciones de sueldo -----------------------------------------------------------------------------

function calculoAdicionalTitulo(){
    adicionalTitulo = sueldoBrutoDirectorTecnicaFarmacia * adicionalTituloGen
    adicionalTitulo = Math.round(adicionalTitulo)
}
function calculoJubilacion(){
    if (puesto == 1 ){
      aportesJubilacion = (sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto) * aportesJubilacionGen
      aportesJubilacion = Math.round(aportesJubilacion)
    }
    else if (puesto == 2) {
        aportesJubilacion = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * aportesJubilacionGen
        aportesJubilacion = Math.round(aportesJubilacion)

    }
    else if (puesto == 3){
        aportesJubilacion = (sueldoBrutoFueraDeConv  + horasExtrasBruto)* aportesJubilacionGen
        aportesJubilacion = Math.round(aportesJubilacion)
    }

}
function calculoContribucionJubi() {
    if (puesto == 1){
        contribucionJubilacion = (sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto) * contribucionJubilacionGen
        contribucionJubilacion = Math.round(contribucionJubilacion)
    }
    else if (puesto == 2) {
        contribucionJubilacion = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * contribucionJubilacionGen
        contribucionJubilacion = Math.round(contribucionJubilacion)
    }
    else if (puesto == 3){
        contribucionJubilacion = (sueldoBrutoFueraDeConv + horasExtrasBruto) * contribucionJubilacionGen
        contribucionJubilacion = Math.round(contribucionJubilacion)
    }

}
function calculoPami(){
    if (puesto == 1 ){
        aportePami = (sueldoBrutoEmpleadoDeFarmacia  + horasExtrasBruto) * aportePamiGen
        aportePami = Math.round(aportePami)
      }
      else if (puesto == 2) {
          aportePami = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * aportePamiGen
          aportePami = Math.round(aportePami)
      }
      else if (puesto == 3){
        aportePami = (sueldoBrutoFueraDeConv + horasExtrasBruto) * aportePamiGen
        aportePami = Math.round(aportePami)
      }
}
function calculoContribucionPami(){
    if (puesto == 1 ){
        contribucionPami = (sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto) * contribucionPamiGen
      }
      else if (puesto == 2) {
          contribucionPami = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * contribucionPamiGen
      }
      else if (puesto == 3){
        contribucionPami = (sueldoBrutoFueraDeConv  + horasExtrasBruto) * contribucionPamiGen
      }
}
function calculoOOSS(){
    if (puesto == 1 ){
        aporteOOSS = (sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto) * aporteOOSSGen
        aporteOOSS = Math.round(aporteOOSS)
      }
      else if (puesto == 2) {
          aporteOOSS = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * aporteOOSSGen
          aporteOOSS = Math.round(aporteOOSS)
      }
      else if (puesto == 3){
        aporteOOSS = (sueldoBrutoFueraDeConv  + horasExtrasBruto) * aporteOOSSGen
        aporteOOSS = Math.round(aporteOOSS)
      }

}
function calculoContriOOSS(){
    if (puesto == 1 ){
        contribucionOOSS = (sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto) * contribucionOOSSGen
      }
      else if (puesto == 2) {
          contribucionOOSS = (sueldoBrutoDirectorTecnicaFarmacia  + horasExtrasBruto + adicionalTitulo) * contribucionOOSSGen
      }
      else if (puesto == 3){
        contribucionOOSS = (sueldoBrutoFueraDeConv  + horasExtrasBruto) * contribucionOOSSGen
      }
}
function caculoCuotaSindidal(){
    if (puesto == 1 ){
        aporteCuotaSindical = (sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto) * aporteCuotaSindicalGen
        aporteCuotaSindical = Math.round(aporteCuotaSindical)
      }
      else if (puesto == 2) {
          aporteCuotaSindical = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * aporteCuotaSindicalGen
          aporteCuotaSindical = Math.round(aporteCuotaSindical)
      }
      else if (puesto == 3){
        aporteCuotaSindical = (sueldoBrutoFueraDeConv + horasExtrasBruto) * aporteCuotaSindicalGen
        aporteCuotaSindical = Math.round(aporteCuotaSindical)
      }

}

function calculoTotalDescuentos(){
    if (puesto == 1 ){
        totalDescuentos = aporteCuotaSindical + aporteOOSS + aportePami + aportesJubilacion
        totalDescuentos = Math.round(totalDescuentos)
      }
      else if (puesto == 2) {
          totalDescuentos = aporteCuotaSindical + aporteOOSS + aportePami + aportesJubilacion
          totalDescuentos = Math.round(totalDescuentos)
      }
      else if (puesto == 3){
        totalDescuentos = aporteOOSS + aportePami + aportesJubilacion
        totalDescuentos = Math.round(totalDescuentos)
      }

}

function calculoTotalContribuciones(){
    totalContribuciones = contribucionJubilacion + contribucionOOSS + contribucionPami

}
function CalculoSueldoNeto(){
    if (puesto == 1 ){
        sueldoNeto = sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto - totalDescuentos
      }
      else if (puesto == 2) {
          sueldoNeto = sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo - totalDescuentos
      }
      else if (puesto == 3){
        sueldoNeto = sueldoBrutoFueraDeConv + horasExtrasBruto - totalDescuentos
      }
}



// Liquidaciones totales
function liquidacionFueraDeConvenio (){
    calculoDeHorasExtras()
    calculoContriOOSS()
    calculoContribucionJubi()
    calculoContribucionPami
    calculoJubilacion()
    calculoOOSS()
    calculoPami()
    calculoTotalContribuciones()
    calculoTotalDescuentos()
    CalculoSueldoNeto()
    console.log("Liquidación de: " + nombreYApellido + ", en el puesto fuera de convenio.")
    console.log("Sueldo Bruto: " + sueldoBrutoFueraDeConv)
    console.log("Monto Horas Extras: " + horasExtrasBruto)
    console.log("Los descuentos que se haran son los siguientes: ")
    console.log("Aportes de Jublicación: " + aportesJubilacion)
    console.log("Aportes para el Pami: " + aportePami)
    console.log("Aportes para las OOSS: " + aporteOOSS)
    console.log("Total descuentos: " + totalDescuentos)
    console.log("Sueldo Neto a cobrar: " + sueldoNeto)
    console.log("La opreacion ha finalizado exitosamente")
    
}

function liquidacionEmpleadoDeFarmacia (){
    calculoDeHorasExtras()
    calculoContriOOSS()
    calculoContribucionJubi()
    calculoContribucionPami
    calculoJubilacion()
    calculoOOSS()
    calculoPami()
    caculoCuotaSindidal()
    calculoTotalContribuciones()
    calculoTotalDescuentos()
    CalculoSueldoNeto()
    console.log("Liquidación de: " + nombreYApellido + ", en el puesto de Empleado de Farmacia")
    console.log("Sueldo Bruto: " + sueldoBrutoEmpleadoDeFarmacia)
    console.log("Monto Horas Extras: " + horasExtrasBruto)
    console.log("Los descuentos que se haran son los siguientes: ")
    console.log("Aportes de Jublicación: " + aportesJubilacion)
    console.log("Aportes para el Pami: " + aportePami)
    console.log("Aportes para las OOSS: " + aporteOOSS)
    console.log("Aportes para el sindicato: " + aporteCuotaSindical)
    console.log("Total descuentos: " + totalDescuentos)
    console.log("Sueldo Neto a cobrar: " + sueldoNeto)
    console.log("La opreacion ha finalizado exitosamente")
    
}

function liquidacionDirectorTecnico (){
    calculoDeHorasExtras()
    calculoAdicionalTitulo()
    calculoContriOOSS()
    calculoContribucionJubi()
    calculoContribucionPami
    calculoJubilacion()
    calculoOOSS()
    calculoPami()
    caculoCuotaSindidal()
    calculoTotalContribuciones()
    calculoTotalDescuentos()
    CalculoSueldoNeto()
    console.log("Liquidación de: " + nombreYApellido + ", en el puesto de Director Técnico de Farmacia.")
    console.log("Sueldo Bruto: " + sueldoBrutoDirectorTecnicaFarmacia)
    console.log("Monto Horas Extras: " + horasExtrasBruto)
    console.log("Monto Adicional Título: " + adicionalTitulo)
    console.log("Los descuentos que se haran son los siguientes: ")
    console.log("Aportes de Jublicación: " + aportesJubilacion)
    console.log("Aportes para el Pami: " + aportePami)
    console.log("Aportes para las OOSS: " + aporteOOSS)
    console.log("Aportes para el sindicato: " + aporteCuotaSindical)
    console.log("Total descuentos: " + totalDescuentos)
    console.log("Sueldo Neto a cobrar: " + sueldoNeto)
    console.log("La opreacion ha finalizado exitosamente")
    
}

// liquidacion masiva
function liquidacionFueraDeConvenioMasiva (){
    puesto = "3"
    calculoDeHorasExtras()
    calculoContriOOSS()
    calculoContribucionJubi()
    calculoContribucionPami
    calculoJubilacion()
    calculoOOSS()
    calculoPami()
    calculoTotalContribuciones()
    calculoTotalDescuentos()
    CalculoSueldoNeto()

    sumandoLiquidaciones () 
    
}

function liquidacionEmpleadoDeFarmaciaMasiva (){
    puesto = "1"
    calculoDeHorasExtras()
    calculoContriOOSS()
    calculoContribucionJubi()
    calculoContribucionPami
    calculoJubilacion()
    calculoOOSS()
    calculoPami()
    caculoCuotaSindidal()
    calculoTotalContribuciones()
    calculoTotalDescuentos()
    CalculoSueldoNeto()

    sumandoLiquidaciones ()
}

function liquidacionDirectorTecnicoMasiva (){
    puesto = "2"
    calculoDeHorasExtras()
    calculoAdicionalTitulo()
    calculoContriOOSS()
    calculoContribucionJubi()
    calculoContribucionPami
    calculoJubilacion()
    calculoOOSS()
    calculoPami()
    caculoCuotaSindidal()
    calculoTotalContribuciones()
    calculoTotalDescuentos()
    CalculoSueldoNeto()

    sumandoLiquidaciones () 
    
}


//Flujo
//Flujo


 //LIQUIDACION MASIVA INICIACION 
let select= 0
let puestoSeleccionadoLiquidacionMasiva = 0
let listaEmpleadosFiltrado = 0
let contenedorPlanillaLiquidacionMasiva = 0


 
const liquidacionMan = document.querySelector('#botonLiquidacionManualID')
const liquidacionMasi = document.querySelector('#botonLiquidacionMasivaID')
const agregarEmpleadosBD = document.querySelector('#sumarEmpleadoID')
const consultarListadoDeEmpleados = document.querySelector('#consultarEmpleadosBTN')
const verLiquidaciones = document.querySelector("#verLiquiBTN")

 document.addEventListener("DOMContentLoaded",() =>{
    liquidacionMasi?.addEventListener('click', clickLiquidacionMasiva) 
    liquidacionMan?.addEventListener('click', clickLiquidacionManual)
    agregarEmpleadosBD?.addEventListener('click', clickAgregarEmpleado)
    consultarListadoDeEmpleados?.addEventListener('click', consultaDeEmpleados)
    verLiquidaciones?.addEventListener('click', crearPlanillasDeLiqui)

 }
 )


 function clickLiquidacionMasiva(){
    select= document.getElementById("PuestoLiquidacionMasivaID")
    listaLiquidacion= []

    let recuperoListaEmpleados4 = localStorage.getItem('storageListaEmpleados');
    if(recuperoListaEmpleados4 != null){
        listaEmpleado= JSON.parse(recuperoListaEmpleados4)
    } 
    
    puestoSeleccionadoLiquidacionMasiva = select.options[select.selectedIndex].value
    if (puestoSeleccionadoLiquidacionMasiva == 4){
        puestoSeleccionadoLiquidacionMasiva = ""
    }
    console.log(puestoSeleccionadoLiquidacionMasiva)
    listaEmpleadosFiltrado = listaEmpleado.filter((el) => el.Puesto.includes(puestoSeleccionadoLiquidacionMasiva))
    console.log(listaEmpleadosFiltrado)
    liquidacionMasiva()
 
 }

 function crearPlanillasDeLiqui(){
    let recuperoListaLiquidaciones3 = localStorage.getItem('storageListaLiquidaciones')
    console.log(listaLiquidacion)///////////////////
    if (recuperoListaLiquidaciones3 != null){
        listaLiquidacion = []////////////////////////////////////
        console.log(listaLiquidacion)///////////////////////
        listaLiquidacion = JSON.parse(recuperoListaLiquidaciones3)
    }

    let container1 = document.querySelector("#ListLiqui")
    container1.innerHTML = ""
    for (const personaLiqui of listaLiquidacion){
        container1 = document.querySelector("#ListLiqui") 
        tablaDeLiquidaciones = document.createElement("table");

        tablaDeLiquidaciones.innerHTML = '<thead class="table text-center table-striped "><tr><th scope="col"><strong>Concepto</strong></th><th scope="col"><strong>Valor</strong></th></tr></thead><tbody>' + '<tr><td>Nombre</td><td>' + personaLiqui.NYA +'</td></tr>'+ '<tr><td>Puesto</td><td>' + personaLiqui.P +'</td></tr>'+ '<tr><td>SueldoBásico</td><td>' + personaLiqui.SB +'</td></tr>'+ '<tr><td>Horas Extras Bruto</td><td>' + personaLiqui.HEB +'</td></tr>'+ '<tr><td>Aportes Jubilacón</td><td>' + personaLiqui.AJ+ '<tr><td>Adicional Titulo</td><td>' + personaLiqui.AT +'</td></tr>' + personaLiqui.AJ +'</td></tr>'+ '<tr><td>Aportes Pami</td><td>' + personaLiqui.AP +'</td></tr>'+ '<tr><td>Aportes OOSS</td><td>' + personaLiqui.AOOSS +'</td></tr>'+ '<tr><td>Aporte Cuota Sindical</td><td>' + personaLiqui.ACS +'</td></tr>'+ '<tr><td>Total Descuentos</td><td>' + personaLiqui.TD +'</td></tr>'+ '<tr><td>Sueldo Neto</td><td>' + personaLiqui.SN +'</td></tr></tbody>'
        container1.appendChild(tablaDeLiquidaciones)
    }
    localStorage.removeItem("storageListaLiquidaciones")

}






//Liquidacion Manual


let sueldoBrutoFueraDeConvContainer=0
function clickLiquidacionManual(){
    nombreYApellido = document.getElementById("Nombre").value
    select = document.getElementById("Puesto")
    puesto = select.options[select.selectedIndex].value
    cantidadDeHorasExtras= Number(document.getElementById("HorasExtrasLM").value)
    if(puesto == 3){
     sueldoBrutoFueraDeConvContainer= document.getElementById("Numtel").value
     sueldoBrutoFueraDeConv= Number(sueldoBrutoFueraDeConvContainer)
     liquidacionFueraDeConvenio()
     }
     else if (puesto == 1){
        liquidacionEmpleadoDeFarmacia()
     }
     else if(puesto == 2){
        liquidacionDirectorTecnico()
     }


}

//agregando empleado

function clickAgregarEmpleado(){
    nombreYApellido = document.getElementById("NombreAE").value
    select = document.getElementById("PuestoAE")
    puesto = select.options[select.selectedIndex].value
    cantidadDeHorasExtras= Number(document.getElementById("HorasExtrasAE").value)
    if(puesto == 3){
     sueldoBrutoFueraDeConvContainer= document.getElementById("NumtelAE").value
     sueldoBasico= Number(sueldoBrutoFueraDeConvContainer)
     sumandoEmpleados ()
     }
     else if (puesto == 1){
        sueldoBasico = sueldoBrutoEmpleadoDeFarmacia
        sumandoEmpleados ()
     }
     else if(puesto == 2){
        sueldoBasico = sueldoBrutoDirectorTecnicaFarmacia
        sumandoEmpleados()
     }
     console.log (listaEmpleado)

}

// FALTA  liquidacion manual:
    //  leer del formulario, poniendo id a cada campo 
    //  escuchar evento de click 
    //  calcular todo creando el array, ver de reutilizar el que ya existe





 