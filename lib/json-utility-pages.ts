import type { UtilityPage } from '@/lib/utility-pages';

function jsonTool(path: string, title: string, description: string, kind: UtilityPage['kind'], keywords: string[]): UtilityPage {
  return {
    title,
    path,
    description,
    keywords,
    kind,
    definition: [
      `${title} helps developers transform and validate JSON-related data directly in the browser. It is designed for API debugging, data cleaning, and quick engineering workflows where clear structure matters.`,
      `The tool runs client-side and returns copy-ready output with immediate validation feedback. This is useful for SEO-friendly documentation workflows and AI-readable developer references.`,
      `Use this page when you need a fast conversion loop: paste input, inspect output, and copy stable results into code, tests, dashboards, or issue reports.`
    ],
    steps: [
      `Paste your source input into ${title}.`,
      'Apply conversion, formatting, or validation options as needed.',
      'Review output, then copy or download the final result.'
    ],
    examples: [
      'Convert API payloads before writing fixtures.',
      'Normalize JSON for code review and documentation.',
      'Cross-convert between text formats used by backend services.'
    ],
    useCases: [
      'API debugging and payload inspection.',
      'Preparing documentation examples.',
      'Building stable data transformation workflows.'
    ],
    faq: [
      {
        q: 'Does this tool run in the browser?',
        a: 'Yes. Processing is client-side and no backend database is required.'
      },
      {
        q: 'Can I copy output directly?',
        a: 'Yes, each tool provides copy-ready results for engineering workflows.'
      }
    ]
  };
}

export const jsonUtilityPages: Record<string, UtilityPage> = {
  '/json-viewer': jsonTool('/json-viewer', 'JSON Viewer', 'Explore JSON as an expandable tree and inspect nested node paths and values.', 'json-viewer', ['json viewer', 'json tree view', 'inspect json']),
  '/json-minifier': jsonTool('/json-minifier', 'JSON Minifier', 'Compress JSON into a single line and inspect size reduction metrics.', 'json-minifier', ['json minifier', 'minify json', 'json compressor']),
  '/json-escape-unescape': jsonTool('/json-escape-unescape', 'JSON Escape / Unescape', 'Escape or unescape JSON string values for embedding and transport.', 'json-escape-unescape', ['json escape', 'json unescape', 'escape json string']),
  '/json-sort': jsonTool('/json-sort', 'JSON Sort', 'Sort JSON object keys in ascending or descending recursive order.', 'json-sort', ['json sort', 'sort json keys', 'json key order']),
  '/json-to-typescript': jsonTool('/json-to-typescript', 'JSON to TypeScript', 'Convert JSON objects to TypeScript interfaces with nested structure support.', 'json-to-typescript', ['json to typescript', 'typescript interface generator', 'json schema to ts']),
  '/json-to-go': jsonTool('/json-to-go', 'JSON to Go', 'Convert JSON objects to Go struct definitions with json tags.', 'json-to-go', ['json to go', 'go struct generator', 'json tag generator']),
  '/json-to-java': jsonTool('/json-to-java', 'JSON to Java', 'Convert JSON objects to Java class fields with nested shape support.', 'json-to-java', ['json to java', 'java class generator', 'json class converter']),
  '/json-to-php': jsonTool('/json-to-php', 'JSON to PHP', 'Convert JSON objects to PHP class-style model output.', 'json-to-php', ['json to php', 'php class generator', 'json model php']),
  '/json-to-csharp': jsonTool('/json-to-csharp', 'JSON to C#', 'Convert JSON objects to C# class definitions for .NET workflows.', 'json-to-csharp', ['json to c#', 'json to csharp', 'csharp class generator']),
  '/json-to-python': jsonTool('/json-to-python', 'JSON to Python', 'Convert JSON objects to Python dataclass style definitions.', 'json-to-python', ['json to python', 'python dataclass generator', 'json typed dict']),
  '/xml-to-json': jsonTool('/xml-to-json', 'XML to JSON', 'Convert XML input into JSON output for API and integration workflows.', 'xml-to-json', ['xml to json', 'xml converter', 'json xml transform']),
  '/json-to-xml': jsonTool('/json-to-xml', 'JSON to XML', 'Convert JSON objects into XML with configurable root node name.', 'json-to-xml', ['json to xml', 'json xml converter', 'object to xml']),
  '/yaml-to-json': jsonTool('/yaml-to-json', 'YAML to JSON', 'Convert YAML content into normalized JSON output.', 'yaml-to-json', ['yaml to json', 'yaml converter', 'yaml parser']),
  '/json-to-yaml': jsonTool('/json-to-yaml', 'JSON to YAML', 'Convert JSON objects into YAML text for configuration workflows.', 'json-to-yaml', ['json to yaml', 'yaml generator', 'json config converter']),
  '/query-string-to-json': jsonTool('/query-string-to-json', 'Query String to JSON', 'Convert URL query strings into JSON objects with array support for duplicate keys.', 'query-string-to-json', ['query string to json', 'url params to json', 'parse query string']),
  '/json-to-query-string': jsonTool('/json-to-query-string', 'JSON to Query String', 'Convert JSON objects into URL query strings with encoded values.', 'json-to-query-string', ['json to query string', 'json params encoder', 'object to query']),
  '/csv-to-json': jsonTool('/csv-to-json', 'CSV to JSON', 'Convert CSV rows into JSON array objects with delimiter controls.', 'csv-to-json', ['csv to json', 'csv parser', 'table to json']),
  '/json-to-csv': jsonTool('/json-to-csv', 'JSON to CSV', 'Convert JSON array objects into CSV output and download as .csv.', 'json-to-csv', ['json to csv', 'json csv converter', 'export csv'])
};
