import type { Metadata } from 'next';
import ToolHubPage, { buildHubMetadata } from '@/components/ToolHubPage';

export const metadata: Metadata = buildHubMetadata(
  'AI Tools',
  'AI developer tools for token estimation, prompt formatting, system prompt building, and prompt cleaning workflows.',
  '/ai-tools',
  ['ai tools', 'prompt tools', 'chatgpt tools', 'token counter']
);

export default function Page() {
  return (
    <ToolHubPage
      title="AI Tools"
      description="Explore browser-side AI prompt and text workflow tools for developers and content teams."
      path="/ai-tools"
      links={[
        { href: '/ai-token-counter', label: 'AI Token Counter', description: 'Estimate prompt tokens from character and word counts.' },
        { href: '/prompt-formatter', label: 'Prompt Formatter', description: 'Restructure rough prompts into role-task-context format.' },
        { href: '/prompt-template-generator', label: 'Prompt Template Generator', description: 'Generate reusable prompts by scenario.' },
        { href: '/ai-system-prompt-builder', label: 'AI System Prompt Builder', description: 'Create policy-style system prompts for apps.' },
        { href: '/markdown-to-prompt', label: 'Markdown to Prompt', description: 'Convert markdown into model-friendly prompt text.' },
        { href: '/ai-text-cleaner', label: 'AI Text Cleaner', description: 'Clean spacing, markdown noise, and line breaks before prompting.' },
        { href: '/ai-prompt-library', label: 'AI Prompt Library', description: 'Browse 50+ reusable prompt templates.' }
      ]}
    />
  );
}

