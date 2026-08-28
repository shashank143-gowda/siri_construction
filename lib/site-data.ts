// Content for SIRI Constructions and Developers, a JRK Group company.
// Replace with real data / Supabase-backed content when available.

export const company = {
  name: 'SIRI Constructions and Developers',
  shortName: 'SIRI Constructions',
  group: 'A JRK Group Company',
  founded: 2015,
  tagline: 'Engineering Precision. Architectural Excellence.',
  location: 'Hassan, Karnataka, India',
  locationShort: 'Hassan • Karnataka',
  address: 'Near Malnad Nursing Home, K R Puram, Hassan',
  gstin: '29CAHPB7717E1ZR',
  phone: '+91 91640 20996',
  phoneHref: 'tel:+91 91640 20996',
  email: 'hkbharu@gmail.com',
  whatsapp: '+91 91640 20996',
  whatsappHref: 'https://wa.me/919164020996',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Hassan+Karnataka',
  // Only genuine, existing accounts should be listed. Placeholders shown as inactive.
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'LinkedIn', href: '#' },
    
  ],
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
  { label: 'Projects', href: '#projects' },
  
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export type Project = {
  id: string
  index: string
  title: string
  slug: string
  category: 'residential' | 'commercial' | 'civil'
  categoryLabel: string
  location: string
  type: string
  status: 'Completed' | 'Ongoing'
  area: string
  duration: string
  completion: string
  image: string
  description: string
  overview: string
  services: string[]
}

// Signature scroll journey projects (subset, immersive)
export const signatureProjects: Pick<
  Project,
  'index' | 'title' | 'slug' | 'location' | 'type' | 'image'
>[] = [
  {
    index: '01',
    title: 'Residential Villa',
    slug: 'residential-villa',
    location: 'Hassan, Karnataka',
    type: 'Residential Construction',
    image: '/images/project-01.png',
  },
  {
    index: '02',
    title: 'Modern Family Home',
    slug: 'modern-family-home',
    location: 'Hassan, Karnataka',
    type: 'Residential Construction',
    image: '/images/project-02.png',
  },
  {
    index: '03',
    title: 'Contemporary Residence',
    slug: 'contemporary-residence',
    location: 'Hassan, Karnataka',
    type: 'Residential Construction',
    image: '/images/project-03.png',
  },
  {
    index: '04',
    title: 'Completed Residence',
    slug: 'completed-residence',
    location: 'Hassan, Karnataka',
    type: 'Residential Construction',
    image: '/images/project-04.png',
  },
]

