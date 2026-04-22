import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const authmiddleware = (req: any, res: any, next: any) => {
  const secret = process.env.JWT || ""
  try {
    const header = req.header('authorization')
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'no token' })
    }
    const tkn = header.split(' ')[1]
    const decoded = jwt.verify(tkn, secret)
    req.user = decoded
    next()
  } catch (e: any) {
    console.error('JWT Verification Failed:', { message: e.message, secretProvided: !!secret })
    return res.status(401).json({ error: 'invalid token' })
  }
}

export default authmiddleware
