const { Router } = require('express');
const { FetchData } = require('../lib/data');


//Inicializamos Router
const router = Router();

//Creacion de los endpoint
router
    .get("/personajes-parametro/:id",(req, res) => {
        var filtrarID 

        const { params: {id} } = req;
    
        (async () => {

            try {
                filtrarID = await FetchData.getCharacter(id);
        
            

        if (id == null){
            res.json({
                 msg: "No se ha seleccionado el ID", 
                 body: filtrarID
            })
        }else{

            res.json({
                msg: "Personajes Filtrados por ID",
                body:[filtrarID]
            })

        }
        res.end();

    } catch (error) {
        console.log(error);
    }

})()
    })
    .get('/arreglo-ids', (req, res) => {

        (async () => {

            try {

                var FiltrarIdes;

                const { query: {ids} } = req;

                var ides = ids.split`,`.map(x=>+x);
                FiltrarIdes = await FetchData.getSpecificCharacters(ides);

                res.json({
                    msg: "Personajes Filtrados por ID",
                    body:[FiltrarIdes]
                })
        
            } catch (error) {
                console.log(error);
            }

        })()
    })
    .get("/pagina",(req, res) => {
        
    
        (async () => {

            try {

                const { query: {pagina} } = req;

                var filtrarPagina = await FetchData.getByPage(pagina);

                res.json({
                    msg: "Personajes Filtrados por Pagina",
                    body:[filtrarPagina]
                })
    
                res.end();
        
            } catch (error) {
                console.log(error);
            }
        
        })()

        
    })
    .get("/genero",(req, res) => {
        var filtrarGenero

        const { query: {genero,pagina} } = req;
    
        (async () => {

            try {
                filtrarGenero = await FetchData.getByCharacterGender(genero, pagina);

                if (genero == null){
                    res.json({
                         msg: "No se ha encontrado coincidencias", 
                         body: [] 
                    })
                }else{
        
                    res.json({
                        msg: "Personajes Filtrados por Pagina",
                        body:[filtrarGenero]
                    })
        
                }
        
            } catch (error) {
                console.log(error);
            }
        
        })()

    })

//Exportamos las rutas
module.exports.RouterIndex = router;