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
            "observations": request.form["observations"],
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
    # try:
        if request.method == "POST":
            customer = {
                "id": request.form["id"],
                "name": request.form["name"],
                "phone": request.form["phone"],
                "birth": request.form["birth"],
                "email": request.form["email"],
                "address": request.form["address"],
                "instagram": request.form["instagram"],
                "observations": request.form["observations"] or "",
            }

        db_update_customer(customer)
        return jsonify({"type": "success", "message": f'Cliente "{request.form["name"]}" atualizado com sucesso!'})

    # except Exception as e:
    #     return jsonify({"type": "error", "message": f"Erro na edição, {str(e)}"})
        
        
