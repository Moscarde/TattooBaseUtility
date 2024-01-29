from flask import Flask, render_template, request, redirect, url_for
from blueprints.customers.customers import customers_bp
from blueprints.tattoos.tattoos import tattoos_bp

app = Flask(__name__)
app.secret_key = "secret"
app.register_blueprint(customers_bp)
app.register_blueprint(tattoos_bp)

# descritives
# Já fez alguma cirurgia?
# Toma algum remédio?
# Toma algum anticoncepcional?
# Tem alergia a algum medicamento?
# Sabe a sua pressão?
# Faz algum tratamento médico?

# not descritives
# Está gestante?
# Você é fumante?
# Já teve hepatite?
# Tem diabetes?
# Tem asma?
# Tem problemas cardíacos?
# Já teve convulsão?
# Tem problema renal?
# Constuma sentir tontura?

anaminese_questions = [
    {"question": "Já fez alguma cirurgia?", "keyword": "cirurgia", "descritive": True},
    {"question": "Toma algum remédio?", "keyword": "remédio", "descritive": True},
    {"question": "Toma algum anticoncepcional?", "keyword": "anticoncepcional", "descritive": True},
    {"question": "Tem alergia a algum medicamento?", "keyword": "alergia", "descritive": True},
    {"question": "Sabe a sua pressão?", "keyword": "pressão", "descritive": True},
    {"question": "Faz algum tratamento médico?", "keyword": "tratamento", "descritive": True},
    {"question": "Está gestante?", "keyword": "gestante", "descritive": False},
    {"question": "Você é fumante?", "keyword": "fumante", "descritive": False},
    {"question": "Já teve hepatite?", "keyword": "hepatite", "descritive": False},
    {"question": "Tem diabetes?", "keyword": "diabetes", "descritive": False},
    {"question": "Tem asma?", "keyword": "asma", "descritive": False},
    {"question": "Tem problemas cardíacos?", "keyword": "problemas", "descritive": False},
    {"question": "Já teve convulsão?", "keyword": "convulsão", "descritive": False},
    {"question": "Tem problema renal?", "keyword": "renal", "descritive": False},
    {"question": "Constuma sentir tontura?", "keyword": "tontura", "descritive": False},

]


@app.route("/")
def index():
    return render_template("index.html", anaminese_questions=anaminese_questions)


if __name__ == "__main__":
    app.run(debug=True)
