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
let select= 0
let puestoSeleccionadoLiquidacionMasiva = 0
let listaEmpleadosFiltrado = 0
let contenedorPlanillaLiquidacionMasiva = 0
let sueldoBrutoFueraDeConvContainer=0
let listaEmpleado = []

//Consulta Inicial a archivo Json simulando base de datos

async function consultaDeEmpleadosInicial(){
    if (listaEmpleado.length === 0){
        try{
         let recuperoListaEmpleadosJson = await fetch("../datos/datos.json");      
         listaEmpleado = await recuperoListaEmpleadosJson.json()
        }
        catch(error){notificacionBaseDeDatos()}
    }
}
consultaDeEmpleadosInicial()
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
        listaLiquidacion.push (new creandoArrayLiquidacion( nombreYApellido, puesto, sueldoBrutoFueraDeConv, horasExtrasBruto, aportesJubilacion,aportePami,aporteOOSS,totalDescuentos,sueldoNeto,0, 0))
        let listaLiquidacionesStringify = JSON.stringify (listaLiquidacion)
        localStorage.setItem("storageListaLiquidaciones", listaLiquidacionesStringify)
        listaLiquidacion= []
    }
    else if ( puesto == 1){
        let recuperoListaLiquidaciones = localStorage.getItem('storageListaLiquidaciones')
        if (recuperoListaLiquidaciones != null){
            listaLiquidacion = JSON.parse(recuperoListaLiquidaciones)
        }
        listaLiquidacion.push (new creandoArrayLiquidacion( nombreYApellido, puesto, sueldoBrutoEmpleadoDeFarmacia, horasExtrasBruto, aportesJubilacion,aportePami,aporteOOSS,totalDescuentos,sueldoNeto,0,aporteCuotaSindical))
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

//Funcion para consultar empleados

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

//funcion liquidacion Masiva

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

//Funciones de sueldo

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
    let tablaDeLiquidacion=""
    let containerLiqMan =document.querySelector("#liquiManual")
    containerLiqMan.innerHTML='<div class="row justify-content-center pt-5 pb-5 "><table class="table  table-striped m-5" ><thead class="table-light"><tr><th scope="col" class="w-50"><strong>Concepto</strong></th><th scope="col" class="w-50"><strong>Valor</strong></th></tr></thead><tbody>' + '<tr><td>Nombre</td><td>' + nombreYApellido +'</td></tr>'+ '<tr><td>Puesto</td><td>' + puesto +'</td></tr>'+ '<tr><td>SueldoBásico</td><td>' + sueldoBrutoFueraDeConv +'</td></tr>'+ '<tr><td>Horas Extras Bruto</td><td>' + horasExtrasBruto +'</td></tr>'+ '<tr><td>Aportes Jubilacón</td><td>' + aportesJubilacion+ '</td></tr>'+ '<tr><td>Aportes Pami</td><td>' + aportesJubilacion +'</td></tr>'+ '<tr><td>Aportes OOSS</td><td>' + aporteOOSS +'</td></tr>' + '<tr><td class="table-danger">Total Descuentos</td><td class="table-danger">' + totalDescuentos +'</td></tr>'+ '<tr><td class="table-dark">Sueldo Neto</td><td class="table-dark">' + sueldoNeto +'</td></tr></tbody></table></div>'   
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
    let tablaDeLiquidacion=""
    let containerLiqMan =document.querySelector("#liquiManual")
    containerLiqMan.innerHTML='<div class="row justify-content-center pt-5 pb-5 "><table class="table  table-striped m-5" ><thead class="table-light"><tr><th scope="col" class="w-50"><strong>Concepto</strong></th><th scope="col" class="w-50"><strong>Valor</strong></th></tr></thead><tbody>' + '<tr><td>Nombre</td><td>' + nombreYApellido +'</td></tr>'+ '<tr><td>Puesto</td><td>' + puesto +'</td></tr>'+ '<tr><td>SueldoBásico</td><td>' + sueldoBrutoEmpleadoDeFarmacia +'</td></tr>'+ '<tr><td>Horas Extras Bruto</td><td>' + horasExtrasBruto +'</td></tr>' +'<tr><td>Adicional Titulo</td><td>' + adicionalTitulo +'</td></tr>' + '<tr><td>Aportes Jubilacón</td><td>' + aportesJubilacion+ '</td></tr>' + '<tr><td>Aportes Pami</td><td>' + aportesJubilacion +'</td></tr>'+ '<tr><td>Aportes OOSS</td><td>' + aporteOOSS +'</td></tr>'+ '<tr><td>Aporte Cuota Sindical</td><td>' + aporteCuotaSindical +'</td></tr>'+ '<tr><td class="table-danger">Total Descuentos</td><td class="table-danger">' + totalDescuentos +'</td></tr>'+ '<tr><td class="table-dark">Sueldo Neto</td><td class="table-dark">' + sueldoNeto +'</td></tr></tbody></table></div>' 
    
    
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
    let tablaDeLiquidacion=""
    let containerLiqMan =document.querySelector("#liquiManual")
    containerLiqMan.innerHTML='<div class="row justify-content-center pt-5 pb-5 "><table class="table  table-striped m-5 " ><thead class="table-light"><tr><th scope="col" class="w-60"><strong>Concepto</strong></th><th scope="col" class="w-40"><strong>Valor</strong></th></tr></thead><tbody>' + '<tr><td>Nombre</td><td>' + nombreYApellido +'</td></tr>'+ '<tr><td>Puesto</td><td>' + puesto +'</td></tr><tr><td>SueldoBásico</td><td>' + sueldoBrutoDirectorTecnicaFarmacia +'</td></tr>'+ '<tr><td>Horas Extras Bruto</td><td>' + horasExtrasBruto +'</td></tr>'   +'<tr><td>Adicional Titulo</td><td>' + adicionalTitulo +'</td></tr>' + '<tr><td>Aportes Jubilacón</td><td>' + aportesJubilacion+ '</td></tr>' + '<tr><td>Aportes Pami</td><td>' + aportesJubilacion +'</td></tr>'+ '<tr><td>Aportes OOSS</td><td>' + aporteOOSS +'</td></tr>'+ '<tr><td>Aporte Cuota Sindical</td><td>' + aporteCuotaSindical +'</td></tr>'+ '<tr><td class="table-danger">Total Descuentos</td><td class="table-danger">' + totalDescuentos +'</td></tr>'+ '<tr><td class="table-dark">Sueldo Neto</td><td class="table-dark">' + sueldoNeto +'</td></tr></tbody></table></div>' 

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




//Liquidacion Masiva

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
    listaEmpleadosFiltrado = listaEmpleado.filter((el) => el.Puesto.includes(puestoSeleccionadoLiquidacionMasiva))
    liquidacionMasiva()
 }

  function crearPlanillasDeLiqui(){
     let recuperoListaLiquidaciones3 = localStorage.getItem('storageListaLiquidaciones')
     if (recuperoListaLiquidaciones3 != null){
         listaLiquidacion = []
         listaLiquidacion = JSON.parse(recuperoListaLiquidaciones3)
     }

     let container1 = document.querySelector("#ListLiqui")
     container1.innerHTML = ""
     for (const personaLiqui of listaLiquidacion){
         container1 = document.querySelector("#ListLiqui") 
         tablaDeLiquidaciones = document.createElement("div");
         tablaDeLiquidaciones.innerHTML = '<div class="row justify-content-center pt-5 pb-5 "><table class="table  table-striped m-5" ><thead class="table-light"><tr><th scope="col" class="w-50"><strong>Concepto</strong></th><th scope="col" class="w-50"><strong>Valor</strong></th></tr></thead><tbody>' + '<tr><td>Nombre</td><td>' + personaLiqui.NYA +'</td></tr>'+ '<tr><td>Puesto</td><td>' + personaLiqui.P +'</td></tr>'+ '<tr><td>SueldoBásico</td><td>' + personaLiqui.SB +'</td></tr>'+ '<tr><td>Horas Extras Bruto</td><td>' + personaLiqui.HEB +'</td></tr>'+'<tr><td>Adicional Titulo</td><td>' + personaLiqui.AT +'</td></tr>'  + '<tr><td>Aportes Jubilacón</td><td>' + personaLiqui.AJ+ '</td></tr>' + '<tr><td>Aportes Pami</td><td>' + personaLiqui.AP +'</td></tr>'+ '<tr><td>Aportes OOSS</td><td>' + personaLiqui.AOOSS +'</td></tr>'+ '<tr><td>Aporte Cuota Sindical</td><td>' + personaLiqui.ACS +'</td></tr>'+ '<tr><td class="table-danger">Total Descuentos</td><td class="table-danger">' + personaLiqui.TD +'</td></tr>'+ '<tr><td class="table-dark">Sueldo Neto</td><td class="table-dark">' + personaLiqui.SN +'</td></tr></tbody></table></div>'
         container1.appendChild(tablaDeLiquidaciones)

     }
     localStorage.removeItem("storageListaLiquidaciones")
 }


