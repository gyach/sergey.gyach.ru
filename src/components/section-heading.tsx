type SectionHeadingProps = {
  id?: string;
  title: string;
  actionLabel?: string;
  actionHref?: string;
};

export function SectionHeading({
  id,
  title,
  actionLabel,
  actionHref
}: SectionHeadingProps) {
  const isExternalAction =
    actionHref?.startsWith("http://") || actionHref?.startsWith("https://");

  return (
    <div className="section-heading">
      <h2 id={id}>{title}</h2>
      {actionLabel && actionHref ? (
        <a
          className="section-action"
          href={actionHref}
          target={isExternalAction ? "_blank" : undefined}
          rel={isExternalAction ? "noopener noreferrer" : undefined}
        >
          {actionLabel}
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}
