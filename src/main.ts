import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs'
import { schema } from './schema'

import 'prosemirror-view/style/prosemirror.css'
import './style.css'

const ydocument = new Y.Doc();
const type = ydocument.get('prosemirror', Y.XmlFragment)

const provider = new WebsocketProvider('ws://localhost:1234', 'test', ydocument);

new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    schema,
    plugins: [
        ySyncPlugin(type as any),
        yCursorPlugin(provider.awareness),
        yUndoPlugin(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo
        })
      ].concat(exampleSetup({ schema, menuBar: false }))
  })
})