export const projects: Project[] = [
  {
    id: 'p1',
    index: '01',
    title: 'Residential Villa',
    slug: 'residential-villa',
    category: 'residential',
    categoryLabel: 'Residential',
    location: 'Hassan, Karnataka',
    type: 'Residential Construction',
    status: 'Completed',
    area: 'XXXX sq.ft',
    duration: 'XX months',
    completion: '20XX',
    image: '/images/project-01.png',
    description: 'A two-storey family villa built with warm materials and clean lines.',
    overview:
      'A thoughtfully planned residential villa combining warm natural materials with a modern architectural language. Built with a focus on durability, natural light and long-term value for the family it was designed around.',
    services: ['Structural Works', 'Turnkey Construction', 'Finishing'],
  },
  {
    id: 'p2',
    index: '02',
    title: 'Modern Family Home',
    slug: 'modern-family-home',
    category: 'residential',
    categoryLabel: 'Residential',
    location: 'Hassan, Karnataka',
    type: 'Residential Construction',
    status: 'Completed',
    area: 'XXXX sq.ft',
    duration: 'XX months',
    completion: '20XX',
    image: '/images/project-02.png',
    description: 'Clean cubic volumes with a cantilevered upper floor.',
    overview:
      'A modern family home defined by clean cubic volumes and a cantilevered upper floor. The design balances privacy and openness while maximising usable space on a compact plot.',
    services: ['Residential Construction', 'Structural Works', 'Finishing'],
  },
  {
    id: 'p3',
    index: '03',
    title: 'Contemporary Residence',
    slug: 'contemporary-residence',
    category: 'residential',
    categoryLabel: 'Residential',
    location: 'Hassan, Karnataka',
    type: 'Residential Construction',
    status: 'Ongoing',
    area: 'XXXX sq.ft',
    duration: 'XX months',
    completion: 'Ongoing',
    image: '/images/project-03.png',
    description: 'Horizontal lines, timber screens and a reflecting pool.',
    overview:
      'A contemporary residence with strong horizontal lines, warm timber screens and a reflecting pool at the entrance. Currently under construction with careful attention to detailing and finishing.',
    services: ['Turnkey Construction', 'Structural Works'],
  },
  {
    id: 'p4',
    index: '04',
    title: 'Commercial Block',
    slug: 'commercial-block',
    category: 'commercial',
    categoryLabel: 'Commercial',
    location: 'Hassan, Karnataka',
    type: 'Commercial Construction',
    status: 'Completed',
    area: 'XXXX sq.ft',
    duration: 'XX months',
    completion: '20XX',
    image: '/images/project-commercial.png',
    description: 'A low-rise commercial building with a glass and concrete facade.',
    overview:
      'A low-rise commercial block designed for flexible tenancy, built with a durable glass and concrete facade and efficient service planning.',
    services: ['Commercial Construction', 'Structural Works'],
  },
  {
    id: 'p5',
    index: '05',
    title: 'Civil Infrastructure Works',
    slug: 'civil-infrastructure-works',
    category: 'civil',
    categoryLabel: 'Civil',
    location: 'Hassan District, Karnataka',
    type: 'Civil Works',
    status: 'Completed',
    area: '—',
    duration: 'XX months',
    completion: '20XX',
    image: '/images/project-civil.png',
    description: 'Reinforced concrete civil structure engineered for longevity.',
    overview:
      'A civil works project delivering reinforced concrete infrastructure engineered for longevity and structural integrity under demanding conditions.',
    services: ['Civil Works', 'Structural Works'],
  },
  {
    id: 'p6',
    index: '06',
    title: 'Completed Residence',
    slug: 'completed-residence',
    category: 'residential',
    categoryLabel: 'Residential',
    location: 'Hassan, Karnataka',
    type: 'Residential Construction',
    status: 'Completed',
    area: 'XXXX sq.ft',
    duration: 'XX months',
    completion: '20XX',
    image: '/images/project-04.png',
    description: 'A completed modern residence with landscaped entrance.',
    overview:
      'A completed modern residence with a warm white and sandstone facade and a landscaped entrance, handed over to a delighted family.',
    services: ['Turnkey Construction', 'Finishing', 'Renovation'],
  },
]

export const constructionStages = [
  { index: '01', title: 'Foundation', image: '/images/stage-foundation.png', text: 'Reinforced concrete foundation and footings laid with precision.' },
  { index: '02', title: 'Structure', image: '/images/stage-during.png', text: 'Structural columns, beams and slabs erected to specification.' },
  { index: '03', title: 'Brickwork', image: '/images/intro-structure.png', text: 'Walls raised with quality masonry and careful alignment.' },
  { index: '04', title: 'Plastering', image: '/images/stage-during.png', text: 'Internal and external plastering for a smooth, durable surface.' },
  { index: '05', title: 'Finishing', image: '/images/interior-01.png', text: 'Flooring, painting, fixtures and detailed finishing work.' },
  { index: '06', title: 'Completed', image: '/images/stage-after.png', text: 'Final inspection, cleaning and handover of the completed home.' },
]

