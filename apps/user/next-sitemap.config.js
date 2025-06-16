/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.AUTH_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/verify', '/profile', '/profile/*'],
};
