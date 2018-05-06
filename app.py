import json

from flask import Flask, render_template
from flask_bootstrap import Bootstrap


app = Flask(__name__)
Bootstrap(app)

# prefix = "/hzd-web"
prefix = ""
# endpoint = "https://loaias.github.io/hzd-web"
endpoint = "http://www.jxhzd.tk"


@app.route("/")
def index():
    with open('db.json') as f:
        db = json.load(f)

    response = render_template("index.html", prefix=prefix, endpoint=endpoint,
                               setting=db["setting"], sliders=db["sliders"], categories=db["categories"])
    with open('index.html', 'w') as f:
        f.write(response)

    return response


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
