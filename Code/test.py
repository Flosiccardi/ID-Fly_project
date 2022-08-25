from http.server import BaseHTTPRequestHandler,HTTPServer
from os import curdir, sep
import io
import logging
import socketserver
from threading import Condition
import picamera
import time
from threading import Thread
from socketserver import ThreadingMixIn
from RPi_gpio import Motor


# This class will handles any incoming request from
# the browser

class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads= True

class StreamingOutput(object):
    def __init__(self):
        self.frame = None
        self.buffer = io.BytesIO()
        self.condition = Condition()

    def write(self, buf):
        if buf.startswith(b'\xff\xd8'):
            # New frame, copy the existing buffer's content and notify all
            # clients it's available
            self.buffer.truncate()
            with self.condition:
                self.frame = self.buffer.getvalue()
                self.condition.notify_all()
            self.buffer.seek(0)
        return self.buffer.write(buf)


class Server(BaseHTTPRequestHandler):
    # Handler for the GET requests
    def do_GET(self):
        if self.path == "/":
            motortest.initstate()
            self.path = "/index.html"
        if self.path == "/get_frame":
            self.path = "/cam.html"
        if self.path == "/phone":
            self.path = "/game_joysticks.html"
        elif self.path == '/stream.mjpg':
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    with output.condition:
                        output.condition.wait()
                        frame = output.frame
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as e:
                logging.warning(
                    'Removed streaming client %s: %s',
                    self.client_address, str(e))
        if self.path == "/DownDiri":
            motortest.Down()
            self.send_response(200)
        if self.path == "/UpDiri":
            motortest.Up()
            self.send_response(200)
        if self.path == "/LeftDiri":
            motortest.LeftRota()
            self.send_response(200)
        if self.path == "/RightDiri":
            motortest.RightRota()
            self.send_response(200)
        if self.path == "/UpRightDiri":
            motortest.RightRotaUp()
            self.send_response(200)
        if self.path == "/DownRightDiri":
            motortest.RightRotaDown()
            self.send_response(200)
        if self.path == "/UpLeftDiri":
            motortest.LeftRotaUp()
            self.send_response(200)
        if self.path == "/DownLeftDiri":
            motortest.LeftRotaDown()
            self.send_response(200)
        if self.path == "/UpCam":
            motortest.Forward()
            self.send_response(200)
        if self.path == "/DownCam":
            motortest.Backward()
            self.send_response(200)
        if self.path == "/DownDiri_DownCam":
            motortest.DownBackward()
            self.send_response(200)
        if self.path == "/UpDiri_DownCam":
            motortest.UpBackward()
            self.send_response(200)
        if self.path == "/DownRightDiri_DownCam":
            motortest.RightRotaDownBackward()
            self.send_response(200)
        if self.path == "/DownLeftDiri_DownCam":
            motortest.LeftRotaDownBackward()
            self.send_response(200)
        if self.path == "/UpRightDiri_DownCam":
            motortest.RightRotaUpBackward()
            self.send_response(200)
        if self.path == "/UpLeftDiri_DownCam":
            motortest.LeftRotaUpBackward()
            self.send_response(200)
        if self.path == "/LeftDiri_DownCam":
            motortest.LeftRotaBackward()
            self.send_response(200)
        if self.path == "/RightDiri_DownCam":
            motortest.RightRotaBackward()
            self.send_response(200)
        if self.path == "/DownDiri_UpCam":
            motortest.DownForward()
            self.send_response(200)
        if self.path == "/UpDiri_UpCam":
            motortest.UpForward()
            self.send_response(200)
        if self.path == "/DownRightDiri_UpCam":
            motortest.RightRotaDownForward()
            self.send_response(200)
        if self.path == "/DownLeftDiri_UpCam":
            motortest.LeftRotaDownForward()
            self.send_response(200)
        if self.path == "/UpRightDiri_UpCam":
            motortest.RightRotaUpForward()
            self.send_response(200)
        if self.path == "/UpLeftDiri_UpCam":
            motortest.LeftRotaUpForward()
            self.send_response(200)
        if self.path == "/LeftDiri_UpCam":
            motortest.LeftRotaForward()
            self.send_response(200)
        if self.path == "/RightDiri_UpCam":
            motortest.RightRotaForward()
            self.send_response(200)
        if self.path == "/CamCamDown":
            self.send_response_only(200)
        if self.path == "/CamCamUp":
            self.send_response(200)


        try:
            # Check the file extension required and
            # set the right mime type

            sendReply = False
            if self.path.endswith(".html"):
                mimetype = 'text/html'
                sendReply = True
            if self.path.endswith(".JPG"):
                mimetype = 'image/JPG'
                sendReply = True
            if self.path.endswith(".png"):
                mimetype = 'image/png'
                sendReply = True
            if self.path.endswith(".gif"):
                mimetype = 'image/gif'
                sendReply = True
            if self.path.endswith(".js"):
                mimetype = 'application/javascript'
                sendReply = True
            if self.path.endswith(".css"):
                mimetype = 'text/css'
                sendReply = True

            if sendReply == True:
                # Open the static file requested and send it
                f = open(curdir + sep + self.path, 'rb')
                self.send_response(200)
                self.send_header('Content-type', mimetype)
                self.end_headers()
                self.wfile.write(f.read())
                f.close()
            return


        except IOError:
            self.send_error(404, 'File Not Found: %s' % self.path)
            
HOST_NAME = '168.254.57.68'
PORT = 8000

def serve_on_port(port):
    server= ThreadingHTTPServer((HOST_NAME,port),Server)
    server.serve_forever()


if __name__ == "__main__":
     motortest=Motor()
     print (motortest.Moteur1A)
     motortest.start()
     with picamera.PiCamera(resolution='640x480', framerate=24) as camera:
        #camera.rotation = 180
        output = StreamingOutput()
        camera.start_recording(output, format='mjpeg')
        #httpd = HTTPServer((HOST_NAME,PORT),Server)
        print(time.asctime(), "Start Server - %s:%s"%(HOST_NAME,PORT))
        try:
            Thread(target=serve_on_port, args=[8000]).start()
            serve_on_port(9999)
        except KeyboardInterrupt:
            pass
        camera.stop_recording()
        print(time.asctime(),'Stop Server - %s:%s' %(HOST_NAME,PORT))
