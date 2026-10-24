export const origin = 'https://atki-portfolio.web.app';
export function pageMetadata(pathname) {
  if (pathname.replace(/\/$/, '') === '/overwater') return {
    title: 'OverWater | Underwater Image Enhancement — George Atkinson',
    description: 'Explore OverWater, George Atkinson’s undergraduate research into enhancing underwater imagery with GANs and PyTorch, including before-and-after examples.',
    path: '/overwater', image: '/social/overwater.png',
  };
  if (pathname === '/') return {
    title: 'George Atkinson | Software Engineer',
    description: 'George Atkinson is a software engineer working across .NET, Python, React and SQL in reference data technology. Explore his work, experience and machine learning projects.',
    path: '/', image: '/social/portfolio.png',
  };
  return { title: 'Page not found | George Atkinson', description: 'Find your way back to George Atkinson’s portfolio.', path: null, image: '/social/portfolio.png', noindex: true };
}
