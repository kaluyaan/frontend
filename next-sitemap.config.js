/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kaluyaan.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/api/*'],
};
