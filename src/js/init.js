let grupo_capas;

const loadCapAbilities = async () => {

    fetch(tiles_server + "capabilities/essa.json", { method: 'GET' })
    .then(response => response.json())
    .then(result => paintCapAbilities(result.vector_layers))
    .catch(error => console.log('error', error));
    
}

// loadCapAbilities();

const paintCapAbilities = async (vector_layers) => {
  // lista de layers administrativos
  const administrativos = ['departamento', 'municipio', 'localidad', 'barrios'];
  
  let layers = []; //<-- capas de negocios para pintar
  let layers_admin = []; //<-- capas administrativas para pintar
  let source;
  let layer;
  


  for (i = 0; i < vector_layers.length; i++) {
    geometry = vector_layers[i].geometry_type;
    id = vector_layers[i].id;

    let style_layer;

    switch(id){
      case 'apoyos':
          style_layer = style_apoyos;
          break;
    //   case 'tramobt':
    //       style_layer = style_ap_linea;
    //       break;
    //   case 'tramomt':
    //       style_layer = style_ap_linea;
    //       break;
      case 'trafos':
          style_layer = style_trafo;
          break;   
      case 'clientes':
          style_layer = estilosCliente;
          break;          
    }

    if (administrativos.includes(id)) {

      source = new ol.source.VectorTile({
        url: vector_layers[i].tiles[0],
        format: new ol.format.MVT(),
      });

      layer = new ol.layer.VectorTile({
        name: vector_layers[i].name,
        source: source,
        minZoom: parseInt(vector_layers[i].minzoom) + 1,
        maxZoom: vector_layers[i].maxzoom,
        // style: style_layer,
        visible: false,
      });

      layers_admin.push(layer);

    } else {

      
      source = new ol.source.VectorTile({
        url: vector_layers[i].tiles[0],
        format: new ol.format.MVT(),
      });

      layer = new ol.layer.VectorTile({
        name: vector_layers[i].name,
        source: source,
        minZoom: parseInt(vector_layers[i].minzoom) + 1,
        maxZoom: vector_layers[i].maxzoom,
        style: style_layer,
      });

      layers.push(layer);
      

    }   
  }

// GRUPOS DE CAPAS
  grupo_capas =  new ol.layer.Group({
    title: 'Capas Base',
    layers: layers
  })

  // GRUPOS DE CAPAS
  grupo_capas_admin =  new ol.layer.Group({
    title: 'Capas Administrativas',
    layers: layers_admin
  })
    
    map.addLayer(grupo_capas_admin);
    map.addLayer(grupo_capas);
}

