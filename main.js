var app = new Vue({
    el: '#app',
    data:{
        forms:{
            producto:{mostrar:false},
            categoria:{mostrar:false},
            cliente:{mostrar:false},
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        }
    }
});