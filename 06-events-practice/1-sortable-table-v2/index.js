import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';


export default class SortableTableV2 extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted = {},
    isSortLocally = true
  } = {}) {
    super(headersConfig, data);

    this.sorted = sorted;
    this.isSortLocally = isSortLocally;
    this.createEventListeners();
    super.sort(sorted.id, sorted.order);
  }

  sortOnClient(id, order) {
    super.sort(id, order);
  }

  sortOnServer(id, order) { console.log('On server sort'); }

  sort() {
    if (this.isSortLocally) {
      this.sortOnClient(this.sorted.id, this.sorted.order);
    } else {
      this.sortOnServer(this.sorted.id, this.sorted.order);
    }
  }

  headerPointerdownHandler = (event) => {
    const headerCellElement = event.target.closest('[data-sortable="true"]');

    if (!headerCellElement) {
      return;
    }

    this.sorted.id = headerCellElement.dataset.id;
    this.sorted.order = headerCellElement.dataset.order === 'desc' ? 'asc' : 'desc';
    headerCellElement.dataset.order = this.sorted.order;

    this.sort();
  };

  createEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.headerPointerdownHandler);
  }

  destroyEventListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.headerPointerdownHandler);

  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}
