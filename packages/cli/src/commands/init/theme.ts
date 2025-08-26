export async function initializeTheme(args: Record<string, any>) {
  console.log('Initializing theme', args)

  await initialized(args)
  await installDependencies(args)

  await done()
}

async function initialized(data: Record<string, any>) {
  console.log('Initialized theme', data)
}

async function installDependencies(data: Record<string, any>) {
  console.log('Installed dependencies', data)
}

async function done() {
  console.log('Done')
}
