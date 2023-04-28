import  Jwt  from "jsonwebtoken";


export const generateToken = (user) => {
    /*
       1er: Objeto de asociacion del token
       2do: Clave privada del cifrado
       3ER: Tiempo de expiracion

    */
   const token = Jwt.sign(user,process.env.SIGNED_COOKIE, { expiresIn: '24h'})
   
   return token

}

export const authToken = (req,res,nect) => {
   //consultar  en el header el token
   const authHeader = req.headers.authorization

   //Token no existente o expirado
   if(!authHeader) {
      return res.status(401).send({Error: "Usuario no autenticado"})
   }
   //Sacar la palabra Bearer del token
   const token = authHeader.split(' ')[1]

   //Validar si el token es valido o no

   Jwt.sign(token, process.env.SIGNED_COOKIE, (error, credentials) => {
      if(error) {
         return res.status(403).send({ error: "Usuario no autorizado"})

      }
      //Token existente y valido
      req.user = credentials.user
      next()
   })
}