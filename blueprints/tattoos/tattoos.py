from flask import Blueprint, request, flash, jsonify, redirect
from werkzeug.utils import secure_filename
import os
from db.sql_connection import connect_database
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
    # print(request.files)
    if request.method == "POST":
        try:
            files_list = []
            for file in request.files.getlist("image"):
                files_list.append(file)

            print(files_list)

            db_add_tattoo(
                customer_id=request.form["customer_id"],
                tattoo_name=request.form["name"],
                images=files_list if len(files_list) > 0 else None,
                description=request.form["description"],
                price=request.form["price"],
                comission=request.form["comission"],
                payment=request.form["payment"],
                date=request.form["date"],
                time=request.form["time"],
                status="scheduled",
            )

            return jsonify(
                {
                    "type": "success",
                    "message": f"Tattoo {request.form['name']} criada com sucesso!",
                }
            )

        except Exception as e:
            flash(f"Erro na adição, {str(e)}", "danger")
            return jsonify({"type": "error", "message": f"Erro na adição, {str(e)}"})


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
        # try:
            files_list = []
            for file in request.files.getlist("image"):
                files_list.append(file)

            old_image_list = []
            for image in request.form.getlist("old_image"):
                old_image_list.append(image)

            print("files_list", files_list)
            print("request.form", request.form)

            db_update_tattoo(
                tattoo_id=request.form["tattoo_id"],
                tattoo_name=request.form["name"],
                description=request.form["description"],
                price=request.form["price"],
                comission=request.form["comission"],
                payment=request.form["payment"],
                date=request.form["date"],
                time=request.form["time"],
                status=request.form["status"],
                new_images=files_list if len(files_list) > 0 else None,
                old_images=(
                    old_image_list if len(old_image_list) > 0 else None
                ),
            )

            flash(f'Tattoo "{request.form["name"]}" atualizada com sucesso!', "success")
            return jsonify(
                {
                    "type": "success",
                    "message": f'Tattoo "{request.form["name"]}" atualizada com sucesso!',
                }
            )

        # except Exception as e:
        #     flash(f"Erro na adição, {str(e)}", "danger")
        #     return jsonify({"type": "error", "message": f"Erro na edição, {str(e)}"})


@tattoos_bp.route("/tattoos/test", methods=["POST"])
def test():
    if "image" in request.files:
        image = request.files["image"]
        if image.filename != "":
            filename = secure_filename(image.filename)
            image.save(os.path.join("uploads", filename))

            conn, c = connect_database()
            c.execute("INSERT INTO images (image_name) VALUES (?)", (filename,))
            conn.commit()
            conn.close()

    return redirect("/")
