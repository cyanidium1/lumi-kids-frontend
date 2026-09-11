import Link from "next/link";

export default function SectionHeading({
  label,
  title,
  href,
  hrefLabel = "Дивитись усе",
}: {
  label?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 lg:mb-12">
      <div>
        {label && <p className="u-label mb-3 text-muted">{label}</p>}
        <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="u-label shrink-0 border-b border-ink pb-1 transition hover:opacity-60"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}
