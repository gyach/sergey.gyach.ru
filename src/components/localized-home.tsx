"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  FileText,
  Globe2,
  Mail,
  Send
} from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { MaxIcon } from "@/components/max-icon";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";
import {
  localizedContent,
  site
} from "@/data/site";

const externalWebLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer"
} as const;

export function LocalizedHome() {
  const { locale } = useLanguage();
  const content = localizedContent[locale];

  useEffect(() => {
    document.title = content.metadataTitle;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    if (description) {
      description.content = content.metadataDescription;
    }
  }, [content.metadataDescription, content.metadataTitle]);

  return (
    <main id="top">
      <SiteHeader navItems={content.navItems} />

      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>{content.displayName}</h1>
            <p className="hero-summary">{content.summary}</p>

            <div className="hero-actions" aria-label={content.primaryActionsLabel}>
              <a className="button button-primary" href={site.cvUrl}>
                <FileText size={18} aria-hidden="true" />
                {content.actions.resume}
              </a>
              <a className="button button-secondary" href="#publications">
                {content.actions.publications}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="contact-strip" aria-label={content.contactLinksLabel}>
              <a href={site.github} {...externalWebLinkProps}>
                <GithubIcon size={18} />
                {content.contactLabels.github}
              </a>
              <a href={`mailto:${site.email}`}>
                <Mail size={18} aria-hidden="true" />
                {content.contactLabels.email}
              </a>
              <a href={site.telegram} {...externalWebLinkProps}>
                <Send size={18} aria-hidden="true" />
                {content.contactLabels.telegram}
              </a>
              <a href={site.max} {...externalWebLinkProps}>
                <MaxIcon size={18} />
                {content.contactLabels.max}
              </a>
            </div>
          </div>

          <div className="hero-media">
            <Image
              src="/images/avatar-2026.jpg"
              alt={content.heroImageAlt}
              width={1254}
              height={1254}
              priority
            />
          </div>
        </div>
      </section>

      <section
        className="content-section resume-section"
        aria-labelledby="resume"
      >
        <div className="container resume-layout">
          <div className="resume-main">
            <SectionHeading id="resume" title={content.sections.resume} />
            <div className="timeline">
              {content.experience.map((item) => (
                <article className="timeline-item" key={`${item.period}-${item.role}`}>
                  <p className="period">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="company">{item.company}</p>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="skills-panel" aria-label={content.sections.skills}>
            {content.skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.values.join(", ")}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section
        className="content-section publications-section"
        aria-labelledby="publications"
      >
        <div className="container">
          <SectionHeading
            id="publications"
            title={content.sections.publications}
            actionLabel={content.actions.allPublications}
            actionHref={site.habr}
          />
          <div className="publication-list publication-grid">
            {content.publications.map((publication) => (
              <article className="publication-card" key={publication.url}>
                <div className="publication-icon" aria-hidden="true">
                  <FileText size={24} />
                </div>
                <div className="publication-body">
                  <div className="publication-title-row">
                    <h3>{publication.title}</h3>
                    <span className="publication-meta">
                      {publication.source} · {publication.date}
                    </span>
                  </div>
                  <p>{publication.summary}</p>
                  <ul className="tag-list" aria-label={`${publication.title} tags`}>
                    {publication.tags.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="publication-links">
                    <a href={publication.url} {...externalWebLinkProps}>
                      <ExternalLink size={14} aria-hidden="true" />
                      {content.actions.read}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="footer-brand" href="#top">
              {site.domain}
            </a>
            <p>
              © 2026 {content.displayName}. {content.footerRights}
            </p>
          </div>
          <div className="footer-links">
            <a href={site.github} {...externalWebLinkProps}>
              <GithubIcon size={20} />
              {site.githubLabel}
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail size={20} aria-hidden="true" />
              {site.email}
            </a>
            <a href={site.telegram} {...externalWebLinkProps}>
              <Send size={20} aria-hidden="true" />
              {site.telegramHandle}
            </a>
            <a href={site.max} {...externalWebLinkProps}>
              <MaxIcon size={20} />
              {site.maxLabel}
            </a>
            <a href={site.url}>
              <Globe2 size={20} aria-hidden="true" />
              {site.url}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
