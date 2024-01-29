from flask import Blueprint, request
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
        tattoo = {
            "customer_id": request.form["customer_id"],
            "tattoo": request.form["tattoo"],
            "description": request.form["description"],
            "price": request.form["price"],
            "payment": request.form["payment"],
            "date": request.form["date"],
        }

        db_add_tattoo(tattoo)

        return "Tattoo added successfully"


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
        tattoo = {
            "id": request.form["id"],
            "customer_id": request.form["customer_id"],
            "tattoo": request.form["tattoo"],
            "description": request.form["description"],
            "price": request.form["price"],
            "payment": request.form["payment"],
        }

        db_update_tattoo(tattoo)

        return "Tattoo updated successfully"


@tattoos_bp.route("/tattoos/test", methods=["GET"])
def test():
    from scripts.test_driver import initialize_driver

    driver = initialize_driver()
    driver.get("https://www.google.com/")
    return "Pong"