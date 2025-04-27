import Docker from 'dockerode';

const docker = new Docker();

const FRONTEND_IMAGE = 'frontend-ide';
const BACKEND_IMAGE = 'backend-ide';


const setup = async (language, roomId) => {
  try {
    const date = Date.now();

  const backend = await docker.createContainer({
    Image: BACKEND_IMAGE,
    name: `backend-${date}`,
    ExposedPorts: { '9000/tcp': {} },
    HostConfig: { NetworkMode: 'bridge' },
    Labels: { 
      "traefik.enable": "true",
      [`traefik.http.routers.backend-${date}.rule`]: 
        `Host(\`backend-${date}.docker.localhost\`)`,
      [`traefik.http.services.backend-${date}.loadbalancer.server.port`]:
        "9000",
     }
  });
  await backend.start();
  console.log("Backend Container Created.....")

  const frontend = await docker.createContainer({
    Image: FRONTEND_IMAGE,
    name: `frontend-${date}`,
    ExposedPorts: { '5174/tcp': {} },
    HostConfig: { NetworkMode: 'bridge' },
    Labels: {
      "traefik.enable": "true",
      [`traefik.http.routers.frontend-${date}.rule`]:
        `Host(\`frontend-${date}.docker.localhost\`)`,
      [`traefik.http.services.frontend-${date}.loadbalancer.server.port`]:
        "5174",
    },
    Env: [
      `VITE_API_URL=http://backend-${date}.docker.localhost`
    ]
  });
  await frontend.start();
  console.log("Frontend Container Created.....")

  return {
    frontendName: `frontend-${date}`,
    backendName: `backend-${date}`,
    frontendId: frontend.id,
    backendId: backend.id,
  }
  } catch (error) {
    console.log(error)
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