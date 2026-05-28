import content from '../data/content.js'

export function useWhatsApp() {
  const phone = content.brand.phone

  function buildUrl(message) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  function openDirect() {
    window.open(`https://wa.me/${phone}`, '_blank', 'noopener,noreferrer')
  }

  function openWithIntro() {
    const message = `Olá Kairo! Vim pelo site e gostaria de solicitar um orçamento. 😊`
    window.open(buildUrl(message), '_blank', 'noopener,noreferrer')
  }

  function sendQuote(formData) {
    const serviceLabels = formData.services.map(id => {
      const opt = content.quote.serviceOptions.find(o => o.id === id)
      return opt ? opt.label : id
    })
    const message = content.quote.buildMessage({
      ...formData,
      services: serviceLabels,
    })
    window.open(buildUrl(message), '_blank', 'noopener,noreferrer')
  }

  return { openDirect, openWithIntro, sendQuote }
}
