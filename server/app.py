from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)


# ================= DATABASE ================= #

def get_connection():
    return pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=ChaitraR;"
        "DATABASE=CookBuddy;"
        "Trusted_Connection=yes;"
    )


# ================= HOME ================= #

@app.route("/")
def home():
    return "CookBuddy Backend Running!"


# ================= REGISTER ================= #

@app.route("/register", methods=["POST"])
def register():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        data = request.json

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        cursor.execute(
            "SELECT UserID FROM Users WHERE Email=?",
            (email,)
        )

        if cursor.fetchone():
            return jsonify({
                "success": False,
                "message": "Email already exists"
            })

        cursor.execute("""
            INSERT INTO Users
            (
                Name,
                Email,
                Password,
                RegisteredAt
            )
            VALUES
            (
                ?, ?, ?, GETDATE()
            )
        """, (name, email, password))

        conn.commit()

        return jsonify({
            "success": True,
            "message": "Registration Successful"
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        })

    finally:

        cursor.close()
        conn.close()


# ================= LOGIN ================= #

@app.route("/login", methods=["POST"])
def login():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        data = request.json

        email = data.get("email")
        password = data.get("password")

        cursor.execute("""
            SELECT
                UserID,
                Name,
                Email,
                RegisteredAt
            FROM Users
            WHERE Email=? AND Password=?
        """, (email, password))

        user = cursor.fetchone()

        if not user:
            return jsonify({
                "success": False,
                "message": "Invalid Email or Password"
            })

        # Save Login Time
        cursor.execute("""
            UPDATE Users
            SET LoginTime = GETDATE()
            WHERE UserID=?
        """, (user.UserID,))

        conn.commit()

        return jsonify({
            "success": True,
            "user": {
                "id": user.UserID,
                "name": user.Name,
                "email": user.Email,
                "registeredAt": str(user.RegisteredAt)
            }
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        })

    finally:

        cursor.close()
        conn.close()
        # ================= LOGOUT ================= #

@app.route("/logout", methods=["POST"])
def logout():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        data = request.json
        userId = data.get("userId")

        if not userId:
            return jsonify({
                "success": False,
                "message": "User ID is required"
            }), 400

        cursor.execute("""
            UPDATE Users
            SET LogoutTime = GETDATE()
            WHERE UserID=?
        """, (userId,))

        conn.commit()

        return jsonify({
            "success": True,
            "message": "Logout Successful"
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

    finally:

        cursor.close()
        conn.close()


# ================= ADD FAVORITE ================= #

@app.route("/favorites", methods=["POST"])
def add_favorite():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        data = request.json

        userId = data.get("userId")
        recipeId = str(data.get("recipeId"))
        recipeName = data.get("recipeName")
        imageUrl = data.get("imageUrl")

        # Check user
        cursor.execute(
            "SELECT Name, Email FROM Users WHERE UserID=?",
            (userId,)
        )

        user = cursor.fetchone()

        if not user:
            return jsonify({
                "success": False,
                "message": "User not found"
            }), 404

        # Check duplicate recipe
        cursor.execute("""
            SELECT FavoriteID
            FROM Favorites
            WHERE UserID=? AND RecipeID=?
        """, (userId, recipeId))

        if cursor.fetchone():
            return jsonify({
                "success": False,
                "message": "Recipe already in favorites"
            })

        # Save favorite
        cursor.execute("""
            INSERT INTO Favorites
            (
                UserID,
                UserName,
                Email,
                RecipeID,
                RecipeName,
                ImageURL,
                SavedDate,
                SavedTime
            )
            VALUES
            (
                ?,?,?,?,?,?,
                CAST(GETDATE() AS DATE),
                CAST(GETDATE() AS TIME)
            )
        """, (
            userId,
            user.Name,
            user.Email,
            recipeId,
            recipeName,
            imageUrl
        ))

        conn.commit()

        return jsonify({
            "success": True,
            "message": "Favorite Saved Successfully"
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

    finally:

        cursor.close()
        conn.close()
        # ================= GET FAVORITES ================= #

@app.route("/favorites/<int:userId>", methods=["GET"])
def get_favorites(userId):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute("""
            SELECT
                FavoriteID,
                UserID,
                UserName,
                Email,
                RecipeID,
                RecipeName,
                ImageURL,
                SavedDate,
                SavedTime
            FROM Favorites
            WHERE UserID=?
            ORDER BY FavoriteID DESC
        """, (userId,))

        rows = cursor.fetchall()

        favorites = []

        for row in rows:

            favorites.append({
                "favoriteId": row.FavoriteID,
                "userId": row.UserID,
                "userName": row.UserName,
                "email": row.Email,
                "recipeId": row.RecipeID,
                "recipeName": row.RecipeName,
                "imageUrl": row.ImageURL,
                "savedDate": str(row.SavedDate),
                "savedTime": str(row.SavedTime)
            })

        return jsonify(favorites)

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

    finally:

        cursor.close()
        conn.close()


# ================= DELETE FAVORITE ================= #

@app.route("/favorites/<int:userId>/<recipeId>", methods=["DELETE"])
def delete_favorite(userId, recipeId):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute("""
            DELETE FROM Favorites
            WHERE UserID=? AND RecipeID=?
        """, (userId, str(recipeId)))

        conn.commit()

        return jsonify({
            "success": True,
            "message": "Favorite Removed Successfully"
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

    finally:

        cursor.close()
        conn.close()


# ================= RUN SERVER ================= #

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )