import CopyButton from '@/components/CopyButton';

export default function ValueRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-800/60">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
        <p className="break-all font-mono text-sm text-slate-900 dark:text-slate-100">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}