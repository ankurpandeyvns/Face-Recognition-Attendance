from flask import *
from render_image import *
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

if __name__ == '__main__':
    app.run(debug=True)