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

      frontendContainerName: {
        type: String,
        required:true,
      },
      
      backendContainerName: {
        type: String,
        required:true,
      },

      userContainerName: {
        type: String,
      },

      userBackendContainerName: {
        type: String,
      },
      
      userFrontendContainerName: {
        type: String,
      },

      frontendContainerId: {
        type:String,
        required:true,
      },
      
      backendContainerId: {
        type:String,
        required:true
      },

      userContainerId: {
        type: String
      },

      userFrontendContainerId: {
        type:String
      },

      userBackendContainerId: {
        type:String
      }
    },

    {
      timestamps: true
    }
)

export const Collab = mongoose.model('Collab', collabSchema)