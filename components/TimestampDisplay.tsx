import ValueRow from '@/components/ValueRow';

export default function TimestampDisplay({
  title,
  values
}: {
  title: string;
  values: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-3">
        {values.map((item) => (
          <ValueRow key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}