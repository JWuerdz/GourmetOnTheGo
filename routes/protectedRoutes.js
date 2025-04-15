import express from 'express'
import { authenticateAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Dummy in-memory menu (replace with DB later)
let menuItems = [
  { id: 1, name: 'Chicken Wrap', price: 8.99 },
  { id: 2, name: 'Veggie Bowl', price: 7.49 },
]

// ✅ GET all menu items (for admin view)
router.get('/menu', authenticateAdmin, (req, res) => {
  res.json(menuItems)
})

// ✅ POST new menu item
router.post('/menu', authenticateAdmin, (req, res) => {
  const { name, price } = req.body
  const newItem = {
    id: Date.now(), // temporary unique ID
    name,
    price: parseFloat(price),
  }
  menuItems.push(newItem)
  res.status(201).json({ message: 'Menu item added', item: newItem })
})

// ✅ PUT update menu item price
router.put('/menu/:id', authenticateAdmin, (req, res) => {
  const itemId = parseInt(req.params.id)
  const { price } = req.body

  const item = menuItems.find((item) => item.id === itemId)
  if (!item) return res.status(404).json({ error: 'Item not found' })

  item.price = parseFloat(price)
  res.json({ message: 'Price updated', item })
})

// ✅ DELETE menu item
router.delete('/menu/:id', authenticateAdmin, (req, res) => {
  const itemId = parseInt(req.params.id)
  const index = menuItems.findIndex((item) => item.id === itemId)

  if (index === -1) return res.status(404).json({ error: 'Item not found' })

  const removed = menuItems.splice(index, 1)
  res.json({ message: 'Item deleted', removed })
})

export default router