export const services = [
  { index: '01', title: 'Structural Design', image: '/images/stage-foundation.png', description: 'Engineered structural design for safe, durable, load-bearing construction.' },
  { index: '02', title: 'Architectural Design Planning', image: '/images/intro-structure.png', description: 'Complete architectural planning tailored to your site and requirements.' },
  { index: '03', title: 'Exterior and Interior Design', image: '/images/interior-01.png', description: 'Cohesive exterior facades and interior spaces designed together.' },
  { index: '04', title: 'Layout Planning', image: '/images/about.png', description: 'Efficient space and layout planning for functional, well-utilised buildings.' },
  { index: '05', title: 'Construction and Execution Works', image: '/images/stage-during.png', description: 'End-to-end construction execution from foundation to handover.' },
  { index: '06', title: 'Supervision Works', image: '/images/stage-before.png', description: 'On-site supervision ensuring quality, safety and schedule compliance.' },
  { index: '07', title: 'Interior Works', image: '/images/gallery-kitchen.jpg', description: 'Complete interior fit-out and finishing work.' },
  { index: '08', title: "Property Valuation for Banks & NBFC's", image: '/images/project-commercial.png', description: 'Certified property valuation reports for bank and NBFC loan purposes.' },
  { index: '09', title: 'Property Valuation for Visa & Immigration purpose', image: '/images/project-civil.png', description: 'Property valuation reports for visa and immigration documentation.' },
]

// Distinguishes which division a service belongs to, for sections that
// need to show Construction and Validation as separate groups.
export const serviceDivisions = {
  construction: services.slice(0, 7),
  validation: services.slice(7),
}

// Feature bullets for the Validation & Compliance division, shown in its
// own section (see ValidationSection). Keep short — Vikas's brief-copy rule.

export const validationFeatures: Record<string, string[]> = {
  "Property Valuation for Banks & NBFC's": [
    'Loan-purpose valuation',
    'Bank-approved reports',
    'NBFC documentation support',
    'Market value assessment',
  ],
  'Property Valuation for Visa & Immigration purpose': [
    'Immigration-compliant reports',
    'Asset value certification',
    'Embassy/consulate documentation support',
    'Fast turnaround reports',
  ],
}

export const process = [
  { index: '01', title: 'Consultation', text: 'Understand requirements.', image: '/images/about.png' },
  { index: '02', title: 'Site Assessment', text: 'Study the location and project requirements.', image: '/images/stage-before.png' },
  { index: '03', title: 'Planning', text: 'Planning, estimation and execution strategy.', image: '/images/intro-structure.png' },
  { index: '04', title: 'Construction', text: 'Professional site execution.', image: '/images/stage-during.png' },
  { index: '05', title: 'Quality Check', text: 'Inspection and finishing.', image: '/images/interior-01.png' },
  { index: '06', title: 'Handover', text: 'Complete project delivery.', image: '/images/stage-after.png' },
]

export const whyReasons = [
  { title: 'Quality', text: 'Professional construction and attention to detail.' },
  { title: 'Transparency', text: 'Clear communication throughout the project.' },
  { title: 'Reliability', text: 'Structured project execution.' },
  { title: 'Craftsmanship', text: 'Focus on workmanship and finishing.' },
  { title: 'Customer First', text: 'Every project is built around client requirements.' },
]

// Team size and founding year are real; project/client counts are
// placeholders — replace with verified company numbers before launch.
export const stats = [
  { value: 'XX', suffix: '+', label: 'Projects Completed' },
  { value: '10', suffix: '+', label: 'Years Experience' },
  { value: '16', suffix: '+', label: 'Team Professionals' },
  { value: 'XX', suffix: '', label: 'Ongoing Projects' },
]

export const values = ['Quality', 'Integrity', 'Safety', 'Transparency', 'Craftsmanship', 'Customer Satisfaction']

export const galleryCategories = ['All', 'Homes', 'Construction', 'Civil Works', 'Interiors', 'Completed Projects'] as const

