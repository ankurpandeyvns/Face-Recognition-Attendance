#Author: SWETANK SUBHAM, ANKUR PANDEY
from flask import *
from render_image import *
import os
app = Flask(__name__)
UPLOAD_FOLDER = os.path.basename('unknown')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods = ['GET', 'POST'])
def show_image():
    if request.method == 'POST':
        raw_image = request.form['photo']
        a = process_image(raw_image)
        return jsonify(a)

@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)