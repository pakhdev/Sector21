(() => {
    const SECTOR21_FLAG = Symbol.for('__EXTENSION_Sector21_DEFINED__');
    if (!globalThis[SECTOR21_FLAG]) {
        globalThis[SECTOR21_FLAG] = true;

        class Runtime {
            static state = new State();
            async static init() {
                await Interact.saveWorkspaceOffset();
                let nextLabel = this.state.nextLabel;
                if (!nextLabel) {
                    if (PageState.labelsCount === 25)
                        Navigation.nextPage();
                    else
                        ContentFetcher.fetchLabels();
                }
            }
        }

        class State {
            knownLabels = [];
            currentIdx = -1;
            get nextLabel() {
                if (this.currentIdx !== -1 && this.currentIdx + 1 < this.knownLabels.length) {
                    this.currentIdx++;
                    return this.knownLabels[this.currentIdx];
                }
                return null;
            }
            addLabel(label) {
                this.knownLabels.push(label);
            }
        }

        class PageState {
            static get paginationContainer() {
                return document.querySelector('.artdeco-pagination__pages');
            }

            static get pageButtons() {
                return Array.from(this.paginationContainer.querySelectorAll('.artdeco-pagination__indicator--number'));
            }

            static get activePageButton() {
                return this.paginationContainer.querySelector('.artdeco-pagination__indicator--number.active');
            }

            static get morePagesButton() {
                return this.pageButtons.slice().reverse().find(p => p.innerText === '…');
            }

            static get nextPageButton() {
                return this.lastVisiblePageNumber === this.activePageNumber
                    ? this.morePagesButton
                    : this.pageButtons[this.pageButtons.indexOf(this.activePageButton) + 1];
            }

            static get activePageNumber() {
                return Number(this.activePageButton.innerText);
            }

            static get lastVisiblePageNumber() {
                const pageButtons = this.pageButtons.reverse();
                const index = pageButtons.indexOf(this.morePagesButton);
                return index !== -1 ? Number(pageButtons[index + 1]?.innerText) : undefined;
            }

            static get labelContainers() {
                return [...document.querySelectorAll('div[data-job-id]')];
            }

            static get labelsCount() {
                return this.labelContainers.length;
            }

            static get activeDescriptionId() {
                const container = document.querySelector('.job-details-jobs-unified-top-card__container--two-pane');
                if (!container) return null;

                const link = container.querySelector('a.ember-view[href*="/jobs/view/"]');
                if (!link) return null;

                const match = link.href.match(/\/jobs\/view\/(\d+)\//);
                return match ? match[1] : null;
            }

            static get activeDescription() {
                return document.querySelector('#job-details').innerText.replace(/[\n\r]+/g, ' ')
                    .replace(/[‘’“”'"`´]/g, '')
                    .replace(/ {2,}/g, ' ')
                    .trim()
            }
        }

        class Interact {
            static async saveWorkspaceOffset() {
                return new Promise((resolve) => {
                    chrome.runtime.sendMessage(
                        { type: 'interaction', payload: { action: 'save-offset', offset: window.innerHeight || document.documentElement.clientHeight  } },
                        (response) => { resolve(response); }
                    );
                });
            }
            static async mouseScroll(x, y, offset) {
                return new Promise((resolve) => {
                    chrome.runtime.sendMessage(
                        { type: 'interaction', payload: { action: 'mouse-scroll', x: x, y: y, offset: offset } },
                        (response) => { resolve(response); }
                    );
                });
            }
            static async mouseClick(x, y) {
                return new Promise((resolve) => {
                    chrome.runtime.sendMessage(
                        {type: 'interaction', payload: {action: 'mouse-click', x: x, y: y}},
                        (response) => { resolve(response); }
                    );
                });
            }
        }

        globalThis.Runtime = Runtime;
        globalThis.State = State;
        globalThis.PageState = PageState;
        globalThis.Interact = Interact;
    } else console.log('State already defined');
})();


(async () => { await Runtime.init(); })();