//Liquidacion Manual

function clickLiquidacionManual(){
    nombreYApellido = document.getElementById("Nombre").value
    if (nombreYApellido === ""){
        notificacionNombreVacio()
        return
    }
    select = document.getElementById("Puesto")
    puesto = select.options[select.selectedIndex].value
    cantidadDeHorasExtras= Number(document.getElementById("HorasExtrasLM").value)
    if (isNaN(cantidadDeHorasExtras) ){
        notificacionNoEsUnNumero1()
        return
    }
    if(puesto == 3){
     sueldoBrutoFueraDeConvContainer= document.getElementById("Numtel").value
     sueldoBrutoFueraDeConv= Number(sueldoBrutoFueraDeConvContainer)
     if (isNaN(sueldoBrutoFueraDeConvContainer) ){
        notificacionNoEsUnNumero2()
        return
    } else {
        liquidacionFueraDeConvenio()
        setTimeout(() => {
            window.scrollTo({
                top: 1100,
                left: 1,
                behavior: "smooth",
              });
          }, "500");        
        }
     }
     else if (puesto == 1){
        liquidacionEmpleadoDeFarmacia()
        setTimeout(() => {
            window.scrollTo({
                top: 1100,
                left: 1,
                behavior: "smooth",
              });
          }, "500");
     }
     else if(puesto == 2){
        liquidacionDirectorTecnico()
        setTimeout(() => {
            window.scrollTo({
                top: 1100,
                left: 1,
                behavior: "smooth",
              });
          }, "500");
     }
}

