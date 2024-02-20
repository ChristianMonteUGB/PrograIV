Vue.component('componente-docente', {
    data() {
        return {
            valor:'',
            docentes:[],
            accion:'nuevo',
            docente:{
                idDocente: new Date().getTime(),
                codigo:'',
                nombre:'',
                direccion:'',
                telefono:'',
                email:''
            }
        }
    },
    methods:{
        buscardocente(e){
            this.listar();
        },
        eliminardocente(idDocente){
            if( confirm(`Esta seguro de eliminar al Docente?`) ){
                let store = abrirStore('clientes', 'readwrite'),
                query = store.delete(idDocente);
            query.onsuccess = e=>{
                this.nuevodocente();
                this.listar();
            };
            }
        },
        modificardocente(docente){
            this.accion = 'modificar';
            this.docente = docente;
        },
        guardardocente(){
            //almacenamiento del objeto clientes en indexedDB
            let store = abrirStore('docente', 'readwrite'),
                query = store.put({...this.docente});
            query.onsuccess = e=>{
                this.nuevodocente();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar en docente', e.message());
            };
        },
        nuevodocente(){
            this.accion = 'nuevo';
            this.docente = {
                idDocente: new Date().getTime(),
                codigo:'',
                nombre:'',
                direccion:'',
                telefono:'',
                email:''
            }
        },
        listar(){
            let store = abrirStore('docente', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.clientes = data.result
                    .filter(docente=>docente.codigo.includes(this.valor) || 
                    docente.nombre.toLowerCase().includes(this.valor.toLowerCase()) || 
                    docente.direccion.toLowerCase().includes(this.valor.toLowerCase()) || 
                    docente.telefono.toLowerCase().includes(this.valor.toLowerCase()) ||
                    docente.email.toLowerCase().includes(this.valor.toLowerCase()));
            };
        }
    },
    template: `
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">REGISTRO DE DOCENTES</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <input v-model="cliente.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-5">
                                <input v-model="cliente.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">DIRECCION</div>
                            <div class="col col-md-3">
                                <input v-model="cliente.direccion" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">TELEFONO</div>
                            <div class="col col-md-3">
                                <input v-model="cliente.telefono" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">EMAIL</div>
                            <div class="col col-md-3">
                                <input v-model="cliente.email" type="email" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarDocente" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoDocente" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE DOCENTES</div>
                    <div class="card-body">
                        <form id="frmCliente">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre, direccion, telefono, email" type="search" v-model="valor" @keyup="buscarCliente" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>DIRECCION</th>
                                        <th>TELEFONO</th>
                                        <th>EMAIL</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarCliente(cliente)" v-for="cliente in clientes" :key="cliente.idCliente">
                                        <td>{{cliente.codigo}}</td>
                                        <td>{{cliente.nombre}}</td>
                                        <td>{{cliente.direccion}}</td>
                                        <td>{{cliente.telefono}}</td>
                                        <td>{{cliente.email}}</td>
                                        <td><button @click.prevent.default="eliminarCliente(cliente.idCliente)" class="btn btn-danger">del</button></td>
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