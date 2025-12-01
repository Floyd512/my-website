// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'TOM FORD',
    tagline: 'R&B & RMB !',
    favicon: 'img/favicon.ico',

    // 在此处设置您站点的生产环境 URL
    url: 'https://Floyd512.github.io',
    // 设置您的站点所使用的 /<基础URL>/ 路径名
    // 对于 GitHub Pages 部署，通常为 '/<项目名称>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'Floyd512', // Usually your GitHub org/user name.
    projectName: 'Floyd512.github.io', // Usually your repo name.
    deploymentBranch: 'gh-pages',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],


    plugins: [
        // 添加插件plugin-image-zoom，作用：支持点击图片后放大、缩小
        'plugin-image-zoom'
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'TOM FORD',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: '技术文档',
                    },
                    {
                        to: '/blog',
                        label: '博客',
                        position: 'left'
                    },
                    // {
                    //   href: 'https://github.com/facebook/docusaurus',
                    //   label: 'GitHub',
                    //   position: 'left',
                    // },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: '文档',
                        items: [
                            {
                                label: '教程',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    {
                        title: '社区',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                            },
                            // {
                            //   label: 'Discord',
                            //   href: 'https://discordapp.com/invite/docusaurus',
                            // }
                        ],
                    },
                    {
                        title: '更多',
                        items: [
                            {
                                label: '博客',
                                to: '/blog',
                            },
                            // {
                            //   label: 'GitHub',
                            //   href: 'https://github.com/facebook/docusaurus',
                            // },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with TOM FORD.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
                additionalLanguages: ['Bash', 'Java', 'Scala', 'Properties']
            },
        }),
};

export default config;