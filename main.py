import markdown
from flask import Flask, request, jsonify, send_from_directory, send_file

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert_markdown():
    """
    Convert markdown to HTML
    
    Expects JSON with a 'markdown' field containing the markdown text
    Returns JSON with an 'html' field containing the converted HTML
    """
    data = request.get_json()
    
    if not data or 'markdown' not in data:
        return jsonify({
            'error': 'Missing markdown content'
        }), 400
        
    md_content = data['markdown']
    html_content = markdown.markdown(md_content)
    
    return jsonify({
        'html': html_content
    })

@app.route('/')
def index():
    return send_file('index.html')
    
@app.route('/assets/<path:path>')
def assets(path):
    return send_from_directory('assets', path)

if __name__ == '__main__':
    app.run(debug=True)
