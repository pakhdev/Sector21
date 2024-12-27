(() => {
    const SECTOR21_FLAG = Symbol.for('__EXTENSION_Sector21_DEFINED__');
    if (!globalThis[SECTOR21_FLAG]) {
        globalThis[SECTOR21_FLAG] = true;

        class Runtime {
            static state = new State();
            async static init() {
                await Interact.saveWorkspaceOffset();
                let nextLabel = this.state.nextLabel;
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
        globalThis.Interact = Interact;
    } else console.log('State already defined');
})();


(async () => { await Runtime.init(); })();