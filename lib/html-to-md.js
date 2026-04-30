const { parseDocument } = require("htmlparser2");
const { findOne, findAll, getText, textContent } = require("domutils");

const SKIP_TAGS = new Set([
  "script",
  "style",
  "noscript",
  "svg",
  "form",
  "button",
  "input",
  "select",
  "textarea",
  "label",
  "iframe",
]);

const BLOCK_TAGS = new Set([
  "p",
  "div",
  "section",
  "article",
  "header",
  "footer",
  "main",
  "aside",
  "nav",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "pre",
  "hr",
  "table",
  "tr",
]);

function isBlock(node) {
  return node.type === "tag" && BLOCK_TAGS.has(node.name);
}

function inline(node) {
  if (!node) return "";
  if (node.type === "text") {
    return node.data.replace(/\s+/g, " ");
  }
  if (node.type !== "tag") return "";
  if (SKIP_TAGS.has(node.name)) return "";

  const kids = (node.children || []).map(inline).join("");
  const text = kids.trim();

  switch (node.name) {
    case "br":
      return "\n";
    case "strong":
    case "b":
      return text ? `**${text}**` : "";
    case "em":
    case "i":
      return text ? `*${text}*` : "";
    case "code":
      return text ? `\`${text}\`` : "";
    case "a": {
      const href = (node.attribs && node.attribs.href) || "";
      if (!text) return "";
      if (!href || href.startsWith("#")) return text;
      return `[${text}](${href})`;
    }
    case "img": {
      const src = (node.attribs && node.attribs.src) || "";
      const alt = (node.attribs && node.attribs.alt) || "";
      if (!src) return "";
      return `![${alt}](${src})`;
    }
    case "span":
    default:
      return kids;
  }
}

function block(node, ctx) {
  if (!node) return "";
  if (node.type === "text") {
    const t = node.data.replace(/\s+/g, " ");
    return t.trim() ? t : "";
  }
  if (node.type !== "tag") return "";
  if (SKIP_TAGS.has(node.name)) return "";

  const name = node.name;
  const children = node.children || [];

  if (/^h[1-6]$/.test(name)) {
    const level = Number(name[1]);
    const text = inline(node).replace(/\s+/g, " ").trim();
    if (!text) return "";
    return `${"#".repeat(level)} ${text}\n\n`;
  }

  if (name === "hr") return "---\n\n";

  if (name === "br") return "\n";

  if (name === "ul" || name === "ol") {
    const items = children.filter((c) => c.type === "tag" && c.name === "li");
    const lines = items.map((li, i) => {
      const marker = name === "ol" ? `${i + 1}.` : "-";
      const liChildren = li.children || [];
      const hasBlock = liChildren.some(isBlock);
      let content;
      if (hasBlock) {
        content = renderChildren(liChildren, ctx).trim();
      } else {
        content = inline(li).replace(/\s+/g, " ").trim();
      }
      const indented = content.replace(/\n/g, "\n  ");
      return `${marker} ${indented}`;
    });
    return lines.join("\n") + "\n\n";
  }

  if (name === "blockquote") {
    const inner = renderChildren(children, ctx).trim();
    if (!inner) return "";
    return inner.replace(/^/gm, "> ") + "\n\n";
  }

  if (name === "pre") {
    const text = textContent(node);
    return "```\n" + text.replace(/\n+$/, "") + "\n```\n\n";
  }

  if (name === "p") {
    const text = inline(node).replace(/[ \t]+/g, " ").trim();
    return text ? text + "\n\n" : "";
  }

  if (name === "table") {
    const rows = findAll((n) => n.type === "tag" && n.name === "tr", children);
    if (!rows.length) return "";
    const out = rows.map((r) => {
      const cells = (r.children || []).filter(
        (c) => c.type === "tag" && (c.name === "td" || c.name === "th")
      );
      return "| " + cells.map((c) => inline(c).trim().replace(/\|/g, "\\|")).join(" | ") + " |";
    });
    if (out.length > 1) {
      const headerCells = (rows[0].children || []).filter(
        (c) => c.type === "tag" && (c.name === "td" || c.name === "th")
      );
      out.splice(1, 0, "| " + headerCells.map(() => "---").join(" | ") + " |");
    }
    return out.join("\n") + "\n\n";
  }

  // Generic container: recurse, but if it has only inline content render as paragraph
  const hasBlock = children.some(isBlock);
  if (hasBlock) {
    return renderChildren(children, ctx);
  }
  const text = inline(node).replace(/[ \t]+/g, " ").trim();
  return text ? text + "\n\n" : "";
}

function renderChildren(children, ctx) {
  let out = "";
  for (const c of children) out += block(c, ctx);
  return out;
}

function htmlToMarkdown(html, { selector = "main" } = {}) {
  const doc = parseDocument(html, { decodeEntities: true });
  const root =
    findOne((n) => n.type === "tag" && n.name === selector, doc.children, true) || doc;

  let md = renderChildren(root.children || [], {});

  // Collapse 3+ blank lines, trim
  md = md.replace(/\n{3,}/g, "\n\n").trim() + "\n";
  return md;
}

function getTitle(html) {
  const doc = parseDocument(html);
  const t = findOne((n) => n.type === "tag" && n.name === "title", doc.children, true);
  return t ? getText(t).trim() : "";
}

function getMetaDescription(html) {
  const doc = parseDocument(html);
  const m = findOne(
    (n) =>
      n.type === "tag" &&
      n.name === "meta" &&
      n.attribs &&
      n.attribs.name === "description",
    doc.children,
    true
  );
  return m && m.attribs && m.attribs.content ? m.attribs.content.trim() : "";
}

module.exports = { htmlToMarkdown, getTitle, getMetaDescription };
