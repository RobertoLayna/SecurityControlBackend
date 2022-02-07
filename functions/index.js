const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()
var express = require('express')
var app = express()

app.post('/preLogin', async (req, res) => {
  const body = req
  console.log(body)
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

app.post('/login', async (req, res) => {
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

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001')
})