export const galleryItems = [
  { src: '/images/project-01.png', category: 'Homes', title: 'Residential Villa', location: 'Hassan' },
  { src: '/images/stage-during.png', category: 'Construction', title: 'Structure Stage', location: 'Hassan' },
  { src: '/images/project-civil.png', category: 'Civil Works', title: 'Civil Works', location: 'Hassan District' },
  { src: '/images/interior-01.png', category: 'Interiors', title: 'Living Space', location: 'Hassan' },
  { src: '/images/project-04.png', category: 'Completed Projects', title: 'Completed Residence', location: 'Hassan' },
  { src: '/images/project-02.png', category: 'Homes', title: 'Modern Family Home', location: 'Hassan' },
  { src: '/images/stage-foundation.png', category: 'Construction', title: 'Foundation Stage', location: 'Hassan' },
  { src: '/images/project-03.png', category: 'Completed Projects', title: 'Contemporary Residence', location: 'Hassan' },
  { src: '/images/stage-after.png', category: 'Homes', title: 'Finished Home', location: 'Hassan' },
  { src: '/images/gallery-kitchen.jpg', category: 'Interiors', title: 'Kitchen Design', location: 'Hassan' },
  { src: '/images/gallery-bedroom.jpg', category: 'Interiors', title: 'Bedroom Interior', location: 'Hassan' },
  { src: '/images/gallery-pooja.jpg', category: 'Interiors', title: 'Pooja Room', location: 'Hassan' },
  { src: '/images/gallery-wardrobe.jpg', category: 'Interiors', title: 'Wardrobe Design', location: 'Hassan' },
  { src: '/images/gallery-study.jpg', category: 'Interiors', title: 'Study Nook', location: 'Hassan' },
  { src: '/images/gallery-bedroom-02.jpg', category: 'Interiors', title: 'Bedroom Interior', location: 'Hassan' },
]

// No fake testimonials. These are clearly-marked placeholders to be replaced
// with genuine, consented customer reviews before launch.
export const testimonials = [
  { name: 'Customer Name', type: 'Residential Construction', location: 'Hassan', rating: 5, review: 'Placeholder review. Replace with a genuine, consented customer testimonial before launch.' },
  { name: 'Customer Name', type: 'Turnkey Construction', location: 'Hassan', rating: 5, review: 'Placeholder review. Replace with a genuine, consented customer testimonial before launch.' },
  { name: 'Customer Name', type: 'Civil Works', location: 'Hassan District', rating: 5, review: 'Placeholder review. Replace with a genuine, consented customer testimonial before launch.' },
]

export const serviceAreas = ['Hassan', 'Channarayapatna', 'Arsikere', 'Holenarasipura', 'Sakleshpur', 'Belur', 'Alur', 'Arkalgud']

export const projectTypeOptions = [
  'Structural Design',
  'Architectural Design Planning',
  'Exterior and Interior Design',
  'Layout Planning',
  'Construction and Execution Works',
  'Supervision Works',
  'Interior Works',
  "Property Valuation for Banks & NBFC's",
  'Property Valuation for Visa & Immigration purpose',
]

export const clients = [
  { name: 'Aadhar Housing Finance Ltd.', logo: '/images/aadhar-housing.png' },
  { name: 'Veritas Finance Pvt Ltd.', logo: '/images/veritas-finance.webp' },
  { name: 'The Hassan District Co-operative Central Bank Ltd.', logo: '/images/hassan-district-bank.png' },
  { name: 'Sri Kannikaparameshwari Co-operative Bank Ltd.', logo: '/images/kannikaparameshwari-bank.png' },
  { name: 'City Co-operative Bank Ltd.', logo: '/images/city-cooperative-bank.png' },
  { name: 'Varashakti Housing Finance Ltd.', logo: '/images/varashakti-housing.png' },
  { name: 'Cholamandalam Investment & Finance Company Ltd.', logo: '/images/chola-finance.webp' },
  { name: 'Manappuram Home Finance Ltd.', logo: '/images/manappuram-home-finance.webp' },
  { name: 'Piramal Finance Ltd.', logo: '/images/piramal-finance.jpg' },
  { name: 'Slice Small Finance Bank Ltd.', logo: '/images/slice-bank.png' },
  { name: 'Navanc Data Sciences Private Limited', logo: '/images/navanc-data-sciences.png' },
  { name: 'Ramaiah Capital Private Limited', logo: '/images/ramaiah-capital.png' },
]
