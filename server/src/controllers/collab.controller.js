import { Collab } from "../models/collab.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import Docker from 'dockerode';
import getPort from 'get-port';

const docker = new Docker();

const NETWORK_NAME = `Network-${Date.now()}`;
const FRONTEND_IMAGE = 'frontend-ide';
const BACKEND_IMAGE = 'backend-ide';

// Create the Docker network if it doesn't exist
async function ensureNetworkExists(networkName) {
  const networks = await docker.listNetworks();
  const existing = networks.find(n => n.Name === networkName);
  if (!existing) {
    console.log(`Creating network: ${networkName}`);
    await docker.createNetwork({ Name: networkName });
  } else {
    console.log(`Network '${networkName}' already exists`);
  }
}

// Create a container with a unique name and dynamic port
async function createDynamicContainer(namePrefix, image, containerPort, envVars = {}) {
  const hostPort = await getPort();
  const containerName = `${namePrefix}-${Date.now()}`;

  const container = await docker.createContainer({
    name: containerName,
    Image: image,
    ExposedPorts: {
      [`${containerPort}/tcp`]: {}
    },
    HostConfig: {
      PortBindings: {
        [`${containerPort}/tcp`]: [{ HostPort: String(hostPort) }]
      }
    },
    Env: Object.entries(envVars).map(([key, val]) => `${key}=${val}`),
    NetworkingConfig: {
      EndpointsConfig: {
        [NETWORK_NAME]: {}
      }
    }
  });

  await container.start();
  console.log(`${containerName} started → http://localhost:${hostPort}`);
  return { containerName, hostPort };
}

// Boot everything
async function setup() {
  await ensureNetworkExists(NETWORK_NAME);

  // Create backend container
  const backend = await createDynamicContainer(
    'backend',
    BACKEND_IMAGE,
    9000
  );

  // Create frontend container with backend VITE_URL injected
  const frontend = await createDynamicContainer(
    'frontend',
    FRONTEND_IMAGE,
    5174,
    { VITE_API_URL: `http://localhost:${backend.hostPort}` }
  );

  console.log('\nContainers ready:');
  console.log(`Backend → http://localhost:${backend.hostPort}`);
  console.log(`Frontend → http://localhost:${frontend.hostPort}`);
  return { frontend , backend }
}


const createCollab = asyncHandler(async (req, res) => {
    const { title, roomId, language, description } = req.body;

    if (!title || !roomId || !language) {
       throw new ApiError(400, "Missing required fields");
    }

    console.log("Room ID:", roomId);
    console.log("User ID:", req.user?._id);

    const existingCollab = await Collab.findOne({ roomId });
    if (existingCollab) {
        throw new ApiError(409, "Collab with same room ID already exists");
    }

    const {frontend,backend} = await setup();

    if(!frontend || !backend) {
      throw new ApiError(400, "Container not formed")
    }

    const newCollab = await Collab.create({
      title,
      roomId,
      language,
      description: description || "",
      createdBy: req.user._id,
      frontendPort: frontend.hostPort,
      backendPort: backend.hostPort
    });

    await User.findByIdAndUpdate(
        req.user._id,
        { $push: { allCollabs: newCollab._id } },
        { new: true }
    );

    return res.status(200).json(
      new ApiResponse(200, newCollab, "Collab successfully made")
    );
});


export {
     createCollab 
};