//agregando empleado

function clickAgregarEmpleado(){
    nombreYApellido = document.getElementById("NombreAE").value
    if (nombreYApellido === ""){
        notificacionNombreVacio()
        return
    }
    select = document.getElementById("PuestoAE")
    puesto = select.options[select.selectedIndex].value
    cantidadDeHorasExtras= Number(document.getElementById("HorasExtrasAE").value)
    if (isNaN(cantidadDeHorasExtras) ){
        notificacionNoEsUnNumero1()
        return
    }
    if(puesto == 3){
     sueldoBrutoFueraDeConvContainer= Number(document.getElementById("NumtelAE").value)
     if (isNaN(sueldoBrutoFueraDeConvContainer) ){
        notificacionNoEsUnNumero2()
        return
    } else{
        sueldoBasico= sueldoBrutoFueraDeConvContainer
        sumandoEmpleados ()
            }
    }
     else if (puesto == 1){
        sueldoBasico = sueldoBrutoEmpleadoDeFarmacia
        sumandoEmpleados ()
     }
     else if(puesto == 2){
        sueldoBasico = sueldoBrutoDirectorTecnicaFarmacia
        sumandoEmpleados()
     }
     notificacionExitosaAgregar()     
}

//Funciones de Notificaciones  

function notificacionExitosaAgregar(){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se ha agregado un empleado nuevo a la base de datos',
        showConfirmButton: false,
        timer: 2000
    })
}

function notificacionNombreVacio(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe completar el campo del nombre!',
             })
}

function notificacionNoEsUnNumero1(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe completar el campo "Cantidad de Horas Extras" con un número!',
             })
}
function notificacionNoEsUnNumero2(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe completar el campo "Sueldo Básico" con un número!',
             })
}

function notificacionBaseDeDatos(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubieron problemas al obtener la información de la base de datos. Vuelva a intentar.',
             })
}


 //Iniciacion de Flujos
 
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

 