import mongoose,{Schema} from "mongoose";

const collabSchema = new Schema(
    {
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true
    },

    description: {
        type: String,
        default: ''
      },

    roomId: {
        type: String,
        required: true,
        unique: true
      },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      language: {
        type: String,
      }
    },

    {
      timestamps: true
    }
)

export const Collab = mongoose.model('Collab', collabSchema)