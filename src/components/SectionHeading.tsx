type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-2">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
        <span aria-hidden className="text-gold-400">
          ✦
        </span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
      </div>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
