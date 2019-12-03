const cuentas1 = new Vue({
    el: '#cuentas',
    data: {
        cateSelected: 1,
        cuentas: [],
        subCuentas: [],
        cuentaSelected: 1,
        subCuentaSelected: 1,
        nuevaCuenta: {
            "idCuenta": 0,
            "nombreCuenta": "",
            "descripcionCuenta": ""
        },
        nuevaSubCuenta: {
            "idSubCuenta": 0,
            "idCuenta": 0,
            "nombreSubCuenta": "",
            "descripcionSubCuenta": ""
        },
    },

    mounted: function() {
        this.cargarDatos();
    },
    methods: {
        nuevaCuentaDB() {

            axios.post('https://sic-api-rest.herokuapp.com/api/Cuenta', this.nuevaCuenta)
                .then(function(response) {
                    console.log(response)
                    cuentas1.nuevaCuenta.idCuenta = 0;
                    cuentas1.nuevaCuenta.nombreCuenta = "";
                    cuentas1.nuevaCuenta.descripcionCuenta = "";
                    cuentas1.cargarDatos();

                }).catch(function(error) {
                    console.log(error)
                })

            this.cargarDatos();

        },
        agregarSubCuenta() {
            this.nuevaSubCuenta.idCuenta = this.cuentaSelected.idCuenta;
            // https://sic-api-rest.herokuapp.com/api/SubCuenta/8

            axios.post('https://sic-api-rest.herokuapp.com/api/SubCuenta', this.nuevaSubCuenta)
                .then(function(response) {

                    cuentas1.nuevaSubCuenta.idSubCuenta = 0;
                    cuentas1.nuevaSubCuenta.idCuenta = this.cuentaSelected.idCuenta;
                    cuentas1.nuevaSubCuenta.nombreSubCuenta = "";
                    cuentas1.nuevaSubCuenta.descripcionSubCuenta = "";
                    cuentas1.cargarDatos();

                }).catch(function(error) {
                    console.log(error)
                })

            this.cargarDatos();

        },
        EliminarSubCuenta() {
            this.nuevaSubCuenta.idCuenta = this.cuentaSelected.idCuenta;


            axios.delete('https://sic-api-rest.herokuapp.com/api/SubCuenta/' + this.subCuentaSelected.idSubCuenta)
                .then(function(response) {
                    cuentas1.subCuentaSelected = 1;
                    cuentas1.cargarDatos();

                }).catch(function(error) {
                    console.log(error)
                })

            this.cargarDatos();

        },

        cargarDatos: function() {
            //cargando las cuentas
            axios.get('https://sic-api-rest.herokuapp.com/api/Cuenta')
                .then(function(res) {
                    cuentas1.cuentas = res.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });

            //sub-cuenta
            axios.get('https://sic-api-rest.herokuapp.com/api/SubCuenta')
                .then(function(res) {
                    cuentas1.subCuentas = res.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });

        },
        eliminarCuenta: function() {
            axios.delete('https://sic-api-rest.herokuapp.com/api/Cuenta/' + this.cuentaSelected.idCuenta)
                .then(function(res) {
                    console.log("DELETE PRODUCTO");
                    cuentas1.cargarDatos();
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });

        },
        modificarCuenta: function() {
            axios.put('https://sic-api-rest.herokuapp.com/api/Cuenta', this.cuentaSelected)
                .then(function(res) {
                    console.log("UPDATED cuenta");
                    cuentas1.cargarDatos();
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });
        },
        modificarSubCuenta: function() {
            axios.put('https://sic-api-rest.herokuapp.com/api/SubCuenta', this.subCuentaSelected)
                .then(function(res) {
                    console.log("UPDATED cuenta");
                    cuentas1.cargarDatos();
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });
        },

        cerrarAlerta: function() {
            $('#alertaCambio').hide('fade');
        },


    },

});

$(document).ready(function() {

    $('#btnCobrar').click(function() {
        $('#myAlert').show('fade');

        setTimeout(function() {
            $('#myAlert').hide('fade');
        }, 4000);

    });

    $('#linkClose').click(function() {
        $('#myAlert').hide('fade');
    });

});