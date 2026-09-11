import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function CatalogHeader({
  title,
  caption,
  breadcrumbs,
}: {
  title: string;
  caption?: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <div className="mb-8 lg:mb-12">
      <nav aria-label="Навігація" className="u-label mb-6 text-muted lg:mb-10">
        <Link href="/" className="transition hover:text-ink">
          Головна
        </Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.label}>
            <span className="px-2">/</span>
            {crumb.href ? (
              <Link href={crumb.href} className="transition hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <h1 className="u-display text-[34px] leading-[1.08] lg:text-[52px]">
        {title}
      </h1>
      {caption && (
        <p className="mt-3 max-w-[440px] text-[13px] text-muted">{caption}</p>
      )}
    </div>
  );
}
