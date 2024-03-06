/* 
Commit message 基本結構:
    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>

Commitlint 配置項文檔:
https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/src/index.ts
*/

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-empty': [2, 'never'],            // type 不為空
        'type-enum': [
            2,
            'always',
            [
                'feat',       // 增加新功能
                'fix',        // 修復問題/BUG
                'perf',       // 優化/性能提升
                'style',      // 代碼風格相關無影響運行結果的
                'docs',       // 文檔/注釋
                'test',       // 測試相關
                'refactor',   // 重構
                'build',      // 對構建系統或者外部依賴項進行了修改
                'ci',         // 對 CI 設定檔或腳本進行了修改
                'chore',      // 依賴更新/腳手架配置修改等
                'revert',     // 撤銷修改
                'workflow',   // 工作流改進
                'types',      // 類型修改
                'release',
                'update'
            ],
        ],
        'scope-empty': [2, 'never'],
        'subject-min-length': [2, 'always', 4],   // suject至少包含4個字符
        "subject-empty": [2, "never"],
    },
    prompt: {
        settings: {},
        messages: {
            skip: ':skip',
            max: 'upper %d chars',
            min: '%d chars at least',
            emptyWarning: 'can not be empty',
            upperLimitWarning: 'over limit',
            lowerLimitWarning: 'below limit'
        },
        questions: {
            type: {
                description: "Select the type of change that you're committing:",
                enum: {
                    feat: {
                        description: 'A new feature',
                        title: 'Features',
                        emoji: '✨',
                    },
                    docs: {
                        description: 'Documentation only changes',
                        title: 'Documentation',
                        emoji: '📚',
                    },
                    fix: {
                        description: 'A bug fix',
                        title: 'Bug Fixes',
                        emoji: '🐛',
                    },
                    style: {
                        description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
                        title: 'Styles',
                        emoji: '💎',
                    },
                    refactor: {
                        description: 'A code change that neither fixes a bug nor adds a feature',
                        title: 'Code Refactoring',
                        emoji: '📦',
                    },
                    perf: {
                        description: 'A code change that improves performance',
                        title: 'Performance Improvements',
                        emoji: '🚀',
                    },
                    test: {
                        description: 'Adding missing tests or correcting existing tests',
                        title: 'Tests',
                        emoji: '🚨',
                    },
                    build: {
                        description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
                        title: 'Builds',
                        emoji: '🛠',
                    },
                    ci: {
                        description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
                        title: 'Continuous Integrations',
                        emoji: '⚙️',
                    },
                    chore: {
                        description: "Other changes that don't modify src or test files",
                        title: 'Chores',
                        emoji: '♻️',
                    },
                    revert: {
                        description: 'Reverts a previous commit',
                        title: 'Reverts',
                        emoji: '🗑',
                    },
                },
            },
            scope: {
                description:
                    'What is the scope of this change (e.g. component or file name)',
            },
            subject: {
                description: 'Write a short, imperative tense description of the change',
            },
            isBreaking: {
                description: 'Are there any breaking changes?',
            },
            breakingBody: {
                description:
                    'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
            },
            breaking: {
                description: 'Describe the breaking changes',
            },
            isIssueAffected: {
                description: 'Does this change affect any open issues?',
            },
            issuesBody: {
                description:
                    'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
            },
            issues: {
                description: 'Add issue references (e.g. "fix #123", "re #123".)',
            },
        },
    }
};
