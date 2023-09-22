"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotLazy = isNotLazy;
exports.replaceAttrs = replaceAttrs;
exports.replaceSrc = replaceSrc;
function isNotLazy(...args) {
  const [match, options, type] = args;
  return match.includes("data-not-lazy") || options && !options[type];
}
function replaceAttrs(text, tag, attrs, options) {
  if (text.includes("devtools")) return text;
  if (!options.directiveOnly && tag) text = text.replace(new RegExp(`<${tag}`), `<${tag} v-lazy-load `);
  for (const attr of attrs) text = text.replace(new RegExp(`${attr}=`, "g"), `data-${attr}=`);
  return text;
}
function replaceSrc(text, replaceArr) {
  for (const {
    from,
    to
  } of replaceArr) text = text.replace(new RegExp(from, "g"), to);
  return text;
}