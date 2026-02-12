const fs = require('fs');

let content = fs.readFileSync('app/routes/products.$handle.jsx', 'utf8');

// 1. Fix product description
content = content.replace(
  /dangerouslySetInnerHTML={{__html: product\.descriptionHtml}}/,
  '><p className="whitespace-pre-wrap">{product.description || ""}</p></div><div style={{display:"none"}}'
);

// 2. Remove Judge.me widget with dangerouslySetInnerHTML
content = content.replace(
  /{product\.metafields\?\.find\(m => m\?\.key === 'widget'\)\?\.value \? \([\s\S]*?\) : \(/,
  '('
);

fs.writeFileSync('app/routes/products.$handle.jsx', content);
console.log('✅ Fixed!');
