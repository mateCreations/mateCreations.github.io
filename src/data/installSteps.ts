export interface InstallContent {
  variantLabel: string
  language: string
  code?: string
  linkLabel?: string
  linkHref?: string
}

export interface InstallTab {
  id: string
  label: string
  content: InstallContent[]
}

export const installTabs: InstallTab[] = [
  {
    id: 'neovim',
    label: 'Neovim',
    content: [
      {
        variantLabel: 'Both variants included',
        language: 'lua',
        code: `{
  "mateCreations/yerba-mate.nvim",
  priority = 1000,
  config = function()
    vim.cmd("colorscheme yerba-mate") -- or "terere"
  end,
}`,
      },
    ],
  },
  {
    id: 'omarchy',
    label: 'Omarchy',
    content: [
      {
        variantLabel: 'Yerba Mate (dark)',
        language: 'bash',
        code: 'omarchy-theme-install github.com/mateCreations/omarchy-yerba-mate',
      },
      {
        variantLabel: 'Terere (light)',
        language: 'bash',
        code: 'omarchy-theme-install github.com/mateCreations/omarchy-terere',
      },
    ],
  },
  {
    id: 'vscode',
    label: 'VS Code',
    content: [
      {
        variantLabel: 'Both variants included',
        language: 'text',
        linkLabel: 'mateCreations/vscode-yerba-mate',
        linkHref: 'https://github.com/mateCreations/vscode-yerba-mate',
      },
    ],
  },
  {
    id: 'obsidian',
    label: 'Obsidian',
    content: [
      {
        variantLabel: 'Both variants included',
        language: 'text',
        linkLabel: 'mateCreations/obsidian-yerba-mate',
        linkHref: 'https://github.com/mateCreations/obsidian-yerba-mate',
      },
    ],
  },
  {
    id: 'zen',
    label: 'Zen Browser',
    content: [
      {
        variantLabel: 'Yerba Mate (dark)',
        language: 'text',
        linkLabel: 'mateCreations/zen-yerba-mate',
        linkHref: 'https://github.com/mateCreations/zen-yerba-mate',
      },
      {
        variantLabel: 'Terere (light)',
        language: 'text',
        linkLabel: 'mateCreations/zen-terere',
        linkHref: 'https://github.com/mateCreations/zen-terere',
      },
    ],
  },
  {
    id: 'librewolf',
    label: 'LibreWolf',
    content: [
      {
        variantLabel: 'Yerba Mate (dark)',
        language: 'text',
        linkLabel: 'mateCreations/librewolf-yerba-mate',
        linkHref: 'https://github.com/mateCreations/librewolf-yerba-mate',
      },
    ],
  },
]
