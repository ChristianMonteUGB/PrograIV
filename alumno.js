Vue.component('v-select-categoria', VueSelect.VueSelect);
Vue.component('componente-estudiante', {
    data() {
        return {
            valor:'',
            estudiante:[],
            accion:'nuevo',
            estudiante:{
                estudiante:{
                    id: '',
                    label:''
                },
                idEstudiante: new Date().getTime(),
                codigo:'',
                nombre:'',
                apellido:'',
                direccion:'',
                edad:0
            }
        }
    },
    methods:{
        buscarEstudiante(e){
            this.listar();
        },
        eliminarEstudiante(idEstudiante){
            if( confirm(`Esta seguro de elimina el estudiante?`) ){
                let store = abrirStore('estudiantes', 'readwrite'),
                query = store.delete(idEstudiante);
            query.onsuccess = e=>{
                this.nuevoestudiante();
                this.listar();
            };
            }
        },
        modificarEstudiante(estudiante){
            this.accion = 'modificar';
            this.estudiante = estudiante;
        },
        guardarEstudiante(){
            //almacenamiento del objeto estudiantes en indexedDB
            if(this.estudiante.categoria.id==''){
                console.error("Porfavor seleccione una categoria");
                return;
            }
            let store = abrirStore('estudiantes', 'readwrite'),
                query = store.put({...this.estudiante});
            query.onsuccess = e=>{
                this.nuevoEstudiante();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar estudiante', e.message());
            };
        },
        nuevoEstudiante(){
            this.accion = 'nuevo';
            this.estudiante = {
                categoria:{
                    id:'',
                    label:''
                },
                idestudiante: new Date().getTime(),
                codigo:'',
                nombre:'',
                nombre:'',
                apellido:'',
                direccion:'',
                edad:0
            }
        },
        listar(){
            let storeCat = abrirStore('categorias', 'readonly'),
                dataCat = storeCat.getAll();
            dataCat.onsuccess = resp=>{
                this.categorias = dataCat.result.map(categoria=>{
                    return{
                        id: categoria.idCategoria,
                        label:categoria.nombre
                    }
                });
            }
            let store = abrirStore('estudiantes', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.estudiantes = data.result
                    .filter(estudiante=>estudiante.codigo.includes(this.valor) || 
                    estudiante.nombre.toLowerCase().includes(this.valor.toLowerCase()) || 
                    estudiante.apellido.toLowerCase().includes(this.valor.toLowerCase()) || 
                    estudiante.direccion.toLowerCase().includes(this.valor.toLowerCase()));
            };
        }
    },
    template: `
    <div class="row">
        <div class="col col-md-6">
            <div class="card text-bg-dark">
                <div class="card-header">REGISTRO DE ESTUDIANTES</div>
                <div class="catd-body">
                <div class="row p-1">
                        <div class="col col-md-2">CATEGORIA</div>
                        <div class="col col-md-3">
                            <v-select-categoria required v-model="estudiante.categoria"
                            :options="categorias">Porfavor seleccione una categoria</v-select-categoria
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col col-md-2">CODIGO</div>
                        <div class="col col-md-3">
                            <input v-model="estudiante.codigo" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col col-md-2">NOMBRE</div>
                        <div class="col col-md-5">
                            <input v-model="estudiante.nombre" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col col-md-2">APELLIDO</div>
                        <div class="col col-md-5">
                            <input v-model="estudiante.marca" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col col-md-2">DIRECCION</div>
                        <div class="col col-md-3">
                            <input v-model="estudiante.presentacion" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col col-md-2">EDAD</div>
                        <div class="col col-md-3">
                            <input v-model="estudiante.precio" type="number" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col">
                            <button @click.prevent.default="guardarestudiante" class="btn btn-success">GUARDAR</button>
                            <button @click.prevent.default="nuevoestudiante" class="btn btn-warning">NUEVO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col col-md-6">
            <div class="card text-bg-dark">
                <div class="card-header">LISTADO DE ESTUDIANTES</div>
                <div class="card-body">
                    <form id="frmestudiante">
                        <table class="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR</th>
                                    <th colspan="6">
                                        <input placeholder="codigo, nombre, marca, presentacion" type="search" v-model="valor" @keyup="buscarestudiante" class="form-control">
                                    </th>
                                </tr>
                                <tr>
                                    <th>CATEGORIA</th>
                                    <th>CODIGO</th>
                                    <th>NOMBRE</th>
                                    <th>APELLIDO</th>
                                    <th>DIRECCION</th>
                                    <th>EDAD</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr @click="modificarestudiante(estudiante)" v-for="estudiante in estudiantes" :key="estudiante.idestudiante">
                                    <td>{{estudiante.categoria.label}}</td>
                                    <td>{{estudiante.codigo}}</td>
                                    <td>{{estudiante.nombre}}</td>
                                    <td>{{estudiante.apellido}}</td>
                                    <td>{{estudiante.direccion}}</td>
                                    <td>{{estudiante.edad}}</td>
                                    <td><button @click.prevent.default="eliminarestudiante(estudiante.idestudiante)" class="btn btn-danger">del</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
`
});
