var db;
const funcdb = ()=>{
    let indexDB = indexedDB.open('db_sistema',1);
    indexDB.onupgradeneeded = e=>{
        let req = e.target.result,
            tblestudiante = req.createObjectStore('estudiantes',{keyPath:'idestudiante'}),
            tblcategoria = req.createObjectStore('categorias',{keyPath:'idCategoria'}),
            tbldocente = req.createObjectStore('clientes',{keyPath:'idCliente'});
        tblestudiante.createIndex('idestudiante','idestudiante',{unique:true});
        tblestudiante.createIndex('codigo','codigo',{unique:true});
        tblcategoria.createIndex('idCategoria','idCategoria',{unique:true});
        tblcategoria.createIndex('codigo','codigo',{unique:true});
        tblestudiante.createIndex('idEstudiante','idEstudiante',{unique:true});
        tblestudiante.createIndex('codigo','codigo',{unique:true});
    };
    indexDB.onsuccess = e=>{
        db = e.target.result;
    };
    indexDB.onerror = e=>{
        console.error('Error al crear la base de datos', e.message());
    };
}, abrirStore = (store, modo)=>{
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
};
funcdb();