var datos = [];

let JSON = [];

const userAction = async () => {
   const response = await fetch('http://127.0.0.1:5500/src/api/servers.json');
   data = await response.json();
   JSON = await data;
   select = document.getElementById('selecetMapaBase');

   for (let i = 0; i <= JSON.length - 1; i++) {
      let opt = document.createElement('option');
      opt.value = JSON[i].code;
      opt.innerHTML = JSON[i].name;
      select.appendChild(opt);

   }

   if (datos.length > 0) {
      for (let i = 0; i <= datos.length - 1; i++) {
         let opt = document.createElement('option');
         opt.value = datos[i].code;
         opt.innerHTML = datos[i].name;
         select.appendChild(opt);

      }
   }

}

userAction();





$(function () {
   var index = {

      inicio: function () {
         index.recargar();
      },
      recargar: function () {
         index.mostrarmodal();

      },
      mostrarmodal: function () {
         $modal_mapa = document.getElementById('modal_mapa');


         $modal_mapa.addEventListener('click', async () => {
            const { value: formValues } = await Swal.fire({
               title: 'Agregar nueva Capa',
               allowOutsideClick: false,
               allowEscapeKey: false,
               showCancelButton: true,
               cancelButtonText: 'Cerrar',
               html:
                  ' <div class="mb-3">' +
                  '<Label>Nombre</label>' +
                  '<input id="swal-input1" class="swal2-input">' +
                  '</div>' +
                  ' <div class="mb-3">' +
                  '<Label>Ruta</label>' +
                  '<input id="swal-input2" class="swal2-input">' +
                  '</div>' +
                  ' <div class="mb-3">' +
                  '<Label>Z Mínimo</label>' +
                  '<input type="number" id="swal-input3" class="swal2-input">' +
                  '</div>' +
                  ' <div class="mb-3">' +
                  '<Label>Z Máximo</label>' +
                  '<input type="number" id="swal-input4" class="swal2-input">' +
                  '</div>',
               focusConfirm: true,
               preConfirm: () => {
                  let json = {
                     "code": datos.length + 100,
                     "name": document.getElementById('swal-input1').value,
                     "route": document.getElementById('swal-input2').value,
                     "minZoom": document.getElementById('swal-input3').value,
                     "maxZoom": document.getElementById('swal-input4').value,
                  };
                  if (index.isValidURL(json.route)){
                  if (parseInt(json.minZoom) < parseInt(json.maxZoom)) {
                     if (parseInt(json.maxZoom) >= 0 && parseInt(json.maxZoom) <= 20) {
                        if (parseInt(json.minZoom) >= 0 && parseInt(json.minZoom) <= 20) {
                           if (index.validarModal(json)) {
                              datos.push(json);
                              document.querySelector("#selecetMapaBase").innerHTML = '';
                              userAction();
                              Swal.fire(
                                 'Información',
                                 'El mapa base se ha agregado con éxito',
                                 'information'
                              );

                           } else {
                              Swal.showValidationMessage('Ha ocurrido un error, todos los datos son obligatorios.');
                           }
                        } else {
                           Swal.showValidationMessage('Ha ocurrido un error, El nivel de Zoom mínimo debe estar entre 0 y 20');
                        }
                     } else {
                        Swal.showValidationMessage('Ha ocurrido un error, El nivel de Zoom máximo debe estar entre 0 y 20');
                     }
                  } else {
                     Swal.showValidationMessage('Ha ocurrido un error, El nivel de Zoom mínimo debe ser menor al Zoom máximo');
                  }
               } else {
                  Swal.showValidationMessage('Ha ocurrido un error, La ruta ingresada no es valida, ingrese otra e intente nuevamente');
               }
                  return json;
               }
            });

         });

      },
      validarModal: function (formValues) {
         if (formValues.name != '') {
            if (formValues.route != '') {
               if (formValues.minZoom != '') {
                  if (formValues.maxZoom != '') {
                     return true;
                  } else { return false }
               } else { return false }
            } else { return false }
         } else { return false };
      },
       isValidURL : function(string) {
         var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
         return (res !== null)
     }
   };
   $(document).ready(function () {
      index.inicio();
   });
});