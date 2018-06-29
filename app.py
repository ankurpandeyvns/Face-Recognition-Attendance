from flask import *
from render_image import *
import os
#anurag@bowstringstudio.in
app = Flask(__name__)
UPLOAD_FOLDER = os.path.basename('unknown')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods = ['GET', 'POST'])
def show_image():
    # filename = 'unknown/unknown.jpg'
    if request.method == 'POST':
        raw_image = request.form['photo']
        a = process_image(raw_image)
        return a
    
    #return send_file(filename, mimetype='image/jpg')

if __name__ == '__main__':
    app.run(debug=True)