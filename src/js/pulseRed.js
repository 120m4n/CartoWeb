function createTableHeaderString(headers) {
    let table_header = document.createElement('thead');
    let table_row = document.createElement('tr');

    headers.forEach(function (header) {
        
        let th = document.createElement('th');
        th.innerHTML = header;
        table_row.appendChild(th);

    })
    table_header.appendChild(table_row);

    return table_header.outerHTML;
}

function createTableRowBody(featuresObj) {
    
    const keys = Object.keys(featuresObj);
    let table_row = document.createElement('tr');
    keys.forEach(function (key, index) {
        
        let table_data = document.createElement('td');
        table_data.innerHTML = `${featuresObj[key]}`;
        table_row.appendChild(table_data);

    })
    return table_row;

}

function createTableBodyString(featuresObjList) {
    let table_body = document.createElement('tbody');
    featuresObjList.forEach(function (featuresObj) {
        let table_row = createTableRowBody(featuresObj)
        table_body.appendChild(table_row);
    })

    return table_body.outerHTML;
}

function createTableString(table_header, table_body) {
    let table = document.createElement('table');
    //add attribute to table
    table.setAttribute('id', 'table-container-breakpoint')
    table.innerHTML = table_header + table_body;
    return table.outerHTML;
}


function createRow(key, value) {
    return `<tr><td>${key}</td><td>${value?value : '--'}</td></tr>`;
}

function createTableApoyo(properties) {
    const keys = ['codigoapoyo', 'pintadoapoyo', 'codigotipoapoyo', 'cantidadap', 'cantidadcondensador'];
    let innerHTML = `<tr><th>Propiedad</th><th>Valor</th></tr>`;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return '<table class="propiedades">' + innerHTML + '</table>'
}

function createTableTramobt(properties) {
    const keys = ['codigotramobt', 'fnap', 'codigotrafodis', 'pintadotrafodis'];
    let innerHTML = `<tr><th>Propiedad</th><th>Valor</th></tr>`;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return '<table class="propiedades">' + innerHTML + '</table>'
}

function createTableTramomt(properties) {
    const keys = ['circuito'];
    let innerHTML = `<tr><th>Propiedad</th><th>Valor</th></tr>`;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return '<table class="propiedades">' + innerHTML + '</table>'
}

function createTableTrafo(properties) {
    const keys = ['codigoapoyo', 'pintadoapoyo', 'codigotrafodis', 'pintadotrafodis','potencia', 'cantidadtrafos'];
    let innerHTML = `<tr><th>Propiedad</th><th>Valor</th></tr>`;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return '<table class="propiedades">' + innerHTML + '</table>'
}

function createTableSubestacion(properties) {
    const keys = ['codigosub', 'nombresub', 'niveltension', 'areasubestacion'];
    let innerHTML = `<tr><th>Propiedad</th><th>Valor</th></tr>`;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return '<table class="propiedades">' + innerHTML + '</table>'
}

function createTableSubestacion(properties) {
    const keys = ['codigosub', 'nombresub', 'niveltension', 'areasubestacion'];
    let innerHTML = `<tr><th>Propiedad</th><th>Valor</th></tr>`;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return '<table class="propiedades">' + innerHTML + '</table>'
}

// const createTableClientes = async (properties) => {
//     let clientes = null;
//     container_content.innerHTML = `<div class="spinner"></div>`;
//     const apiClient = new ApiClient(backend_url, x_api_key);
//     const token = await apiClient.getToken();
//     apiClient.getClientes(properties['long'], properties['lat'])
//         .then(response => {
//             clientes = response.data;
//         }).then(function () {
//             if (clientes.length > 0) {

            
//             const headerArr = Object.keys(clientes[0]);
//             const header_str = createTableHeaderString(headerArr);
//             const body_str = createTableBodyString(clientes);
//             container_content.innerHTML = createTableString(header_str, body_str);
//             } else { 
//                 throw new Error(` no cliente en ${properties['long']}, ${properties['lat']}`)
//                 return false;
//             }

//         })
//         .catch(function (error) {
//             console.log(error); /* esta línea podría arrojar error, e.g. cuando console = {} */
//             isLoading = false;
//         })
//         .finally(function () {
//             isLoading = false;
//             if (clientes.length > 0) {
//                 const table_cliente = new basictable('#table-container-breakpoint', {
//                     containerBreakpoint: 578,
//                     tableWrap: true,
//                 });
//                     table_cliente.start();
//             } else { 
//                 container_content.innerHTML = 'Sin Datos';
//             }
                
//         }); 
// }

