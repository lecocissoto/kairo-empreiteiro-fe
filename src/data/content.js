import galleryManifest from './galleryManifest.json'

export default {
  brand: {
    name: 'Kairo Empreiteiro',
    phone: '5511982300630',
    whatsappDisplay: '(11) 98230-0630',
    email: 'contato@kairoempreiteiro.com.br',
    address: 'São Paulo, SP',
    instagram: '',
    areaAtendimento: 'São Paulo, Porto Alegre e João Pessoa',
  },

  nav: {
    links: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Como Funciona', href: '#processo' },
      { label: 'Galeria', href: '#galeria' },
      { label: 'Depoimentos', href: '#depoimentos' },
    ],
    ctaLabel: 'Pedir Orçamento',
  },

  hero: {
    badge: 'SÃO PAULO · PORTO ALEGRE · JOÃO PESSOA',
    headline: 'Construção e Reforma',
    headlineAccent: 'com Qualidade Real',
    subheadline:
      'Mais de 10 anos transformando espaços em São Paulo, Porto Alegre e João Pessoa. Do projeto à entrega, comprometidos com prazo, qualidade e transparência.',
    ctaPrimary: { label: 'Solicitar Orçamento Grátis', action: 'openQuote' },
    ctaSecondary: { label: 'Ver Portfólio', href: '#galeria' },
    backgroundImage: '/portfolio/drywall-pintura/full/drywall-pintura5.webp',
  },

  stats: [
    { value: '10+', label: 'Anos de Experiência' },
    { value: '200+', label: 'Obras Entregues' },
    { value: '98%', label: 'Clientes Satisfeitos' },
    { value: '3', label: 'Cidades Atendidas' },
  ],

  about: {
    sectionTitle: 'Quem é Kairo?',
    photo: '/profile/principal.webp',
    photoAlt: 'Kairo — Empreiteiro profissional em São Paulo',
    paragraphs: [
      'Kairo começou nas obras aos 16 anos como ajudante, aprendendo cada detalhe do ofício com profissionais experientes. Depois de mais de uma década no setor, fundou sua própria empreiteira com uma missão clara: entregar qualidade real, sem enrolação.',
      'Hoje lidera uma equipe especializada que atende clientes residenciais e comerciais em São Paulo, Porto Alegre e João Pessoa, com foco em pontualidade, comunicação transparente e acabamento impecável. Cada obra é tratada como se fosse a própria casa.',
    ],
    highlights: [
      { icon: 'mdi-calendar-check', text: 'Prazo sempre respeitado' },
      { icon: 'mdi-shield-check', text: 'Garantia em todos os serviços' },
      { icon: 'mdi-message-text-outline', text: 'Comunicação direta e transparente' },
      { icon: 'mdi-map-marker-radius', text: 'Atende São Paulo, Porto Alegre e João Pessoa' },
    ],
    momentsTitle: 'Dentro e fora da obra',
    moments: [
      { src: '/profile/profissional1.webp', caption: 'Mão na massa', rotate: -3 },
      { src: '/profile/casual1.webp', caption: 'Paixão por cavalos', rotate: 2 },
      { src: '/profile/profissional2.webp', caption: 'Vestindo a camisa', rotate: -2 },
      { src: '/profile/casual2.webp', caption: 'Fora do canteiro', rotate: 3 },
    ],
  },

  services: {
    sectionTitle: 'Especialidades',
    sectionSubtitle: 'Do zero ao acabamento — tudo em um só lugar, com equipe especializada.',
    items: [
      {
        id: 'construcao',
        icon: 'mdi-home-city-outline',
        title: 'Construção',
        description:
          'Obras do zero com estrutura sólida, materiais de qualidade e execução rigorosa. Residencial e comercial.',
        rooms: ['Área total', 'Área do lote', 'Garagem', 'Quintal'],
      },
      {
        id: 'reforma',
        icon: 'mdi-hammer-wrench',
        title: 'Reforma',
        description:
          'Revitalização completa de ambientes. Banheiros, cozinhas, áreas de serviço e reforma total do imóvel.',
        rooms: ['Cozinha', 'Banheiro', 'Sala', 'Quarto', 'Lavabo', 'Área de Serviço', 'Corredor'],
      },
      {
        id: 'piso',
        icon: 'mdi-border-all',
        title: 'Piso e Revestimento',
        description:
          'Porcelanato, cerâmica, vinílico e madeira. Assentamento preciso, rejunte perfeito e entrega impecável.',
        rooms: ['Sala', 'Quarto', 'Corredor', 'Cozinha', 'Banheiro', 'Varanda'],
      },
      {
        id: 'eletrica',
        icon: 'mdi-lightning-bolt',
        title: 'Elétrica',
        description:
          'Instalações e reparos elétricos com segurança e conformidade técnica. Residencial e comercial.',
        rooms: ['Área total', 'Cozinha', 'Quarto', 'Sala', 'Área de Serviço'],
      },
      {
        id: 'hidraulica',
        icon: 'mdi-pipe',
        title: 'Hidráulica',
        description:
          "Encanamento, instalação de banheiros, cozinhas, caixas d'água e reparos em geral.",
        rooms: ['Banheiro', 'Cozinha', 'Lavanderia', 'Área de Serviço'],
      },
      {
        id: 'drywall',
        icon: 'mdi-wall',
        title: 'Dry Wall',
        description:
          'Divisórias e forros em drywall — rapidez na execução, acabamento profissional e isolamento acústico.',
        rooms: ['Sala', 'Quarto', 'Escritório', 'Corredor'],
      },
    ],
  },

  process: {
    sectionTitle: 'Como Funciona',
    sectionSubtitle: 'Do primeiro contato à obra entregue em 4 passos simples e sem complicação.',
    steps: [
      {
        step: '01',
        icon: 'mdi-chat-processing-outline',
        title: 'Você Solicita',
        description:
          'Preencha o formulário ou mande mensagem no WhatsApp com o que você precisa. Simples assim.',
      },
      {
        step: '02',
        icon: 'mdi-map-marker-radius-outline',
        title: 'Visita Técnica',
        description:
          'Agendamos uma visita gratuita para avaliar o espaço, entender o projeto e tirar todas as dúvidas.',
      },
      {
        step: '03',
        icon: 'mdi-file-document-edit-outline',
        title: 'Proposta Detalhada',
        description:
          'Você recebe um orçamento claro e detalhado, sem surpresas. Prazo, escopo e valores definidos.',
      },
      {
        step: '04',
        icon: 'mdi-check-decagram-outline',
        title: 'Execução e Entrega',
        description:
          'Mão na massa com acompanhamento constante. Entregamos com qualidade e dentro do prazo combinado.',
      },
    ],
  },

  gallery: {
    sectionTitle: 'Galeria de Obras',
    sectionSubtitle: 'Resultados reais de projetos entregues. Cada foto conta uma história de qualidade.',
    // Abas espelham as pastas de fotos-originais/ (geradas por npm run fotos)
    categories: [
      { id: 'construcao', label: 'Construção' },
      { id: 'drywall-pintura', label: 'Drywall e Pintura' },
      { id: 'piso-e-revestimento', label: 'Piso e Revestimento' },
      { id: 'pisos-azulejos', label: 'Pisos e Azulejos' },
      { id: 'eletrica', label: 'Elétrica' },
    ].map(({ id, label }) => ({
      id,
      label,
      photos: (galleryManifest[id] || []).map((photo, i) => ({
        ...photo,
        alt: `${label} — foto ${i + 1}`,
      })),
    })),
  },

  testimonials: {
    sectionTitle: 'O Que Dizem os Clientes',
    sectionSubtitle: 'A satisfação de quem já transformou seu espaço com a Kairo.',
    items: [
      {
        name: 'Fernanda Oliveira',
        location: 'Tatuapé, SP',
        initials: 'FO',
        color: '#1E3A47',
        rating: 5,
        text: 'Reformamos nosso apartamento completo com o Kairo. Prazo cumprido, acabamento impecável e comunicação excelente durante todo o processo. Recomendo sem hesitar para qualquer um que busca qualidade de verdade.',
      },
      {
        name: 'Roberto Silva',
        location: 'Santo André, SP',
        initials: 'RS',
        color: '#2E5266',
        rating: 5,
        text: 'Fiz a instalação elétrica e hidráulica do meu comércio novo. Serviço limpo, profissional e dentro do orçamento combinado. Nenhuma surpresa no processo. Com certeza voltarei a trabalhar com eles.',
      },
      {
        name: 'Ana Paula Mendes',
        location: 'Osasco, SP',
        initials: 'AM',
        color: '#1A4A3A',
        rating: 5,
        text: 'O drywall que o Kairo instalou transformou completamente o meu escritório. Ficou lindo, foi rápido e sem bagunça nenhuma. A equipe é muito educada e atenciosa. Superou todas as expectativas!',
      },
    ],
  },

  cta: {
    headline: 'Pronto para transformar seu espaço?',
    subheadline:
      'Orçamento 100% gratuito e sem compromisso. Fale direto com Kairo e tire todas as suas dúvidas.',
    ctaPrimary: { label: 'Solicitar Orçamento Grátis', action: 'openQuote' },
    ctaSecondary: { label: 'Falar no WhatsApp', action: 'openWhatsApp' },
  },

  quote: {
    title: 'Solicitar Orçamento',
    stepLabels: ['Serviços', 'Detalhes', 'Contato'],
    stepTitles: [
      'Qual serviço você precisa?',
      'Detalhes do projeto',
      'Seus dados de contato',
    ],
    stepSubtitles: [
      'Selecione todos que se aplicam',
      'Quanto mais detalhes, melhor o orçamento',
      'Para entrarmos em contato com você',
    ],
    serviceOptions: [
      { id: 'construcao', label: 'Construção' },
      { id: 'reforma', label: 'Reforma' },
      { id: 'piso', label: 'Piso e Revestimento' },
      { id: 'eletrica', label: 'Elétrica' },
      { id: 'hidraulica', label: 'Hidráulica' },
      { id: 'drywall', label: 'Dry Wall' },
    ],
    allRooms: [
      'Sala', 'Quarto', 'Banheiro', 'Cozinha', 'Corredor', 'Lavabo',
      'Área de Serviço', 'Lavanderia', 'Varanda', 'Garagem',
      'Escritório', 'Área total', 'Área do lote', 'Quintal',
    ],
    buildMessage(data) {
      const services = data.services.length > 0 ? data.services.join(', ') : 'Não informado'
      const desc = data.description || 'Não informado'

      let areaText = 'Não informado'
      if (data.rooms && data.rooms.length > 0) {
        const lines = data.rooms.map(r => {
          const sqmPart = r.sqm ? ` (${r.sqm}m²)` : ''
          const svcPart = r.services && r.services.length > 0 ? ` — ${r.services.join(', ')}` : ''
          return `  • ${r.name}${sqmPart}${svcPart}`
        })
        const total = data.rooms.reduce((s, r) => s + (parseFloat(r.sqm) || 0), 0)
        areaText = lines.join('\n') + (total > 0 ? `\n  *Total aprox.: ${total}m²*` : '')
      }

      return (
        `Olá Kairo! Vim pelo site e gostaria de solicitar um orçamento. 🏗️\n\n` +
        `*Serviços desejados:* ${services}\n` +
        `*Cômodos/Áreas:*\n${areaText}\n` +
        `*Detalhes:* ${desc}\n\n` +
        `*Nome:* ${data.name}\n` +
        `*Telefone:* ${data.phone || 'Não informado'}`
      )
    },
  },

  footer: {
    tagline: 'Qualidade que você vê. Trabalho que você confia.',
    copyright: `© ${new Date().getFullYear()} Kairo Empreiteiro. Todos os direitos reservados.`,
    quickLinks: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Como Funciona', href: '#processo' },
      { label: 'Galeria', href: '#galeria' },
      { label: 'Orçamento', action: 'openQuote' },
    ],
  },
}
