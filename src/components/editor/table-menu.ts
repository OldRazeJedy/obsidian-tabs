import { Menu } from 'obsidian';
import { TabEditor } from './tab-editor';

export class TableMenu extends Menu {
  dom?: HTMLElement;
  editor: TabEditor;

  constructor(editor: TabEditor) {
    super();
    this.editor = editor;
    this.addItem(item => item.setDisabled(true));
  }

  onload() {
    super.onload();
    const menuDom = this.dom!;
    const frag = activeDocument.createDocumentFragment();
    const containerEl = frag.createDiv({ cls: 'table-generator-container' });
    const counter = frag.createDiv({ cls: ['table-generator-counter', 'menu-item'] });
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const gridEl = createDiv({ cls: 'table-generator-grid' });
        gridEl.setAttr('i', i);
        gridEl.setAttr('j', j);
        gridEl.addEventListener('click', () => {
          this.editor.createEmptyTable(i + 1, j + 1);
        });
        this.editor.plugin.registerDomEvent(gridEl, 'mouseenter', () => {
          containerEl.querySelectorAll('.table-generator-grid').forEach(gridEl => {
            const i2Attr = gridEl.getAttr('i');
            const j2Attr = gridEl.getAttr('j');
            if (!i2Attr || !j2Attr) return;
            const i2 = parseInt(i2Attr);
            const j2 = parseInt(j2Attr);
            if (i2 > i || j2 > j) gridEl.removeClass('select');
            else gridEl.addClass('select');
          });
          counter.innerText = `${i + 1} rows ${j + 1} columns`;
        });
        containerEl.append(gridEl);
      }
    }
    menuDom.append(frag);
  }
}
