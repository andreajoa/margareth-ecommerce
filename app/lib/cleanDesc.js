export function cleanDesc(desc) {
  if (!desc) return "Veja detalhes na pagina do produto.";
  var c = desc;
  while (c.match(/[.#@][a-zA-Z][^{]*\{[^}]*\}/)) {
    c = c.replace(/[.#@][a-zA-Z][^{]*\{[^}]*\}/g, '');
  }
  c = c.replace(/[a-zA-Z-]+\s*:\s*[^;{}\n]+;/g, '');
  c = c.replace(/[{}]/g, '');
  c = c.replace(/\b(border-radius|padding|margin|font-family|font-size|font-weight|color|background|max-width|text-align|line-height|display|overflow|position|width|height|top|left|right|bottom|opacity|transform|transition|box-shadow|linear-gradient|radial-gradient|flex|grid|gap|align|justify|content|center|auto|none|inherit|initial|solid|dashed|relative|absolute|fixed|inline|block|sans-serif|Roboto|Segoe|BlinkMacSystemFont|apple-system)\b/gi, '');
  c = c.replace(/\b\d+(\.\d+)?(px|em|rem|%|vh|vw|deg|s|ms)\b/g, '');
  c = c.replace(/#[0-9a-fA-F]{3,8}/g, '');
  c = c.replace(/rgba?\([^)]*\)/g, '');
  c = c.replace(/[;:,]/g, ' ');
  c = c.replace(/\s+/g, ' ').trim();
  if (c.length < 30) return "Veja detalhes na pagina do produto.";
  return c.substring(0, 250) + "...";
}
