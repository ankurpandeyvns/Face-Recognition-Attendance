from flask import *
import base64
import os

app = Flask(__name__)
UPLOAD_FOLDER = os.path.basename('unknown')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'POST':
        raw_image = request.form['photo']
        process_image(raw_image)
    return render_template('index.html')

@app.route('/save')
def show_image():
    filename = 'unknown/unknown.jpg'
    return send_file(filename, mimetype='image/jpg')

def process_image(raw_image):
    data = str(raw_image)[22:]
    imgdata = base64.b64decode(data)
    file = open('unknown/unknown.jpg','wb')
    file.write(imgdata)
    file.close()


if __name__ == '__main__':
    app.run(debug=True)