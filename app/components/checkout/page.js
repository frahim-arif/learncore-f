// app/checkout/page.js
'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'


export default function CheckoutPage() {
  const params = useSearchParams()
  const courseId = params.get('course') || 'wd101'
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleBuy() {
    setLoading(true)
    try {
      const res = await axios.post('/api/checkout', { courseId })
      // backend should return paymentUrl or success
      setMsg('Order created. Redirecting to payment...')
      if (res.data.paymentUrl) window.location.href = res.data.paymentUrl
      else setMsg('Purchase successful (mock).')
    } catch (e) {
      setMsg('Error creating order.')
    } finally { setLoading(false) }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="card max-w-xl">
        <p>Course ID: <strong>{courseId}</strong></p>
        <div className="mt-4">
          <button onClick={handleBuy} disabled={loading} className="px-4 py-2 rounded-lg bg-brand text-white">
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
        {msg && <p className="mt-3 text-sm text-gray-600">{msg}</p>}
      </div>
    </div>
  )
}
