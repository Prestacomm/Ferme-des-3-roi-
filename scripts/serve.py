import functools
import http.server
import socketserver

DIRECTORY = "/Users/lorick/Desktop/SITE FERME DES 3 ROIS "
PORT = 8934

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIRECTORY)

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

with ReusableTCPServer(("", PORT), Handler) as httpd:
    print(f"Serving {DIRECTORY} on port {PORT}")
    httpd.serve_forever()
