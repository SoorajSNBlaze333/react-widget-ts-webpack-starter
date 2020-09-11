const defaultStyles: any = {
  'border': 'none',
  'z-index': 2147483647,
  'height': '650px',
  'width': '350px',
  'display': 'block !important',
  'visibility': 'visible',
  'background': 'none transparent',
  'opacity': 1,
  'pointer-events': 'auto',
  'touch-action': 'auto',
  'position': 'fixed',
  'right': '20px',
  'bottom': '20px',
}

interface IConfig {
  readonly email: string;
}

interface IWidget {
  config: IConfig | null;
  iframe: HTMLIFrameElement | null;
  init: (config: IConfig) => void;
  setupListeners: () => void;
  createIframe: () => void;
  handleMessage: (event: MessageEvent) => void;
}

const Widget: IWidget = {
  iframe: null,
  config: null,
  init: function(config: IConfig) {
    this.config = config;
    this.createIframe()
  },
  createIframe: function() {
    this.iframe = document.createElement('iframe');
    let styles = '';
    for (let key in defaultStyles) { styles += key + ': ' + defaultStyles[key] + ';' }
    this.iframe.setAttribute('style', styles)
    this.iframe.src = 'http://localhost:9000';
    this.iframe.referrerPolicy = 'origin';
    document.body.appendChild(this.iframe);
    this.setupListeners();
  },
  setupListeners: function() {
    window.addEventListener('message', this.handleMessage.bind(this));
  },
  handleMessage: function(e) {
    e.preventDefault();
    if (!e.data || (typeof e.data !== 'string')) return;
    let data = JSON.parse(e.data);
    switch (data.action) {
      case 'init': {
        if (this.iframe) {
          this.iframe.contentWindow.postMessage(JSON.stringify(this.config), '*');
        }
        break;
      }
      default:
        break;
    }
  }
};

export default Widget;