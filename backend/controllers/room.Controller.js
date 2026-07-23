import Room from '../models/room.model.js';
import crypto from 'crypto';

export const createRoom = async(req, res) => {
    try{
        const {roomName} = req.body;
        if(!roomName){
            return res.status(400).json({
                success: false,
                message: "Room name is required!"
            });
        }
        const owner = req.user._id;

        let roomCode;
        let roomExists = true;
        while(roomExists){
            roomCode = crypto
              .randomBytes(3)
              .toString("hex")
              .toUpperCase();

            roomExists = await Room.findOne({ roomCode });
        }
        

        const room = await Room.create({
            roomName,
            roomCode,
            owner,
            members: [owner]
        });

        return res.status(201).json({
            success: true,
            message: "Room created successfully!",
            room
        });
    } catch(error){
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }

}