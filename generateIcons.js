const fs = require('fs');
const fa = require('react-icons/fa6');

const icons = [
  { name: 'XIcon', lib: 'FaXTwitter' },
  { name: 'InstagramIcon', lib: 'FaInstagram' },
  { name: 'LinkedInIcon', lib: 'FaLinkedin' },
  { name: 'GithubIcon', lib: 'FaGithub' },
  { name: 'YoutubeIcon', lib: 'FaYoutube' },
  { name: 'FacebookIcon', lib: 'FaFacebook' },
  { name: 'DribbbleIcon', lib: 'FaDribbble' },
  { name: 'BehanceIcon', lib: 'FaBehance' },
  { name: 'GlobeIcon', lib: 'FaGlobe' }
];

let out = `import React from 'react';\n\n`;

for (const icon of icons) {
  const comp = fa[icon.lib]({});
  let paths = Array.isArray(comp.props.children) ? comp.props.children : [comp.props.children];
  let pathStr = paths.map(p => `<path d="${p.props.d}" />`).join('');
  let viewBox = comp.props.attr ? comp.props.attr.viewBox : "0 0 512 512";
  
  out += `export const ${icon.name} = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="${viewBox}" width="1em" height="1em" fill="currentColor" {...props}>
    ${pathStr}
  </svg>
);\n\n`;
}

fs.writeFileSync('./src/components/icons/BrandIcons.tsx', out);
console.log('Icons generated with correct viewBox.');
