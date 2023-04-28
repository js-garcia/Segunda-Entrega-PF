import local from 'passport-local'
import passport  from 'passport'
import GitHubStrategy from 'passport-github2'
import  Jwt from 'passport-jwt'
import { managerUser } from '../controllers/user.controller.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import { authToken, generateToken } from '../utils/jwt.js'

const localStrategy = localStrategy

const JWTStrategy = Jwt.Strategy
const ExtractJWT =Jwt.ExtractJwt//EXTRATOR DE HEADERS O COOKIES ETC

const initializePassport = () =>{

    const cookieExtractor = (req) => {
        const token = (req && req.cookies) ? req.cookies('jwtCookies') : null

        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //De donde extraigo mi token
        secretOrKey: process.env.SIGNED_COOKIE //Mismo valor que la firma de las cookies
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }

    }))

     //Ruta a implementar
      passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) =>{
            const { first_name, last_name, email, age, password } = req.body
            try {
                const user = await managerUser.getElementByEmail(username) //Username = email

                if (user) { //Usario existe
                    return done(null, false) //null que no hubo errores y false que no se creo el usuario

                }

                const passwordHash = createHash(password)

                const userCreated = await managerUser.addElements([{
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: passwordHash
                }])
                const token = generateToken(userCreated)

                return done(null, userCreated) //Usuario creado correctamente

            } catch (error) {
                return done(error)
            }

        }

    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await managerUser.getElementByEmail(username)

            if (!user) { //Usuario no encontrado
                return done(null, false)
            }
            if (validatePassword(password, user.password)) { //Usuario y contraseña validos
                const token = generateToken(user)
                console.log(token)
                return done(null, user)
            }

            return done(null, false) //Contraseña no valida

        } catch (error) {
            return done(error)
        }
    }))

    /*passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost8080/autSession/githubSession'
    }, async(accessToken, refreshToken, profile, done) =>{
        console.log(profile)
        const user = await managerUser.getElementByEmail(profile._json.email)

        if(user){// usuario ya existe en BDD
            done(null, user)
        } else{
            const userCreated = await managerUser.addElements([{
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                age: 18,
                password: 'coder123' //
            }])

        }
    
    }))
    */

    //Iniciar la session del usuario
    passport.serializeUser((user, done) => {
        console.log(user)
        if ( Array.isArray(user)) {
            one(null, user[0]._id)
        }
        done(null, user_id)
    })

    //Eliminar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await managerUser.getElementById(id)
        done(null, user)

    })



}

export default initializePassport
