var app = new Vue({
    el: '#app',
    data:{
        forms:{
            estudiante:{mostrar:false},
            categoria:{mostrar:false},
            docente:{mostrar:false},
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        }
    }
});