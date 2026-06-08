"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
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
  const cvUrl = site.cvUrls[locale];
  const cvDownloadName = `sergey-gyach-cv-${locale}.pdf`;

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
              <a
                className="button button-primary"
                href={cvUrl}
                download={cvDownloadName}
              >
                <Download size={18} aria-hidden="true" />
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
        className="content-section impact-section"
        aria-labelledby="impact"
      >
        <div className="container">
          <SectionHeading id="impact" title={content.sections.impact} />
          <div className="detail-grid impact-grid">
            {content.benefits.map((item) => (
              <article className="detail-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
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
        className="content-section artifacts-section"
        aria-labelledby="artifacts"
      >
        <div className="container">
          <SectionHeading id="artifacts" title={content.sections.artifacts} />
          <div className="detail-grid artifact-grid">
            {content.artifacts.map((item) => (
              <article className="detail-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="content-section expertise-section"
        aria-labelledby="public-expertise"
      >
        <div className="container expertise-layout">
          <div className="expertise-copy">
            <SectionHeading
              id="public-expertise"
              title={content.sections.expertise}
            />
            <p className="section-intro">{content.expertise.summary}</p>
            <div className="expertise-links">
              <a href={site.habr} {...externalWebLinkProps}>
                <ExternalLink size={16} aria-hidden="true" />
                {content.actions.allPublications}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={site.github} {...externalWebLinkProps}>
                <GithubIcon size={16} />
                {content.contactLabels.github}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="detail-grid expertise-grid">
            {content.expertise.items.map((item) => (
              <article className="detail-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
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
              <a
                className="publication-card"
                href={publication.url}
                key={publication.url}
                aria-label={`${content.actions.read}: ${publication.title}`}
                {...externalWebLinkProps}
              >
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
                    <span className="publication-link">
                      <ExternalLink size={14} aria-hidden="true" />
                      {content.actions.read}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <a className="footer-item" href={site.github} {...externalWebLinkProps}>
            <GithubIcon size={20} />
            {site.githubLabel}
          </a>
          <a className="footer-item" href={`mailto:${site.email}`}>
            <Mail size={20} aria-hidden="true" />
            {site.email}
          </a>
          <a className="footer-item" href={site.telegram} {...externalWebLinkProps}>
            <Send size={20} aria-hidden="true" />
            {site.telegramHandle}
          </a>
          <a className="footer-item" href={site.max} {...externalWebLinkProps}>
            <MaxIcon size={20} />
            {site.maxLabel}
          </a>
          <a className="footer-item" href={site.url}>
            <Globe2 size={20} aria-hidden="true" />
            {site.url}
          </a>
        </div>
      </footer>
    </main>
  );
}
