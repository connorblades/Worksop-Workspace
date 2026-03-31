import http.server
import os

os.chdir("/Users/connorblades32/Documents/Claude/Worksop Workspace")

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Strip query string
        path = self.path.split('?')[0].split('#')[0]

        # Serve root
        if path == '/' or path == '':
            self.path = '/index.html'
        # If no extension, try adding .html (clean URL support)
        elif '.' not in path.split('/')[-1]:
            html_path = path.lstrip('/') + '.html'
            if os.path.isfile(html_path):
                self.path = '/' + html_path
            else:
                self.path = path

        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def log_message(self, format, *args):
        pass

http.server.test(HandlerClass=Handler, port=3456, bind="127.0.0.1")
