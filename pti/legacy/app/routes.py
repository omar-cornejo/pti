from flask import Blueprint, render_template, request, session
from .utils import login_required

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return render_template('home.html')

    

@main.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    if request.method == 'POST':
        file = request.files.get('image')
        if not file:
            return "Archivo no enviado", 400
        # Aquí procesarás el ML luego
        return f"Archivo recibido: {file.filename}"
    return render_template('dashboard.html', username=session.get('user'))

@main.route('/gallery')
@login_required
def gallery():
    return render_template('gallery.html', username=session.get('user'))

@main.route('/features')
@login_required
def features():
    return render_template('features.html', username=session.get('user'))


@main.route('/detection', methods=['GET', 'POST'])
@login_required
def detection():
    detections = None
    if request.method == 'POST':
        file = request.files.get('image')
        if file and file.filename:
            # TODO: Integrate real ML model. For now, mock sample detections.
            detections = [
                {
                    'label': 'T-shirt',
                    'icon': '👕',
                    'tags': ['cotton', 'casual wear'],
                    'confidence': 96,
                    'bg_class': 'bg-gradient-to-br from-purple-600/30 to-fuchsia-500/30',
                },
                {
                    'label': 'Jeans',
                    'icon': '👖',
                    'tags': ['denim', 'straight fit', 'casual'],
                    'confidence': 93,
                    'bg_class': 'bg-gradient-to-br from-blue-500/30 to-cyan-400/30',
                },
                {
                    'label': 'Sneakers',
                    'icon': '👟',
                    'tags': ['athletic footwear', 'casual material'],
                    'confidence': 87,
                    'bg_class': 'bg-gradient-to-br from-green-500/30 to-emerald-500/30',
                },
            ]
    return render_template('detection.html', detections=detections, username=session.get('user'))