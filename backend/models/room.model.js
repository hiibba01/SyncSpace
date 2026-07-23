import mongoose from 'mongoose';
const roomSchema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: [true, "Room name is required"],
            trim: true

        },
        roomCode: {
            type: String,
            required: [true, "Room code is required"],
            unique: true,
            upperCase: true,
            trim: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    }, { timestamps: true}
);

const Room = mongoose.model("Room", roomSchema);
export default Room;