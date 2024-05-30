/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ofilm.vercel.app/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};