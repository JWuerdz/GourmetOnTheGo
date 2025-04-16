import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET

export function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    const role = user?.user_metadata?.role
    if (role !== 'admin') return res.sendStatus(403)

    req.user = user
    next()
  })
}