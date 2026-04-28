from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import subprocess
import tempfile
import os

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/index.html':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            with open('index.html', 'rb') as f:
                self.wfile.write(f.read())
        elif self.path == '/styles.css':
            self.send_response(200)
            self.send_header('Content-type', 'text/css; charset=utf-8')
            self.end_headers()
            with open('styles.css', 'rb') as f:
                self.wfile.write(f.read())
        elif self.path == '/script.js':
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript; charset=utf-8')
            self.end_headers()
            with open('script.js', 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == '/run':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            code = data.get('code', '')

            fd, temp_path = tempfile.mkstemp(suffix='.txt')
            with os.fdopen(fd, 'w', encoding='utf-8') as f:
                f.write(code)

            try:
                current_dir = os.path.dirname(os.path.abspath(__file__))
                # Run the compiled Java program safely with UTF-8
                result = subprocess.run(['java', '-Dfile.encoding=UTF-8', 'LughatDad', temp_path], 
                                        cwd=current_dir,
                                        capture_output=True)
                
                output = result.stdout.decode('utf-8', errors='replace')
                if result.stderr:
                    output += "\nError:\n" + result.stderr.decode('utf-8', errors='replace')
            except Exception as e:
                output = "Error executing java: " + str(e) + "\nPlease ensure Java is compiled successfully."
            finally:
                try:
                    os.remove(temp_path)
                except:
                    pass

            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {'output': output}
            self.wfile.write(json.dumps(response).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print("="*50)
    print(f" Server is running successfully at:")
    print(f" http://localhost:{port}")
    print("="*50)
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()

if __name__ == '__main__':
    run()
