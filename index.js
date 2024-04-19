const express = require("express");
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())
const jugadores = [];

class Jugador {
    constructor(id) {
        this.id = id;
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
}
class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`;
    console.log("Nuevo jugador", id);
    const nuevoJugador = new Jugador(id);
    jugadores.push(nuevoJugador);

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id);
});

app.post("/mokepon/:jugadorId",(req,res)=> {
    const jugadorId = req.params.jugadorId || "";
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    console.log('jugadorIndex',jugadorIndex)
    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadorId)
    console.log(jugadores)
    res.json({
        jugadores
    })
})

app.post("/mokepon/:jugadorId/posicion",(req,res) =>{
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0
    const y = req.body.y || 0
    console.log('jugadores', jugadorId, jugadores)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id)
    console.log('jugadorIndex',jugadorIndex)
    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].mokepon.actualizarPosicion(x,y)
    }
    
    const enemigos = jugadores.filter((jugador) => jugadorId != jugador.id)
    console.log('enemigos',enemigos)
    res.send({
        enemigos
    })

})



app.listen(8080, () => {
    console.log("Servidor funcionando en el puerto 8080");
});
