import Docker from 'dockerode';
import getPort from 'get-port';

const docker = new Docker();

const NETWORK_NAME = `Network-${Date.now()}`;
const FRONTEND_IMAGE = 'frontend-ide';
const BACKEND_IMAGE = 'backend-ide';
const PORT_IMAGE = "port-ide"

// Create the Docker network if it doesn't exist
const ensureNetworkExists = async (networkName) => {
  const networks = await docker.listNetworks();
  const existing = networks.find(n => n.Name === networkName);
  if (!existing) {
    console.log(`Creating network: ${networkName}`);
    await docker.createNetwork({ Name: networkName });
  } else {
    console.log(`Network '${networkName}' already exists`);
  }
}

const createContainerWithExposedPorts = async (imageName) => {
  const exposedPorts = {
    '3000/tcp': {},
    '5175/tcp': {}
  };

  const portBindings = {
    '3000/tcp': [{ HostPort: '3000' }],
    '5175/tcp': [{ HostPort: '5175' }]
  };

  try {
    const container = await docker.createContainer({
      Image: imageName,
      name: `container-${Date.now()}`,
      ExposedPorts: exposedPorts,
      HostConfig: {
        PortBindings: portBindings,
      },
      NetworkingConfig: {
        EndpointsConfig: {
          [NETWORK_NAME]: {}
        }
      }
    });

    await container.start();
    console.log(`🚀 User container started. Access ports → 3000 & 5175`);
    return container.id;
  } catch (err) {
    console.error('❌ Error creating container:', err);
  }
};

// Create a container with a unique name and dynamic port
const createDynamicContainer = async (namePrefix, image, containerPort, envVars = {}) => {
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
  return { 
    containerName, 
    hostPort,
    containerId: container.id,
   };
}

// Boot everything
const setup = async () =>  {
  try {
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
  
  const userContainer = await createContainerWithExposedPorts(PORT_IMAGE)

  console.log(userContainer);
  
  console.log('\nContainers ready:');
  console.log(`Backend → http://localhost:${backend.hostPort}`);
  console.log(`Frontend → http://localhost:${frontend.hostPort}`);
  return { frontend , backend }

  } catch (error) {
    console.log(error.message);
  }
}

const stopContainer = async (containerId) => {
   try {
     const container = docker.getContainer(containerId)
     await container.stop();
    
   } catch (error) {
      console.log(error.message);
   }
}

const startContainer = async (containerId) => {
  try {
    const container = docker.getContainer(containerId)
    await container.start()

  } catch (error) {
    console.log(error.message)
  }
}

const deleteContainer = async (containerId) => {
    try {
      const container = docker.getContainer(containerId)

      await container.remove({ force: true }, function (err, data) {
        if (err) {
          console.error('Error removing container:', err);
        } else {
          console.log('Container removed successfully');
        }
      });

    } catch (error) {
      console.log(error.message)
    }
}

export {
    setup,
    stopContainer,
    startContainer,
    deleteContainer
}