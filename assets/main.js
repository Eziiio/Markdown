
const sampleMarkdown = `# Markdown Converter

## Welcome to the Markdown Converter!

This tool allows you to write markdown and see the HTML output in real-time.

### Features

- **Real-time preview** as you type
- **Syntax highlighting** for code blocks
- **API integration** for server-side rendering
- **Mobile responsive** design

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### Table Example

| Feature | Description |
|---------|-------------|
| Live Preview | See changes as you type |
| API Integration | Convert using server API |
| Responsive | Works on all devices |

> **Tip:** You can use the copy button to copy the HTML output.

![Markdown Logo](https://markdown-here.com/img/icon256.png)

---

Try editing this markdown to see the preview update!
`;

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const appElement = document.querySelector('#app');
  appElement.innerHTML = `
    <header>
      <div class="container">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M14.85 4.85l1.44 1.44-2.88 2.88 1.42 1.42 2.88-2.88 1.44 1.44c.31.31.85.09.85-.36V4.5c0-.28-.22-.5-.5-.5h-4.29c-.45 0-.67.54-.36.85zM8.79 4.85L7.35 6.29l2.88 2.88-1.42 1.42-2.88-2.88-1.44 1.44c-.31.31-.85.09-.85-.36V4.5c0-.28.22-.5.5-.5h4.29c.45 0 .67.54.36.85zM14.85 19.15l1.44-1.44-2.88-2.88 1.42-1.42 2.88 2.88 1.44-1.44c.31-.31.85-.09.85.36v4.29c0 .28-.22.5-.5.5h-4.29c-.45 0-.67-.54-.36-.85zM8.79 19.15l-1.44-1.44 2.88-2.88-1.42-1.42-2.88 2.88-1.44-1.44c-.31-.31-.85-.09-.85.36v4.29c0 .28.22.5.5.5h4.29c.45 0 .67-.54.36-.85z"/>
          </svg>
          Markdown Converter
        </div>
      </div>
    </header>
    
    <main>
      <div class="container">
        <div class="converter">
          <div class="editor-container">
            <div class="panel-header">
              <h2>Markdown</h2>
              <div class="panel-actions">
                <button class="btn" id="clear-btn" title="Clear editor">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                  Clear
                </button>
                <button class="btn" id="copy-md-btn" title="Copy markdown">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </button>
              </div>
            </div>
            <textarea class="editor" id="markdown-editor" placeholder="Type your markdown here...">${sampleMarkdown}</textarea>
          </div>
          
          <div class="preview-container">
            <div class="panel-header">
              <h2>Preview</h2>
              <div class="panel-actions">
                <button class="btn" id="copy-html-btn" title="Copy HTML">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy HTML
                </button>
                <button class="btn btn-primary" id="convert-api-btn" title="Convert using API">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                  Convert via API
                </button>
              </div>
            </div>
            <div class="preview" id="html-preview"></div>
          </div>
        </div>
        
        <div id="status-container"></div>
      </div>
    </main>
    
    <footer>
      <div class="container">
        <div class="footer-content">
          <p>© ${new Date().getFullYear()} Markdown Converter | Done by <a href='https://github.com/Eziiio'>@Eziiio</a></p>
        </div>
      </div>
    </footer>
    
    <div class="toast-container" id="toast-container"></div>
  `;

  const markdownEditor = document.getElementById('markdown-editor');
  const htmlPreview = document.getElementById('html-preview');

  document.getElementById('clear-btn').addEventListener('click', () => {
    markdownEditor.value = '';
    showToast('Editor cleared', 'info');
  });

  document.getElementById('copy-md-btn').addEventListener('click', () => {
    copyToClipboard(markdownEditor.value, 'Markdown copied to clipboard!');
  });

  document.getElementById('copy-html-btn').addEventListener('click', () => {
    copyToClipboard(htmlPreview.innerHTML, 'HTML copied to clipboard!');
  });

  document.getElementById('convert-api-btn').addEventListener('click', () => {
    convertViaAPI(markdownEditor.value);
  });
}

async function convertViaAPI(markdown) {
  const statusContainer = document.getElementById('status-container');
  statusContainer.innerHTML = `
    <div class="status info">
      <div class="loading"></div>
      Converting markdown via API...
    </div>
  `;

  try {
    const response = await simulateApiCall(markdown);
    document.getElementById('html-preview').innerHTML = response.html;
    statusContainer.innerHTML = `
        <div class="status success">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Successfully converted via API
        </div>
      `;
    showToast('Markdown converted via API', 'success');
  } catch (error) {
    console.error('API conversion error:', error);
    statusContainer.innerHTML = `
      <div class="status error">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        Error: ${error.message}
      </div>
    `;
    showToast(`API Error: ${error.message}`, 'error');
  }
}

function simulateApiCall(markdown) {
  return fetch('/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ markdown })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to convert markdown');
      }
      return response.json();
    });
}

function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text)
    .then(() => {
      showToast(successMessage, 'success');
    })
    .catch(err => {
      showToast('Failed to copy: ' + err, 'error');
    });
}

function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = '';
  switch (type) {
    case 'success':
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
      break;
    case 'error':
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
      break;
    case 'warning':
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
      break;
    default:
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
  }

  toast.innerHTML = `${icon} <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  }, 3000);
}
