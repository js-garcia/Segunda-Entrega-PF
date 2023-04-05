const selectedDB = process.env.DBSELECTION

export const getManagerMessages= async() => {
    const modelMessage = process.env.DBSELECTION == 1 ? await import('./MongoDB/models/Message.js').then (module => module.default):
     await import('./Postgresql/models/Message.js').then (module => module.default)
    return modelMessage
}


export const getManagerProducts = async() => {
    const modelProduct = process.env.DBSELECTION == 1 ? await import('./MongoDB/models/Product.js').then (module => module.default) :
      await import('./Postgresql/models/Product.js').then (module => module.default)
    return modelProduct
}

export const getManagerCart = async() => {
    const modelCart = process.env.DBSELECTION == 1 ? await import('./MongoDB/models/Cart.js').then (module => module.default):
       await import('./Postgresql/models/Cart.js').then (module => module.default)
    return modelCart
}

export const getManagerUsers = async () => {
    const modelUser = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/User.js') :
        await import('./Postgresql/models/User.js')

    return modelUser
}