import * as net from 'net'
import {PacketHandler} from './Packets/PacketReader'
import * as Packet from './Packets/PacketMaker'
import {List, Assoc} from './Packets/List'
List.Init()

net.createServer( (socket) => {
    let socketname = socket.remoteAddress + ":" + socket.remotePort
    console.log(`New connection ${socketname}`)

    //Packet.Send("SendGreetings", socket);

    socket.on('data', (data: Buffer) => new PacketHandler(socket, data))

    socket.on('error', (err) => {
        console.log("Error", err)
        if (!socket.destroyed)
            socket.destroy()
    })

    socket.on('end', () => {
        console.log("Socket end")
        if (!socket.destroyed)
            socket.destroy()
    })
})
.on('error', (err) => {
  throw err;
})
.listen({
  host: 'localhost',
  port: 28000,
  exclusive: true
});
console.log("Running")
