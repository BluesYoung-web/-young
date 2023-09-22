export function isNotLazy(...args) {
  const [match, options, type] = args;
  return match.includes("data-not-lazy") || options && !options[type];
}
export function replaceAttrs(text, tag, attrs, options) {
  if (text.includes("devtools"))
    return text;
  if (!options.directiveOnly && tag)
    text = text.replace(new RegExp(`<${tag}`), `<${tag} v-lazy-load `);
  for (const attr of attrs)
    text = text.replace(new RegExp(`${attr}=`, "g"), `data-${attr}=`);
  return text;
}
export function replaceSrc(text, replaceArr) {
  for (const { from, to } of replaceArr)
    text = text.replace(new RegExp(from, "g"), to);
  return text;
}
