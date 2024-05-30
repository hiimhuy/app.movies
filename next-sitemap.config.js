/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://https://ofilm.vercel.app/.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};