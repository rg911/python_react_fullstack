import random

from flask import Flask, render_template, request, abort, Response

import aws_polly_lib

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/polly/voices')
def pollyvoices():
   return aws_polly_lib.get_polly_voices()

@app.route('/polly/read', methods=['GET','POST'])
def pollyRead():
    voiceId = request.args.get('voiceId')
    textInput = request.args.get('text') 
        
    r = aws_polly_lib.polly_read(textInput, voiceId)
    contentType = r['ContentType']
    content = r['AudioStream'].read()
    return Response(content,content_type = contentType)


if __name__ == '__main__':
    app.run()