from flask import Blueprint, request, redirect, flash, jsonify
from db.sql_customers import (
    db_get_all_customers,
    db_get_customer_by_id,
    db_get_customer_by_name,
    db_add_customer,
    db_remove_customer,
    db_update_customer,
)

customers_bp = Blueprint("customers_bp", __name__)


@customers_bp.route("/customers/test", methods=["GET"])
def customers():
    return "Pong"


@customers_bp.route("/customers/add_customer", methods=["POST"])
def add_customer():
    if request.method == "POST":
        customer = {
            "name": request.form["name"],
            "phone": request.form["phone"],
            "birth": request.form["birth"],
            "email": request.form["email"],
            "address": request.form["address"],
            "instagram": request.form["instagram"],
        }

        if db_add_customer(customer):
            flash(f'Cliente "{request.form["name"]}" criado com sucesso!', "success")
        else:
            flash("Erro no cadastro. Certifique os dados inseridos.", "danger")

        

    return "Erro no cadastro. Todos os campos são obrigatórios."


@customers_bp.route("/customers/get_all_customers", methods=["GET"])
def get_all_customers():
    return db_get_all_customers()


@customers_bp.route("/customers/get_customer_by_name", methods=["GET"])
def get_customer_by_name():
    print('bateu')
    if request.method == "GET":
        return db_get_customer_by_name(request.args.get("name"))


@customers_bp.route("/customers/get_customer_by_id", methods=["GET"])
def get_customer_by_id():
    if request.method == "GET":
        return db_get_customer_by_id(request.form["id"])


@customers_bp.route("/customers/delete_customer", methods=["POST"])
def delete_customer():
    if request.method == "POST":
        db_remove_customer(request.form["id"])

        return "Customer removed successfully"


@customers_bp.route("/customers/update_customer", methods=["POST"])
def update_customer():

    if request.method == "POST":
        data = request.get_json()
        customer = {
            "id": data["id"],
            "name": data["name"],
            "phone": data["phone"],
            "birth": data["birth"],
            "email": data["email"],
            "address": data["address"],
        }

        if db_update_customer(customer):
            flash(f'Cliente "{data["name"]}" atualizado com sucesso!', "success")
            return jsonify({"status": "success", "message": f'Cliente "{data["name"]}" atualizado com sucesso!'})
        else:
            flash("Erro na edição", "danger")
            return jsonify({"status": "error", "message": "Erro na edição"})
        
        return redirect("/")
        
