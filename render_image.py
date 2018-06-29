import base64

def process_image(raw_image):
    data = str(raw_image)[22:]
    imgdata = base64.b64decode(data)
    file = open('unknown/unknown.jpg','wb')
    file.write(imgdata)
    file.close()
    return 'saved'