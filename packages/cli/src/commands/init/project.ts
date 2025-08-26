export async function initializeProject(args: Record<string, any>) {
  console.log('Initializing project', args)

  await initialized(args)
  await installDependencies(args)

  await done()
}

async function initialized(data: Record<string, any>) {
  console.log('Initialized project', data)
}

async function installDependencies(data: Record<string, any>) {
  console.log('Installed dependencies', data)
}

async function done() {
  console.log('Done')
}
