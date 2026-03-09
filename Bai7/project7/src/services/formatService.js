const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount)
}

const formatNumber = (num) => {
  return new Intl.NumberFormat('vi-VN').format(num)
}

export { formatCurrency, formatNumber }
