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

    string_filenames = process_images(
        new_images=images, tattoo_name=tattoo_name
    )

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
    tattoo_id,
    tattoo_name,
    description,
    price,
    comission,
    payment,
    date,
    time,
    status,
    new_images,
    old_images,
):

    print("new_images", new_images)
    print("old_images", old_images)

    string_filenames = process_images(
        new_images=new_images, tattoo_name=tattoo_name, old_images=old_images
    )
    conn, c = connect_database()

    c.execute(
        "UPDATE tattoos SET tattoo_name = ?, description = ?, price = ?, comission = ?, payment = ?, date = ?, time = ?, status = ?, images = ? WHERE id = ?",
        [
            tattoo_name,
            description,
            price,
            comission,
            payment,
            date,
            time,
            status,
            string_filenames,
            tattoo_id,
        ],
    )
    conn.commit()

    conn.close()


def process_images(new_images, tattoo_name, old_images=None):
    filenames = []
    if new_images is not None:
        for image in new_images:
            if image and allowed_file(image.filename):
                filename = (
                    tattoo_name
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

    if old_images is not None:
        for image_filename in old_images:
            filenames.append(image_filename)

    string_filenames = ";".join(filenames) if len(filenames) > 0 else None
    return string_filenames
