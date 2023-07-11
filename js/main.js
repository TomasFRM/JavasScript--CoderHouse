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


//Array y constructor

class creandoListaEmpleado {
    constructor(Legajo, Puesto, HorasExt, NYA, SueldoBasico){
        this.Legajo = Legajo;
        this.Puesto = Puesto;
        this.HorasExt = HorasExt;
        this.NYA = NYA.toUpperCase();
        this.SueldoBasico = SueldoBasico
    };
}

const listaEmpleado = [
    {Legajo : "1", Puesto: "1", HorasExt: "5", NYA: "Juan Perez"},
    {Legajo : "2", Puesto: "2", HorasExt: "10", NYA: "Manuel Rodas"},
    {Legajo : "3", Puesto: "3", HorasExt: "5", NYA: "Vaneza Rodriguez",SueldoBasico: "210000"},
    {Legajo : "4", Puesto: "3", HorasExt: "10", NYA: "Luz Algarate",SueldoBasico: "341880"},
    ]


function sumandoEmpleados (){
    nuevoLegajos = (Number(listaEmpleado.length) + 1)
    listaEmpleado.push (new creandoListaEmpleado( nuevoLegajos, puesto, cantidadDeHorasExtras, nombreYApellido, sueldoBrutoFueraDeConv))
}



//FUNCIONES Iniciales
function ingreseHorasExtras(){
    cantidadDeHorasExtras = Number(prompt("Ingrese la cantidad de horas extras realizadas"))
}
function calculoDeHorasExtras (){
    if (puesto ==1){
        horasExtrasBruto= (sueldoBrutoEmpleadoDeFarmacia/192 * cantidadDeHorasExtras)*2
    }
    else if(puesto ==2){
        horasExtrasBruto= (sueldoBrutoDirectorTecnicaFarmacia/192 * cantidadDeHorasExtras)*2
    }
    else if(puesto ==3){
        horasExtrasBruto= (sueldoBrutoFueraDeConv/192 * cantidadDeHorasExtras)*2
    }
}

function solicitarDatosEmpleados() {
    nombreYApellido = prompt("Ingrese el Nombre y el Apellido")
    console.log("Vamos a realizar la liquidación para: " + nombreYApellido)
    solicitarPuesto()
    
}
function solicitarPuesto(){
    console.log("1) Empleado de Farmacia")
    console.log("2) Director Técnico - Farmacia")
    console.log("3) Otros puetos fuera de Convenio ")
    puesto = Number(prompt("Ingrese el numero del Puesto"))
    console.log("El Numero del puesto selecionado fue: " + puesto)
    validacionDePuesto()
       
}

function validacionDePuesto(){
    if (puesto == 3)
    {
        sueldoBrutoFueraDeConv = Number(prompt("Ingrese el salario bruto en Pesos ($):"))
        ingreseHorasExtras()
        
    }
    else if (puesto == 2){
        ingreseHorasExtras()
       
    }
    else if (puesto == 1){
        ingreseHorasExtras()
      
    }
    else{
        console.log("Usted no ha seleccionado una opcción valida. Vuelva a intentar")
        solicitarPuesto()
    } 
}


function validacionDePuestoLiquidacion(){
    if (puesto == 3)
    {
        liquidacionFueraDeConvenio()
        
    }
    else if (puesto == 2){
        liquidacionDirectorTecnico()
       
    }
    else if (puesto == 1){
        liquidacionEmpleadoDeFarmacia()
       
    }
}
      


function seleccionTipoDeLiquidacion(){
    console.log("1) Liquidar sueldo de forma manual")
    console.log("2) Liquidar sueldos de forma masiva (para empleados ya registrados)")
    console.log("3) Agregar nuevos empleados a la base de datos")
    console.log("4) Consultar Empleados registrados")
    let tipoDeLiquidacion = prompt("Ingrese el número de la opción deseada:")

    if (tipoDeLiquidacion == 1){
        solicitarDatosEmpleados()
        validacionDePuestoLiquidacion()
    }
    else if (tipoDeLiquidacion == 2){
        console.log("Iniciando Liquidación de toda la nómina de empleados:")
        liquidacionMasiva ()
        const fecha = new Date()
        console.log("La liquidación fue realizada el : " + fecha.toLocaleDateString())
        console.log("La liquidación masiva ha Finalizado. Seleccione que accioón quiere realizar ahora.")
        seleccionTipoDeLiquidacion()
    }
    else if (tipoDeLiquidacion == 3){
        console.log("Agregando empleados nuevos a la base de datos:")
        solicitarDatosEmpleados()
        sumandoEmpleados ()
        console.log("Se ha agregado exitosamente a " + nombreYApellido.toUpperCase() )    
        seleccionTipoDeLiquidacion()
    }
    else if (tipoDeLiquidacion == 4){
        console.log("Los Empleados registrados hasta el dia de hoy son:")
        consultaDeEmpleados ()
        seleccionTipoDeLiquidacion()
    }

    else {
        console.log("Usted no ha seleccionado una opcción valida. Vuelva a intentar")
        seleccionTipoDeLiquidacion()

    }

}

