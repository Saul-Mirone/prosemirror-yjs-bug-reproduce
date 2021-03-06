import {  MarkSpec, Node, NodeSpec, Schema } from 'prosemirror-model'

// :: Object
// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes: Record<string, NodeSpec> = {
  // :: NodeSpec The top level document node.
  doc: {
    content: 'block+'
  },

  // :: NodeSpec A plain paragraph textblock. Represented in the DOM
  // as a `<p>` element.
  paragraph: {
    attrs: { ychange: { default: null } },
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM () { return ['p', 0] }
  },

  // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
  blockquote: {
    attrs: { ychange: { default: null } },
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM () { return ['blockquote', 0] }
  },

  // :: NodeSpec A horizontal rule (`<hr>`).
  horizontal_rule: {
    attrs: { ychange: { default: null } },
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM () {
      return ['hr']
    }
  },

  // :: NodeSpec A heading textblock, with a `level` attribute that
  // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
  // `<h6>` elements.
  heading: {
    attrs: {
      level: { default: 1 },
      ychange: { default: null }
    },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } }],
    toDOM (node: Node) { return ['h' + node.attrs.level, 0] }
  },

  // :: NodeSpec A code listing. Disallows marks or non-text inline
  // nodes by default. Represented as a `<pre>` element with a
  // `<code>` element inside of it.
  code_block: {
    attrs: { ychange: { default: null } },
    content: 'text*',
    marks: '',
    group: 'block',
    code: true,
    defining: true,
    parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
    toDOM () { return ['pre', ['code', 0]] }
  },

  // :: NodeSpec The text node.
  text: {
    group: 'inline'
  },

  // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
  hard_break: {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{ tag: 'br' }],
    toDOM () { return ['br'] }
  }
};

// :: Object [Specs](#model.MarkSpec) for the marks in the schema.
export const marks: Record<string, MarkSpec> = {};

// :: Schema
// This schema rougly corresponds to the document schema used by
// [CommonMark](http://commonmark.org/), minus the list elements,
// which are defined in the [`prosemirror-schema-list`](#schema-list)
// module.
//
// To reuse elements from this schema, extend or read from its
// `spec.nodes` and `spec.marks` [properties](#model.Schema.spec).
export const schema = new Schema({ nodes, marks })