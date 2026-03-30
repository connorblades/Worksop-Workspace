import http.server
import os

os.chdir("/Users/connorblades32/Documents/Claude/Worksop Workspace")

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

http.server.test(HandlerClass=Handler, port=3456, bind="127.0.0.1")
