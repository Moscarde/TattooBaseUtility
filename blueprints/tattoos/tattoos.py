from flask import Blueprint, request, flash, jsonify
from db.sql_tattoos import (
    db_get_all_tattoos,
    db_get_tattoo_by_customer_id,
    db_add_tattoo,
    db_remove_tattoo,
    db_update_tattoo,
)

tattoos_bp = Blueprint("tattoos_bp", __name__)


@tattoos_bp.route("/tattoos/add_tattoo", methods=["POST"])
def add_tattoo():
    if request.method == "POST":
        data = request.get_json()
        print(data)

        try:
            db_add_tattoo(
                customer_id=data["customer_id"],
                tattoo_name=data["tattoo_name"],
                description=data["description"],
                price=data["price"],
                comission=data["comission"],
                payment=data["payment"],
                date=data["date"],
                time=data["time"],
                status="scheduled",
            )
            flash(f'Tattoo "{data["tattoo_name"]}" criada com sucesso!', "success")
            return jsonify(
                {
                    "status": "success",
                    "message": f'Tattoo "{data["tattoo_name"]}" criada com sucesso!',
                }
            )

        except Exception as e:
            flash(f"Erro na adição, {str(e)}", "danger")
            return jsonify({"status": "error", "message": f"Erro na adição, {str(e)}"})


@tattoos_bp.route("/tattoos/get_all_tattoos", methods=["GET"])
def get_tattoos():
    return db_get_all_tattoos()


@tattoos_bp.route("/tattoos/get_tattoos_by_customer_id", methods=["GET"])
def get_tattoo_by_customer_id():
    if request.method == "GET":
        return db_get_tattoo_by_customer_id(request.form["customer_id"])


@tattoos_bp.route("/tattoos/delete_tattoo", methods=["POST"])
def delete_tattoo():
    if request.method == "POST":
        db_remove_tattoo(request.form["id"])

        return "Tattoo removed successfully"


@tattoos_bp.route("/tattoos/update_tattoo", methods=["POST"])
def update_tattoo():
    if request.method == "POST":
        data = request.get_json()

        try:
            db_update_tattoo(
                tattoo_id=data["tattoo_id"],
                tattoo_name=data["tattoo_name"],
                description=data["description"],
                price=data["price"],
                comission=data["comission"],
                payment=data["payment"],
                date=data["date"],
                time=data["time"],
                status=data["status"],
            )
            flash(f'Tattoo "{data["tattoo_name"]}" atualizada com sucesso!', "success")
            return jsonify(
                {
                    "status": "success",
                    "message": f'Tattoo "{data["tattoo_name"]}" atualizada com sucesso!',
                }
            )

        except Exception as e:
            flash(f"Erro na adição, {str(e)}", "danger")
            return jsonify({"status": "error", "message": f"Erro na edição, {str(e)}"})
            


@tattoos_bp.route("/tattoos/test", methods=["GET"])
def test():
    from scripts.test_driver import initialize_driver

    driver = initialize_driver()
    driver.get("https://www.google.com/")
    return "Pong"
