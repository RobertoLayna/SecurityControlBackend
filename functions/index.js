const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()
var express = require('express')
var app = express()
const cors = require('cors')
var bodyParser = require('body-parser')

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json())

app.post('/app/preLogin', cors() ,async (req, res, next) => {
  const body = req.body
  console.log(body)
  try {
    const user = await prisma.users.findFirst({
        where: {
            AND: [{
                user_phone: {equals: body.phone}},{
                deleted_at: {equals: null}}
            ]
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

app.post('/app/login', cors() ,async (req, res, next) => {
  const body = req

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

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001')
})
