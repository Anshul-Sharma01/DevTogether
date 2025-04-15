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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      language: {
        type: String,
      },

      backendPort: {
        type:Number,
        required: true,
      },

      frontendPort: {
        type:Number,
        required: true
      },

      frontendContainerId: {
        type:String,
        required:true,
      },
      
      backendContainerId: {
        type:String,
        required:true
      }
    },

    {
      timestamps: true
    }
)

export const Collab = mongoose.model('Collab', collabSchema)