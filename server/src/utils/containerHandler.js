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
    HostConfig: { NetworkMode: 'traefik-public' },
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
    HostConfig: { NetworkMode: 'traefik-public' },
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

  let userContainerFolder;
  let userContainerPort;

  if(language === "node")  {
    userContainerFolder = "backend"
    userContainerPort = 3000
  }
  else if(language === "react") {
    userContainerFolder = "frontend"
    userContainerPort = 5175
  }
  
  let user;
  let userbackend;
  let userfrontend;
  if(userContainerFolder && userContainerPort) {
     user = await docker.createContainer({
      Image: 'node:18-alpine3.18',
      name: `user-${date}`,
      Tty: true,
      ExposedPorts: { [`${userContainerPort}/tcp`]: {} },
      HostConfig: {
        NetworkMode: 'traefik-public',
        VolumesFrom: [`backend-${date}`]
      },
      Labels: {
        "traefik.enable": "true",
        [`traefik.http.routers.user-${date}.rule`]:
          `Host(\`user-${date}.docker.localhost\`)`,
        [`traefik.http.services.user-${date}.loadbalancer.server.port`]:
          `${userContainerPort}`,
      },
      WorkingDir: `/app/user/${userContainerFolder}`,
      Cmd: ['sh','-c','npm install && npm run dev']
    });
    await user.start();
    console.log("User container started.....");
  }
  else {
      userbackend = await docker.createContainer({
      Image: 'node:18-alpine3.18',
      name: `user-backend-${date}`,
      Tty: true,
      ExposedPorts: { [`3000/tcp`]: {} },
      HostConfig: {
        NetworkMode: 'traefik-public',
        VolumesFrom: [`backend-${date}`]
      },
      Labels: {
        "traefik.enable": "true",
        [`traefik.http.routers.user-backend-${date}.rule`]:
          `Host(\`user-backend-${date}.docker.localhost\`)`,
        [`traefik.http.services.user-backend-${date}.loadbalancer.server.port`]:
          `3000`,
      },
      WorkingDir: `/app/user/server`,
      Cmd: ['sh','-c','npm install && npm run dev']
    });
    await userbackend.start();

      userfrontend = await docker.createContainer({
      Image: 'node:18-alpine3.18',
      name: `user-frontend-${date}`,
      Tty: true,
      ExposedPorts: { [`5175/tcp`]: {} },
      HostConfig: {
        NetworkMode: 'traefik-public',
        VolumesFrom: [`backend-${date}`]
      },
      Labels: {
        "traefik.enable": "true",
        [`traefik.http.routers.user-frontend-${date}.rule`]:
          `Host(\`user-frontend-${date}.docker.localhost\`)`,
        [`traefik.http.services.user-frontend-${date}.loadbalancer.server.port`]:
          `5175`,
      },
      WorkingDir: `/app/user/client`,
      Env: [
        `VITE_BACKEND_URL=http://user-backend-${date}.docker.localhost`
      ],
      Cmd: ['sh','-c','npm install && npm run dev']
    });
    await userfrontend.start();
  }
  
  return {
    frontendName: `frontend-${date}`,
    backendName: `backend-${date}`,
    userName: `user-${date}`,
    userbackendName: `user-backend-${date}`,
    userfrontendName: `user-frontend-${date}`,
    frontendId: frontend.id,
    backendId: backend.id,
    userId: user?.id,
    userbackendId: userbackend?.id,
    userfrontendId: userfrontend?.id
  }
  } catch (error) {
    console.log(error)
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
    startContainer,
    deleteContainer
}