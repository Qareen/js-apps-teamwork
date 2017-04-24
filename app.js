let router = new Navigo(null, true);

router
    .on('/', () => { router.navigate('/home') })
    .resolve();