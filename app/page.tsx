import { SmoothScrollProvider } from "@/components/siri/smooth-scroll-provider"
import { Loader } from "@/components/siri/loader"
import { Navbar } from "@/components/siri/navbar"
import { Hero } from "@/components/siri/hero"
import { IntroSection } from "@/components/siri/intro-section"
import { ProjectScrollExperience } from "@/components/siri/project-scroll-experience"
import { AboutSection } from "@/components/siri/about-section"
import { ServicesSection } from "@/components/siri/services-section"
import { ProjectsSection } from "@/components/siri/projects-section"
import { ProcessTimeline } from "@/components/siri/process-timeline"
import { WhySiri } from "@/components/siri/why-siri"
import { StatsSection } from "@/components/siri/stats-section"
import { BeforeAfter } from "@/components/siri/before-after"
import { GallerySection } from "@/components/siri/gallery-section"
import { Testimonials } from "@/components/siri/testimonials"
import { ServiceArea } from "@/components/siri/service-area"
import { QuoteForm } from "@/components/siri/quote-form"
import { ContactSection } from "@/components/siri/contact-section"
import { Footer } from "@/components/siri/footer"
import { MobileActionBar } from "@/components/siri/mobile-action-bar"

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <ProjectScrollExperience />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessTimeline />
        <WhySiri />
        <StatsSection />
        <BeforeAfter />
        <GallerySection />
        <Testimonials />
        <ServiceArea />
        <QuoteForm />
        <ContactSection />
      </main>
      <Footer />
      <MobileActionBar />
    </SmoothScrollProvider>
  )
}
