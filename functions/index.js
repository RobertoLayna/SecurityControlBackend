const functions = require("firebase-functions");
const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.preLogin = functions.https.onRequest(async(req, res) => {
  cors(req, res, async(err) => {
    if (req.method == "options") res.end()
    const body = req.body

    try {
    const user = await prisma.users.findFirst({
        where: {
          user_phone: body.phone,
          deleted_at: null
        },
        select: {
            user_phone: true,
            user_complete_name: true,
            user_rol: true,
            user_active: true
        }
      })
      if (user) {
        res.send({status: 'success', data: user})
      } else {
        res.send({status: 'error', data: { message: 'no user found' }})
      }
      
    }catch (err) {
        console.log(err)
        res.send({status: 'error', data: { message: 'something was wrong' }})
    }
  })
})

exports.login = functions.https.onRequest(async(req, res) => {
  cors(req, res, async(err) => {
    if (req.method == "options") res.end()
    const body = req.body

    try {
    const user = await prisma.users.findFirst({
        where: {
          user_phone: body.phone,
          user_password: body.password,
          deleted_at: null
        },
      })

      if (user) {
        res.send({status: 'success', data: user})
      } else {
        res.send({status: 'error', data: { message: 'no user found' }})
      }
      
    }catch (err) {
        console.log(err)
        res.send({status: 'error', data: { message: 'something was wrong' }})
    }
  })
})