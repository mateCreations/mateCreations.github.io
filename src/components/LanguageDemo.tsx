import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

const LANGUAGES = [
  {
    name: 'TypeScript',
    code: `interface User {
  id: number
  name: string
  email: string
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}`,
  },
  {
    name: 'Rust',
    code: `struct User {
    id: u32,
    name: String,
    email: String,
}

impl User {
    fn new(id: u32, name: &str) -> Self {
        Self {
            id,
            name: name.to_string(),
            email: String::new(),
        }
    }
}`,
  },
  {
    name: 'Python',
    code: `class User:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name
        self.email = ""

    async def fetch(self) -> dict:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"/api/{self.id}") as resp:
                return await resp.json()`,
  },
  {
    name: 'JSON',
    code: `{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com"
    }
  ]
}`,
  },
  {
    name: 'Markdown',
    code: `# Project Title

## Overview

This is a **sample** document with *emphasis*.

\`\`\`typescript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`

- List item 1
- List item 2`,
  },
]

function SyntaxHighlight({ code, theme }: { code: string; theme: ReturnType<typeof useTheme>['theme'] }) {
  const lines = code.split('\n')
  
  const highlightLine = (line: string) => {
    let highlighted = line
      .replace(/\/\/.*$/gm, `<span style="color: ${theme.comment}">$&</span>`)
      .replace(/\/\*[\s\S]*?\*\//g, `<span style="color: ${theme.comment}">$&</span>`)
      .replace(/".*?"/g, `<span style="color: ${theme.string}">$&</span>`)
      .replace(/'.*?'/g, `<span style="color: ${theme.string}">$&</span>`)
      .replace(/\b(interface|struct|class|def|async|await|function|const|let|var|return|if|else|for|while|import|export|from|type|impl|Self|fn|new|with|as)\b/g, `<span style="color: ${theme.keyword}">$&</span>`)
      .replace(/\b(string|number|boolean|void|null|undefined|Promise|dict|int|u32|str)\b/g, `<span style="color: ${theme.type}">$&</span>`)
      .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, `<span style="color: ${theme.type}">$&</span>`)
      .replace(/\b(\d+)\b/g, `<span style="color: ${theme.number}">$&</span>`)
      .replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, `<span style="color: ${theme.function}">$1</span>(`)
    
    return highlighted
  }

  return (
    <code className="text-sm leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} style={{ minHeight: '1.5em' }}>
          <span dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }} />
        </div>
      ))}
    </code>
  )
}

export default function LanguageDemo() {
  const ref = useScrollReveal<HTMLElement>()
  const { theme } = useTheme()
  const [activeLang, setActiveLang] = useState(LANGUAGES[0])

  return (
    <section ref={ref} id="languages" className="reveal w-full py-16 px-4" style={{ backgroundColor: theme.bg1 }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <h2 className="text-2xl font-semibold tracking-tight text-center" style={{ color: theme.fg }}>
          Multi-Language Support
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.name}
              onClick={() => setActiveLang(lang)}
              className="px-4 py-2 rounded-lg font-mono text-sm transition-all"
              style={{
                backgroundColor: activeLang.name === lang.name ? theme.accent : theme.bg,
                color: activeLang.name === lang.name ? theme.bg : theme.fg,
                border: `1px solid ${theme.bg1}`,
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>

        <div
          className="rounded-xl p-6 overflow-x-auto"
          style={{
            backgroundColor: theme.bg,
            border: `1px solid ${theme.bg1}`,
          }}
        >
          <SyntaxHighlight code={activeLang.code} theme={theme} />
        </div>
      </div>
    </section>
  )
}