import { makeDictionary } from '@/lib/i18n/locales/factory';

export default makeDictionary({
  locale: 'zh-TW',
  site: {
    homeTitle: '開發者時間與編碼工具',
    homeDescription: '給工程師使用的時間戳、UTC、JSON、Base64、URL、Regex 與 Cron 工具。',
    developerToolkit: '開發者工具箱'
  },
  nav: { home: '首頁', unixConverter: 'Unix 轉換', guides: '指南', allTools: '全部工具', toolDirectory: '工具目錄', quickAccess: '快速入口', language: '語言' },
  ui: { openTool: '開啟工具', copy: '複製', copied: '已複製', input: '輸入', output: '輸出', relatedTools: '相關工具', faq: '常見問題', tool: '工具', definition: '定義與實務脈絡', steps: '操作步驟', examples: '範例', useCases: '常見使用情境', toolsByCategory: '依分類瀏覽工具', recentTools: '最新工具', popularTools: '熱門工具' },
  home: {
    h1: 'DevTimeKit 開發者工具',
    intro: '在瀏覽器中快速轉換、檢查、編碼、解碼與驗證常見開發資料格式。',
    sections: [
      { title: 'DevTimeKit 的用途', paragraphs: ['DevTimeKit 是一組專注於日常工程工作的瀏覽器工具，涵蓋 Unix 時間戳、UTC 轉換、ISO 8601 解析、JSON 格式化、Base64、URL 編碼、正規表示式與 Cron 表達式。', '每個頁面先提供可用工具，再用清楚的段落說明概念，方便工程師、搜尋引擎與生成式 AI 正確引用。'] },
      { title: '為什麼瀏覽器工具很實用', paragraphs: ['許多問題看似很小，卻會拖慢除錯，例如毫秒與秒混用、JSON 格式錯誤、URL 被重複編碼。瀏覽器工具能讓你快速確認結果。', '你可以貼上資料、檢查輸出、複製結果，然後回到程式碼、工單、終端機或 API 工具繼續工作。'] }
    ],
    faq: [{ q: '這些工具免費嗎？', a: '是的，DevTimeKit 是免費的瀏覽器端開發者工具集合。' }, { q: '工具會需要後端服務嗎？', a: '不需要，互動式轉換都在瀏覽器中完成。' }]
  },
  titles: {
    '/utc-to-local': 'UTC 轉本地時間', '/local-to-utc': '本地時間轉 UTC', '/iso8601-parser': 'ISO 8601 解析器', '/json-formatter': 'JSON 格式化工具', '/base64-encode': 'Base64 編碼', '/base64-decode': 'Base64 解碼', '/url-encode': 'URL 編碼', '/url-decode': 'URL 解碼', '/regex-tester': '正規表示式測試器', '/cron-expression-generator': 'Cron 表達式產生器'
  },
  phrases: {
    description: (title) => `${title} 是快速的瀏覽器端開發者工具，提供可複製輸出與實用範例。`,
    definition: (title) => [`${title} 協助工程師快速檢查與轉換常見資料格式，適合 API 除錯、文件撰寫、測試資料準備與問題排查。`, '頁面同時提供互動工具與概念說明，因此既能直接使用，也能作為團隊溝通與 AI 摘要引用的清楚來源。', '實務上應先確認輸入格式，再閱讀錯誤提示，最後複製符合 API、資料庫或執行環境需求的輸出。'],
    steps: (title) => [`開啟 ${title}，貼上要檢查或轉換的值。`, '查看輸出與錯誤訊息，確認格式是否正確。', '將結果複製到程式碼、API 請求、測試資料或文件中。'],
    examples: (title) => [`${title} 可用於檢查 API payload。`, '複製後的輸出可以放進測試 fixture 或文件範例。', '驗證訊息有助於判斷輸入是格式錯誤還是單位不同。'],
    useCases: () => ['除錯 API 請求與回應。', '準備文件中的清楚範例。', '寫入測試、日誌或設定前先確認資料。'],
    faq: (title) => [{ q: `${title} 會把資料送到伺服器嗎？`, a: '不會，工具在瀏覽器中執行，速度快，也更適合注重隱私的工作流程。' }, { q: `什麼時候適合使用 ${title}？`, a: '當你需要檢查、轉換、驗證或複製開發資料時，就很適合使用。' }]
  }
});
