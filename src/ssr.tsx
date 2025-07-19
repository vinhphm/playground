import { getRouterManifest } from '@tanstack/react-start/router-manifest'
/// <reference types="vinxi/types/client" />
import { createStartHandler, StartServer } from '@tanstack/react-start/server'

import { createRouter } from './router'

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(StartServer)
