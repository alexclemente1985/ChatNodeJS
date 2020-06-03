const app = require('./config/server');
const socketIo = require('socket.io');

const server = app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log('SERVER ON');
});

const io = socketIo.listen(server);

app.set('io',io);

//Criação de conexão por websocket
io.on('connection',(socket)=>{
    console.log('CONNECTED USER');
    socket.on('disconnect', ()=>{
        console.log('DISCONNECTED USER');
    });

    socket.on('msgParaServidor',(data)=>{
        console.log('DADOS: ',data);
        //dialogo
        socket.emit('msgParaCliente',{
            apelido: data.apelido,
            mensagem: data.mensagem
        });

        socket.broadcast.emit('msgParaCliente',{
            apelido: data.apelido,
            mensagem: data.mensagem
        });

        //participantes
        if(parseInt(data.apelido_atualizado)===0){
            socket.emit('participantesParaCliente',{
                apelido: data.apelido
            });
    
            socket.broadcast.emit('participantesParaCliente',{
                apelido: data.apelido
            });
        }
    })
});

