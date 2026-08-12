import { company, navLinks, services } from "@/lib/site-data"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="font-display text-2xl font-extrabold tracking-tight text-foreground">
              {company.name}
            </div>
            <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
              {company.tagline} Residential, commercial and civil construction in {company.locationShort}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {company.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-border px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-foreground/80 transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {company.locationShort}
          </p>
        </div>
      </div>
    </footer>
  )
}
