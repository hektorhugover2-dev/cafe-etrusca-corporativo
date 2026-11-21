/**
 * Widget de chat Lucky (Café Etrusca).
 * Sustituye @n8n/chat en el front para controlar indicador, timeout,
 * sessionStorage, markdown seguro y streaming. El webhook de n8n no se modifica.
 *
 * Contrato con n8n Chat Trigger (sin cambios en n8n):
 *   POST { action:"sendMessage", sessionId, chatInput, metadata:{ pagina } }
 *   Respuesta JSON ({ output | text | message }) o streaming NDJSON
 *   {type:"begin"|"item"|"end", content} (también SSE "data: {...}").
 *   Para activar el streaming hay que encender "Streaming response" / "Streaming"
 *   en el nodo Chat Trigger y que el agente/cadena lo soporte. Si no está activo,
 *   este front hace fallback automático según content-type y parseo.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.__luckyWidgetStarted) return;
  window.__luckyWidgetStarted = true;

  var WEBHOOK_URL = 'https://n8n.cafeetrusca.com/webhook/86206c5e-1a01-4e6a-bcb8-66ea24eccd64/chat';
  var SESSION_KEY = 'lucky-chat-session-id';
  var HISTORY_KEY = 'lucky-chat-history';
  var NAVY = '#070C3B';
  var ASSET_AVATAR = '/assets/images/chat/lucky.jpg';
  var VIDEOS = [
    'https://imagenes.cafeetrusca.com/corporativo/assets/videos/elia/elia-1.mp4',
    'https://intranet.cafeetrusca.com/video/elia-2.mp4?v=1.2',
    'https://intranet.cafeetrusca.com/video/elia-3.mp4?v=1.2',
    'https://intranet.cafeetrusca.com/video/elia-4.mp4?v=1.2'
  ];

  var test = window.__LUCKY_TEST || {};
  var SEEKING_MS = test.seekingMs != null ? test.seekingMs : 15000;
  var IDLE_MS = test.idleMs != null ? test.idleMs : 3 * 60 * 1000;
  var TIMEOUT_MS = test.timeoutMs != null ? test.timeoutMs : 90000;
  var webhookUrl = test.webhookUrl || WEBHOOK_URL;

  var GREETING_ES = '¡Hola! Soy Lucky, tu asistente virtual ☕ ¿En qué te puedo ayudar hoy?';
  var GREETING_EN = "Hi! I'm Lucky, your virtual assistant ☕ How can I help you today?";
  var IDLE_ES = '¿Sigues por ahí? 😊 Si necesitas algo más, aquí estoy ☕';
  var IDLE_EN = "Still there? 😊 If you need anything else, I'm here ☕";
  var ERROR_TIMEOUT_ES = 'Uy, tardé más de la cuenta 😅 ¿Me lo puedes repetir?';
  var ERROR_TIMEOUT_EN = 'Sorry, that took me too long 😅 Could you repeat that?';
  var ERROR_UNAVAILABLE_ES = 'Por el momento no estoy disponible, intente más tarde por favor';
  var ERROR_UNAVAILABLE_EN = "I'm not available right now, please try again later";
  var SEEKING_1_ES = 'Lucky está buscando… ☕';
  var SEEKING_1_EN = 'Lucky is looking… ☕';
  var SEEKING_2_ES = 'Sigo buscando, ya casi ☕';
  var SEEKING_2_EN = 'Still looking, almost there ☕';
  // Huella oficial de Lucky (public/assets/images/lucky/huellita.svg), 12px, color navy #192966.

  var SUCURSALES_MARKER = '[[SUCURSALES]]';
  var SUCURSALES = [
    'Zona Rosa', 'Viaducto', 'Iztapalapa', 'Toluca', 'Guadalajara', 'Zapopan',
    'Puebla', 'Monterrey', 'Querétaro', 'Tijuana', 'Xalapa', 'León', 'Mérida', 'Tienda en línea'
  ];

  function stripSucursalesMarker(text) {
    var src = String(text == null ? '' : text);
    var hasMarker = src.indexOf(SUCURSALES_MARKER) !== -1;
    var out = src.split(SUCURSALES_MARKER).join(' ');
    out = out.replace(/[ \t]{2,}/g, ' ');
    out = out.replace(/[ \t]*\n[ \t]*/g, '\n');
    out = out.replace(/\n{3,}/g, '\n\n');
    out = out.replace(/^\s+|\s+$/g, '');
    return { text: out, hasMarker: hasMarker };
  }

  function hideIncompleteMarker(text) {
    var out = String(text == null ? '' : text);
    var marker = SUCURSALES_MARKER;
    for (var i = marker.length - 1; i >= 1; i--) {
      var prefix = marker.slice(0, i);
      if (out.length >= prefix.length && out.slice(-prefix.length) === prefix) {
        return out.slice(0, out.length - prefix.length);
      }
    }
    return out;
  }

  function visibleBotText(raw, streaming) {
    var parsed = stripSucursalesMarker(raw);
    var text = streaming ? hideIncompleteMarker(parsed.text) : parsed.text;
    if (streaming) {
      text = text.replace(/[ \t]{2,}/g, ' ').replace(/[ \t]*\n[ \t]*/g, '\n').replace(/\s+$/g, '');
    }
    return { text: text, hasMarker: parsed.hasMarker };
  }

  var PAW_SVG = '<svg class="lucky-paw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="12" height="12" fill="#192966" focusable="false" aria-hidden="true"><path d="M32 34c-7.5 0-16 8.2-16 15.2 0 4.6 3.6 6.8 7.6 6.8 3.3 0 5.3-1.6 8.4-1.6s5.1 1.6 8.4 1.6c4 0 7.6-2.2 7.6-6.8C48 42.2 39.5 34 32 34z"/><ellipse cx="13" cy="27" rx="5.6" ry="7" transform="rotate(-20 13 27)"/><ellipse cx="24" cy="15" rx="5.8" ry="7.6" transform="rotate(-6 24 15)"/><ellipse cx="40" cy="15" rx="5.8" ry="7.6" transform="rotate(6 40 15)"/><ellipse cx="51" cy="27" rx="5.6" ry="7" transform="rotate(20 51 27)"/></svg>';

  var state = {
    sessionId: null,
    waiting: false,
    abort: null,
    idleTimer: null,
    seekTimer: null,
    idleShown: false,
    open: false,
    langEn: false,
    history: [],
    skipPersist: false,
    timedOut: false,
    videoIndex: 0,
    videoTimer: null
  };

  function isEnglish() {
    // Español de tú por default. Inglés solo si la página está en inglés.
    try {
      var lang = String((document.documentElement && document.documentElement.lang) || '').toLowerCase();
      if (lang.indexOf('en') === 0) return true;
      var path = String((location && location.pathname) || '');
      if (/(^|\/)en(\/|$)/i.test(path)) return true;
    } catch (e) {}
    return false;
  }
  function idleMsg() { return state.langEn ? IDLE_EN : IDLE_ES; }
  function errorTimeoutMsg() { return state.langEn ? ERROR_TIMEOUT_EN : ERROR_TIMEOUT_ES; }
  function errorUnavailableMsg() { return state.langEn ? ERROR_UNAVAILABLE_EN : ERROR_UNAVAILABLE_ES; }
  function seekingMsg(phase) {
    if (phase === 2) return state.langEn ? SEEKING_2_EN : SEEKING_2_ES;
    return state.langEn ? SEEKING_1_EN : SEEKING_1_ES;
  }

  function isProdHost() {
    if (test.forceProd) return true;
    if (test.forceProd === false) return false;
    var h = '';
    try { h = String(location.hostname || '').replace(/^www\./, '').toLowerCase(); } catch (e) {}
    return h === 'cafeetrusca.com';
  }

  function greeting() {
    return state.langEn ? GREETING_EN : GREETING_ES;
  }

  function uuid() {
    try {
      if (crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    } catch (e) {}
    var b = new Uint8Array(16);
    try { crypto.getRandomValues(b); } catch (e2) {
      for (var i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
    }
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    var hex = [];
    for (var j = 0; j < 16; j++) hex.push((b[j] + 256).toString(16).slice(1));
    return hex.slice(0, 4).join('') + '-' + hex[4] + hex[5] + '-' + hex[6] + hex[7] + '-' + hex[8] + hex[9] + '-' + hex.slice(10).join('');
  }

  function getSessionId() {
    // No migrar ni reutilizar un id que hubiera en localStorage.
    var id = '';
    try { id = sessionStorage.getItem(SESSION_KEY) || ''; } catch (e) {}
    if (!id) {
      id = uuid();
      try { sessionStorage.setItem(SESSION_KEY, id); } catch (e2) {}
    }
    state.sessionId = id;
    return id;
  }

  function resetSession() {
    var id = uuid();
    state.sessionId = id;
    state.idleShown = false;
    state.history = [];
    try { sessionStorage.setItem(SESSION_KEY, id); } catch (e) {}
    try { sessionStorage.removeItem(HISTORY_KEY); } catch (e2) {}
    return id;
  }

  function persistHistory() {
    if (state.skipPersist) return;
    try {
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify({ sessionId: state.sessionId, messages: state.history }));
    } catch (e) {}
  }

  function loadHistory() {
    try {
      var raw = sessionStorage.getItem(HISTORY_KEY);
      var data = raw ? JSON.parse(raw) : null;
      if (!data || data.sessionId !== state.sessionId || !Array.isArray(data.messages) || !data.messages.length) return [];
      return data.messages;
    } catch (e) { return []; }
  }

  function recordMessage(role, text, kind, extra) {
    if (state.skipPersist) return;
    var rec = { role: role, text: text, kind: kind || role };
    if (extra && extra.sucursales) rec.sucursales = true;
    if (extra && extra.sucursalesUsed) rec.sucursalesUsed = true;
    state.history.push(rec);
    persistHistory();
  }

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') n.className = attrs[k];
        else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(n.style, attrs[k]);
        else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function') n.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] === false || attrs[k] == null) return;
        else n.setAttribute(k, attrs[k] === true ? '' : String(attrs[k]));
      });
    }
    if (html != null) n.innerHTML = html;
    return n;
  }

  function injectCss() {
    if (qs('#lucky-widget-css')) return;
    var css = [
      ':root{--lucky-navy:#070C3B;}',
      '.lucky-root{font-family:Poppins,Arial,sans-serif;color:var(--lucky-navy);}',
      '.lucky-toggle{position:fixed;right:20px;bottom:20px;width:64px;height:64px;border-radius:50%;border:1px solid #ccc;padding:0;background:#fff url(' + JSON.stringify(ASSET_AVATAR) + ') center/cover no-repeat;cursor:pointer;z-index:9998;box-shadow:0 6px 18px rgba(7,12,59,.25);transition:transform .2s ease,box-shadow .2s ease;}',
      '.lucky-toggle:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(7,12,59,.3);}',
      '.lucky-toggle:focus-visible,.lucky-window button:focus-visible,.lucky-window textarea:focus-visible{outline:2px solid #070C3B;outline-offset:2px;}',
      '.lucky-toggle-dot{position:absolute;top:48px;left:48px;width:14px;height:14px;background:#28a745;border:2px solid #fff;border-radius:50%;box-shadow:0 0 4px #28a745aa;}',
      '.lucky-toggle[aria-expanded="true"]{background:#070C3B;background-image:none;color:#fff;font-size:0;}',
      '.lucky-toggle[aria-expanded="true"] .lucky-toggle-dot{display:none;}',
      '.lucky-toggle[aria-expanded="true"]::after{content:"";position:absolute;inset:22px 18px 26px;border-bottom:3px solid #fff;border-left:3px solid #fff;transform:rotate(-45deg);}',
      '.lucky-help{position:fixed;bottom:20px;right:96px;background:#fff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.15);padding:16px;max-width:280px;font-size:14px;z-index:9999;display:flex;align-items:flex-start;gap:10px;line-height:1.4;}',
      '.lucky-help[hidden],.lucky-window[hidden]{display:none !important;}',
      '.lucky-help-close{border:0;background:transparent;font-size:16px;font-weight:700;cursor:pointer;position:absolute;top:4px;right:4px;color:#999;min-width:32px;min-height:32px;line-height:32px;}',
      '.lucky-window{position:fixed;right:20px;bottom:96px;width:min(500px,calc(100vw - 24px));height:min(700px,calc(100vh - 120px));background:#F8F2E5;border-radius:20px;box-shadow:0 12px 30px rgba(0,0,0,.18);z-index:9998;display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(8px) scale(.98);transition:opacity .2s ease,transform .2s ease;}',
      '.lucky-window.is-open{opacity:1;transform:none;}',
      '@media (max-width:540px){.lucky-window{right:8px;left:8px;bottom:88px;width:auto;height:calc(100vh - 104px);border-radius:16px;}',
      '.lucky-help{right:88px;left:8px;max-width:none;}}',
      '.lucky-header{background:#070C3B;color:#fff;padding:10px 12px;display:flex;align-items:center;gap:10px;flex-shrink:0;}',
      '.lucky-avatar{position:relative;width:64px;height:64px;border-radius:50%;border:1px solid #ccc;background:#070C3B url(' + JSON.stringify(ASSET_AVATAR) + ') center/cover no-repeat;overflow:hidden;flex-shrink:0;}',
      '.lucky-avatar video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:50%;opacity:0;}',
      '.lucky-header-text{flex:1;min-width:0;}',
      '.lucky-header-text strong{display:block;font-size:16px;font-weight:700;}',
      '.lucky-header-text p{margin:0;font-size:12px;opacity:.85;font-weight:400;}',
      '.lucky-header-actions{display:flex;gap:4px;align-items:center;}',
      '.lucky-icon-btn{border:0;background:transparent;color:#fff;cursor:pointer;min-width:40px;min-height:40px;border-radius:10px;font-family:inherit;font-size:12px;font-weight:600;padding:0 8px;transition:background .2s ease;}',
      '.lucky-icon-btn:hover{background:rgba(255,255,255,.12);}',
      '.lucky-messages{flex:1;overflow:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px;}',
      '.lucky-msg{max-width:86%;padding:10px 12px;border-radius:16px;font-size:14px;line-height:1.45;word-wrap:break-word;}',
      '.lucky-msg--bot{align-self:flex-start;background:#fff;color:#070C3B;box-shadow:0 1px 4px rgba(7,12,59,.08);}',
      '.lucky-msg--user{align-self:flex-end;background:#070C3B;color:#fff;}',
      '.lucky-msg--idle{align-self:flex-start;background:#fff;color:#070C3B;border:1px dashed rgba(7,12,59,.25);font-size:13px;}',
      '.lucky-msg--error{align-self:flex-start;background:#fff;color:#070C3B;border:1px solid #f2de7f;}',
      '.lucky-msg a{color:#070C3B;text-decoration:underline;}',
      '.lucky-msg--user a{color:#fff;}',
      '.lucky-msg p{margin:0 0 .5em;}',
      '.lucky-msg p:last-child{margin:0;}',
      '.lucky-msg ul,.lucky-msg ol{margin:.25em 0 .5em 1.2em;padding:0;}',
      '.lucky-status{min-height:0;padding:0 14px 6px;font-size:13px;color:#070C3B;display:flex;align-items:center;gap:8px;}',
      '.lucky-status[hidden]{display:none !important;}',
      '.lucky-dots{display:inline-flex;gap:4px;align-items:flex-end;height:16px;padding-bottom:1px;}',
      '.lucky-dots .lucky-paw{width:12px;height:12px;display:block;flex:0 0 12px;fill:#192966;opacity:.4;transform-origin:50% 80%;animation:luckyPawWalk 1.35s ease-in-out infinite;--paw-tilt:-10deg;}',
      '.lucky-dots .lucky-paw:nth-child(1){animation-delay:0s;}',
      '.lucky-dots .lucky-paw:nth-child(2){animation-delay:.22s;--paw-tilt:10deg;}',
      '.lucky-dots .lucky-paw:nth-child(3){animation-delay:.44s;--paw-tilt:-10deg;}',
      '@keyframes luckyPawWalk{0%,70%,100%{transform:translateY(0) rotate(var(--paw-tilt));opacity:.4;}20%{transform:translateY(-3px) rotate(calc(var(--paw-tilt) * .35));opacity:1;}35%{transform:translateY(0) rotate(var(--paw-tilt));opacity:.7;}}',
      '@media (prefers-reduced-motion:reduce){',
      '.lucky-window,.lucky-toggle{transition:none;}',
      '.lucky-dots .lucky-paw{animation:none !important;opacity:1;transform:rotate(var(--paw-tilt));}',
      '}',
      '.lucky-form{display:flex;gap:8px;padding:10px 12px 12px;background:#fff;border-top:1px solid rgba(7,12,59,.08);align-items:flex-end;}',
      '.lucky-form textarea{flex:1;resize:none;border:1px solid rgba(7,12,59,.2);border-radius:12px;padding:10px 12px;font-family:inherit;font-size:14px;min-height:44px;max-height:120px;color:#070C3B;background:#fff;}',
      '.lucky-send{border:0;background:#070C3B;color:#fff;border-radius:12px;min-width:44px;min-height:44px;padding:0 14px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer;transition:opacity .2s ease,background .2s ease;}',
      '.lucky-send:disabled{opacity:.45;cursor:not-allowed;}',
      '.lucky-send:not(:disabled):hover{background:#0c1658;}',
      /* Miniaturas: aplica aunque el markdown inserte <img> sin clase */
      '.lucky-window img:not(.lucky-keep-size),',
      '.lucky-messages img,',
      '.lucky-msg img,',
      '.chat-window .chat-body img,',
      '.chat-message img,',
      '.chat-message-markdown img,',
      '.chat-message-from-bot img{',
      'max-width:120px !important;max-height:120px !important;width:auto !important;height:auto !important;',
      'object-fit:contain !important;object-position:left center;display:block;margin:6px 0;border-radius:8px;',
      'cursor:zoom-in;background:transparent;',
      '}',
      '.lucky-img-link{display:inline-block;max-width:120px;vertical-align:top;}',

      '.lucky-sucursales{align-self:stretch;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%;max-width:100%;padding:0 0 2px;box-sizing:border-box;}',
      '.lucky-sucursal-btn{font-family:inherit;font-size:12px;font-weight:600;line-height:1.25;color:#fff;background:#192966;border:0;border-radius:10px;padding:8px 8px;min-height:40px;cursor:pointer;text-align:center;transition:background .2s ease,opacity .2s ease,transform .15s ease;}',
      '.lucky-sucursal-btn:hover:not(:disabled){background:#070C3B;}',
      '.lucky-sucursal-btn:focus-visible{outline:2px solid #070C3B;outline-offset:2px;}',
      '.lucky-sucursal-btn:disabled{opacity:.45;cursor:not-allowed;}',
      '@media (max-width:540px){.lucky-sucursales{grid-template-columns:repeat(2,minmax(0,1fr));}}',
      '.lucky-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}'
    ].join('\n');
    document.head.appendChild(el('style', { id: 'lucky-widget-css' }, css));
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function isHttpUrl(href) {
    try {
      var u = new URL(href, 'https://cafeetrusca.com');
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch (e) { return false; }
  }

  function isAllowedImageUrl(href) {
    try {
      var u = new URL(href, location && location.origin ? location.origin : 'https://cafeetrusca.com');
      var h = u.hostname.toLowerCase();
      if (u.protocol === 'https:' && (h === 'cafeetrusca.com' || h.slice(-16) === '.cafeetrusca.com')) return true;
      // En local/pruebas se aceptan imágenes del mock en localhost (nunca en producción).
      if (!isProdHost() && (h === '127.0.0.1' || h === 'localhost') && (u.protocol === 'http:' || u.protocol === 'https:')) return true;
      return false;
    } catch (e) { return false; }
  }

  function rewriteImgSrc(src) {
    if (!src) return '';
    if (src.indexOf('/img/') === 0) return 'https://cafeetrusca.com' + src;
    return src;
  }

  function isDevOnlyUrl(href) {
    try {
      var u = new URL(href, location && location.origin ? location.origin : 'https://cafeetrusca.com');
      if (u.searchParams.get('debug') === '1') return true;
      if (/(^|\/)clear-cache\/?$/i.test(u.pathname)) return true;
    } catch (e) {}
    return false;
  }

  function sanitizeAndEnhance(root) {
    var prod = isProdHost();
    root.querySelectorAll('script,iframe,object,embed,form,link,meta,style').forEach(function (n) { n.remove(); });
    root.querySelectorAll('*').forEach(function (node) {
      Array.from(node.attributes).forEach(function (a) {
        var n = a.name.toLowerCase();
        if (n.indexOf('on') === 0 || n === 'srcset' || n === 'srcdoc' || n === 'xlink:href') node.removeAttribute(a.name);
        if ((n === 'href' || n === 'src') && /^\s*javascript:/i.test(a.value)) node.removeAttribute(a.name);
        if (n === 'style') node.removeAttribute(a.name);
      });
    });
    root.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (!isHttpUrl(href) || (prod && isDevOnlyUrl(href))) {
        var t = document.createTextNode(a.textContent || href);
        a.replaceWith(t);
        return;
      }
      a.setAttribute('href', href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
    root.querySelectorAll('img').forEach(function (img) { enhanceImage(img); });
  }

  function enhanceImage(img) {
    if (img.dataset.luckyImg === '1') return;
    var src = rewriteImgSrc(img.getAttribute('src') || '');
    if (!isAllowedImageUrl(src)) { img.remove(); return; }
    img.dataset.luckyImg = '1';
    img.setAttribute('src', src);
    if (!img.getAttribute('alt')) img.setAttribute('alt', '');
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    img.style.maxWidth = '120px';
    img.style.maxHeight = '120px';
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.objectFit = 'contain';
    img.style.objectPosition = 'left center';
    img.style.display = 'block';
    var parent = img.parentElement;
    if (!parent || !parent.classList.contains('lucky-img-link')) {
      var a = document.createElement('a');
      a.className = 'lucky-img-link';
      a.href = src;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', (img.getAttribute('alt') || 'Abrir imagen en una pestaña nueva'));
      img.replaceWith(a);
      a.appendChild(img);
    }
  }

  function renderMarkdown(raw) {
    var text = String(raw == null ? '' : raw);
    var lookHtml = /<\/?[a-z][\s\S]*>/i.test(text);
    var html;
    if (lookHtml) {
      html = text;
    } else {
      html = mdToHtml(text);
    }
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    sanitizeAndEnhance(wrap);
    return wrap;
  }

  function mdToHtml(src) {
    var blocks = [];
    var text = String(src).replace(/```([\s\S]*?)```/g, function (_, code) {
      blocks.push('<pre><code>' + escapeHtml(code.replace(/^\n/, '')) + '</code></pre>');
      return '\u0000B' + (blocks.length - 1) + '\u0000';
    });
    text = escapeHtml(text);
    text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, function (_, alt, url) {
      return '<img alt="' + alt.replace(/"/g, '&quot;') + '" src="' + url.replace(/"/g, '&quot;') + '">';
    });
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, function (_, label, url) {
      return '<a href="' + url.replace(/"/g, '&quot;') + '">' + label + '</a>';
    });
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    text = text.replace(/(^|[^\w*])\*([^*\n]+)\*(?=[^\w*]|$)/g, '$1<em>$2</em>');
    text = text.replace(/\n(\s*[-*]\s.+(?:\n\s*[-*]\s.+)*)/g, function (_, list) {
      var items = list.trim().split(/\n/).map(function (ln) {
        return '<li>' + ln.replace(/^\s*[-*]\s/, '') + '</li>';
      }).join('');
      return '\n<ul>' + items + '</ul>';
    });
    text = text.replace(/\u0000B(\d+)\u0000/g, function (_, i) { return blocks[+i]; });
    text = text.split(/\n{2,}/).map(function (p) {
      if (/^<(ul|pre|ol|h\d)/.test(p.trim())) return p;
      return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
    }).join('');
    return text;
  }

  function extractOutput(data) {
    if (data == null) return '';
    if (typeof data === 'string') return data;
    if (typeof data.output === 'string') return data.output;
    if (typeof data.text === 'string') return data.text;
    if (typeof data.message === 'string') return data.message;
    if (data.output && typeof data.output.text === 'string') return data.output.text;
    if (Array.isArray(data) && data[0]) return extractOutput(data[0]);
    return '';
  }

  function looksLikeNdjson(text) {
    var lines = String(text).split(/\r?\n/).map(function (l) { return l.replace(/^data:\s?/, '').trim(); }).filter(Boolean);
    if (!lines.length) return false;
    var ok = 0;
    for (var i = 0; i < Math.min(lines.length, 6); i++) {
      try {
        var o = JSON.parse(lines[i]);
        if (o && (o.type === 'begin' || o.type === 'item' || o.type === 'end')) ok++;
      } catch (e) {}
    }
    return ok >= 1;
  }

  function parseNdjsonText(text) {
    var acc = '';
    String(text).split(/\r?\n/).forEach(function (line) {
      line = line.replace(/^data:\s?/, '').trim();
      if (!line || line === '[DONE]') return;
      try {
        var o = JSON.parse(line);
        if (o && o.type === 'item' && o.content) acc += o.content;
        else if (o && o.type !== 'begin' && o.type !== 'end' && o.type !== 'error') {
          var x = extractOutput(o);
          if (x) acc += x;
        }
      } catch (e) {}
    });
    return acc;
  }

  /* ---------- UI ---------- */
  var ui = {};

  function build() {
    injectCss();
    state.langEn = isEnglish();
    var root = el('div', { class: 'lucky-root', id: 'lucky-root' });
    var help = el('div', { id: 'lucky-help', class: 'lucky-help', role: 'status' });
    help.innerHTML = '<button type="button" class="lucky-help-close" aria-label="Cerrar aviso">&times;</button><div style="padding-right:20px;"><strong>¿Necesitas ayuda?</strong><br>Habla con <strong>Lucky</strong>, tu experto en Café Etrusca, y descubre beneficios exclusivos pensados para ti.</div>';
    var toggle = el('button', {
      class: 'lucky-toggle',
      type: 'button',
      id: 'lucky-toggle',
      'aria-label': 'Abrir chat de Lucky',
      'aria-expanded': 'false',
      'aria-controls': 'lucky-window'
    });
    toggle.appendChild(el('span', { class: 'lucky-toggle-dot', 'aria-hidden': 'true' }));

    var win = el('section', {
      class: 'lucky-window',
      id: 'lucky-window',
      hidden: true,
      role: 'dialog',
      'aria-label': 'Chat de Lucky',
      'aria-modal': 'false'
    });

    var header = el('header', { class: 'lucky-header' });
    var avatar = el('div', { class: 'lucky-avatar', id: 'lucky-avatar', 'aria-hidden': 'true' });
    var htext = el('div', { class: 'lucky-header-text' });
    htext.innerHTML = '<strong>Lucky</strong><p>' + (state.langEn ? 'We are online to help you.' : 'Estamos en línea para ayudarte.') + '</p>';
    var actions = el('div', { class: 'lucky-header-actions' });
    var newBtn = el('button', {
      class: 'lucky-icon-btn',
      type: 'button',
      id: 'lucky-new',
      title: state.langEn ? 'New conversation' : 'Nueva conversación'
    }, state.langEn ? 'New' : 'Nueva conversación');
    var closeBtn = el('button', { class: 'lucky-icon-btn', type: 'button', id: 'lucky-close', 'aria-label': state.langEn ? 'Close chat' : 'Cerrar chat' }, '✕');
    actions.appendChild(newBtn);
    actions.appendChild(closeBtn);
    header.appendChild(avatar);
    header.appendChild(htext);
    header.appendChild(actions);

    var messages = el('div', { class: 'lucky-messages', id: 'lucky-messages' });
    var status = el('div', {
      class: 'lucky-status',
      id: 'lucky-status',
      hidden: true,
      'aria-live': 'polite',
      'aria-atomic': 'true',
      role: 'status'
    });
    var form = el('form', { class: 'lucky-form', id: 'lucky-form' });
    var ta = el('textarea', {
      id: 'lucky-input',
      rows: '1',
      placeholder: state.langEn ? 'Type your question here...' : 'Escribe tu pregunta aquí...',
      'aria-label': state.langEn ? 'Message' : 'Mensaje'
    });
    var send = el('button', { class: 'lucky-send', id: 'lucky-send', type: 'submit' }, state.langEn ? 'Send' : 'Enviar');
    form.appendChild(ta);
    form.appendChild(send);

    win.appendChild(header);
    win.appendChild(messages);
    win.appendChild(status);
    win.appendChild(form);

    root.appendChild(help);
    root.appendChild(win);
    root.appendChild(toggle);
    document.body.appendChild(root);

    ui.root = root;
    ui.help = help;
    ui.toggle = toggle;
    ui.win = win;
    ui.messages = messages;
    ui.status = status;
    ui.form = form;
    ui.input = ta;
    ui.send = send;
    ui.avatar = avatar;
    ui.newBtn = newBtn;
    ui.closeBtn = closeBtn;

    help.querySelector('.lucky-help-close').addEventListener('click', function () { help.hidden = true; });
    setTimeout(function () { help.hidden = true; }, 10000);
    toggle.addEventListener('click', function () { if (state.open) closeChat(); else openChat(); });
    closeBtn.addEventListener('click', closeChat);
    newBtn.addEventListener('click', newConversation);
    form.addEventListener('submit', function (ev) { ev.preventDefault(); submitMessage(); });
    ta.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && !ev.shiftKey) {
        ev.preventDefault();
        if (!state.waiting) submitMessage();
      }
    });
    ta.addEventListener('input', function () {
      ta.style.height = 'auto';
      ta.style.height = Math.min(120, ta.scrollHeight) + 'px';
      bumpIdle();
    });

    getSessionId();
    restoreOrGreet();
    observeImages();

    window.__luckyWidget = {
      open: openChat,
      close: closeChat,
      reset: newConversation,
      getSessionId: function () { return state.sessionId; },
      isWaiting: function () { return state.waiting; },
      state: state,
      stripSucursalesMarker: stripSucursalesMarker,
      visibleBotText: visibleBotText,
      appendBot: appendBot
    };
  }

  function showGreeting() {
    ui.messages.innerHTML = '';
    appendBot(greeting(), { kind: 'greet' });
  }

  function restoreOrGreet() {
    var saved = loadHistory();
    if (!saved.length) {
      showGreeting();
      return;
    }
    ui.messages.innerHTML = '';
    state.skipPersist = true;
    saved = saved.map(function (m) {
      if (m.role !== 'bot') return m;
      var p = stripSucursalesMarker(m.text);
      var rec = { role: m.role, text: p.text, kind: m.kind };
      if (m.sucursales || p.hasMarker) rec.sucursales = true;
      if (m.sucursalesUsed) rec.sucursalesUsed = true;
      return rec;
    });
    saved.forEach(function (m, i) {
      if (m.role === 'user') appendUser(m.text, { skipPersist: true });
      else {
        var used = !!m.sucursalesUsed;
        var nxt = saved[i + 1];
        if (!used && nxt && nxt.role === 'user') {
          var ut = String(nxt.text || '');
          if (ut.indexOf('Mi sucursal es ') === 0 || ut === 'Quiero comprar en la Tienda en línea') used = true;
        }
        appendBot(m.text, { kind: m.kind, skipPersist: true, sucursales: m.sucursales, sucursalesUsed: used, historyIndex: i });
      }
    });
    state.skipPersist = false;
    state.history = saved.slice();
    persistHistory();
    if (saved.some(function (m) { return m.kind === 'idle'; })) state.idleShown = true;
  }

  function openChat() {
    ui.help.hidden = true;
    ui.win.hidden = false;
    requestAnimationFrame(function () { ui.win.classList.add('is-open'); });
    ui.toggle.setAttribute('aria-expanded', 'true');
    ui.toggle.setAttribute('aria-label', state.langEn ? 'Close Lucky chat' : 'Cerrar chat de Lucky');
    state.open = true;
    startAvatarVideo();
    bumpIdle();
    setTimeout(function () { try { ui.input.focus(); } catch (e) {} }, 200);
  }

  function closeChat() {
    ui.win.classList.remove('is-open');
    ui.toggle.setAttribute('aria-expanded', 'false');
    ui.toggle.setAttribute('aria-label', state.langEn ? 'Open Lucky chat' : 'Abrir chat de Lucky');
    state.open = false;
    setTimeout(function () { if (!state.open) ui.win.hidden = true; }, 200);
    stopAvatarVideo();
  }

  function newConversation() {
    if (state.abort) { try { state.abort.abort(); } catch (e) {} }
    setWaiting(false);
    resetSession();
    showGreeting();
    bumpIdle();
    try { ui.input.focus(); } catch (e) {}
  }

  function appendBot(text, opts) {
    opts = opts || {};
    var parsed = visibleBotText(text, !!opts.streaming);
    var msg = el('div', { class: 'lucky-msg lucky-msg--bot' + (opts.kind === 'idle' ? ' lucky-msg--idle' : '') + (opts.kind === 'error' ? ' lucky-msg--error' : '') });
    var body = renderMarkdown(parsed.text);
    body.className = 'lucky-msg__body';
    msg.appendChild(body);
    if (opts.kind === 'idle') msg.setAttribute('data-lucky-idle', '1');
    ui.messages.appendChild(msg);
    if (!opts.skipPersist) {
      recordMessage('bot', parsed.text, opts.kind || 'bot', parsed.hasMarker ? { sucursales: true, sucursalesUsed: !!opts.sucursalesUsed } : null);
      opts.historyIndex = state.history.length - 1;
    }
    syncSucursalesUi(msg, parsed, opts);
    ui.messages.scrollTop = ui.messages.scrollHeight;
    return msg;
  }

  function appendUser(text, opts) {
    opts = opts || {};
    var msg = el('div', { class: 'lucky-msg lucky-msg--user' });
    msg.textContent = text;
    ui.messages.appendChild(msg);
    ui.messages.scrollTop = ui.messages.scrollHeight;
    if (!opts.skipPersist) recordMessage('user', text, 'user');
    return msg;
  }

  function updateBot(msg, text, opts) {
    opts = opts || {};
    var parsed = visibleBotText(text, !!opts.streaming);
    var body = msg.querySelector('.lucky-msg__body') || msg;
    var next = renderMarkdown(parsed.text);
    next.className = 'lucky-msg__body';
    body.replaceWith(next);
    if (!state.skipPersist && state.history.length) {
      var last = state.history[state.history.length - 1];
      if (last && last.role === 'bot') {
        last.text = parsed.text;
        if (parsed.hasMarker) last.sucursales = true;
      }
      if (opts.historyIndex == null && last && last.role === 'bot') opts.historyIndex = state.history.length - 1;
      persistHistory();
    }
    syncSucursalesUi(msg, parsed, opts);
    ui.messages.scrollTop = ui.messages.scrollHeight;
  }

  function buildSucursalesGrid(used, historyIndex) {
    var grid = el('div', {
      class: 'lucky-sucursales',
      role: 'group',
      'aria-label': 'Sucursales'
    });
    if (historyIndex != null) grid.setAttribute('data-hist', String(historyIndex));
    SUCURSALES.forEach(function (name) {
      var btn = el('button', { type: 'button', class: 'lucky-sucursal-btn' });
      btn.textContent = name;
      if (used) btn.disabled = true;
      btn.addEventListener('click', function () { onSucursalClick(name, grid); });
      grid.appendChild(btn);
    });
    if (used) grid.setAttribute('data-used', '1');
    return grid;
  }

  function disableSucursalesGrid(grid) {
    if (!grid) return;
    grid.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
    grid.setAttribute('data-used', '1');
    var idx = parseInt(grid.getAttribute('data-hist'), 10);
    if (!isNaN(idx) && state.history[idx] && state.history[idx].role === 'bot') {
      state.history[idx].sucursalesUsed = true;
      state.history[idx].sucursales = true;
      persistHistory();
    }
  }

  function syncSucursalesUi(msg, parsed, opts) {
    opts = opts || {};
    var next = msg.nextElementSibling;
    var grid = (next && next.classList && next.classList.contains('lucky-sucursales')) ? next : null;
    var show = !!(parsed && parsed.hasMarker) || !!opts.sucursales;
    if (!show) {
      if (grid) grid.remove();
      return;
    }
    if (!grid) {
      grid = buildSucursalesGrid(!!opts.sucursalesUsed, opts.historyIndex);
      if (msg.nextSibling) ui.messages.insertBefore(grid, msg.nextSibling);
      else ui.messages.appendChild(grid);
    } else {
      if (opts.historyIndex != null) grid.setAttribute('data-hist', String(opts.historyIndex));
      if (opts.sucursalesUsed) disableSucursalesGrid(grid);
    }
  }

  function onSucursalClick(name, grid) {
    if (state.waiting) return;
    disableSucursalesGrid(grid);
    var text = (name === 'Tienda en línea') ? 'Quiero comprar en la Tienda en línea' : ('Mi sucursal es ' + name);
    appendUser(text);
    sendToN8n(text);
  }

  function setWaiting(on, phase) {
    state.waiting = !!on;
    ui.send.disabled = !!on;
    ui.send.setAttribute('aria-disabled', on ? 'true' : 'false');
    var hadFocus = (document.activeElement === ui.input);
    ui.input.readOnly = !!on;
    if (on) ui.input.setAttribute('aria-readonly', 'true');
    else ui.input.removeAttribute('aria-readonly');
    if (hadFocus) { try { ui.input.focus(); } catch (e) {} }
    if (!on) {
      ui.status.hidden = true;
      ui.status.textContent = '';
      if (state.seekTimer) { clearTimeout(state.seekTimer); state.seekTimer = null; }
      return;
    }
    var label = seekingMsg(phase);
    ui.status.hidden = false;
    ui.status.innerHTML = '<span class="lucky-status-text">' + escapeHtml(label) + '</span><span class="lucky-dots" aria-hidden="true">' + PAW_SVG + PAW_SVG + PAW_SVG + '</span>';
    if (phase !== 2) {
      if (state.seekTimer) clearTimeout(state.seekTimer);
      state.seekTimer = setTimeout(function () {
        if (state.waiting) setWaiting(true, 2);
      }, SEEKING_MS);
    }
  }

  function bumpIdle() {
    if (state.idleTimer) { clearTimeout(state.idleTimer); state.idleTimer = null; }
    if (state.idleShown || state.waiting) return;
    state.idleTimer = setTimeout(function () {
      if (state.idleShown || state.waiting) return;
      state.idleShown = true;
      appendBot(idleMsg(), { kind: 'idle' });
    }, IDLE_MS);
  }

  function submitMessage() {
    if (state.waiting) return;
    var text = String(ui.input.value || '').trim();
    if (!text) return;
    ui.input.value = '';
    ui.input.style.height = 'auto';
    appendUser(text);
    sendToN8n(text);
  }

  async function sendToN8n(chatInput) {
    setWaiting(true, 1);
    var ctrl = new AbortController();
    state.abort = ctrl;
    state.timedOut = false;
    var timer = setTimeout(function () { state.timedOut = true; try { ctrl.abort(); } catch (e) {} }, TIMEOUT_MS);
    var streamMsg = null;
    var acc = '';
    try {
      var res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, application/x-ndjson, text/event-stream, text/plain, */*' },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId: getSessionId(),
          chatInput: chatInput,
          metadata: { pagina: window.location.href }
        }),
        signal: ctrl.signal
      });
      if (!res.ok) throw new Error('http');
      var ct = String(res.headers.get('content-type') || '').toLowerCase();
      var streamHint = /ndjson|event-stream/.test(ct);
      if (streamHint && res.body) {
        acc = await readStream(res, function (partial) {
          if (!streamMsg) {
            // El texto ya pinta: se oculta el indicador, pero el envío sigue bloqueado.
            ui.status.hidden = true;
            ui.status.textContent = '';
            if (state.seekTimer) { clearTimeout(state.seekTimer); state.seekTimer = null; }
            streamMsg = appendBot(partial, { streaming: true });
          } else updateBot(streamMsg, partial, { streaming: true });
        });
      } else {
        var raw = await res.text();
        if (looksLikeNdjson(raw)) {
          acc = parseNdjsonText(raw);
        } else {
          try { acc = extractOutput(JSON.parse(raw)); }
          catch (e) { acc = raw; }
        }
      }
      if (!acc || !String(acc).trim()) throw new Error('empty');
      if (!streamMsg) appendBot(acc);
      else updateBot(streamMsg, acc);
    } catch (err) {
      if (state.timedOut) {
        appendBot(errorTimeoutMsg(), { kind: 'error' });
      } else {
        try { console.warn('Lucky chat:', err); } catch (e) {}
        appendBot(errorUnavailableMsg(), { kind: 'error' });
      }
    } finally {
      clearTimeout(timer);
      state.abort = null;
      setWaiting(false);
      bumpIdle();
    }
  }

  async function readStream(res, onPartial) {
    var reader = res.body.getReader();
    var dec = new TextDecoder();
    var buf = '';
    var acc = '';
    var firstChunk = true;
    var usedNdjson = false;
    while (true) {
      var chunk = await reader.read();
      if (chunk.done) break;
      buf += dec.decode(chunk.value, { stream: true });
      if (firstChunk) {
        firstChunk = false;
        var peek = buf.trim();
        if (peek && !looksLikeNdjson(peek) && peek.charAt(0) === '{' && peek.indexOf('"type"') === -1) {
          // JSON normal que llegó con content-type de stream: espera el resto y parsea.
          var rest;
          while (true) {
            rest = await reader.read();
            if (rest.done) break;
            buf += dec.decode(rest.value, { stream: true });
          }
          buf += dec.decode();
          try { return extractOutput(JSON.parse(buf)); } catch (e) { return buf; }
        }
        usedNdjson = true;
      }
      var parts = buf.split(/\r?\n/);
      buf = parts.pop() || '';
      parts.forEach(function (line) {
        line = line.replace(/^data:\s?/, '').trim();
        if (!line || line === '[DONE]') return;
        try {
          var o = JSON.parse(line);
          if (o && o.type === 'item' && o.content) {
            acc += o.content;
            onPartial(acc);
          }
        } catch (e) {}
      });
    }
    buf += dec.decode();
    if (buf.trim()) {
      var t = buf.replace(/^data:\s?/, '').trim();
      try {
        var o2 = JSON.parse(t);
        if (o2 && o2.type === 'item' && o2.content) {
          acc += o2.content;
          onPartial(acc);
        } else if (!usedNdjson || !acc) {
          var x = extractOutput(o2);
          if (x) acc = x;
        }
      } catch (e) {
        if (!acc) acc = parseNdjsonText(buf) || buf;
      }
    }
    return acc;
  }

  function observeImages() {
    var obs = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.tagName === 'IMG') enhanceImage(n);
          else if (n.querySelectorAll) n.querySelectorAll('img').forEach(enhanceImage);
        });
      });
    });
    obs.observe(ui.messages, { childList: true, subtree: true });
  }

  function startAvatarVideo() {
    stopAvatarVideo();
    function show() {
      if (!ui.avatar || !document.contains(ui.avatar) || !state.open) return;
      var src = VIDEOS[state.videoIndex % VIDEOS.length];
      state.videoIndex++;
      var video = document.createElement('video');
      video.src = src;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.className = 'lucky-keep-size';
      video.addEventListener('playing', function () { video.style.opacity = '1'; });
      video.onerror = function () { video.remove(); state.videoTimer = setTimeout(show, 5000); };
      video.onended = function () {
        if (ui.avatar.contains(video)) ui.avatar.removeChild(video);
        state.videoTimer = setTimeout(show, 5000);
      };
      ui.avatar.appendChild(video);
    }
    state.videoTimer = setTimeout(show, 5000);
  }

  function stopAvatarVideo() {
    if (state.videoTimer) { clearTimeout(state.videoTimer); state.videoTimer = null; }
    if (ui.avatar) ui.avatar.querySelectorAll('video').forEach(function (v) { v.remove(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
