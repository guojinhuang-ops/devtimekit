import { makeDictionary } from '@/lib/i18n/locales/factory';

export default makeDictionary({
  locale: 'zh',
  site: {
    homeTitle: '开发者时间与编码工具',
    homeDescription: '用于时间戳、UTC、JSON、Base64、URL、正则和 Cron 表达式的快速浏览器工具。',
    developerToolkit: '开发者工具箱'
  },
  nav: { home: '首页', unixConverter: 'Unix 转换', guides: '指南', allTools: '全部工具', toolDirectory: '工具目录', quickAccess: '快速入口', language: '语言' },
  ui: { openTool: '打开工具', copy: '复制', copied: '已复制', input: '输入', output: '输出', relatedTools: '相关工具', faq: '常见问题', tool: '工具', definition: '定义与实践背景', steps: '分步说明', examples: '示例', useCases: '常见使用场景', toolsByCategory: '按分类浏览工具', recentTools: '最新工具', popularTools: '热门工具' },
  home: {
    h1: 'DevTimeKit 开发者工具',
    intro: '在浏览器中转换、检查、编码、解码和验证常见开发数据格式。',
    sections: [
      { title: 'DevTimeKit 适合什么场景', paragraphs: ['DevTimeKit 是一组专注的浏览器端开发者工具，覆盖 Unix 时间戳、UTC 转换、ISO 8601 解析、JSON 格式化、Base64、URL 编码、正则表达式和 Cron 表达式。', '每个页面都先提供可直接使用的工具，再用结构化文字解释概念，方便开发者、搜索引擎和生成式 AI 准确理解。'] },
      { title: '为什么选择浏览器端工具', paragraphs: ['很多开发问题很小，但出错成本很高，例如时间戳单位混用、JSON 语法错误、URL 二次编码。浏览器端工具能缩短验证路径。', '你可以粘贴值、查看结果、复制输出，然后回到代码、工单、终端或 API 调试工具中继续工作。'] }
    ],
    faq: [{ q: '这些工具免费吗？', a: '是的，DevTimeKit 是免费的浏览器端开发者工具集合。' }, { q: '工具需要后端吗？', a: '不需要，交互式转换都在浏览器中完成。' }]
  },
  titles: {
    '/utc-to-local': 'UTC 转本地时间', '/local-to-utc': '本地时间转 UTC', '/iso8601-parser': 'ISO 8601 解析器', '/json-formatter': 'JSON 格式化工具', '/base64-encode': 'Base64 编码', '/base64-decode': 'Base64 解码', '/url-encode': 'URL 编码', '/url-decode': 'URL 解码', '/regex-tester': '正则表达式测试器', '/cron-expression-generator': 'Cron 表达式生成器'
  },
  phrases: {
    description: (title) => `${title} 是一个快速、浏览器端运行的开发者工具，提供可复制输出和实用示例。`,
    definition: (title) => [`${title} 用于快速检查和转换常见开发数据格式，适合 API 调试、文档编写、测试用例准备和问题排查。`, '页面同时提供交互式工具和概念说明，既可以直接完成转换，也可以作为团队协作时的参考资料。', '在生产开发中，建议先确认输入格式，再处理错误提示，最后复制与 API、数据库或运行环境一致的输出。'],
    steps: (title) => [`打开 ${title}，粘贴需要检查或转换的值。`, '查看输出结果和错误提示，确认格式符合预期。', '将结果复制到代码、API 请求、测试数据、文档或工单中。'],
    examples: (title) => [`${title} 可用于调试 API 请求或响应。`, '复制后的结果可以作为测试 fixture 或文档示例。', '错误提示可以帮助判断输入是格式错误还是单位不同。'],
    useCases: () => ['调试 API 请求和响应。', '准备文档中的可读示例。', '在写入测试、日志或配置前验证数据。'],
    faq: (title) => [{ q: `${title} 会把数据发送到服务器吗？`, a: '不会，工具在浏览器中运行，更快也更适合隐私友好的工作流。' }, { q: `什么时候应该使用 ${title}？`, a: '当你需要检查、转换、验证或复制开发数据时可以使用它。' }]
  }
});
