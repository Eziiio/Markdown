# Markdown-to-HTML Converter

## 📌 Project Description

This is a **Markdown-to-HTML Converter** built using Python and Flask. The project provides a web-based UI where users can input Markdown text, and it will be converted into properly formatted HTML. The backend processes the Markdown and returns the HTML output.

## 🚀 Features

* Converts Markdown text into HTML
* REST API endpoint for Markdown conversion
* Web-based UI using HTML, CSS, and JavaScript
* Flask-based backend for processing Markdown
* Supports custom Markdown extensions

## 🛠 Installation & Setup

Follow these steps to set up and run the project:

1. **Clone this repository:**

   ```sh
   git clone https://github.com/Eziiio/ajcecse/B_64_K_V_Manuvardhan_PIP_Project.git
   ```
2. **Navigate to the project folder:**

   ```sh
   cd B_64_K_V_Manuvardhan_PIP_Project
   ```
3. **Create and activate a virtual environment:**

   ```sh
   python -m venv venv
   source venv/bin/activate  # Mac/Linux
   venv\Scripts\activate  # Windows
   ```
4. **Install dependencies:**

   ```sh
   pip install -r requirements.txt
   ```

## 🖥 Usage

### Running the Backend

Start the Flask server by running:

```sh
python main.py
```

This will start the server at `http://127.0.0.1:5000`.

### Using the Web UI

* Open `http://127.0.0.1:5000/` in your browser to access the Markdown converter UI.
* Enter Markdown text, and the converted HTML will be displayed.

### Using the API Endpoint

You can also convert Markdown using the API:

```sh
curl -X POST http://127.0.0.1:5000/convert -H "Content-Type: application/json" -d '{"markdown": "# Hello World"}'
```

Response:

```json
{
    "html": "<h1>Hello World</h1>"
}
```

## 🔧 Technologies Used

* Python
* Flask
* Markdown Library
* HTML, CSS, JavaScript

## 📂 Project Structure

```
B_64_K_V_Manuvardhan_PIP_Project/
│── assets/              # Static assets (CSS, JS, images)
│── main.py              # Flask backend
│── index.html           # Frontend UI
│── requirements.txt     # Project dependencies
│── README.md            # Project documentation
```

## 🤝 Contributors

* [Ezio](https://github.com/Eziiio) (Developer)

## 📜 License

This project is open-source under the MIT License.