const createTableClientes = async (properties) => {
    let clientes = null;
    container_content.innerHTML = `<div class="spinner"></div>`;
    const apiClient = new ApiClient(backend_url, x_api_key);
    const token = await apiClient.getToken();
    let geohash = properties['geohash']
    geohash = geohash.slice(0, -4);
    apiClient.getClientesByGeohash(geohash)
        .then(response => {
            clientes = response.data;
        }).then(function () {
            if (clientes.length > 0) {

            
            const headerArr = Object.keys(clientes[0]);
            const header_str = createTableHeaderString(headerArr);
            const body_str = createTableBodyString(clientes);
            container_content.innerHTML = createTableString(header_str, body_str);
            } else { 
                throw new Error(` no cliente en ${properties['geohash']}`)
                return false;
            }

        })
        .catch(function (error) {
            console.log(error); /* esta línea podría arrojar error, e.g. cuando console = {} */
            isLoading = false;
        })
        .finally(function () {
            isLoading = false;
            if (clientes.length > 0) {
                const table_cliente = new basictable('#table-container-breakpoint', {
                    containerBreakpoint: 578,
                    tableWrap: true,
                });
                    table_cliente.start();
            } else { 
                container_content.innerHTML = 'Sin Datos';
            }
                
        }); 
}

function decodeTableClientes(properties) {
    const keys = ['CODIGOCLIENTESGD', 'CODIGOTRAFODIS', 'CODIGO_CUENTA', 'DIRECCIONSUSCRIPTOR', 'NOMBRESUSCRIPTOR'];
    let innerHTML = ``;
    keys.forEach(key => {
        innerHTML += createRow(key, properties[key]);
    });
    return  innerHTML;
}

const hidePopUp = () => {
    document.getElementById('popup').classList.add('hidden');
}

const showPopUp = () => {
    if (document.getElementById('popup').classList.contains('hidden')) {
        document.getElementById('popup').classList.remove('hidden');
    }
}


// EVENTO SEGUN EL TIPO DE CAPAS
function switchEvent(properties) {
    //check if properties object has a property called 'apoyo'
    showPopUp();
    if (properties.hasOwnProperty('cantidadap')) {
        // console.log('apoyo');
        container_content.innerHTML = createTableApoyo(properties);
        return;
    } else if (properties.hasOwnProperty('delta')) {
        // console.log('trafodis');
        container_content.innerHTML = createTableTrafo(properties);
        return;
    } else if (properties.hasOwnProperty('geohash')) {
        createTableClientes(properties);
        return;
    } else if (properties.hasOwnProperty('fnap')) {
        // console.log('tramobt');
        container_content.innerHTML = createTableTramobt(properties);
        return;
    } else if (properties.hasOwnProperty('circuito')) {
        // console.log('tramobt');
        container_content.innerHTML = createTableTramomt(properties);
        return;
    }  else if (properties.hasOwnProperty('codigosub')) {
        console.log('subestacion');
        container_content.innerHTML = createTableSubestacion(properties);
        return;
    }else {
        console.log('no se encontro propiedad');
        container_content.innerHTML = JSON.stringify(properties);
        // hidePopUp();
        return;
    }

}

// SOLO LOS LAYERS QUE RETORNEN TRUE SERAN ATENDIDOS EN EL PULSE CLICK
function onlyLayerFilter(layer) {
    const list_layers = ['apoyos', 'clientes', 'trafos', 'subestacion', 'tramobt', 'tramomt'];
    return list_layers.includes(layer.get('name'));
}

// Pulse feature at coord
const pulseFeature =  async(coord) => {


    const features = map.getFeaturesAtPixel(map.getPixelFromCoordinate(coord), {
        layerFilter: onlyLayerFilter,
        hitTolerance: 15
    });

    if (features.length == 0) {
        return;
    }
    //  const closestFeature = source_Apoyos.getClosestFeatureToCoordinate(coord);
    // console.log(features[0].getProperties());

    const closestFeature = features[0];
    const closest_coordinates = closestFeature.getFlatCoordinates();
    // const closest_latlon = ol.proj.fromLonLat(closest_coordinates);
    const properties = closestFeature.getProperties();
    // console.log(JSON.stringify(properties) + '\n');


    switchEvent(properties);   /// <--- CODIFICAR LOS DATOS DE LAS PROPIEDADES SEGUN LA CAPA
    // content.innerHTML = createTable(properties);
    overlay.setPosition(closest_coordinates);


    var f = new ol.Feature(new ol.geom.Point(closest_coordinates));
    f.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            radius: 30,
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
    }));
    map.animateFeature(f, new ol.featureAnimation.Zoom({
        fade: ol.easing.easeOut,
        duration: 3000,
        easing: ol.easing.easeOut
    }));
}

// Pulse on click 
map.on('singleclick', async (evt) => {
    if (tbInfoApoyo) {
        pulseFeature(evt.coordinate);
    }

});

// Pulse at lonlat
function pulse(lonlat) {
    var f = new ol.Feature(new ol.geom.Point(lonlat));
    f.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            radius: 30,
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
    }));
    map.animateFeature(f, new ol.featureAnimation.Zoom({
        fade: ol.easing.easeOut,
        duration: 3000,
        easing: ol.easing.easeOut
    }));

    // showPopUp();
    // container_content.innerHTML = `<asdfadf>`;
    // overlay.setPosition(lonlat);
}