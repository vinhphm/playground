/// <reference types="vinxi/types/client" />
import { StartServer, createStartHandler } from '@tanstack/react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'

import { createRouter } from './router'

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(StartServer)