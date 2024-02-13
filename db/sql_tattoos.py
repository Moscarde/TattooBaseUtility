from db.sql_connection import connect_database
from werkzeug.utils import secure_filename
import os
from datetime import datetime


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {
        "jpg",
        "jpeg",
        "png",
    }


def db_add_tattoo(
    customer_id,
    tattoo_name,
    images,
    description,
    price,
    comission,
    payment,
    date,
    time,
    status,
):

    filenames = []
    if images is not None:
        for image in images:
            if image and allowed_file(image.filename):
                filename = (
                    customer_id
                    + "_"
                    + tattoo_name
                    + "_"
                    + str(datetime.now().timestamp())
                    + "."
                    + secure_filename(image.filename).split(".")[-1]
                )
                image.save(
                    os.path.join(
                        "static/img/tattoos",
                        filename,
                    )
                )
                filenames.append(filename)

    string_filenames = ";".join(filenames) if len(filenames) > 0 else None
    print(string_filenames)

    conn, c = connect_database()
    c.execute(
        "INSERT INTO tattoos (customer_id, tattoo_name, images, description, price, comission, payment, date, time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            customer_id,
            tattoo_name,
            string_filenames,
            description,
            price,
            comission,
            payment,
            date,
            time,
            status,
        ],
    )
    conn.commit()
    conn.close()


def db_remove_tattoo(id):
    conn, c = connect_database()
    c.execute("DELETE FROM tattoos WHERE id = ?", [id])
    conn.commit()
    conn.close()


def db_get_all_tattoos():
    conn, c = connect_database()
    # Consultar customers
    c.execute("SELECT * FROM tattoos")
    tattoos = c.fetchall()
    # Fechar a conexão
    conn.close()
    return tattoos


def db_get_tattoo_by_customer_id(customer_id):
    conn, c = connect_database()

    c.execute("SELECT * FROM tattoos WHERE customer_id = ?", [customer_id])
    tattoos = c.fetchall()

    conn.close()
    return tattoos


def db_update_tattoo(
    tattoo_id, tattoo_name, description, price, comission, payment, date, time, status
):
    conn, c = connect_database()

    c.execute(
        "UPDATE tattoos SET tattoo_name = ?, description = ?, price = ?, comission = ?, payment = ?, date = ?, time = ?, status = ? WHERE id = ?",
        [
            tattoo_name,
            description,
            price,
            comission,
            payment,
            date,
            time,
            status,
            tattoo_id,
        ],
    )
    conn.commit()

    conn.close()
