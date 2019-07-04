import React from 'react';
import { store } from '../dominio/vuelos';

/*
  Una página más compleja, que muestra un dominio.
  Incluye una tabla generada dinámicamente.

  Versión con funciones que factorizan la generación de fragmentos de HTML que se repiten.
 */
class InfoVuelosAviones extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            avionElegido: {},
            aviones: [],
            vuelos: []
        }
    }

    componentWillMount() {
        // Esto debería venir del server
        this.setState({
            avionElegido: store.avionConNombre("Airbus 330"),
            aviones: store.aviones(),
            vuelos: store.vuelos()
        })
    }

    render() {
        return (
            <div className="container" style={{marginLeft: "20px", marginRight: "20px"}}>
                { this.datosDelAvionElegido() }
                { this.panelSeleccionAvionEstatico() 
                    /* ver qué pasa si se cambia por panelSeleccionAvionDinamico */ 
                }
                { this.tablaVuelos() }
            </div>
        )
    }

    avionElegido() { return this.state.avionElegido }
    elegirAvion(nombreAvion) { this.setState({avionElegido: store.avionConNombre(nombreAvion)}) }

    datosDelAvionElegido() {
        return (
            <div className="panel panel-info" style={{ marginTop: "10px" }}>
                <div className="panel-heading">
                    <h4>Avión {this.avionElegido().nombre()}</h4>
                </div>
                <div className="panel-body">
                    { /* se incluye lo que devuelve cada uno de estos métodos */ }
                    { this.datoAvion("Cantidad de vuelos", this.avionElegido().cantidadVuelosHechos()) }
                    { this.datoAvion("Capacidad", this.avionElegido().cantidadAsientos()) }
                    { this.datoAvion("Pasajeros transportados", this.avionElegido().cantidadTotalPasajeros()) }
                    { this.datoAvion("Porcentaje de ocupación", this.avionElegido().porcentajeOcupacion()) }
                </div>
            </div>
        )
    }

    datoAvion(label, valor) {
        return (
            <div className="row" style={{ marginBottom: "5px" }}>
                <div className="col-md-3" style={{ fontWeight: "bold" }}>{label}</div>
                <div className="col-md-9">{valor}</div>
            </div>
        )
    }

    panelSeleccionAvionEstatico() {
        return (
            <div className="panel panel-info">
                <div className="panel-body">
                    <div className="text-center">
                        {this.seleccionAvion("Airbus 330")}
                        {this.seleccionAvion("Boeing 737")}
                        {this.seleccionAvion("Embraer 190")}
                    </div>
                </div>
            </div>
        )
    }

    /*
      Alternativa dinámica para armar los botones que eligen un avión.
      Ahora se muestra un botón para cada avión en la base.

      Moraleja: se hace sencillo generar partes de una página dinámicamente,
                de acuerdo a los datos o al estado de la página.
     */
    panelSeleccionAvionDinamico() {
        return (
            <div className="panel panel-info">
                <div className="panel-body">
                    <div className="text-center">
                        { this.state.aviones.map(avion => this.seleccionAvion(avion.nombre())) }
                    </div>
                </div>
            </div>
        )
    }

    seleccionAvion(nombreAvion) {
        return (
            <button className="btn btn-info" style={{ marginLeft: "10px", marginRight: "10px" }}
                onClick={() => this.elegirAvion(nombreAvion)}>
                {nombreAvion}
            </button>
        )
    }

    tablaVuelos() {
        return (
            <div className="panel panel-success" style={{ marginTop: "50px" }}>
                <div className="panel-heading">
                    <h4>Vuelos (de todos los aviones)</h4>
                </div>
                <div className="panel-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Tipo de vuelo</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Asientos libres</th>
                                <th>Precio pasaje</th>
                                <th>Pasajes vendidos</th>
                                <th>Importe total vendido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.vuelos.map(vuelo => 
                                <tr key={vuelo.numero()}>
                                    <td>{vuelo.tipoAsString()}</td>
                                    <td>{vuelo.origen().nombre()}</td>
                                    <td>{vuelo.destino().nombre()}</td>
                                    <td>{vuelo.cantidadAsientosLibres()}</td>
                                    <td>{vuelo.precioPasaje()}</td>
                                    <td>{vuelo.cantidadPasajesEmitidos()}</td>
                                    <td>{vuelo.importeTotalPasajesEmitidos()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )        
    }
}

export default InfoVuelosAviones