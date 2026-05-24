import CodeBlock from '@/components/CodeBlock';

const examples = [
  {
    title: 'JavaScript',
    language: 'js',
    code: `// current timestamp\nconst ts = Math.floor(Date.now() / 1000);\n\n// timestamp to date\nconst date = new Date(ts * 1000).toISOString();`
  },
  {
    title: 'Python',
    language: 'py',
    code: `import time, datetime\n\n# current timestamp\nts = int(time.time())\n\n# timestamp to date\ndate = datetime.datetime.utcfromtimestamp(ts).isoformat()`
  },
  {
    title: 'PHP',
    language: 'php',
    code: `<?php\n$ts = time();\n$date = gmdate('c', $ts);`
  },
  {
    title: 'Go',
    language: 'go',
    code: `package main\nimport (\n  "fmt"\n  "time"\n)\nfunc main() {\n  ts := time.Now().Unix()\n  fmt.Println(ts)\n  fmt.Println(time.Unix(ts, 0).UTC())\n}`
  },
  {
    title: 'MySQL',
    language: 'sql',
    code: `-- current timestamp\nSELECT UNIX_TIMESTAMP();\n\n-- timestamp to date\nSELECT FROM_UNIXTIME(1716547200);`
  },
  {
    title: 'PostgreSQL',
    language: 'sql',
    code: `-- current timestamp\nSELECT EXTRACT(EPOCH FROM NOW())::bigint;\n\n-- timestamp to date\nSELECT TO_TIMESTAMP(1716547200);`
  },
  {
    title: 'Bash',
    language: 'bash',
    code: `# current timestamp\ndate +%s\n\n# timestamp to date (UTC)\ndate -u -d @1716547200`
  }
];

export default function ProgrammingExamples() {
  return (
    <section id="programming-examples" className="card">
      <h2 className="text-xl font-semibold">Programming Examples</h2>
      <div className="mt-4 grid gap-4">
        {examples.map((example) => (
          <CodeBlock key={example.title} title={example.title} language={example.language} code={example.code} />
        ))}
      </div>
    </section>
  );
}