const login = new Vue({
    el: '#loginRico',
    data: {
        empresas: [],
        usuarios: [],
        empresaSelected: 1,
        usuario: {
            "nombresUsuario": "",
            "dui": ""
        },
        nuevoUsuario: {
            "idEmpresa": 0,
            "idUsuario": 0,
            "nombresUsuario": "",
            "apellidosUsuario": "",
            "dui": 0
        },
    },

    mounted: function() {
        this.cargarDatos();
    },
    methods: {
        agregarUsuario: function() {
            axios.post('https://sic-api-rest.herokuapp.com/api/Usuarios', this.nuevoUsuario)
                .then(function(response) {
                    console.log(response)
                    login.nuevoUsuario.idUsuario = 0;
                    login.nuevoUsuario.idEmpresa = 0;
                    login.nuevoUsuario.nombresUsuario = "";
                    login.nuevoUsuario.apellidosUsuario = "";
                    login.nuevoUsuario.dui = "";
                    login.cargarDatos();

                }).catch(function(error) {
                    console.log(error)
                })

            this.cargarDatos();
        },
        onChange: function(event) {
            console.log(event.target.value);
            this.nuevoUsuario.idEmpresa = event.target.value;
        },
        cargarDatos: function() {
            //cargando las empresas
            axios.get('https://sic-api-rest.herokuapp.com/api/Empresas')
                .then(function(res) {
                    login.empresas = res.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });

            //usuarios
            axios.get('https://sic-api-rest.herokuapp.com/api/Usuarios')
                .then(function(res) {
                    login.usuarios = res.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });

        },

    },

});