// funcion consulta de empleados registrados
function consultaDeEmpleados (){
    const consultandoBaseDeDatos = listaEmpleado.map ((resu) =>{
        return {
            Legajo : resu.Legajo,
            NYA : resu.NYA,
            Puesto : resu.Puesto,
            SueldoBasico : resu.SueldoBasico
            }
        }
    )
    for (const persona of consultandoBaseDeDatos ){
        console.log ((persona.Legajo) + " " + (persona.NYA) + " " + (persona.Puesto) + " " + (persona.SueldoBasico))
    }

}

//funcion liquidacion Masiva con BUCLE FOR

function liquidacionMasiva(){
    for (let i = 0; i < listaEmpleado.length; i++){
        if (listaEmpleado[i].Puesto == 1){
            cantidadDeHorasExtras = Number(listaEmpleado[i].HorasExt)
            nombreYApellido = listaEmpleado[i].NYA
            numeroDeLegajo = listaEmpleado[i].Legajo
            liquidacionEmpleadoDeFarmaciaMasiva ()
        }
        else if(listaEmpleado[i].Puesto == 2) {
            cantidadDeHorasExtras = Number(listaEmpleado[i].HorasExt)
            nombreYApellido = listaEmpleado[i].NYA
            numeroDeLegajo = listaEmpleado[i].Legajo
            liquidacionDirectorTecnicoMasiva ()
        }
        else if(listaEmpleado[i].Puesto == 3) {
            cantidadDeHorasExtras = Number(listaEmpleado[i].HorasExt)
            nombreYApellido = listaEmpleado[i].NYA
            numeroDeLegajo = listaEmpleado[i].Legajo
            sueldoBrutoFueraDeConv = Number(listaEmpleado[i].SueldoBasico)
            liquidacionFueraDeConvenioMasiva ()
        }
    }

}

//Funciones de sueldo
function calculoAdicionalTitulo(){
    adicionalTitulo = sueldoBrutoDirectorTecnicaFarmacia * adicionalTituloGen
}
function calculoJubilacion(){
    if (puesto == 1 ){
      aportesJubilacion = (sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto) * aportesJubilacionGen
    }
    else if (puesto == 2) {
        aportesJubilacion = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * aportesJubilacionGen

    }
    else if (puesto == 3){
        aportesJubilacion = (sueldoBrutoFueraDeConv  + horasExtrasBruto)* aportesJubilacionGen
    }

}
function calculoContribucionJubi() {
    if (puesto == 1){
        contribucionJubilacion = (sueldoBrutoEmpleadoDeFarmacia + horasExtrasBruto) * contribucionJubilacionGen
    }
    else if (puesto == 2) {
        contribucionJubilacion = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * contribucionJubilacionGen
    }
    else if (puesto == 3){
        contribucionJubilacion = (sueldoBrutoFueraDeConv + horasExtrasBruto) * contribucionJubilacionGen
    }

}
function calculoPami(){
    if (puesto == 1 ){
        aportePami = (sueldoBrutoEmpleadoDeFarmacia  + horasExtrasBruto) * aportePamiGen
      }
      else if (puesto == 2) {
          aportePami = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * aportePamiGen
      }
      else if (puesto == 3){
        aportePami = (sueldoBrutoFueraDeConv + horasExtrasBruto) * aportePamiGen
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
      }
      else if (puesto == 2) {
          aporteOOSS = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * aporteOOSSGen
      }
      else if (puesto == 3){
        aporteOOSS = (sueldoBrutoFueraDeConv  + horasExtrasBruto) * aporteOOSSGen
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
      }
      else if (puesto == 2) {
          aporteCuotaSindical = (sueldoBrutoDirectorTecnicaFarmacia + horasExtrasBruto + adicionalTitulo) * aporteCuotaSindicalGen
      }
      else if (puesto == 3){
        aporteCuotaSindical = (sueldoBrutoFueraDeConv + horasExtrasBruto) * aporteCuotaSindicalGen
      }

}

function calculoTotalDescuentos(){
    if (puesto == 1 ){
        totalDescuentos = aporteCuotaSindical + aporteOOSS + aportePami + aportesJubilacion
      }
      else if (puesto == 2) {
          totalDescuentos = aporteCuotaSindical + aporteOOSS + aportePami + aportesJubilacion
      }
      else if (puesto == 3){
        totalDescuentos = aporteOOSS + aportePami + aportesJubilacion
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
    seleccionTipoDeLiquidacion()
    
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
    seleccionTipoDeLiquidacion()
    
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
    seleccionTipoDeLiquidacion()
    
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
    console.log("Liquidación de: " + nombreYApellido + ", en el puesto fuera de convenio.")
    console.log("Legajo: " + numeroDeLegajo)
    console.log("Sueldo Bruto: " + sueldoBrutoFueraDeConv)
    console.log("Monto Horas Extras: " + horasExtrasBruto)
    console.log("Los descuentos que se haran son los siguientes: ")
    console.log("Aportes de Jublicación: " + aportesJubilacion)
    console.log("Aportes para el Pami: " + aportePami)
    console.log("Aportes para las OOSS: " + aporteOOSS)
    console.log("Total descuentos: " + totalDescuentos)
    console.log("Sueldo Neto a cobrar: " + sueldoNeto)
    console.log("-----------------------------")
    
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
    console.log("-----------------------------")
    
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
    console.log("-----------------------------")
    
}


//Flujo
setTimeout(() => {
    console.log("Iniciando Simulación")
    seleccionTipoDeLiquidacion()
}, 3000);

